// Extracts real plot-number positions (and, where printed on the drawing,
// real dimensions) from a layout PDF's vector text, then generates the same
// kind of illustrative status mix the site's synthetic Plot Map already
// used (see src/data/plotMap.js) — seeded, so it's stable across reloads,
// not real inventory data (we don't have that), and clearly labelled as
// illustrative in the UI. Re-run per layout as needed; each run writes one
// file to src/data/plotOverlays/.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
const RENDER_SCALE = 3.2 // must match scripts/convert-layouts.mjs

const JOBS = [
  {
    city: 'city-1',
    slug: 'main',
    file: '1.EC-1 UPDATED MAP 23.03.pdf',
    seed: 101,
    pricePerSqYd: 3999,
    plotNumberHeights: [3],
    blockLabel: 'Main Layout',
  },
  {
    city: 'city-2',
    slug: 'block-a',
    file: '9.SOTTADIVALASA EC-2 2.48 acres.pdf',
    seed: 201,
    pricePerSqYd: 3999,
    plotNumberHeights: [16],
    blockLabel: 'Block A',
  },
  {
    city: 'city-2',
    slug: 'block-b',
    file: '10.EC-2 SR NO 5 LAYOUT.pdf',
    seed: 202,
    pricePerSqYd: 3999,
    plotNumberHeights: [11],
    blockLabel: 'Block B',
  },
  {
    city: 'city-2',
    slug: 'block-c',
    file: '11.SOTTODUVALASA  5SN.pdf',
    seed: 203,
    pricePerSqYd: 3999,
    plotNumberHeights: [16],
    blockLabel: 'Block C',
  },
  {
    city: 'city-3-4',
    slug: 'etor-city-3',
    file: '12.EC3 UPDATED  DRAWING 31.1.2026.pdf',
    seed: 301,
    pricePerSqYd: 4999,
    plotNumberHeights: [3],
    blockLabel: 'ETOR City 3',
  },
  {
    city: 'city-3-4',
    slug: 'etor-city-4',
    file: '13.UPDATED EC4 MAP 30.07.pdf',
    seed: 302,
    pricePerSqYd: 4999,
    plotNumberHeights: [4, 5],
    blockLabel: 'ETOR City 4',
  },
  {
    city: 'city-1',
    slug: 'tower-land',
    file: '2.tower land updated 19.01.pdf',
    seed: 102,
    pricePerSqYd: 3999,
    plotNumberHeights: [6],
    blockLabel: 'Tower Land',
  },
  {
    city: 'city-1',
    slug: 'survey-67-68',
    file: '3.67 AND 68 LAYOUT.pdf',
    seed: 103,
    pricePerSqYd: 3999,
    plotNumberHeights: [11],
    blockLabel: 'Survey 67 & 68',
  },
  {
    city: 'city-1',
    slug: 'dsp-land',
    file: '4.DSP LAND LAYOUT06.02.pdf',
    seed: 104,
    pricePerSqYd: 3999,
    plotNumberHeights: [7, 11],
    blockLabel: 'DSP Land',
  },
  {
    city: 'city-1',
    slug: 'survey-16',
    file: '5.16 S.NO UPDATE MAP 01.07.pdf',
    seed: 105,
    pricePerSqYd: 3999,
    plotNumberHeights: [5],
    blockLabel: 'Survey No. 16',
  },
  {
    city: 'city-1',
    slug: 'chippapalli',
    file: '7.chippapalli layout update.pdf',
    seed: 107,
    pricePerSqYd: 3999,
    plotNumberHeights: [4],
    blockLabel: 'Chippapalli',
  },
  {
    city: 'city-1',
    slug: 'dtcp-island',
    file: '6.DTCP SITE UPDATED LAYOUT.pdf',
    seed: 106,
    pricePerSqYd: 3999,
    plotNumberHeights: [5],
    blockLabel: 'DTCP Site (Island)',
    // Plot number and its area (sqyd) are printed as two separate text runs
    // stacked directly on top of each other at the SAME font size, so a
    // plain height+regex filter can't tell them apart — pair sequential
    // items by proximity instead and take the top one of each pair.
    pairedNumberArea: true,
  },
]

function distance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by)
}

