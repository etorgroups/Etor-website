import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// Slice each full-page screenshot into N vertical chunks (with small overlap)
// using an in-browser canvas, so we can Read each chunk at native resolution.
const jobs = [
  { file: 'scripts/_tmp-audit2-home-light-desktop.png', slices: 6 },
  { file: 'scripts/_tmp-audit2-home-dark-desktop.png', slices: 6 },
  { file: 'scripts/_tmp-audit2-about-light-desktop.png', slices: 5 },
  { file: 'scripts/_tmp-audit2-about-dark-desktop.png', slices: 5 },
  { file: 'scripts/_tmp-audit2-home-light-mobile.png', slices: 5 },
  { file: 'scripts/_tmp-audit2-home-dark-mobile.png', slices: 5 },
  { file: 'scripts/_tmp-audit2-about-light-mobile.png', slices: 4 },
  { file: 'scripts/_tmp-audit2-about-dark-mobile.png', slices: 4 },
];

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const job of jobs) {
    const abs = path.resolve(job.file);
    const buf = fs.readFileSync(abs);
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    const base64 = buf.toString('base64');

    const overlapFrac = 0.06; // 6% overlap between consecutive slices
    const rawSliceHeight = height / job.slices;
    const overlap = Math.round(rawSliceHeight * overlapFrac);

    await page.setViewportSize({ width: Math.min(width, 2000), height: 200 });
    await page.setContent(`<html><body style="margin:0"><img id="src" src="data:image/png;base64,${base64}" /><canvas id="c"></canvas></body></html>`);
    await page.waitForFunction(() => {
      const img = document.getElementById('src');
      return img.complete && img.naturalWidth > 0;
    });

    const basename = path.basename(job.file, '.png');
    for (let i = 0; i < job.slices; i++) {
      const sy = Math.max(0, Math.round(i * rawSliceHeight) - (i > 0 ? overlap : 0));
      const sh = Math.min(height - sy, Math.round(rawSliceHeight) + (i > 0 ? overlap : 0));
      const dataUrl = await page.evaluate(({ sy, sh, width }) => {
        const img = document.getElementById('src');
        const canvas = document.getElementById('c');
        canvas.width = width;
        canvas.height = sh;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, sy, width, sh, 0, 0, width, sh);
        return canvas.toDataURL('image/png');
      }, { sy, sh, width });
      const outBuf = Buffer.from(dataUrl.split(',')[1], 'base64');
      const outPath = `scripts/${basename}-slice${String(i + 1).padStart(2, '0')}-y${sy}.png`;
      fs.writeFileSync(outPath, outBuf);
      console.log(outPath);
    }
  }

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
