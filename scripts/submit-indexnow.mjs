// Pings the IndexNow protocol (used by Bing, Yandex, DuckDuckGo -- not
// Google, which has no equivalent instant-submit API) so the current set of
// URLs gets re-crawled promptly instead of waiting for the next scheduled
// crawl. Worth doing specifically because ChatGPT Search uses Bing's index
// for its web results -- a page Bing hasn't indexed can't surface there,
// independent of the separate JS-rendering problem the prerender step
// solves.
//
// Runs as a "postdeploy" script (npm auto-runs post<name> after any script,
// not just built-ins) so it only fires once the new build is actually live
// at the real URL -- submitting before that would announce pages that
// 404 at fetch time.
//
// Usage: node scripts/submit-indexnow.mjs
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const HOST = 'etorgroups.github.io'
const KEY = 'c92f2a38814dc27bdf28f0259939eba0'
const KEY_LOCATION = `https://${HOST}/Etor-website/${KEY}.txt`

async function getUrlsFromSitemap() {
  const xml = await readFile(path.join(ROOT, 'public', 'sitemap.xml'), 'utf-8')
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  return matches.map((m) => m[1])
}

async function run() {
  const urlList = await getUrlsFromSitemap()
  console.log(`[indexnow] submitting ${urlList.length} URLs...`)

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  })

  // IndexNow returns 200 (or 202) on success, with an empty body -- there's
  // nothing more informative to parse out of a successful response.
  if (res.ok) {
    console.log(`[indexnow] submitted OK (status ${res.status})`)
  } else {
    console.error(`[indexnow] submission failed: ${res.status} ${res.statusText}`)
    const body = await res.text().catch(() => '')
    if (body) console.error(body)
    process.exitCode = 1
  }
}

run().catch((err) => {
  console.error('[indexnow] error:', err)
  process.exitCode = 1
})