// For layouts where the plot number and its area are two separate text runs
// stacked directly on top of each other at the same font size (no way to
// tell them apart by size/pattern alone) — walk the items in their original
// document order and pair each with the next one if it's close enough to be
// its area label. Falls back to a standalone plot number when nothing is
// close by, so an occasional missing label doesn't throw off everything
// after it.
function extractPairedNumberArea(items, heights) {
  const candidates = items.filter((it) => heights.includes(it.height) && /^\d{1,4}[A-Za-z]?$/.test(it.str))
  const result = []
  let i = 0
  while (i < candidates.length) {
    const current = candidates[i]
    const next = candidates[i + 1]
    if (next && distance(current.x, current.y, next.x, next.y) < 30) {
      result.push({ str: current.str, x: current.x, y: current.y, textWidth: current.textWidth, areaSqYd: parseInt(next.str, 10) })
      i += 2
    } else {
      result.push({ str: current.str, x: current.x, y: current.y, textWidth: current.textWidth, areaSqYd: null })
      i += 1
    }
  }
  return result
}

function parseFeetDimension(str) {
  const m = str.match(/(\d+(?:\.\d+)?)'\s*[Xx]\s*(\d+(?:\.\d+)?)'/)
  if (!m) return null
  const sqft = parseFloat(m[1]) * parseFloat(m[2])
  return Math.round(sqft / 9)
}

// Inline copies of the seeded RNG + synthetic status/customer generators —
// mirrors src/data/plotMap.js exactly so the two systems feel consistent.
function seededRng(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}
const DEFAULT_WEIGHTS = [
  ['available', 0.52],
  ['sold', 0.3],
  ['booked', 0.11],
  ['hold', 0.07],
]
function statusFromRoll(roll, weights) {
  let acc = 0
  for (const [status, weight] of weights) {
    acc += weight
    if (roll < acc) return status
  }
  return weights[weights.length - 1][0]
}
const FIRST_NAMES = [
  'Ramesh', 'Suresh', 'Priya', 'Anjali', 'Vikram', 'Kavya', 'Arjun', 'Deepa',
  'Manoj', 'Sneha', 'Rajesh', 'Lakshmi', 'Kiran', 'Pooja', 'Naveen', 'Divya',
  'Srinivas', 'Meena', 'Ravi', 'Swathi', 'Harika', 'Chandra', 'Vinay', 'Uma',
]
const LAST_INITIALS = ['K.', 'R.', 'S.', 'N.', 'M.', 'P.', 'V.', 'T.', 'B.', 'G.']
function randomCustomerName(rng) {
  return `${FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)]} ${LAST_INITIALS[Math.floor(rng() * LAST_INITIALS.length)]}`
}
function randomDate(rng, fromYear, toYear) {
  const from = new Date(fromYear, 0, 1).getTime()
  const to = new Date(toYear, 6, 31).getTime()
  return new Date(from + rng() * (to - from)).toISOString().slice(0, 10)
}

