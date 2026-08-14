import { chromium } from 'playwright';

const BASE = 'http://localhost:5177/EtorGrops-website/';
const pages = [
  { name: 'home', path: '' },
  { name: 'about', path: 'about' },
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];
const themes = ['light', 'dark'];

const AUDIT_FN = () => {
  function parseColor(str) {
    if (!str) return null;
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(',').map((s) => parseFloat(s.trim()));
    return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
  }
  function relLum({ r, g, b }) {
    const toLin = (c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const R = toLin(r), G = toLin(g), B = toLin(b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }
  function contrast(c1, c2) {
    const L1 = relLum(c1) + 0.05;
    const L2 = relLum(c2) + 0.05;
    return L1 > L2 ? L1 / L2 : L2 / L1;
  }
  function composite(fg, bg) {
    // fg over bg, both rgba, bg assumed opaque
    const a = fg.a;
    return {
      r: fg.r * a + bg.r * (1 - a),
      g: fg.g * a + bg.g * (1 - a),
      b: fg.b * a + bg.b * (1 - a),
    };
  }

  const results = [];
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    // only leaf-ish elements with direct non-whitespace text
    let hasDirectText = false;
    for (const node of el.childNodes) {
      if (node.nodeType === 3 && node.textContent.trim().length > 0) {
        hasDirectText = true;
        break;
      }
    }
    if (!hasDirectText) continue;
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    // skip offscreen far below (still capture, no limit needed since fullpage not required- but keep all)
    const fg = parseColor(style.color);
    if (!fg) continue;

    // walk up ancestors to find effective bg, tracking if a bg-image is encountered before an opaque bg-color
    let node2 = el;
    let bgImageSeen = false;
    let effBg = null;
    let hops = 0;
    while (node2 && hops < 12) {
      const s = node2 === el ? style : getComputedStyle(node2);
      const bgImg = s.backgroundImage;
      if (bgImg && bgImg !== 'none') bgImageSeen = true;
      const bg = parseColor(s.backgroundColor);
      if (bg && bg.a > 0.01) {
        if (bg.a >= 0.995) {
          effBg = bg;
          break;
        } else {
          // partially transparent bg-color; composite onto white as fallback approximation, keep walking to refine
          effBg = effBg ? composite(bg, effBg) : composite(bg, { r: 255, g: 255, b: 255 });
        }
      }
      node2 = node2.parentElement;
      hops++;
    }
    if (!effBg) {
      // fallback to body background
      const bodyBg = parseColor(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255 };
      effBg = bodyBg;
    }

    const fgOpaque = fg.a >= 0.995 ? fg : composite(fg, effBg);
    const ratio = contrast(fgOpaque, effBg);

    const fontSize = parseFloat(style.fontSize);
    const fontWeight = parseInt(style.fontWeight, 10) || 400;
    const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
    const threshold = isLarge ? 3.0 : 4.5;

    if (ratio < threshold) {
      const text = el.textContent.trim().slice(0, 80);
      results.push({
        text,
        tag: el.tagName,
        className: (el.className && el.className.toString) ? el.className.toString().slice(0, 200) : '',
        color: style.color,
        effBg: `rgb(${Math.round(effBg.r)},${Math.round(effBg.g)},${Math.round(effBg.b)})`,
        ratio: Math.round(ratio * 100) / 100,
        threshold,
        fontSize,
        fontWeight,
        bgImageSeen,
        rectTop: Math.round(rect.top + window.scrollY),
        rectLeft: Math.round(rect.left),
      });
    }
  }
  return results;
};

async function run() {
  const browser = await chromium.launch();
  const output = {};

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    for (const pg of pages) {
      const url = BASE + pg.path;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(800);
      for (const theme of themes) {
        await page.evaluate((t) => {
          document.documentElement.dataset.theme = t;
          localStorage.setItem('etor-theme', t);
        }, theme);
        await page.waitForTimeout(350);
        // scroll through to ensure lazy/animated content mounted, then back to top
        const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
        const steps = 8;
        for (let i = 0; i <= steps; i++) {
          await page.evaluate((y) => window.scrollTo(0, y), (scrollHeight / steps) * i);
          await page.waitForTimeout(120);
        }
        await page.waitForTimeout(300);

        const key = `${pg.name}-${theme}-${vp.name}`;
        const violations = await page.evaluate(AUDIT_FN);
        output[key] = violations;
        console.error(`${key}: ${violations.length} low-contrast text elements`);
      }
    }
    await context.close();
  }
  await browser.close();
  console.log(JSON.stringify(output, null, 2));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
