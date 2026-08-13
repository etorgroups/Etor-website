import { useEffect, useState } from 'react'
import { getPreferredTheme, toggleTheme } from '../lib/theme'

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => (typeof document !== 'undefined' ? document.documentElement.dataset.theme : 'light'))

  useEffect(() => {
    setTheme(getPreferredTheme())
    const observer = new MutationObserver(() => setTheme(document.documentElement.dataset.theme))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={(event) => toggleTheme(event)}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors ${className}`}
    >
      <span className="material-symbols-outlined text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
    </button>
  )
}
