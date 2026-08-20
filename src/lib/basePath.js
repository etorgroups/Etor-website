// Vite exposes the configured `base` (see vite.config.js — /Etor-website/ on
// GitHub Pages, / on Vercel) via import.meta.env.BASE_URL.
// A plain <a href="/x"> resolves against the domain root in the browser and
// 404s once deployed under that subpath — React Router's <Link>/<NavLink>
// already handle this correctly via basename, but anything downloadable
// (PDFs in public/) is a real, non-router anchor and needs this instead.
export function publicUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
