import { chromium } from 'playwright'

const browser = await chromium.launch()
const errors = []

async function checkPage(url, label, actions) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })
  page.on('pageerror', (err) => errors.push(`[${label}] ${err.message}`))
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`[${label}] ${msg.text()}`) })
  await page.goto(url, { waitUntil: 'networkidle' })
  try { await page.click('text=Decline', { timeout: 1000 }) } catch {}
  await actions(page)
  await page.close()
}

const BASE = 'http://localhost:5175/EtorGrops-website'

// 1. Home.jsx new section
await checkPage(`${BASE}/`, 'home', async (page) => {
  const section = page.locator('text=We manage your plot for 33 years')
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(2500) // let Counter animate (2s) + Reveal settle
  await page.screenshot({ path: 'scripts/33yr-home-section.png' })

  const counterText = await page.locator('text=/\\d+ Years/').first().textContent()
  console.log('Home counter text (final, should be "33 Years"):', counterText)

  // check amenity bullet trimmed — target the amenity grid specifically
  await page.locator('h3:has-text("Safety & infrastructure")').scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  const amenityText = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('li'))
    const match = items.find((li) => li.textContent.includes('Spot registration'))
    return match ? match.textContent : null
  })
  console.log('Amenity bullet text (should be just "Spot registration"):', amenityText)
  await page.screenshot({ path: 'scripts/33yr-home-amenities.png' })
})

// 2. Services.jsx hero
await checkPage(`${BASE}/services`, 'services', async (page) => {
  await page.waitForTimeout(800)
  await page.screenshot({ path: 'scripts/33yr-services-hero.png' })
})

// 3. LayoutPlots.jsx
await checkPage(`${BASE}/projects/city-1/main/plots`, 'layoutplots', async (page) => {
  await page.waitForTimeout(800)
  await page.screenshot({ path: 'scripts/33yr-layoutplots.png' })
  const link = page.locator('a:has-text("See dairy & plantation tiers")')
  console.log('LayoutPlots link href:', await link.getAttribute('href'))
})

// 4. Projects.jsx perks
await checkPage(`${BASE}/projects`, 'projects', async (page) => {
  const perk = page.locator('text=100% Free Maintenance')
  await perk.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  console.log('Projects perk text:', await perk.textContent())
  await page.screenshot({ path: 'scripts/33yr-projects.png' })
})

// 5. About.jsx WHY_CHOOSE_US
await checkPage(`${BASE}/about`, 'about', async (page) => {
  const item = page.locator('text=33-Year Managed Plots')
  await item.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'scripts/33yr-about.png' })
})

console.log('Errors:', errors)
await browser.close()
