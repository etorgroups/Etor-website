import { publicUrl } from '../lib/basePath'
import { DEFAULT_DIRECTIONS_URL } from './directions'

// Real surveyed layout plans, converted from the client's CAD/PDF drawings
// (see scripts/convert-layouts.mjs — re-run it if the client sends updated
// PDFs). These are the actual plot boundaries and numbers ETOR Group filed,
// not a synthetic map, so there is no invented sold/available status here —
// each layout page links to the original PDF and directs availability
// questions to an advisor instead of guessing.

import city1Main from '../assets/layouts/city-1/main.webp'
import city1MainThumb from '../assets/layouts/city-1/main-thumb.webp'
import city1Tower from '../assets/layouts/city-1/tower-land.webp'
import city1TowerThumb from '../assets/layouts/city-1/tower-land-thumb.webp'
import city1Survey6768 from '../assets/layouts/city-1/survey-67-68.webp'
import city1Survey6768Thumb from '../assets/layouts/city-1/survey-67-68-thumb.webp'
import city1Dsp from '../assets/layouts/city-1/dsp-land.webp'
import city1DspThumb from '../assets/layouts/city-1/dsp-land-thumb.webp'
import city1Survey16 from '../assets/layouts/city-1/survey-16.webp'
import city1Survey16Thumb from '../assets/layouts/city-1/survey-16-thumb.webp'
import city1Dtcp from '../assets/layouts/city-1/dtcp-island.webp'
import city1DtcpThumb from '../assets/layouts/city-1/dtcp-island-thumb.webp'
import city1Chippapalli from '../assets/layouts/city-1/chippapalli.webp'
import city1ChippapalliThumb from '../assets/layouts/city-1/chippapalli-thumb.webp'

import city2BlockA from '../assets/layouts/city-2/block-a.webp'
import city2BlockAThumb from '../assets/layouts/city-2/block-a-thumb.webp'
import city2BlockB from '../assets/layouts/city-2/block-b.webp'
import city2BlockBThumb from '../assets/layouts/city-2/block-b-thumb.webp'
import city2BlockC from '../assets/layouts/city-2/block-c.webp'
import city2BlockCThumb from '../assets/layouts/city-2/block-c-thumb.webp'

import city34Ec3 from '../assets/layouts/city-3-4/etor-city-3.webp'
import city34Ec3Thumb from '../assets/layouts/city-3-4/etor-city-3-thumb.webp'
import city34Ec4 from '../assets/layouts/city-3-4/etor-city-4.webp'
import city34Ec4Thumb from '../assets/layouts/city-3-4/etor-city-4-thumb.webp'

// Real drone/site photos (see scripts/convert-site-photos.mjs). These are
// shot per city group, not per individual sub-layout block, so each block's
// card cycles through a rotating share of its city's photos rather than
// claiming one specific photo is that exact sub-layout.
import city1Photo1 from '../assets/site-photos/city-1/photo-1.webp'
import city1Photo2 from '../assets/site-photos/city-1/photo-2.webp'
import city1Photo3 from '../assets/site-photos/city-1/photo-3.webp'
import city1Photo4 from '../assets/site-photos/city-1/photo-4.webp'
import city2Photo1 from '../assets/site-photos/city-2/photo-1.webp'
import city2Photo2 from '../assets/site-photos/city-2/photo-2.webp'
import city34Photo1 from '../assets/site-photos/city-3-4/photo-1.webp'
import city34Photo2 from '../assets/site-photos/city-3-4/photo-2.webp'
import city34Photo3 from '../assets/site-photos/city-3-4/photo-3.webp'
import city34Photo4 from '../assets/site-photos/city-3-4/photo-4.webp'
import city34Photo5 from '../assets/site-photos/city-3-4/photo-5.webp'
import city34Photo6 from '../assets/site-photos/city-3-4/photo-6.webp'
import city34Photo7 from '../assets/site-photos/city-3-4/photo-7.webp'
import city34Photo8 from '../assets/site-photos/city-3-4/photo-8.webp'
import city34Photo9 from '../assets/site-photos/city-3-4/photo-9.webp'

