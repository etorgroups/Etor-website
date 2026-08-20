// Best-effort Chromium download for scripts/prerender.mjs, run as a
// postinstall hook so it works the same on any host (Windows dev machine,
// Vercel/Linux build container, etc.) without relying on shell-specific
// "|| true" syntax, which cmd.exe doesn't support the way POSIX shells do.
// Never fails npm install if this doesn't succeed -- prerender.mjs itself
// degrades gracefully (skips prerendering, doesn't fail the build) when the
// browser isn't available, so a failed download here is a lost SEO nicety,
// not a broken deploy.
import { spawnSync } from 'node:child_process'

const result = spawnSync('npx', ['playwright', 'install', 'chromium'], {
  stdio: 'inherit',
  shell: true,
})

if (result.status !== 0) {
  console.warn('[postinstall] Playwright Chromium download failed or was skipped -- prerendering will be skipped at build time, everything else is unaffected.')
}

process.exit(0)
