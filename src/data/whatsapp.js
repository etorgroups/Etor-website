// Single source of truth for ETOR's WhatsApp click-to-chat link, so the
// floating button, footer/contact social icons and the ContactFab menu all
// point at the same number and message instead of duplicating the URL.
export const WHATSAPP_NUMBER = '919000924524' // country code 91 + 9000924524, digits only for wa.me

const DEFAULT_MESSAGE = "Hi ETOR Group, I'd like to know more about ETOR City."

export function getWhatsappUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_URL = getWhatsappUrl()