// Each entry can set its own `directionsUrl` once real per-layout location
// data comes in — anything not overridden here falls back to the shared
// placeholder pin below.
const RAW_LAYOUTS = [
  {
    city: 'city-1',
    slug: 'main',
    name: 'Main Layout',
    location: 'Sariapalli Village · Survey Nos. 47, 53, 57–59, 70–71',
    image: city1Main,
    thumb: city1MainThumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-1-main.pdf'),
    plotCount: 512,
    photos: [city1Photo1],
  },
  {
    city: 'city-1',
    slug: 'tower-land',
    name: 'Tower Land',
    location: 'Sariapalli Village · Survey No. 24',
    image: city1Tower,
    thumb: city1TowerThumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-1-tower-land.pdf'),
    plotCount: 48,
    photos: [city1Photo2],
  },
  {
    city: 'city-1',
    slug: 'survey-67-68',
    name: 'Survey 67 & 68',
    location: 'Sariapalli Village · Survey Nos. 67, 68',
    image: city1Survey6768,
    thumb: city1Survey6768Thumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-1-survey-67-68.pdf'),
    plotCount: 148,
    photos: [city1Photo3],
  },
  {
    city: 'city-1',
    slug: 'dsp-land',
    name: 'DSP Land',
    location: 'Sariapalli Village · Survey No. 1',
    image: city1Dsp,
    thumb: city1DspThumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-1-dsp-land.pdf'),
    plotCount: 55,
    photos: [city1Photo4],
  },
  {
    city: 'city-1',
    slug: 'survey-16',
    name: 'Survey No. 16',
    location: 'Sariapalli Village · Survey No. 16',
    image: city1Survey16,
    thumb: city1Survey16Thumb,
    width: 2695,
    height: 1904,
    pdf: publicUrl('downloads/layouts/city-1-survey-16.pdf'),
    plotCount: 72,
    photos: [city1Photo1],
  },
  {
    city: 'city-1',
    slug: 'dtcp-island',
    name: 'DTCP Site (Island)',
    location: 'Nandakota Village, Bhimpole · Survey Nos. 70, 78',
    image: city1Dtcp,
    thumb: city1DtcpThumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-1-dtcp-island.pdf'),
    plotCount: 197,
    photos: [city1Photo2],
  },
  {
    city: 'city-1',
    slug: 'chippapalli',
    name: 'Chippapalli',
    location: 'Chippapalli Village · Survey No. 63',
    image: city1Chippapalli,
    thumb: city1ChippapalliThumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-1-chippapalli.pdf'),
    plotCount: 135,
    photos: [city1Photo3],
  },

  {
    city: 'city-2',
    slug: 'block-a',
    name: 'Block A · Plots 217–250',
    location: 'Sottadivalasa Village · Survey No. 5',
    image: city2BlockA,
    thumb: city2BlockAThumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-2-block-a.pdf'),
    plotCount: 32,
    photos: [city2Photo1],
  },
  {
    city: 'city-2',
    slug: 'block-b',
    name: 'Block B · Plots 251–301',
    location: 'Sottadivalasa Village · Survey No. 5',
    image: city2BlockB,
    thumb: city2BlockBThumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-2-block-b.pdf'),
    plotCount: 44,
    photos: [city2Photo2],
  },
  {
    city: 'city-2',
    slug: 'block-c',
    name: 'Block C · Plots 302–315',
    location: 'Sottadivalasa Village · Survey No. 5',
    image: city2BlockC,
    thumb: city2BlockCThumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-2-block-c.pdf'),
    plotCount: 14,
    photos: [city2Photo1],
  },

  {
    city: 'city-3-4',
    slug: 'etor-city-3',
    name: 'ETOR City 3',
    location: 'Loddaputti & Bellupada Villages, Ichapuram Mandal',
    image: city34Ec3,
    thumb: city34Ec3Thumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-3-4-etor-city-3.pdf'),
    plotCount: 502,
    photos: [city34Photo1, city34Photo3, city34Photo5, city34Photo7, city34Photo9],
  },
  {
    city: 'city-3-4',
    slug: 'etor-city-4',
    name: 'ETOR City 4',
    location: 'Bellupada Village, Ichapuram Mandal',
    image: city34Ec4,
    thumb: city34Ec4Thumb,
    width: 3812,
    height: 2695,
    pdf: publicUrl('downloads/layouts/city-3-4-etor-city-4.pdf'),
    plotCount: 266,
    note: 'Sold and saleable plots are marked directly on this layout.',
    photos: [city34Photo2, city34Photo4, city34Photo6, city34Photo8],
  },
]

export const LAYOUTS = RAW_LAYOUTS.map((layout) => ({ directionsUrl: DEFAULT_DIRECTIONS_URL, ...layout }))

export function getLayoutsForCity(cityId) {
  return LAYOUTS.filter((layout) => layout.city === cityId)
}

export function getLayout(cityId, slug) {
  return LAYOUTS.find((layout) => layout.city === cityId && layout.slug === slug)
}
