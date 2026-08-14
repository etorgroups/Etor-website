import { chromium } from 'playwright';

const BASE = 'http://localhost:5177/EtorGrops-website/';
const OUT = 'scripts';

const pages = [
  { name: 'home', path: '' },
  { name: 'about', path: 'about' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const themes = ['light', 'dark'];

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem('etor-theme', t);
  }, theme);
  await page.waitForTimeout(350);
}

async function gradualScrollThrough(page) {
  // Real wheel-event scrolling in small increments so IntersectionObserver
  // (framer-motion whileInView) fires naturally, same as a real user scrolling.
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  let scrolled = 0;
  const increment = 220;
  while (scrolled < scrollHeight + 1000) {
    await page.mouse.wheel(0, increment);
    scrolled += increment;
    await page.waitForTimeout(45);
  }
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
}

async function run() {
  const browser = await chromium.launch();
  const results = [];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    const consoleMsgs = [];
    page.on('console', (msg) => {
      if (['error', 'warning'].includes(msg.type())) {
        consoleMsgs.push(`[${msg.type()}] ${msg.text()}`);
      }
    });
    page.on('pageerror', (err) => {
      consoleMsgs.push(`[pageerror] ${err.message}`);
    });

    for (const pg of pages) {
      const url = BASE + pg.path;
      consoleMsgs.length = 0;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(800);

      for (const theme of themes) {
        await setTheme(page, theme);
        await gradualScrollThrough(page);

        const brokenImages = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs
            .filter((img) => img.complete && img.naturalWidth === 0)
            .map((img) => img.src || img.getAttribute('data-src') || '(no src)');
        });

        const shotPath = `${OUT}/_tmp-audit2-${pg.name}-${theme}-${vp.name}.png`;
        await page.screenshot({ path: shotPath, fullPage: true });

        results.push({
          page: pg.name,
          theme,
          viewport: vp.name,
          url,
          brokenImages,
          consoleMsgs: [...consoleMsgs],
        });
        consoleMsgs.length = 0;
      }
    }
    await context.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