for (const job of JOBS) {
  const srcPdf = path.join('C:\\Users\\impac\\Downloads\\EtorCitiesLayouts', job.file)
  const data = new Uint8Array(await readFile(srcPdf))
  const pdf = await pdfjsLib.getDocument({ data, isEvalSupported: false }).promise
  const page = await pdf.getPage(1)
  const viewport = page.getViewport({ scale: RENDER_SCALE })
  const content = await page.getTextContent()

  const items = content.items
    .filter((it) => it.str.trim())
    .map((it) => {
      // transform[4]/[5] is the run's left-edge baseline origin, not its
      // center — for wide plot numbers on large-font layouts (tower-land,
      // survey-67-68, block-a/c) that left-anchor left the marker circle
      // off-center enough for the drawing's own printed digits to poke out
      // past the circle's edge. Find the true center from the run's advance
      // width instead.
      //
      // it.width/it.height are already expressed in the same PDF user-space
      // units as the transform's own translation (e,f) — but which SCREEN
      // axis they advance along depends on the run's own rotation, encoded
      // in the transform's linear part [a,b,c,d]. For most of these fonts
      // that linear part is an identity-like scale (a=fontSize>0, b=0), so
      // advancing along global +x happens to be correct — but DSP Land's
      // plot-number font carries its own local rotation (a=0, b=-fontSize),
      // where advancing along global +x is wrong and centering does nothing.
      // Take the [a,b] / [c,d] pairs as direction only (normalize out their
      // magnitude, which is just the font-size scale) and apply the
      // already-correctly-scaled width/height along that direction.
      const [a, b, c, d, e, f] = it.transform
      const [x0, y0] = viewport.convertToViewportPoint(e, f)
      const xMag = Math.hypot(a, b) || 1
      const yMag = Math.hypot(c, d) || 1
      const [xw, yw] = viewport.convertToViewportPoint(e + ((it.width || 0) * a) / xMag, f + ((it.width || 0) * b) / xMag)
      const [xh, yh] = viewport.convertToViewportPoint(e + (it.height * c) / yMag, f + (it.height * d) / yMag)
      const dxAdv = xw - x0
      const dyAdv = yw - y0
      const widthFromAdvance = Math.hypot(dxAdv, dyAdv)
      const viewportHeight = Math.hypot(xh - x0, yh - y0)
      const widthFromLength = it.str.trim().length * viewportHeight * 0.62
      const textWidth = Math.max(widthFromAdvance, widthFromLength)
      // Center = move half the run's own length along its actual advance
      // direction, not blindly along the viewport's X axis.
      const advUnit = widthFromAdvance > 0.01 ? [dxAdv / widthFromAdvance, dyAdv / widthFromAdvance] : [1, 0]
      const centerX = x0 + advUnit[0] * (textWidth / 2)
      const centerY = y0 + advUnit[1] * (textWidth / 2)
      return { str: it.str.trim(), x: centerX, y: centerY, height: Math.round(it.height), textWidth }
    })

  let dedupedPlotItems
  if (job.pairedNumberArea) {
    dedupedPlotItems = extractPairedNumberArea(items, job.plotNumberHeights)
  } else {
    const plotItems = items.filter(
      (it) => job.plotNumberHeights.includes(it.height) && /^\d{1,4}[A-Za-z]?$/.test(it.str),
    )
    const seenNumbers = new Set()
    dedupedPlotItems = plotItems.filter((it) => {
      if (seenNumbers.has(it.str)) return false
      seenNumbers.add(it.str)
      return true
    })
    if (dedupedPlotItems.length !== plotItems.length) {
      console.log(`  (dropped ${plotItems.length - dedupedPlotItems.length} duplicate plot-number labels)`)
    }
  }
  const dimensionItems = items.filter((it) => /^\d+(?:\.\d+)?'\s*[Xx]\s*\d+(?:\.\d+)?'/.test(it.str))

  const rng = seededRng(job.seed)
  const plots = dedupedPlotItems.map((plotItem, index) => {
    let sizeSqYd = plotItem.areaSqYd || null
    if (!sizeSqYd) {
      let nearestDimension = null
      let nearestDist = Infinity
      for (const dim of dimensionItems) {
        const d = distance(plotItem.x, plotItem.y, dim.x, dim.y)
        if (d < nearestDist) {
          nearestDist = d
          nearestDimension = dim
        }
      }
      sizeSqYd = nearestDimension && nearestDist < 60 ? parseFeetDimension(nearestDimension.str) : null
    }

    const status = statusFromRoll(rng(), DEFAULT_WEIGHTS)
    // Marker radius must fully cover the drawing's own printed number, or its
    // edges peek out from under the circle — size it off the real text width
    // instead of a one-size-fits-all constant (layouts vary widely in the
    // font size their CAD drafter used).
    const r = Math.max(20, Math.round((plotItem.textWidth || 0) / 2 + 8))
    const plot = {
      id: `${job.city}-${job.slug}-${plotItem.str}`,
      number: plotItem.str,
      block: job.blockLabel,
      x: Math.round(plotItem.x),
      y: Math.round(plotItem.y),
      r,
      status,
      sizeSqYd: sizeSqYd || 250,
      pricePerSqYd: job.pricePerSqYd,
    }
    if (status === 'sold') {
      plot.customerName = randomCustomerName(rng)
      plot.soldDate = randomDate(rng, 2024, 2026)
    } else if (status === 'booked') {
      plot.customerName = randomCustomerName(rng)
      plot.bookedDate = randomDate(rng, 2025, 2026)
    }
    return plot
  })

  const outDir = path.join(ROOT, 'src', 'data', 'plotOverlays')
  await mkdir(outDir, { recursive: true })
  const outFile = path.join(outDir, `${job.city}-${job.slug}.js`)
  const header = `// AUTO-GENERATED by scripts/extract-plot-overlays.mjs — do not hand-edit.
// Plot numbers and positions are extracted from the real survey PDF's text
// layer (ETOR Group's actual drawing). Status/customer/date fields are an
// illustrative demo mix using the site's existing seeded generator (see
// src/data/plotMap.js) — not live inventory data.
`
  const body = `export const OVERLAY_PLOTS = ${JSON.stringify(plots, null, 2)}\n`
  await writeFile(outFile, header + body, 'utf8')
  console.log(`Wrote ${outFile} — ${plots.length} plots`)
}
