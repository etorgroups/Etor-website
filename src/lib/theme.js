const STORAGE_KEY = 'etor-theme'

export function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function getPreferredTheme() {
  return getStoredTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode, quota) — theme still applies for this session.
  }
}

// Toggles light/dark with a circular reveal centered on the click, via the
// View Transitions API where supported; falls back to an instant swap.
export function toggleTheme(originEvent) {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!document.startViewTransition || prefersReducedMotion) {
    applyTheme(next)
    return
  }

  const x = originEvent?.clientX ?? window.innerWidth / 2
  const y = originEvent?.clientY ?? window.innerHeight / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const transition = document.startViewTransition(() => applyTheme(next))
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 550, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  })
}
