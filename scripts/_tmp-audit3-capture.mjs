import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const BASE = 'http://localhost:5177/EtorGrops-website'
const OUT = path.join('scripts', '_tmp-audit3-shots')
fs.mkdirSync(OUT, { recursive: true })

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
}

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    document.documentElement.dataset.theme = t
    localStorage.setItem('etor-theme', t)
  }, theme)
  await page.waitForTimeout(300)
}

async function checkBrokenImages(page) {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .filter((img) => img.naturalWidth === 0 && img.src)
      .map((img) => img.src)
  })
}

async function capturePage(browser, { name, path: routePath, viewport, theme }) {
  const context = await browser.newContext({ viewport: VIEWPORTS[viewport] })
  const page = await context.newPage()
  const consoleErrors = []
  const pageErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => pageErrors.push(String(err)))

  const url = `${BASE}${routePath}`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  if (theme === 'dark') await setTheme(page, 'dark')
  await page.waitForTimeout(800)

  // Scroll through the whole page first (twice) so framer-motion's
  // whileInView reveals actually fire — Playwright's fullPage screenshot
  // captures beyond-viewport content without dispatching real scroll/
  // intersection events, so anything below the fold would otherwise render
  // as invisible (opacity:0) blank space that isn't representative of what
  // a real user sees. Uses small steps + real wheel events (not scrollTo
  // teleports) since IntersectionObserver needs an actual paint at each
  // intermediate position to fire.
  for (let pass = 0; pass < 2; pass++) {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(150)
    let lastHeight = 0
    for (let i = 0; i < 200; i++) {
      await page.mouse.wheel(0, 350)
      await page.waitForTimeout(90)
      const height = await page.evaluate(() => document.body.scrollHeight)
      const atBottom = await page.evaluate(
        () => window.scrollY + window.innerHeight >= document.body.scrollHeight - 2
      )
      if (atBottom && height === lastHeight) break
      lastHeight = height
    }
    await page.waitForTimeout(250)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)

  const stillHidden = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*')).filter((el) => {
      const style = getComputedStyle(el)
      if (style.opacity !== '0') return false
      const rect = el.getBoundingClientRect()
      return rect.width > 40 && rect.height > 40
    }).length
  })
  if (stillHidden) console.log(`WARNING: ${stillHidden} large elements still opacity:0 after scroll-through`)

  const broken = await checkBrokenImages(page)
  const fileName = `${name}-${theme}-${viewport}.png`
  await page.screenshot({ path: path.join(OUT, fileName), fullPage: true })

  console.log(`\n=== ${fileName} (${url}) ===`)
  if (consoleErrors.length) console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors))
  if (pageErrors.length) console.log('PAGE ERRORS:', JSON.stringify(pageErrors))
  if (broken.length) console.log('BROKEN IMAGES:', JSON.stringify(broken))
  if (!consoleErrors.length && !pageErrors.length && !broken.length) console.log('clean')

  await context.close()
}

const PAGES = [
  { name: 'services', path: '/services' },
  { name: 'other-ventures', path: '/other-ventures' },
  { name: 'projects', path: '/projects' },
  { name: 'layouts-city1', path: '/projects/city-1/layouts' },
  { name: 'layouts-city2', path: '/projects/city-2/layouts' },
]

async function main() {
  const browser = await chromium.launch()
  for (const p of PAGES) {
    for (const theme of ['light', 'dark']) {
      for (const viewport of ['desktop', 'mobile']) {
        await capturePage(browser, { ...p, theme, viewport })
      }
    }
  }
  await browser.close()
  console.log('\nDONE part 3 general audit captures')
}

main()
