import { useEffect } from 'react'
import { TAWK_PROPERTY_ID, TAWK_WIDGET_ID, isTawkConfigured } from '../data/tawk'
import { getCookieConsent, onCookieConsentChange } from '../lib/cookieConsent'

function loadTawk() {
  if (document.getElementById('tawk-script')) return

  window.Tawk_API = window.Tawk_API || {}
  window.Tawk_LoadStart = new Date()
  window.Tawk_API.onLoad = function () {
    window.Tawk_API.hideWidget()
    // The "Attention Grabber" sticker (Tawk dashboard: Chat Widget > Widget
    // Appearance > Attention Grabber) is a deliberately-persistent marketing
    // element — it animates in on its own delay, separate from the widget's
    // hidden/shown state, so one hideWidget() call at onLoad doesn't stop it
    // appearing a moment later. Re-assert hidden every 400ms for the window
    // it's known to animate in, then stop — this is a client-side mitigation
    // for a dashboard-level feature; turning Attention Grabber off in the
    // Tawk dashboard (Chat Widget > Widget Appearance) is the real fix and
    // makes this loop unnecessary, but this keeps the site clean either way.
    let ticks = 0
    const reassert = setInterval(() => {
      window.Tawk_API.hideWidget()
      ticks += 1
      if (ticks > 25) clearInterval(reassert)
    }, 400)
  }
  // Belt-and-suspenders: hideWidget() only hides the launcher icon, not a
  // dashboard-configured "Trigger" campaign auto-popping the chat window
  // open (this is what showed the default GDPR-consent message unprompted
  // on load — a stock trigger Tawk ships enabled by default on new
  // properties). onChatMaximized fires whenever the window opens for any
  // reason, including a trigger — but it ALSO fires for a real, wanted open
  // triggered by ContactFab's own "Chat with Us" button, so it can't just
  // force-close unconditionally. ContactFab sets window.__etorChatIntentional
  // right before it opens the chat itself; only the absence of that flag
  // means Tawk opened it on its own, which is what actually gets closed here.
  window.Tawk_API.onChatMaximized = function () {
    if (window.__etorChatIntentional) {
      window.__etorChatIntentional = false
      return
    }
    window.Tawk_API.minimize()
    window.Tawk_API.hideWidget()
  }
  // Once the visitor closes a chat they opened themselves, hide the launcher
  // again so ContactFab stays the single, deliberate entry point rather than
  // leaving Tawk's own bubble sitting on screen afterward.
  window.Tawk_API.onChatMinimized = function () {
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
