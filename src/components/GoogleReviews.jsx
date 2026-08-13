import { useEffect, useState } from 'react'
import { getCookieConsent, onCookieConsentChange } from '../lib/cookieConsent'

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
      <p className="font-body text-body-sm text-on-surface-variant text-center">
        Live Google reviews load once cookies are accepted.
      </p>
    )
  }

  return <div className={`${ELFSIGHT_APP_CLASS} ${className}`} data-elfsight-app-lazy />
}
