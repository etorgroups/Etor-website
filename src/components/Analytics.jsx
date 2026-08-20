import { useEffect } from 'react'
import {
  GA_MEASUREMENT_ID,
  CLARITY_PROJECT_ID,
  AHREFS_KEY,
  isGaConfigured,
  isClarityConfigured,
  isAhrefsConfigured,
} from '../data/analytics'
import { getCookieConsent, onCookieConsentChange } from '../lib/cookieConsent'

function loadGa() {
  if (document.getElementById('ga4-script')) return

  const script = document.createElement('script')
  script.id = 'ga4-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true })
}

function loadAhrefs() {
  if (document.getElementById('ahrefs-analytics')) return
  const script = document.createElement('script')
  script.id = 'ahrefs-analytics'
  script.src = 'https://analytics.ahrefs.com/analytics.js'
  script.dataset.key = AHREFS_KEY
  script.async = true
  document.head.appendChild(script)
}

function loadClarity() {
  if (window.clarity) return
  ;(function (c, l, a, r, i) {
    c[a] =
      c[a] ||
      function () {
        ;(c[a].q = c[a].q || []).push(arguments)
      }
    const t = l.createElement(r)
    t.async = 1
    t.src = 'https://www.clarity.ms/tag/' + i
    const y = l.getElementsByTagName(r)[0]
    y.parentNode.insertBefore(t, y)
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID)
}

// Loads GA4 + Microsoft Clarity + Ahrefs only once a real ID is configured
// (see src/data/analytics.js) AND the visitor has accepted cookies — same
// consent-gated pattern as TawkWidget, since all three set their own cookies.
export default function Analytics() {
  useEffect(() => {
    if (!isGaConfigured && !isClarityConfigured && !isAhrefsConfigured) return

    function loadAll() {
      if (isGaConfigured) loadGa()
      if (isClarityConfigured) loadClarity()
      if (isAhrefsConfigured) loadAhrefs()
    }

    if (getCookieConsent() === 'accepted') {
      loadAll()
      return undefined
    }

    return onCookieConsentChange((value) => {
      if (value === 'accepted') loadAll()
    })
  }, [])

  return null
}
