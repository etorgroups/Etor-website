import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import MagneticButton from '../components/MagneticButton'
import KineticHeadline from '../components/KineticHeadline'
import MaskReveal from '../components/MaskReveal'
import Accordion from '../components/Accordion'
import Disclosure from '../components/Disclosure'
import SocialIcon from '../components/SocialIcon'
import { COMPANY } from '../data/company'
import { WHATSAPP_URL } from '../data/whatsapp'
import { publicUrl } from '../lib/basePath'
import { FAQ } from '../data/faq'
import {
  EMAILJS_CONTACT_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  isEmailjsConfigured,
} from '../data/emailjs'

const SUBJECTS = ['Investment Enquiry', 'Partnership Proposal', 'Media & Press', 'Careers', 'General Support']

const initialForm = { name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' }

export default function Contact() {
  const location = useLocation()
  const plotEnquiry = location.state?.plotEnquiry
  const packageEnquiry = location.state?.packageEnquiry
  const [form, setForm] = useState(() => {
    if (plotEnquiry) {
      return {
        ...initialForm,
        message: `I'm interested in Plot ${plotEnquiry.plotNumber} (${plotEnquiry.block}) in ${plotEnquiry.city} — ${plotEnquiry.sizeSqYd} sq.yd at ₹${plotEnquiry.pricePerSqYd}/sq.yd. Please share more details and next steps.`,
      }
    }
    if (packageEnquiry) {
      return {
        ...initialForm,
        message: `I'm interested in ${packageEnquiry.packageName} — ${packageEnquiry.area.toLocaleString('en-IN')} sq.yd at ₹${packageEnquiry.pricePerSqYd}/sq.yd (₹${Math.round(packageEnquiry.totalInvestment).toLocaleString('en-IN')} total). Based on the calculator, my estimated cashback is ₹${Math.round(packageEnquiry.monthlyCashback).toLocaleString('en-IN')}/month over ${packageEnquiry.cashbackMonths} months. Please share more details and next steps.`,
      }
    }
    return initialForm
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const mailtoFallback = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\nSubject: ${form.subject}\n\n${form.message}`
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      `[Website] ${form.subject}`,
    )}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isEmailjsConfigured) {
      // EmailJS not set up yet — never let a submission just vanish.
      mailtoFallback()
      setForm(initialForm)
      setStatus('fallback')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || 'Not provided',
          subject: form.subject,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setStatus('success')
      setForm(initialForm)
    } catch (error) {
      console.error('EmailJS send failed:', error)
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative py-xl bg-primary overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <Reveal tag="div" className="relative max-w-[48rem] mx-auto px-margin-mobile lg:px-xl text-center">
          <Eyebrow tone="dark">Let's Talk</Eyebrow>
          <KineticHeadline
            tag="h1"
            className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-primary mt-md mb-md"
          >
            Start a Conversation with <span className="text-secondary">ETOR Group</span>
          </KineticHeadline>
          <MaskReveal tag="p" className="font-body text-body-lg text-on-primary/70">
            Whether you're exploring an investment, a partnership, or just curious about our ventures, our team
            responds within one business day.
          </MaskReveal>
        </Reveal>
      </section>

      {/* Form + contact details */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-xl">
            <Reveal
              tag="div"
              x={-30}
              y={0}
              className="lg:col-span-3 surface-panel rounded-[1.25rem] p-lg lg:p-xl"
            >
              {status === 'success' && (
                <div className="mb-lg p-md rounded-xl bg-secondary/10 border border-secondary/30 flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary">check_circle</span>
                  <p className="font-body text-body-sm text-on-surface">
                    Thanks — your message has been received. Our team will reach out shortly.
                  </p>
                </div>
              )}

              {status === 'fallback' && (
                <div className="mb-lg p-md rounded-xl bg-secondary/10 border border-secondary/30 flex items-start gap-sm">
                  <span className="material-symbols-outlined text-secondary">mail</span>
                  <p className="font-body text-body-sm text-on-surface">
                    We've opened your email app with your message ready to send — just hit send there. If
                    nothing opened, email us directly at{' '}
                    <a href={`mailto:${COMPANY.email}`} className="underline">
                      {COMPANY.email}
                    </a>{' '}
                    or{' '}
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline">
                      message us on WhatsApp
                    </a>
                    .
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-lg p-md rounded-xl bg-error-container/40 border border-error/30 flex items-start gap-sm">
                  <span className="material-symbols-outlined text-error">error</span>
                  <p className="font-body text-body-sm text-on-error-container">
                    Something went wrong sending that. Please try again, or email us directly at{' '}
                    <a href={`mailto:${COMPANY.email}`} className="underline">
                      {COMPANY.email}
                    </a>
                    .
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <label className="flex flex-col gap-xs">
                    <span className="font-body text-label-md text-on-surface-variant uppercase tracking-widest">
                      Full Name
                    </span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="h-12 px-md rounded-md border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </label>
                  <label className="flex flex-col gap-xs">
                    <span className="font-body text-label-md text-on-surface-variant uppercase tracking-widest">
                      Email Address
                    </span>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder="jane@company.com"
                      className="h-12 px-md rounded-md border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <label className="flex flex-col gap-xs">
                    <span className="font-body text-label-md text-on-surface-variant uppercase tracking-widest">
                      Phone (optional)
                    </span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="+91 90000 00000"
                      className="h-12 px-md rounded-md border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </label>
                  <label className="flex flex-col gap-xs">
                    <span className="font-body text-label-md text-on-surface-variant uppercase tracking-widest">
                      Subject
                    </span>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="h-12 px-md rounded-md border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    >
                      {SUBJECTS.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-xs">
                  <span className="font-body text-label-md text-on-surface-variant uppercase tracking-widest">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us a little about what you're looking for..."
                    className="px-md py-sm rounded-md border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all resize-none"
                  />
                </label>

                <MagneticButton
                  as="button"
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest inline-flex justify-center items-center gap-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' && (
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  )}
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </MagneticButton>
                {!isEmailjsConfigured && (
                  <p className="font-body text-body-sm text-on-surface-variant">
                    (Opens your email app for now — live send-on-submit activates once EmailJS is connected.)
                  </p>
                )}
              </form>
            </Reveal>

            <Reveal tag="div" delay={0.15} x={30} y={0} className="lg:col-span-2 space-y-md">
              <div className="p-lg rounded-[1.5rem] bg-surface-container-low border border-outline-variant/20 hover:border-secondary/40 transition-colors">
                <div className="flex items-center gap-sm mb-md">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <h3 className="font-display text-headline-md text-on-surface">Visakhapatnam HQ</h3>
                </div>
                <p className="font-body text-body-sm text-on-surface-variant mb-md">
                  {COMPANY.addressLines.join(', ')}
                </p>
                <div className="space-y-xs">
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-sm font-body text-body-sm text-on-surface hover:text-secondary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
                    {COMPANY.phone}
                  </a>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="flex items-center gap-sm font-body text-body-sm text-on-surface hover:text-secondary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">mail</span>
                    {COMPANY.email}
                  </a>
                  <a
                    href={`https://${COMPANY.website}`}
                    className="flex items-center gap-sm font-body text-body-sm text-on-surface hover:text-secondary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">language</span>
                    {COMPANY.website}
                  </a>
                </div>
              </div>

              <div className="p-lg rounded-[1.5rem] bg-surface-container-low border border-outline-variant/20 space-y-sm">
                <p className="font-body text-label-md text-on-surface-variant uppercase tracking-widest mb-sm">
                  Prefer a faster answer?
                </p>
                <a
                  href={publicUrl('downloads/etor-city-master-plan.pdf')}
                  download
                  className="flex items-center gap-sm font-body text-body-sm text-on-surface hover:text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">download</span>
                  Download the Master Plan
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-sm font-body text-body-sm text-on-surface hover:text-secondary transition-colors"
                >
                  <SocialIcon name="whatsapp" className="w-[18px] h-[18px] text-secondary" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="p-lg rounded-[1.5rem] bg-primary text-on-primary">
                <p className="font-body text-label-md uppercase tracking-widest text-secondary mb-md">Follow Us</p>
                <div className="flex gap-md">
                  {COMPANY.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <SocialIcon name={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-display text-headline-xl text-on-surface mt-md mb-md">Frequently Asked Questions</h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              If you don't find your answer here, our team is happy to help directly.
            </p>
          </Reveal>

          <Reveal tag="div" className="max-w-[48rem] mx-auto surface-panel rounded-[1.25rem] p-md lg:p-lg">
            <Accordion items={FAQ} />
          </Reveal>
          <Disclosure className="text-center mt-lg max-w-[36rem] mx-auto">
            Cashback and return answers above describe programme terms as stated in ETOR Group's brochure, not
            guarantees. See{' '}
            <Link to="/terms" className="underline hover:text-secondary">
              Terms
            </Link>{' '}
            for full conditions.
          </Disclosure>
        </div>
      </section>
    </div>
  )
}
