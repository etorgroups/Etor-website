import { useEffect, useState } from 'react'
import { getCookieConsent, setCookieConsent, onCookieConsentChange } from '../lib/cookieConsent'

const ELFSIGHT_APP_CLASS = 'elfsight-app-4b051ef0-0ed3-4acf-9a67-9d2049ea5c10'

function loadElfsight() {
  if (document.getElementById('elfsight-platform-script')) return
  const script = document.createElement('script')
  script.id = 'elfsight-platform-script'
  script.src = 'https://elfsightcdn.com/platform.js'
  script.async = true
  document.body.appendChild(script)
}

// Live Google reviews widget (Elfsight), gated behind cookie consent like
// TawkWidget — the embed loads its own third-party script and sets cookies.
export default function GoogleReviews({ className = '' }) {
  const [consented, setConsented] = useState(() => getCookieConsent() === 'accepted')

  useEffect(() => {
    if (consented) {
      loadElfsight()
      return undefined
    }
    return onCookieConsentChange((value) => {
      if (value === 'accepted') {
        setConsented(true)
        loadElfsight()
      }
    })
  }, [consented])

  if (!consented) {
    return (
      <div className="text-center space-y-md">
        <p className="font-body text-body-sm text-on-surface-variant">
          Live Google reviews load once cookies are accepted.
        </p>
        <button
          type="button"
          onClick={() => {
            setCookieConsent('accepted')
            setConsented(true)
            loadElfsight()
          }}
          className="inline-flex items-center gap-xs px-md py-xs rounded-full bg-secondary text-on-secondary font-body text-label-md uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Accept & View Reviews
        </button>
      </div>
    )
  }

  return <div className={`${ELFSIGHT_APP_CLASS} ${className}`} data-elfsight-app-lazy />
}
