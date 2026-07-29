import { useEffect } from 'react'
import { TAWK_PROPERTY_ID, TAWK_WIDGET_ID, isTawkConfigured } from '../data/tawk'
import { getCookieConsent, onCookieConsentChange } from '../lib/cookieConsent'

function loadTawk() {
  if (document.getElementById('tawk-script')) return

  window.Tawk_API = window.Tawk_API || {}
  window.Tawk_LoadStart = new Date()
  window.Tawk_API.onLoad = function () {
    window.Tawk_API.hideWidget()
  }

  const script = document.createElement('script')
  script.id = 'tawk-script'
  script.async = true
  script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`
  script.charset = 'UTF-8'
  script.setAttribute('crossorigin', '*')
  document.body.appendChild(script)
}

// Loads the real Tawk.to embed once a Property ID has been configured (see
// src/data/tawk.js) AND the visitor has accepted cookies — Tawk sets its own
// session cookies, so it waits on consent rather than loading unconditionally.
// Hides Tawk's own default floating bubble on load since ContactFab provides
// the trigger UI — opening/closing goes through window.Tawk_API instead.
export default function TawkWidget() {
  useEffect(() => {
    if (!isTawkConfigured) return

    if (getCookieConsent() === 'accepted') {
      loadTawk()
      return
    }

    return onCookieConsentChange((value) => {
      if (value === 'accepted') loadTawk()
    })
  }, [])

  return null
}
