// Prerenders a fixed, known set of routes into static HTML files inside
// dist/, after the normal Vite build has already run.
//
// Why this exists: this is a client-rendered React SPA. No AI crawler
// (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) executes JavaScript --
// confirmed against a 500M-request GPTBot analysis, zero JS executions --
// so without this step, every one of those crawlers sees only the empty
// <div id="root"></div> shell. Google does render JS, but on a delayed
// second pass that's documented to lag further for new/low-authority sites,
// so this also removes that risk for Google specifically.
//
// How it works: spin up `vite preview` (serves the real dist/ output),
// visit each route with a real headless browser, scroll fully through the
// page so every scroll-triggered Reveal animation fires (so the captured
// HTML has real opacity:1 content, not framer-motion's opacity:0 initial
// state), then save page.content() to dist/<route>/index.html. The root
// route overwrites dist/index.html directly. dist/404.html (the SPA
// fallback for GitHub Pages, copied by the postbuild step that runs before
// this one) is deliberately NOT touched -- any route not in this list still
// falls through to the plain SPA shell and works exactly as before via
// client-side routing, so this is additive/lower-risk, not a rewrite.
import { spawn } from 'node:child_process'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const PORT = 4173
const BASE = `http://localhost:${PORT}/Etor-website`

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/contact',
  '/other-ventures',
  '/privacy',
  '/terms',
  '/projects/city-1/layouts',
  '/projects/city-2/layouts',
  '/projects/city-3-4/layouts',
  '/projects/city-1/plots',
  '/projects/city-2/plots',
  '/projects/city-3-4/plots',
]

function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url)
        if (res.ok || res.status === 404) return resolve()
        throw new Error(`status ${res.status}`)
      } catch {
        if (Date.now() - start > timeoutMs) return reject(new Error('preview server did not start in time'))
        setTimeout(attempt, 300)
      }
    }
    attempt()
  })
}

async function scrollThroughPage(page) {
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight)
    let last = -1
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 60))
      if (document.body.scrollHeight === last) break
      last = document.body.scrollHeight
    }
    window.scrollTo(0, 0)
  })
}

async function outPathFor(route) {
  if (route === '/') return path.join(DIST, 'index.html')
  return path.join(DIST, route.replace(/^\/+/, ''), 'index.html')
}

async function run() {
  console.log('[prerender] starting vite preview...')
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: 'ignore',
    shell: true,
  })

  try {
    await waitForServer(`${BASE}/`)
    console.log('[prerender] preview server ready')

    const browser = await chromium.launch()
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

    for (const route of ROUTES) {
      const url = `${BASE}${route}`
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })
      await page.waitForTimeout(400) // let the SEO component's effect + any lazy chunk settle
      await scrollThroughPage(page)
      await page.waitForTimeout(200)

      const html = await page.content()
      const outPath = await outPathFor(route)
      await mkdir(path.dirname(outPath), { recursive: true })
      await writeFile(outPath, html, 'utf-8')
      console.log(`[prerender] ${route} -> ${path.relative(ROOT, outPath)} (${(html.length / 1024).toFixed(0)}KB)`)
    }

    await browser.close()
  } finally {
    preview.kill()
  }

  console.log(`[prerender] done -- ${ROUTES.length} routes prerendered`)
}

run().catch((err) => {
  // Prerendering is a purely additive SEO enhancement -- any route this
  // step doesn't touch still works exactly as before via plain client-side
  // routing (see the file header comment). So a failure here (most
  // commonly: no Chromium cached in this build environment, e.g. a fresh
  // Vercel/CI container that hasn't run `playwright install`) should never
  // fail the actual deploy -- warn and let `vite build`'s real output ship.
  console.warn('[prerender] skipped -- prerendering failed, but the plain SPA build still works fine:')
  console.warn(err?.message || err)
})
