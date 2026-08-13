// Mock plot-inventory + layout data for the interactive Plot Map (see
// src/pages/PlotMap.jsx). In production this would come from a backend
// endpoint (e.g. GET /api/cities/:cityId/plots) that returns the same
// shape — block positions plus a status/customer record per plot — so
// swapping the source below for a real fetch is a one-line change.

import { DEFAULT_DIRECTIONS_URL } from './directions'

export const PLOT_STATUS = {
  available: {
    label: 'Available',
    fill: '#ffffff',
    stroke: '#1f9d55',
    text: '#15803d',
    dot: '#22c55e',
  },
  sold: {
    label: 'Sold',
    fill: '#fde4e1',
    stroke: '#dc2626',
    text: '#991b1b',
    dot: '#ef4444',
  },
  booked: {
    label: 'Booked',
    fill: '#fef3c7',
    stroke: '#d97706',
    text: '#92400e',
    dot: '#f59e0b',
  },
  hold: {
    label: 'On Hold',
    fill: '#e5e7eb',
    stroke: '#6b7280',
    text: '#374151',
    dot: '#9ca3af',
  },
}

const CELL = 32
const GAP = 6
const UNIT = CELL + GAP

// Small deterministic PRNG (LCG) so a given city always renders the same
// layout/status mix between page loads instead of reshuffling on refresh.
export function seededRng(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const FIRST_NAMES = [
  'Ramesh', 'Suresh', 'Priya', 'Anjali', 'Vikram', 'Kavya', 'Arjun', 'Deepa',
  'Manoj', 'Sneha', 'Rajesh', 'Lakshmi', 'Kiran', 'Pooja', 'Naveen', 'Divya',
  'Srinivas', 'Meena', 'Ravi', 'Swathi', 'Harika', 'Chandra', 'Vinay', 'Uma',
]
const LAST_INITIALS = ['K.', 'R.', 'S.', 'N.', 'M.', 'P.', 'V.', 'T.', 'B.', 'G.']

export function randomCustomerName(rng) {
  const first = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)]
  const last = LAST_INITIALS[Math.floor(rng() * LAST_INITIALS.length)]
  return `${first} ${last}`
}

export function randomDate(rng, fromYear, toYear) {
  const from = new Date(fromYear, 0, 1).getTime()
  const to = new Date(toYear, 6, 31).getTime()
  const t = from + rng() * (to - from)
  return new Date(t).toISOString().slice(0, 10)
}

export function statusFromRoll(roll, weights) {
  let acc = 0
  for (const [status, weight] of weights) {
    acc += weight
    if (roll < acc) return status
  }
  return weights[weights.length - 1][0]
}

export const DEFAULT_WEIGHTS = [
  ['available', 0.52],
  ['sold', 0.3],
  ['booked', 0.11],
  ['hold', 0.07],
]

function buildBlock({ id, label, x, y, rows, cols, rng, startNumber = 1, pricePerSqYd, sizeSqYd, weights = DEFAULT_WEIGHTS }) {
  const plots = []
  let n = startNumber
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const status = statusFromRoll(rng(), weights)
      const number = String(n).padStart(2, '0')
      const plot = {
        id: `${id}-${number}`,
        number,
        block: label,
        x: x + c * UNIT,
        y: y + r * UNIT,
        status,
        sizeSqYd,
        pricePerSqYd,
      }
      if (status === 'sold') {
        plot.customerName = randomCustomerName(rng)
        plot.soldDate = randomDate(rng, 2024, 2026)
      } else if (status === 'booked') {
        plot.customerName = randomCustomerName(rng)
        plot.bookedDate = randomDate(rng, 2025, 2026)
      }
      plots.push(plot)
      n += 1
    }
  }
  const width = cols * UNIT - GAP
  const height = rows * UNIT - GAP
  return { id, label, x, y, width, height, plots }
}

function road({ id, x, y, width, height, orientation }) {
  return { id, type: 'road', x, y, width, height, orientation }
}

function park({ id, x, y, width, height, label }) {
  return { id, type: 'park', x, y, width, height, label }
}

