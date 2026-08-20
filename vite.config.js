import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this site under a /Etor-website/ subpath, but Vercel
// (which also deploys this repo) serves a project at the root of its own
// domain -- Vercel sets VERCEL=1 in its build environment automatically, so
// that alone is enough to pick the right base with no manual toggle.
const base = process.env.VERCEL ? '/' : '/Etor-website/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
})