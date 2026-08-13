import { WHATSAPP_URL } from './whatsapp'

// Real company contact details — from Welcome-To-ETOR-GROUP.pdf, plus the
// verified social profiles ETOR Group provided directly.
export const COMPANY = {
  addressLines: ['AUDI Show Room Building, 3rd Floor', 'Resapuvanipalem, Maddilapalem', 'Visakhapatnam, Andhra Pradesh — 530013'],
  phone: '+91 9091929395',
  email: 'etorventure@gmail.com',
  website: 'www.etorgroup.com',
  foundedYear: 2014,
  social: [
    { label: 'WhatsApp', icon: 'whatsapp', href: WHATSAPP_URL },
    { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=100093114993555' },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/etorcity_official/' },
  ],
}
