import { useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import Reveal from './Reveal'
import SocialIcon from './SocialIcon'
import { COMPANY } from '../data/company'
import { COMPANY_APPS } from '../data/partnerApps'
import {
  EMAILJS_NEWSLETTER_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  isEmailjsConfigured,
} from '../data/emailjs'

// Every label here must point to real content — no "Careers" or "Media Kit"
// placeholders leading to a generic contact form, since that reads as a
// broken promise rather than a working link.
const QUICK_LINKS = [
  { label: 'The Story', to: '/about' },
  { label: 'Core Portfolio', to: '/projects' },
  { label: 'Living Assets', to: '/services' },
  { label: 'Other Ventures', to: '/other-ventures' },
]

const SUPPORT_LINKS = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Press Inquiries', to: '/contact' },
  { label: 'FAQ', to: '/contact#faq' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubscribe = async (event) => {
    event.preventDefault()
    if (!email) return

    if (!isEmailjsConfigured) {
      // EmailJS not set up yet — never let a signup just vanish.
      window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
        'Newsletter signup',
      )}&body=${encodeURIComponent(`Please add this address to the newsletter list: ${email}`)}`
      setEmail('')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NEWSLETTER_TEMPLATE_ID,
        { subscriber_email: email },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setStatus('success')
      setEmail('')
    } catch (error) {
      console.error('EmailJS newsletter send failed:', error)
      setStatus('error')
    }
  }

  return (
    <footer className="w-full bg-primary text-on-primary pt-xl pb-lg">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
        <Reveal tag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl mb-xl">
          <div className="space-y-md">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-secondary-fixed-dim text-headline-lg">hub</span>
              <span className="font-display text-headline-md text-on-primary">ETOR GROUP</span>
            </div>
            <p className="font-body text-body-sm text-on-primary-container max-w-[20rem]">
              A multi-venture organization across real estate, agriculture, gaming, forex, crypto and money
              management — engineering growth for our investors since {COMPANY.foundedYear}.
            </p>
            <div className="flex gap-md">
              {COMPANY.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="hover:text-secondary transition-colors"
                >
                  <SocialIcon name={s.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-md">
            <h4 className="font-display text-label-md uppercase tracking-widest text-secondary-fixed-dim">Quick Links</h4>
            <ul className="space-y-sm font-body text-body-sm text-on-primary-container">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-on-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-md">
            <h4 className="font-display text-label-md uppercase tracking-widest text-secondary-fixed-dim">Support</h4>
            <ul className="space-y-sm font-body text-body-sm text-on-primary-container">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-on-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-md">
            <h4 className="font-display text-label-md uppercase tracking-widest text-secondary-fixed-dim">Get In Touch</h4>
            <ul className="space-y-sm font-body text-body-sm text-on-primary-container">
              <li>{COMPANY.addressLines[0]}</li>
              <li>{COMPANY.addressLines[1]}</li>
              <li>{COMPANY.addressLines[2]}</li>
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-on-primary transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-on-primary transition-colors">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-xl">
          <div>
            <h4 className="font-display text-label-md uppercase tracking-widest text-secondary-fixed-dim mb-sm">Newsletter</h4>
            <p className="font-body text-body-sm text-on-primary-container mb-sm">Get the latest news & updates.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-sm max-w-[28rem]">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                placeholder="Email Address"
                className="flex-1 bg-on-primary/10 border border-on-primary/20 rounded-lg px-md py-sm focus:outline-none focus:border-secondary transition-colors text-body-sm"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-secondary text-on-secondary py-sm px-lg rounded-lg font-body text-label-md uppercase tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'success' ? 'Subscribed ✓' : status === 'sending' ? 'Sending…' : 'Subscribe'}
              </button>
            </form>
            {status === 'error' && (
              // Footer is always bg-primary (fixed dark ink in both themes), so this
              // needs a fixed light-on-dark color too — text-error-container would
              // flip to a dark maroon in dark mode and disappear against bg-primary.
              <p className="font-body text-body-sm mt-xs" style={{ color: '#ffdad6' }}>
                Couldn't subscribe — please try again shortly.
              </p>
            )}
          </div>
        </div>

        <div className="pt-lg border-t border-on-primary/10 flex flex-col md:flex-row justify-between items-center gap-md font-body text-body-sm text-on-primary-container">
          <div className="flex flex-col items-center md:items-start gap-xs text-center md:text-left">
            <span>
              © {COMPANY.foundedYear}–{new Date().getFullYear()} ETOR Group. All rights reserved.
            </span>
            {(COMPANY.isReraConfigured || COMPANY.isCinConfigured) && (
              <span className="text-[12px] text-on-primary-container/70">
                {COMPANY.isReraConfigured && `RERA Reg. No. ${COMPANY.reraNumber}`}
                {COMPANY.isReraConfigured && COMPANY.isCinConfigured && ' · '}
                {COMPANY.isCinConfigured && `CIN ${COMPANY.cin}`}
              </span>
            )}
          </div>
          <div className="flex items-center gap-md">
            {/* Internal/company-side tools — trained staff already know
                these by name, so they sit here quietly rather than
                competing with the "My Investment" login customers need. */}
            {COMPANY_APPS.map((app) => (
              <a
                key={app.name}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                title={app.description}
                className="hover:text-on-primary transition-colors"
              >
                {app.name}
              </a>
            ))}
            <a
              href={`https://${COMPANY.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-on-primary transition-colors"
            >
              {COMPANY.website}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
