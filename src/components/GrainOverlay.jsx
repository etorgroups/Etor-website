// Static film-grain texture laid over the whole app for a bit of premium,
// tactile depth on otherwise flat color fields. Generated entirely from an
// inline SVG turbulence filter — no image asset, no animation (so there's
// nothing here for prefers-reduced-motion to need to disable).
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch' />
    <feColorMatrix type='saturate' values='0' />
  </filter>
  <rect width='100%' height='100%' filter='url(%23n)' />
</svg>`

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none mix-blend-overlay opacity-[0.05]"
      style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")` }}
    />
  )
}
