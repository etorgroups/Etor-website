import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:5177/EtorGrops-website';
const OUT = 'C:/Users/impac/Downloads/etorGropWeb/scripts/_tmp-audit4-shots';

const browser = await chromium.launch();

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.removeItem('etor-cookie-consent'));
  if (theme === 'dark') {
    await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; localStorage.setItem('etor-theme', 'dark'); });
  }
  await page.reload({ waitUntil: 'networkidle' });
  if (theme === 'dark') {
    await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; localStorage.setItem('etor-theme', 'dark'); });
    await page.waitForTimeout(300);
  }

  // sample bounding boxes at several timestamps
  const samples = [];
  const start = Date.now();
  while (Date.now() - start < 4200) {
    const data = await page.evaluate(() => {
      const fab = document.querySelector('button[aria-label="Open contact options"], button[aria-label="Close contact options"]');
      const cookieRegion = document.querySelector('[aria-label="Cookie consent"]');
      const nudge = document.querySelector('[role="button"][tabindex="0"]');
      const r = (el) => el ? (() => { const b = el.getBoundingClientRect(); return { top: b.top, left: b.left, right: b.right, bottom: b.bottom, w: b.width, h: b.height }; })() : null;
      return { fab: r(fab), cookie: r(cookieRegion), nudge: r(nudge) };
    });
    samples.push({ t: Date.now() - start, ...data });
    await page.waitForTimeout(100);
  }

  function overlap(a, b) {
    if (!a || !b) return null;
    const xOverlap = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
    const yOverlap = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    return { xOverlap, yOverlap, overlapping: xOverlap > 0 && yOverlap > 0 };
  }

  console.log(`\n=== ${theme} ===`);
  for (const s of samples) {
    const ov = overlap(s.fab, s.cookie);
    const ovNudge = overlap(s.nudge, s.cookie);
    if (ov?.overlapping || ovNudge?.overlapping) {
      console.log(`t=${s.t}ms  FAB-vs-cookie overlap: ${JSON.stringify(ov)}  nudge-vs-cookie: ${JSON.stringify(ovNudge)}`);
      console.log(`   fab=${JSON.stringify(s.fab)} cookie=${JSON.stringify(s.cookie)} nudge=${JSON.stringify(s.nudge)}`);
    }
  }
  // final full overview at t~4200 with clip screenshot of bottom-right region
  await page.screenshot({ path: `${OUT}/07-overlap-region-${theme}.png`, clip: { x: 0, y: 600, width: 390, height: 244 } });

  await context.close();
}

await browser.close();
console.log('done');
