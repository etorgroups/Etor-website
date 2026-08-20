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
export const EMAILJS_PUBLIC_KEY = 'K9gY7NbQJzDRXX05B'
export const EMAILJS_SERVICE_ID = 'service_pw2fn2o'
export const EMAILJS_CONTACT_TEMPLATE_ID = 'template_pjnpwea'
export const EMAILJS_NEWSLETTER_TEMPLATE_ID = 'template_fej177n'

const hasCoreConfig =
  EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
  EMAILJS_SERVICE_ID !== 'YOUR_EMAILJS_SERVICE_ID'

// Split per-form so activating one template doesn't make the other form
// attempt a live send against a still-placeholder template ID (which would
// fail with an EmailJS API error instead of falling back to mailto).
export const isContactFormConfigured =
  hasCoreConfig && EMAILJS_CONTACT_TEMPLATE_ID !== 'YOUR_CONTACT_TEMPLATE_ID'

export const isNewsletterConfigured =
  hasCoreConfig && EMAILJS_NEWSLETTER_TEMPLATE_ID !== 'YOUR_NEWSLETTER_TEMPLATE_ID'
