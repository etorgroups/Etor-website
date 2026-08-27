import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const BASE = 'http://localhost:5177/EtorGrops-website'
const OUT = path.join('scripts', '_tmp-audit3-shots')
fs.mkdirSync(OUT, { recursive: true })

const WIDTHS = [1000, 1023, 1024, 1050, 1079, 1080, 1100, 1200]

async function main() {
  const browser = await chromium.launch()
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 700 } })
    const page = await context.newPage()
    const consoleErrors = []
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
    await page.goto(`${BASE}/`, { waitUntil: 'load', timeout: 30000 })
    await page.waitForTimeout(1000)
    await page.screenshot({ path: path.join(OUT, `header-w${width}.png`), clip: { x: 0, y: 0, width, height: 90 } })

    // Also open the "Other ETOR apps" dropdown (if visible) to check it doesn't clip/overlap
    const appsBtn = page.getByLabel('Other ETOR apps')
    if (await appsBtn.isVisible().catch(() => false)) {
      await appsBtn.click()
      await page.waitForTimeout(250)
      await page.screenshot({ path: path.join(OUT, `header-w${width}-appsopen.png`), clip: { x: 0, y: 0, width, height: 320 } })
      await page.keyboard.press('Escape')
    }
    if (consoleErrors.length) console.log(`w=${width} console errors:`, consoleErrors)
    await context.close()
  }
  await browser.close()
  console.log('DONE header breakpoint captures')
}

main()
