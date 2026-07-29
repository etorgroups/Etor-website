import { chromium } from 'playwright'

const BASE = 'http://localhost:5181'
const shotDir =
  'C:\\Users\\impac\\AppData\\Local\\Temp\\claude\\C--Users-impac-Downloads-etorGropWeb\\e284acb8-410d-4793-bf81-db54f90f7a67\\scratchpad\\audit'
import { mkdirSync } from 'fs'
mkdirSync(shotDir, { recursive: true })

const PAGES = ['/', '/about', '/services', '/projects', '/contact']
const errors = []

const browser = await chromium.launch()

for (const viewport of [{ name: 'mobile', width: 390, height: 844 }, { name: 'desktop', width: 1440, height: 900 }]) {
  const page = await browser.newPage({ viewport })
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`${viewport.name} ${page.url()}: ${msg.text()}`) })
  page.on('pageerror', (err) => errors.push(`${viewport.name} ${page.url()}: ${err.message}`))

  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)

    // check horizontal overflow
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    if (overflow) errors.push(`${viewport.name} ${path}: HORIZONTAL OVERFLOW detected`)

    const scrollHeight = await page.evaluate(() => document.body.scrollHeight)
    const shots = Math.ceil(scrollHeight / viewport.height)
    const name = path === '/' ? 'home' : path.slice(1)

    for (let i = 0; i < shots; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * viewport.height)
      await page.waitForTimeout(500)
      await page.screenshot({ path: `${shotDir}\\${viewport.name}-${name}-${i}.png` })
    }
  }
  await page.close()
}

await browser.close()
console.log('ERRORS:', JSON.stringify(errors, null, 2))
console.log('DONE')
