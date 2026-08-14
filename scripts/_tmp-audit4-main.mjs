import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:5177/EtorGrops-website';
const OUT = 'C:/Users/impac/Downloads/etorGropWeb/scripts/_tmp-audit4-shots';
fs.mkdirSync(OUT, { recursive: true });

const consoleLog = [];

function attachConsole(page, label) {
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleLog.push(`[${label}] console.${msg.type()}: ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => {
    consoleLog.push(`[${label}] pageerror: ${err.message}`);
  });
  page.on('requestfailed', (req) => {
    consoleLog.push(`[${label}] requestfailed: ${req.url()} ${req.failure()?.errorText}`);
  });
}

async function setDark(page) {
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('etor-theme', 'dark');
  });
  await page.waitForTimeout(300);
}

async function checkBrokenImages(page, label) {
  const broken = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .filter((img) => img.src && (!img.complete || img.naturalWidth === 0))
      .map((img) => img.src);
  });
  if (broken.length) {
    consoleLog.push(`[${label}] BROKEN IMAGES: ${JSON.stringify(broken)}`);
  }
}

const browser = await chromium.launch();

async function shot(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
}
async function shotFull(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
}

// ---------- 1. FAB vs CookieConsent overlap ----------
async function testFabCookieOverlap() {
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    attachConsole(page, `fab-cookie-${theme}`);
    // clear localStorage cookie consent before nav
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.removeItem('etor-cookie-consent'));
    if (theme === 'dark') await setDark(page);
    await page.reload({ waitUntil: 'networkidle' });
    if (theme === 'dark') await setDark(page);
    // capture right as banner slides in: at 900ms visible=true triggers, animation continues
    await page.waitForTimeout(1100);
    await shot(page, `01-fab-cookie-${theme}-mid-slide`);
    await page.waitForTimeout(600);
    await shot(page, `01-fab-cookie-${theme}-settled`);
    // Also capture with nudge bubble likely visible (nudge shows at 2600ms)
    await page.waitForTimeout(1500);
    await shot(page, `01-fab-cookie-${theme}-with-nudge`);
    await checkBrokenImages(page, `fab-cookie-${theme}`);
    await context.close();
  }
}

// ---------- 2. legal-prose strong / callout dark mode ----------
async function testLegalProse() {
  for (const route of ['/privacy', '/terms']) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      attachConsole(page, `legal-${route}-${theme}`);
      await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
      if (theme === 'dark') await setDark(page);
      await page.waitForTimeout(300);
      await shotFull(page, `02-legal-${route.replace('/', '')}-${theme}`);
      await checkBrokenImages(page, `legal-${route}-${theme}`);
      await context.close();
    }
  }
}

// ---------- 3. Header at exact widths ----------
async function testHeaderWidths() {
  for (const width of [1024, 1050, 1079, 1080]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      attachConsole(page, `header-${width}-${theme}`);
      await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
      if (theme === 'dark') await setDark(page);
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, 0));
      const header = await page.$('header');
      if (header) {
        await header.screenshot({ path: `${OUT}/03-header-${width}-${theme}.png` });
      } else {
        await shot(page, `03-header-${width}-${theme}-NOHEADER`);
      }
      await context.close();
    }
  }
}

// ---------- 4. Accordion dividers dark mode ----------
async function testAccordion() {
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
    const page = await context.newPage();
    attachConsole(page, `accordion-${theme}`);
    await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' });
    if (theme === 'dark') await setDark(page);
    await page.waitForTimeout(300);
    const faqHeading = await page.getByText('FAQ', { exact: true }).first();
    await faqHeading.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(200);
    await shot(page, `04-accordion-closed-${theme}`);
    // open one item to see open state divider/border too
    const firstQuestion = await page.locator('button[aria-expanded]').first();
    await firstQuestion.click().catch(() => {});
    await page.waitForTimeout(500);
    await shot(page, `04-accordion-open-${theme}`);
    await checkBrokenImages(page, `accordion-${theme}`);
    await context.close();
  }
}

// ---------- 5. General UX pass ----------
const pages5 = [
  { path: '/contact', name: 'contact' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' },
  { path: '/this-page-does-not-exist', name: '404' },
];
const viewports5 = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 390, height: 844, name: 'mobile' },
];

async function testGeneralPages() {
  for (const vp of viewports5) {
    for (const theme of ['light', 'dark']) {
      for (const pg of pages5) {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await context.newPage();
        attachConsole(page, `general-${pg.name}-${vp.name}-${theme}`);
        await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle' });
        await page.evaluate(() => localStorage.setItem('etor-cookie-consent', 'accepted')); // suppress banner for clean page shots
        if (theme === 'dark') await setDark(page);
        await page.reload({ waitUntil: 'networkidle' });
        if (theme === 'dark') await setDark(page);
        await page.waitForTimeout(400);
        await shotFull(page, `05-${pg.name}-${vp.name}-${theme}`);
        await checkBrokenImages(page, `general-${pg.name}-${vp.name}-${theme}`);
        await context.close();
      }
    }
  }
}

// ---------- 6. Global chrome: header, footer, FAB open, ExploreNow flyout + video, cookie banner, command palette ----------
async function testGlobalChrome() {
  for (const vp of viewports5) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();
      attachConsole(page, `chrome-${vp.name}-${theme}`);
      await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
      await page.evaluate(() => localStorage.setItem('etor-cookie-consent', 'accepted'));
      if (theme === 'dark') await setDark(page);
      await page.reload({ waitUntil: 'networkidle' });
      if (theme === 'dark') await setDark(page);
      await page.waitForTimeout(400);

      // header
      const header = await page.$('header');
      if (header) await header.screenshot({ path: `${OUT}/06-header-${vp.name}-${theme}.png` });

      // footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      const footer = await page.$('footer');
      if (footer) await footer.screenshot({ path: `${OUT}/06-footer-${vp.name}-${theme}.png` });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);

      // FAB open state
      const fabButton = await page.locator('button[aria-label="Open contact options"], button[aria-label="Close contact options"]').first();
      await fabButton.click({ timeout: 5000 }).catch((e) => consoleLog.push(`[chrome-${vp.name}-${theme}] FAB click failed: ${e.message}`));
      await page.waitForTimeout(500);
      await shot(page, `06-fab-open-${vp.name}-${theme}`);
      await fabButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(300);

      // Explore Now flyout (desktop only really but try both)
      const exploreBtn = await page.getByLabel('Open video menu').first();
      await exploreBtn.click({ timeout: 5000 }).catch((e) => consoleLog.push(`[chrome-${vp.name}-${theme}] explore click failed: ${e.message}`));
      await page.waitForTimeout(500);
      await shot(page, `06-explore-flyout-${vp.name}-${theme}`);
      // click first video
      const firstVideo = await page.locator('button[role="menuitem"]').first();
      await firstVideo.click({ timeout: 5000 }).catch((e) => consoleLog.push(`[chrome-${vp.name}-${theme}] video click failed: ${e.message}`));
      await page.waitForTimeout(700);
      await shot(page, `06-video-player-${vp.name}-${theme}`);
      // close video
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(300);

      // cookie banner - force show again by clearing consent then reload
      await page.evaluate(() => localStorage.removeItem('etor-cookie-consent'));
      await page.reload({ waitUntil: 'networkidle' });
      if (theme === 'dark') await setDark(page);
      await page.waitForTimeout(1300);
      await shot(page, `06-cookie-banner-${vp.name}-${theme}`);
      await page.evaluate(() => localStorage.setItem('etor-cookie-consent', 'accepted'));

      // command palette via Ctrl+K
      await page.keyboard.press('Control+k').catch(() => {});
      await page.waitForTimeout(500);
      await shot(page, `06-cmdk-${vp.name}-${theme}`);
      await page.keyboard.press('Escape').catch(() => {});

      await checkBrokenImages(page, `chrome-${vp.name}-${theme}`);
      await context.close();
    }
  }
}

await testFabCookieOverlap();
await testLegalProse();
await testHeaderWidths();
await testAccordion();
await testGeneralPages();
await testGlobalChrome();

await browser.close();

fs.writeFileSync(`${OUT}/console-log.txt`, consoleLog.join('\n'));
console.log('DONE. Console log entries:', consoleLog.length);
console.log(consoleLog.join('\n'));
