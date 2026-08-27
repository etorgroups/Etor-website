import { chromium } from 'playwright';

const BASE = 'http://localhost:5177/EtorGrops-website';
const OUT = 'C:/Users/impac/Downloads/etorGropWeb/scripts/_tmp-audit4-shots';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
await page.evaluate(() => {}).catch(() => {});
await page.addInitScript(() => localStorage.removeItem('etor-cookie-consent'));
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

// wait for cookie banner (900ms)
await page.waitForSelector('[aria-label="Cookie consent"]', { timeout: 3000 }).catch((e) => console.log('cookie banner wait failed', e.message));
console.log('cookie banner appeared at', Date.now());

// wait for nudge bubble text
await page.waitForSelector('text=Need help? Chat with us', { timeout: 5000 }).catch((e) => console.log('nudge wait failed', e.message));
console.log('nudge appeared');
await page.waitForTimeout(200);

const data = await page.evaluate(() => {
  const cookie = document.querySelector('[aria-label="Cookie consent"]');
  const nudgeText = Array.from(document.querySelectorAll('p')).find((p) => p.textContent.includes('Need help'));
  const nudge = nudgeText ? nudgeText.closest('[role="button"]') : null;
  const fab = document.querySelector('button[aria-label="Open contact options"], button[aria-label="Close contact options"]');
  const r = (el) => el ? el.getBoundingClientRect() : null;
  return { cookie: r(cookie), nudge: r(nudge), fab: r(fab) };
});
console.log(JSON.stringify(data, null, 2));

await page.screenshot({ path: `${OUT}/08-nudge-plus-cookie-light.png` });
await page.screenshot({ path: `${OUT}/08-nudge-plus-cookie-light-crop.png`, clip: { x: 0, y: 550, width: 390, height: 294 } });

await context.close();
await browser.close();
