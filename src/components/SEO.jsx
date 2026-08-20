import { useEffect } from 'react'
import { publicUrl } from '../lib/basePath'

// The real deployed origin (see index.html's canonical/og:url, and
// public/robots.txt's Sitemap line — all three need to agree). Vite's
// import.meta.env.BASE_URL only gives the /Etor-website/ path portion,
// not the domain, so this is spelled out once here rather than guessed from
// window.location (which would silently produce wrong canonicals if this
// site is ever previewed/proxied from a different host).
const SITE_ORIGIN = 'https://etorgroups.github.io'
const DEFAULT_TITLE = 'ETOR Group | Empowering Growth Through Innovation'
const DEFAULT_IMAGE = `${SITE_ORIGIN}${publicUrl('og-image.webp')}`

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
