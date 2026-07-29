// EmailJS config — sends form emails straight from the browser, no backend
// required.
//
// To activate:
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (Gmail, Outlook, etc.) under Email Services —
//    copy its Service ID below.
// 3. Create two Email Templates under Email Templates:
//    - one for the Contact page form (fields: name, email, phone, subject, message)
//    - one for the Footer newsletter signup (field: email)
//    Copy each Template ID below.
// 4. Under Account > General, copy your Public Key below.
//
// Until these are filled in, both forms fall back to a mailto: link so
// submissions are never silently lost.
export const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'
export const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'
export const EMAILJS_CONTACT_TEMPLATE_ID = 'YOUR_CONTACT_TEMPLATE_ID'
export const EMAILJS_NEWSLETTER_TEMPLATE_ID = 'YOUR_NEWSLETTER_TEMPLATE_ID'

export const isEmailjsConfigured =
  EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
  EMAILJS_SERVICE_ID !== 'YOUR_EMAILJS_SERVICE_ID'
