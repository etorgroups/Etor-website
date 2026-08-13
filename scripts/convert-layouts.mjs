// One-off (re-runnable) conversion of the client's real survey/CAD layout
// PDFs (C:\Users\impac\Downloads\EtorCitiesLayouts) into web-ready images.
// Re-run this whenever the client sends updated layout PDFs — update SOURCE
// below to point at the new folder/files if the filenames change.
//
// Usage: node scripts/convert-layouts.mjs
import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { createCanvas } from '@napi-rs/canvas'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SOURCE_DIR = 'C:\\Users\\impac\\Downloads\\EtorCitiesLayouts'
const PUBLIC_PDF_DIR = path.join(ROOT, 'public', 'downloads', 'layouts')
const ASSETS_DIR = path.join(ROOT, 'src', 'assets', 'layouts')

// pdfjs-dist legacy build works in plain Node without a DOM.
const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')

const LAYOUTS = [
  { city: 'city-1', slug: 'main', name: 'Main Layout', file: '1.EC-1 UPDATED MAP 23.03.pdf', location: 'Sariapalli Village · Survey Nos. 47, 53, 57–59, 70–71' },
  { city: 'city-1', slug: 'tower-land', name: 'Tower Land', file: '2.tower land updated 19.01.pdf', location: 'Sariapalli Village · Survey No. 24' },
  { city: 'city-1', slug: 'survey-67-68', name: 'Survey 67 & 68', file: '3.67 AND 68 LAYOUT.pdf', location: 'Sariapalli Village · Survey Nos. 67, 68' },
  { city: 'city-1', slug: 'dsp-land', name: 'DSP Land', file: '4.DSP LAND LAYOUT06.02.pdf', location: 'Sariapalli Village · Survey No. 1' },
  { city: 'city-1', slug: 'survey-16', name: 'Survey No. 16', file: '5.16 S.NO UPDATE MAP 01.07.pdf', location: 'Sariapalli Village · Survey No. 16' },
  { city: 'city-1', slug: 'dtcp-island', name: 'DTCP Site (Island)', file: '6.DTCP SITE UPDATED LAYOUT.pdf', location: 'Nandakota Village, Bhimpole · Survey Nos. 70, 78' },
  { city: 'city-1', slug: 'chippapalli', name: 'Chippapalli', file: '7.chippapalli layout update.pdf', location: 'Chippapalli Village · Survey No. 63' },

  { city: 'city-2', slug: 'block-a', name: 'Block A · Plots 217–250', file: '9.SOTTADIVALASA EC-2 2.48 acres.pdf', location: 'Sottadivalasa Village · Survey No. 5' },
  { city: 'city-2', slug: 'block-b', name: 'Block B · Plots 251–301', file: '10.EC-2 SR NO 5 LAYOUT.pdf', location: 'Sottadivalasa Village · Survey No. 5' },
  { city: 'city-2', slug: 'block-c', name: 'Block C · Plots 302–315', file: '11.SOTTODUVALASA  5SN.pdf', location: 'Sottadivalasa Village · Survey No. 5' },

  { city: 'city-3-4', slug: 'etor-city-3', name: 'ETOR City 3', file: '12.EC3 UPDATED  DRAWING 31.1.2026.pdf', location: 'Loddaputti & Bellupada Villages, Ichapuram Mandal · Survey Nos. 127, 128, 292–294' },
  { city: 'city-3-4', slug: 'etor-city-4', name: 'ETOR City 4', file: '13.UPDATED EC4 MAP 30.07.pdf', location: 'Bellupada Village, Ichapuram Mandal · Survey Nos. 77, 87–89, 603' },
]

async function renderPdfPage(pdfPath, scale) {
  const data = new Uint8Array(await readFile(pdfPath))
  const pdf = await pdfjsLib.getDocument({ data, isEvalSupported: false }).promise
  const page = await pdf.getPage(1)
  const viewport = page.getViewport({ scale })
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  await page.render({ canvasContext: ctx, viewport, canvas }).promise
  return canvas
}

for (const layout of LAYOUTS) {
  const srcPdf = path.join(SOURCE_DIR, layout.file)
  const cityDir = path.join(ASSETS_DIR, layout.city)
  await mkdir(cityDir, { recursive: true })

  process.stdout.write(`Rendering ${layout.city}/${layout.slug}... `)

  const fullCanvas = await renderPdfPage(srcPdf, 3.2)
  await writeFile(path.join(cityDir, `${layout.slug}.webp`), fullCanvas.toBuffer('image/webp', 92))

  const thumbCanvas = await renderPdfPage(srcPdf, 0.9)
  await writeFile(path.join(cityDir, `${layout.slug}-thumb.webp`), thumbCanvas.toBuffer('image/webp', 85))

  const pdfDestName = `${layout.city}-${layout.slug}.pdf`
  await copyFile(srcPdf, path.join(PUBLIC_PDF_DIR, pdfDestName))

  console.log(`done (${fullCanvas.width}x${fullCanvas.height})`)
}

console.log('\nAll layouts converted.')
