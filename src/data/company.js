import { WHATSAPP_URL } from './whatsapp'

// Real company contact details — from Welcome-To-ETOR-GROUP.pdf, plus the
// verified social profiles ETOR Group provided directly.
export const COMPANY = {
  addressLines: ['AUDI Show Room Building, 3rd Floor', 'Resapuvanipalem, Maddilapalem', 'Visakhapatnam, Andhra Pradesh — 530013'],
  phone: '+91 9091929395',
  email: 'etorventure@gmail.com',
  website: 'www.etorgroup.com',
  foundedYear: 2014,
  // Placeholders — swap for the real registration numbers once issued. Kept
  // in this obviously-a-placeholder form (matching the YOUR_..._ID pattern
  // used for EmailJS/Tawk below) rather than a realistic-looking fake
  // number, since a fabricated RERA/CIN that looks real is a false
  // regulatory claim if it ever ships without being replaced.
  reraNumber: 'YOUR_RERA_NUMBER',
  cin: 'YOUR_CIN_NUMBER',
  // Gate flags so a page can hide the registration line entirely until real
  // numbers replace the placeholders above — same pattern as isTawkConfigured
  // / isEmailjsConfigured. Rendering "YOUR_RERA_NUMBER" live is a worse look
  // than omitting the line, so nothing should print these two raw.
  isReraConfigured: false,
  isCinConfigured: false,
  social: [
    { label: 'WhatsApp', icon: 'whatsapp', href: WHATSAPP_URL },
    { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=100093114993555' },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/etorcity_official/' },
  ],
}
