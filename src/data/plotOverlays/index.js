// Maps `${cityId}/${layoutSlug}` to a loader for its extracted real-plot
// overlay data. Dynamic imports, not eager ones — a visit to one layout's
// page shouldn't pull in every other layout's plot dataset too. Every
// layout now has an entry here; run scripts/extract-plot-overlays.mjs again
// if the client sends updated layout PDFs.
const OVERLAY_LOADERS = {
  'city-1/main': () => import('./city-1-main').then((m) => m.OVERLAY_PLOTS),
  'city-1/tower-land': () => import('./city-1-tower-land').then((m) => m.OVERLAY_PLOTS),
  'city-1/survey-67-68': () => import('./city-1-survey-67-68').then((m) => m.OVERLAY_PLOTS),
  'city-1/dsp-land': () => import('./city-1-dsp-land').then((m) => m.OVERLAY_PLOTS),
  'city-1/survey-16': () => import('./city-1-survey-16').then((m) => m.OVERLAY_PLOTS),
  'city-1/dtcp-island': () => import('./city-1-dtcp-island').then((m) => m.OVERLAY_PLOTS),
  'city-1/chippapalli': () => import('./city-1-chippapalli').then((m) => m.OVERLAY_PLOTS),
  'city-2/block-a': () => import('./city-2-block-a').then((m) => m.OVERLAY_PLOTS),
  'city-2/block-b': () => import('./city-2-block-b').then((m) => m.OVERLAY_PLOTS),
  'city-2/block-c': () => import('./city-2-block-c').then((m) => m.OVERLAY_PLOTS),
  'city-3-4/etor-city-3': () => import('./city-3-4-etor-city-3').then((m) => m.OVERLAY_PLOTS),
  'city-3-4/etor-city-4': () => import('./city-3-4-etor-city-4').then((m) => m.OVERLAY_PLOTS),
}

export function getPlotOverlayLoader(cityId, layoutSlug) {
  return OVERLAY_LOADERS[`${cityId}/${layoutSlug}`] ?? null
}
