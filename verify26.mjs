import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto('http://localhost:5189/projects', { waitUntil: 'networkidle' })
await page.click('button:has-text("Accept")', { timeout: 5000 }).catch(() => {})
await page.locator('text=See Your Cashback Timeline').scrollIntoViewIfNeeded()
await page.evaluate(() => window.scrollBy(0, 250))
await page.waitForTimeout(700)
await page.screenshot({
  path: 'C:\\Users\\impac\\AppData\\Local\\Temp\\claude\\C--Users-impac-Downloads-etorGropWeb\\e284acb8-410d-4793-bf81-db54f90f7a67\\scratchpad\\calc\\6-calculator-mobile-card.png',
})
await browser.close()
