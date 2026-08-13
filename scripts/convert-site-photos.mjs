// Converts the client's real drone/site photos (C:\Users\impac\Downloads\
// EtorCitiesLayouts\etor cities images) into web-ready webp files, one set
// per city group. Re-run if the client adds more photos to that folder.
//
// Usage: node scripts/convert-site-photos.mjs
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { Image, createCanvas } from '@napi-rs/canvas'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SOURCE_DIR = 'C:\\Users\\impac\\Downloads\\EtorCitiesLayouts\\etor cities images'
const ASSETS_DIR = path.join(ROOT, 'src', 'assets', 'site-photos')

// Source folder name -> our city slug + output basename prefix.
const CITY_FOLDERS = [
  { folder: 'city1', city: 'city-1' },
  { folder: 'city2', city: 'city-2' },
  { folder: 'city3&4', city: 'city-3-4' },
]

const MAX_WIDTH = 1600

async function convertOne(srcPath, destPath) {
  const buf = await readFile(srcPath)
  const img = new Image()
  img.src = buf
  await img.decode()
  const scale = Math.min(1, MAX_WIDTH / img.width)
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)
  const canvas = createCanvas(w, h)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, w, h)
  await writeFile(destPath, canvas.toBuffer('image/webp', 88))
}

for (const { folder, city } of CITY_FOLDERS) {
  const srcDir = path.join(SOURCE_DIR, folder)
  const destDir = path.join(ASSETS_DIR, city)
  await mkdir(destDir, { recursive: true })

  const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f))
  process.stdout.write(`${city}: ${files.length} photo(s)\n`)

  let i = 1
  for (const file of files) {
    const destPath = path.join(destDir, `photo-${i}.webp`)
    await convertOne(path.join(srcDir, file), destPath)
    console.log(`  ${file} -> site-photos/${city}/photo-${i}.webp`)
    i += 1
  }
}

console.log('\nAll site photos converted.')
