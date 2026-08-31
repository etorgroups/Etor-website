import { chromium } from 'playwright';

const browser = await chromium.launch();
const routes = ['/calviq', '/stocklyte', '/farmyieldiq', '/healthvault'];

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 500 } });
  await page.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `scripts/_tmp-impacgo-${route.slice(1)}.png` });
  await page.close();
}
await browser.close();
console.log('done');
