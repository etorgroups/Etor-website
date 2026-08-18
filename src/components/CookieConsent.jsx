import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getCookieConsent, setCookieConsent } from '../lib/cookieConsent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getCookieConsent()) {
      const timer = setTimeout(() => setVisible(true), 900)
      return () => clearTimeout(timer)
    }
  }, [])

  // Now anchored bottom-left (ContactFab owns bottom-right, ExploreNowTab
  // owns the right edge), so this no longer geometrically overlaps either —
  // kept as a defensive signal in case a future layout change reintroduces it.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('cookie-banner:toggle', { detail: visible }))
  }, [visible])

  const choose = (value) => {
    setCookieConsent(value)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-50 w-[calc(100%-1.5rem)] max-w-[15rem] sm:max-w-fit surface-panel rounded-2xl sm:rounded-full p-sm sm:py-xs sm:pl-md sm:pr-xs shadow-2xl sm:flex sm:items-center sm:gap-sm"
        >
          <p className="font-body text-[12px] sm:text-[12px] text-on-surface-variant leading-snug sm:whitespace-nowrap">
            We use minimal cookies. See{' '}
            <Link to="/privacy" className="text-secondary underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex gap-xs mt-sm sm:mt-0 shrink-0">
            <button
              type="button"
              onClick={() => choose('accepted')}
              className="flex-1 sm:flex-initial px-sm py-xs rounded-full bg-secondary text-on-secondary font-body text-[11px] uppercase tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose('declined')}
              className="flex-1 sm:flex-initial px-sm py-xs rounded-full border border-outline-variant text-on-surface-variant font-body text-[11px] uppercase tracking-widest hover:bg-surface-container transition-colors whitespace-nowrap"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