// Shared map "skeleton" — two street-facing strips up top, four block
// clusters wrapped around a central park, then a wide bottom strip.
// Reused across cities; only sizing/pricing/seed differ.
function buildCityLayout({ cityId, seed, pricePerSqYd, sizeSqYd, weights }) {
  const rng = seededRng(seed)
  const opts = { rng, pricePerSqYd, sizeSqYd, weights }

  const blocks = [
    buildBlock({ id: 'A', label: 'Block A', x: 20, y: 20, rows: 1, cols: 14, ...opts }),
    buildBlock({ id: 'B', label: 'Block B', x: 620, y: 20, rows: 1, cols: 14, ...opts }),
    buildBlock({ id: 'C', label: 'Block C', x: 20, y: 100, rows: 5, cols: 4, ...opts }),
    buildBlock({ id: 'D', label: 'Block D', x: 190, y: 100, rows: 5, cols: 10, ...opts }),
    buildBlock({ id: 'E', label: 'Block E', x: 638, y: 100, rows: 5, cols: 15, ...opts }),
    buildBlock({ id: 'F', label: 'Block F', x: 20, y: 322, rows: 6, cols: 9, ...opts }),
    buildBlock({ id: 'G', label: 'Block G', x: 820, y: 322, rows: 6, cols: 10, ...opts }),
    buildBlock({ id: 'H', label: 'Block H', x: 40, y: 580, rows: 3, cols: 30, ...opts }),
  ]

  const landmarks = [
    road({ id: 'road-top', x: 0, y: 66, width: 1240, height: 18, orientation: 'h' }),
    road({ id: 'road-mid', x: 0, y: 304, width: 1240, height: 18, orientation: 'h' }),
    road({ id: 'road-bottom', x: 0, y: 562, width: 1240, height: 18, orientation: 'h' }),
    road({ id: 'road-center', x: 580, y: 84, width: 18, height: 220, orientation: 'v' }),
    park({ id: 'central-park', x: 400, y: 322, width: 400, height: 218, label: 'Central Park' }),
  ]

  const totalPlots = blocks.reduce((sum, b) => sum + b.plots.length, 0)

  return {
    cityId,
    canvas: { width: 1240, height: 700 },
    blocks,
    landmarks,
    totalPlots,
  }
}

const CITY_CONFIG = {
  'city-1': { seed: 101, pricePerSqYd: 3999, sizeSqYd: 200 },
  'city-2': { seed: 202, pricePerSqYd: 3999, sizeSqYd: 180 },
  'city-3-4': {
    seed: 303,
    pricePerSqYd: 4999,
    sizeSqYd: 220,
    weights: [
      ['available', 0.4],
      ['sold', 0.4],
      ['booked', 0.13],
      ['hold', 0.07],
    ],
  },
}

export const CITY_META = {
  'city-1': { title: 'ETOR City 1', location: 'Sariapalli', directionsUrl: DEFAULT_DIRECTIONS_URL },
  'city-2': { title: 'ETOR City 2', location: 'Sottadivalasa', directionsUrl: DEFAULT_DIRECTIONS_URL },
  'city-3-4': { title: 'ETOR City 3 & 4', location: 'Ichapuram', directionsUrl: DEFAULT_DIRECTIONS_URL },
}

const cache = new Map()

export function getCityPlotMap(cityId) {
  const config = CITY_CONFIG[cityId] ?? CITY_CONFIG['city-1']
  if (!cache.has(cityId)) {
    cache.set(cityId, buildCityLayout({ cityId, ...config }))
  }
  return cache.get(cityId)
}

export function flattenPlots(cityMap) {
  return cityMap.blocks.flatMap((block) => block.plots)
}

// Anonymized activity feed for the public-facing "Recently Active" strip
// (see SoldTicker.jsx). One calm, actionable line per city — the "still
// available" count — rather than a sold/on-hold/available/per-plot dump for
// every city, which read as a wall of badges. Deliberately excludes customer
// names/dates — those are fine inside the plot-map detail drawer (an
// internal-style lookup a visitor opens deliberately), but surfacing
// invented buyer names in an always-on homepage strip would read as
// fabricated social proof.
export function getActivityFeed() {
  return Object.keys(CITY_META).map((cityId) => {
    const plots = flattenPlots(getCityPlotMap(cityId))
    const title = CITY_META[cityId].title
    const available = plots.filter((p) => p.status === 'available')
    return { icon: 'grass', text: `${available.length} plots still available in ${title}` }
  })
}
