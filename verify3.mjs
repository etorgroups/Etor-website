import { chromium } from 'playwright'

const BASE = 'http://localhost:5176'
const shotDir =
  'C:\\Users\\impac\\AppData\\Local\\Temp\\claude\\C--Users-impac-Downloads-etorGropWeb\\e284acb8-410d-4793-bf81-db54f90f7a67\\scratchpad\\shots'

const errors = []
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
page.on('pageerror', (err) => errors.push(err.message))

// About: journey, leadership, values, why-choose-us
await page.goto(BASE + '/about', { waitUntil: 'networkidle' })
await page.waitForSelector('text=Years of')
await page.evaluate(() => window.scrollTo(0, 1500))
await page.waitForTimeout(1000)
await page.screenshot({ path: shotDir + '\\c1-about-journey.png' })

await page.evaluate(() => window.scrollTo(0, 2600))
await page.waitForTimeout(1000)
await page.screenshot({ path: shotDir + '\\c2-about-leadership.png' })

await page.evaluate(() => window.scrollTo(0, 3400))
await page.waitForTimeout(1000)
await page.screenshot({ path: shotDir + '\\c3-about-values.png' })

await page.evaluate(() => window.scrollTo(0, 4300))
await page.waitForTimeout(1000)
await page.screenshot({ path: shotDir + '\\c4-about-whychoose.png' })

// Contact: real info + FAQ
await page.goto(BASE + '/contact', { waitUntil: 'networkidle' })
await page.waitForSelector('text=Start a Conversation')
await page.waitForTimeout(800)
await page.screenshot({ path: shotDir + '\\c5-contact-info.png' })

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(800)
await page.click('text=Is investing with ETOR GROUP safe?')
await page.waitForTimeout(500)
await page.screenshot({ path: shotDir + '\\c6-contact-faq.png' })

// Services: invest steps + stats
await page.goto(BASE + '/services', { waitUntil: 'networkidle' })
await page.waitForSelector('text=Multi-Sector')
await page.evaluate(() => window.scrollTo(0, 3200))
await page.waitForTimeout(1000)
await page.screenshot({ path: shotDir + '\\c7-services-invest-steps.png' })

// Projects: perks + pricing
await page.goto(BASE + '/projects', { waitUntil: 'networkidle' })
await page.waitForSelector('text=Favourite')
await page.waitForTimeout(1200)
await page.screenshot({ path: shotDir + '\\c8-projects-cards.png' })
await page.evaluate(() => window.scrollTo(0, 1400))
await page.waitForTimeout(1000)
await page.screenshot({ path: shotDir + '\\c9-projects-perks.png' })

// Home: testimonials
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('text=Empowering Growth')
await page.evaluate(() => window.scrollTo(0, 3900))
await page.waitForTimeout(1000)
await page.screenshot({ path: shotDir + '\\c10-home-testimonials.png' })

// Footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(800)
await page.screenshot({ path: shotDir + '\\c11-footer.png' })

await browser.close()
console.log('ERRORS:', JSON.stringify(errors))
console.log('DONE')
