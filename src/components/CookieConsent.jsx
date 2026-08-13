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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[42rem] surface-panel rounded-xl px-md py-sm flex flex-col sm:flex-row sm:items-center gap-sm"
        >
          <p className="font-body text-body-sm text-on-surface-variant leading-relaxed sm:flex-1">
            We use a minimal set of cookies to run this site and understand how it's used. See our{' '}
            <Link to="/privacy" className="text-secondary underline underline-offset-2">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
          <div className="flex gap-xs shrink-0">
            <button
              type="button"
              onClick={() => choose('accepted')}
              className="px-md py-xs rounded-full bg-secondary text-on-secondary font-body text-label-md uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose('declined')}
              className="px-md py-xs rounded-full border border-outline-variant text-on-surface-variant font-body text-label-md uppercase tracking-widest hover:bg-surface-container transition-colors"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
