import { chromium } from 'playwright';

const BASE = 'http://localhost:5177/EtorGrops-website/about';

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/_tmp-audit2-check-about-mobile-top.png', fullPage: false });
  await browser.close();
}

run().catch((e) => { console.error(e); process.exit(1); });
