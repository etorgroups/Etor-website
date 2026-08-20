import { useEffect } from 'react'
import { publicUrl } from '../lib/basePath'

// The real deployed origin (see index.html's canonical/og:url, and
// public/robots.txt's Sitemap line — all need to agree). Vite's
// import.meta.env.BASE_URL only gives the path portion (/Etor-website/ on
// GitHub Pages, / on Vercel), not the domain, so the domain comes from
// VITE_SITE_ORIGIN (see .env — defaults to the GitHub Pages domain; Vercel's
// project settings can override it with that deployment's own domain) rather
// than being guessed from window.location, which would silently produce
// wrong canonicals if this site is ever previewed/proxied from a third host.
const SITE_ORIGIN = import.meta.env.VITE_SITE_ORIGIN
const DEFAULT_TITLE = 'ETOR Group | Empowering Growth Through Innovation'
const DEFAULT_IMAGE = `${SITE_ORIGIN}${publicUrl('og-image.webp')}`

// The organization's JSON-LD @id, referenced by name from every page's own
// per-page schema (Home/About/Services/Contact.jsx) via `about`/`worksFor`/
// `provider` — matches the RealEstateAgent @id declared in index.html.
export const ORGANIZATION_ID = `${SITE_ORIGIN}${publicUrl('')}#organization`
export const WEBSITE_ID = `${SITE_ORIGIN}${publicUrl('')}#website`
export const SITE_URL = `${SITE_ORIGIN}${publicUrl('')}`

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setRobots(noindex) {
  let el = document.querySelector('meta[name="robots"]')
  if (noindex) {
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'robots')
      document.head.appendChild(el)
    }
    el.setAttribute('content', 'noindex, nofollow')
  } else if (el) {
    el.remove()
  }
}

// Shared BreadcrumbList builder — pass [{ name: 'Projects', path: '/projects' }, ...]
// (Home is implied as the first crumb, don't include it yourself).
export function buildBreadcrumbs(items) {
  const trail = [{ name: 'Home', path: '/' }, ...items]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${publicUrl(item.path.replace(/^\/+/, ''))}`,
    })),
  }
}

function setSchema(schema) {
  document.querySelectorAll('script[data-seo-schema]').forEach((el) => el.remove())
  const items = (Array.isArray(schema) ? schema : [schema]).filter(Boolean)
  items.forEach((item) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seoSchema = 'true'
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  })
}

// Sets per-route <title>, meta description, canonical URL, Open Graph /
// Twitter tags, and JSON-LD schema — all via direct DOM writes on mount,
// since this is a client-rendered SPA with no server-side rendering step.
// Google and Bing both execute JS and index the resulting DOM, so this is
// enough for real search results; it does NOT help non-JS social-preview
// crawlers on deep links (they only see index.html's static tags) — that's
// an inherent limitation of a CSR app without a prerender step, not
// something this component can fix.
//
// path must start with '/' and match the route's actual URL (e.g. '/about').
export default function SEO({ title, description, path = '/', image, schema, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ETOR Group` : DEFAULT_TITLE
    document.title = fullTitle

    const url = `${SITE_ORIGIN}${publicUrl(path.replace(/^\/+/, ''))}`
    const img = image || DEFAULT_IMAGE

    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', img)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', img)
    setRobots(noindex)
    setSchema(schema)
  }, [title, description, path, image, schema, noindex])

  return null
}
