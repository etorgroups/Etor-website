import { chromium } from 'playwright';

const BASE = 'http://localhost:5177/EtorGrops-website';
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const failed = [];
page.on('response', (res) => {
  if (res.request().resourceType() === 'image' && !res.ok()) {
    failed.push(`${res.status()} ${res.url()}`);
  }
});

await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
// scroll through full page to trigger lazy loads
await page.evaluate(async () => {
  const step = 400;
  const height = document.body.scrollHeight;
  for (let y = 0; y < height; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1000);

const broken = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('img'))
    .filter((img) => img.src && (!img.complete || img.naturalWidth === 0))
    .map((img) => ({ src: img.src, loading: img.loading, alt: img.alt, rect: img.getBoundingClientRect() }));
});

console.log('Network failed image responses:', JSON.stringify(failed, null, 2));
console.log('Still broken after full-page scroll settle:', JSON.stringify(broken, null, 2));

await browser.close();
