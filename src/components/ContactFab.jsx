import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SocialIcon from './SocialIcon'
import MagneticButton from './MagneticButton'
import { COMPANY } from '../data/company'
import { isTawkConfigured } from '../data/tawk'

const SPRING = { type: 'spring', stiffness: 300, damping: 22 }
const STAGGER_SPRING = { type: 'spring', stiffness: 260, damping: 20 }

const whatsappHref = `https://wa.me/${COMPANY.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
  "Hi ETOR Group, I'm interested in your investment opportunities.",
)}`

function openChat() {
  if (window.Tawk_API?.toggle) {
    window.Tawk_API.toggle()
  } else {
    // Tawk.to not configured yet — fall back to email so the button is
    // never a dead click. Remove this branch once src/data/tawk.js has a
    // real Property ID and the live widget takes over.
    window.location.href = `mailto:${COMPANY.email}`
  }
}

export default function ContactFab() {
  const [open, setOpen] = useState(false)
  const [nudgeVisible, setNudgeVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef(null)

  const items = [
    {
      key: 'chat',
      label: isTawkConfigured ? 'Live Chat' : 'Live Chat (email)',
      icon: 'chat',
      onClick: () => {
        openChat()
        setOpen(false)
      },
      className: 'bg-secondary text-on-secondary hover:opacity-90',
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp Us',
      icon: 'whatsapp',
      href: whatsappHref,
      className: 'bg-[#25D366] text-white hover:opacity-90',
    },
  ]

  // One-time greeting nudge, inviting a first click.
  useEffect(() => {
    const showTimer = setTimeout(() => setNudgeVisible(true), 2600)
    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!nudgeVisible) return
    const hideTimer = setTimeout(() => setNudgeVisible(false), 8000)
    return () => clearTimeout(hideTimer)
  }, [nudgeVisible])

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    function handlePointerDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false)
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-sm">
      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={{ open: { transition: { staggerChildren: 0.07 } }, closed: {} }}
            className="flex flex-col items-end gap-sm mb-sm"
          >
            {items.map((item) => {
              const Comp = item.href ? 'a' : 'button'
              return (
                <motion.div
                  key={item.key}
                  variants={{
                    closed: { opacity: 0, y: 16, scale: 0.85 },
                    open: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={STAGGER_SPRING}
                >
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Comp
                      {...(item.href
                        ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                        : { type: 'button' })}
                      onClick={item.onClick}
                      className={`flex items-center gap-sm pl-md pr-lg py-sm rounded-full shadow-xl font-body text-label-md whitespace-nowrap transition-opacity ${item.className}`}
                    >
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        {item.icon === 'whatsapp' ? (
                          <SocialIcon name="whatsapp" className="w-4 h-4" />
                        ) : (
                          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        )}
                      </span>
                      {item.label}
                    </Comp>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting nudge — appears once, invites a first click */}
      <AnimatePresence>
        {nudgeVisible && !open && (
          <motion.div
            role="button"
            tabIndex={0}
            onClick={() => {
              setNudgeVisible(false)
              setOpen(true)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setNudgeVisible(false)
                setOpen(true)
              }
            }}
            initial={{ opacity: 0, x: 16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.9 }}
            transition={STAGGER_SPRING}
            className="fixed bottom-9 right-24 w-[15rem] text-left bg-surface border border-outline-variant/30 rounded-2xl rounded-br-md shadow-2xl px-md py-sm cursor-pointer z-50"
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setNudgeVisible(false)
              }}
              aria-label="Dismiss"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-outline-variant text-surface flex items-center justify-center hover:bg-secondary"
            >
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
            <p className="font-body text-body-sm text-on-surface">Need help? Chat with us 👋</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {!open && !prefersReducedMotion && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full bg-secondary/50"
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-secondary/50"
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeOut', delay: 0.5 }}
            />
          </>
        )}

        <MagneticButton
          as="button"
          type="button"
          strength={0.4}
          onClick={() => {
            setNudgeVisible(false)
            setOpen((o) => !o)
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING, delay: 0.6 }}
          aria-label={open ? 'Close contact options' : 'Open contact options'}
          aria-expanded={open}
          className="relative w-14 h-14 rounded-full bg-surface/90 backdrop-blur-md border border-outline-variant/40 text-on-surface shadow-2xl flex items-center justify-center hover:bg-secondary hover:text-on-secondary hover:border-secondary transition-colors"
        >
          <motion.span
            animate={{ rotate: open ? 135 : 0 }}
            transition={SPRING}
            className="material-symbols-outlined text-[28px]"
          >
            add
          </motion.span>
        </MagneticButton>
      </div>
    </div>
  )
}
