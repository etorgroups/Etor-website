// Tiny shared helper so any component (Tawk widget, future analytics, etc.)
// can react to the cookie choice without polling localStorage directly.
const STORAGE_KEY = 'etor-cookie-consent'
const EVENT_NAME = 'etor-cookie-consent-changed'

export function getCookieConsent() {
  return localStorage.getItem(STORAGE_KEY)
}

export function setCookieConsent(value) {
  localStorage.setItem(STORAGE_KEY, value)
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }))
}

export function onCookieConsentChange(callback) {
  const handler = (event) => callback(event.detail)
  window.addEventListener(EVENT_NAME, handler)
  return () => window.removeEventListener(EVENT_NAME, handler)
}
