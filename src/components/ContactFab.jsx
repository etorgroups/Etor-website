import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SocialIcon from './SocialIcon'
import MagneticButton from './MagneticButton'
import { COMPANY } from '../data/company'
import { isTawkConfigured } from '../data/tawk'
import { WHATSAPP_URL } from '../data/whatsapp'

const SPRING = { type: 'spring', stiffness: 300, damping: 22 }
const STAGGER_SPRING = { type: 'spring', stiffness: 260, damping: 20 }

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
  const [isScrolling, setIsScrolling] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false)
  const [nearTop, setNearTop] = useState(true)
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  // Header's mobile nav panel shares this button's z-index and renders
  // first, so with the header open this button must get out of the way
  // entirely rather than just receding, or it sits on top of the nav links.
  useEffect(() => {
    function handleNavToggle(event) {
      setNavOpen(event.detail)
      if (event.detail) setOpen(false)
    }
    window.addEventListener('mobile-nav:toggle', handleNavToggle)
    return () => window.removeEventListener('mobile-nav:toggle', handleNavToggle)
  }, [])

  // The cookie banner's bottom-right footprint overlaps this button's corner
  // on narrow viewports (both are fixed, both z-50) — same fix as navOpen.
  useEffect(() => {
    function handleCookieBannerToggle(event) {
      setCookieBannerOpen(event.detail)
      if (event.detail) setOpen(false)
    }
    window.addEventListener('cookie-banner:toggle', handleCookieBannerToggle)
    return () => window.removeEventListener('cookie-banner:toggle', handleCookieBannerToggle)
  }, [])

  // Being fixed to a screen corner means this button will inevitably pass
  // over whatever page content happens to scroll underneath it — a plot
  // detail, a disclosure note, anything. Rather than trying to carve out
  // padding around it in every section (which can't work for a fixed
  // element anyway, since the content under it changes with scroll
  // position), let it recede while the page is actively moving and return
  // once it settles — the same "don't fight the content" pattern most
  // mobile FABs use.
  //
  // It also stays off entirely for the first screen's worth of scroll on
  // any page — a hero is where a visitor is still reading the actual pitch
  // (headline, return figure, primary CTAs); a floating chat bubble
  // competing for the same corner there is clutter, not help, and on a
  // short mobile viewport with a tall hero it can literally sit on top of
  // a real button. It reappears once they've scrolled past that first
  // screen and are far enough in to plausibly want a shortcut to ask something.
  useEffect(() => {
    function handleScroll() {
      setIsScrolling(true)
      setNearTop(window.scrollY < window.innerHeight * 0.85)
      clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 220)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const recede = isScrolling && !open
  const forceHidden = navOpen || cookieBannerOpen || (nearTop && !open)

  const items = [
    {
      key: 'chat',
      label: isTawkConfigured ? 'Chat with Us' : 'Chat with Us (email)',
      icon: 'smart_toy',
      onClick: () => {
        openChat()
        setOpen(false)
      },
      buttonClassName: 'bg-secondary text-on-secondary hover:bg-secondary-container/90',
      iconClassName: 'bg-surface text-secondary',
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp Us',
      icon: 'whatsapp',
      href: WHATSAPP_URL,
      buttonClassName: 'bg-surface/95 text-on-surface hover:bg-surface',
      iconClassName: 'bg-[#25D366] text-white',
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
    <motion.div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-sm"
      animate={{ opacity: forceHidden ? 0 : recede ? 0.35 : 1, scale: forceHidden ? 0.85 : recede ? 0.85 : 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ pointerEvents: forceHidden || recede ? 'none' : 'auto' }}
    >
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
                      className={`group relative flex items-center gap-sm pl-md pr-lg py-sm rounded-full bg-surface/95 border border-white/10 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.32)] backdrop-blur-xl font-body text-label-md text-on-surface whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_-25px_rgba(14,165,233,0.22)] ${item.buttonClassName}`}
                    >
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-black/10 ring-1 ring-white/10 transition-all duration-200 ${item.iconClassName}`}>
                        {item.icon === 'whatsapp' ? (
                          <SocialIcon name="whatsapp" className="w-5 h-5" />
                        ) : (
                          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        )}
                      </span>
                      <span className="relative z-10">{item.label}</span>
                    </Comp>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting nudge — appears once, invites a first click. Also recedes
          while scrolling (same as the FAB button itself): a fixed bottom-right
          text card will inevitably land on top of whatever page content —
          a card, a plot map, a CTA — happens to be in that corner at the
          2.6s mark, so it only shows once the page is actually at rest. */}
      <AnimatePresence>
        {nudgeVisible && !open && !isScrolling && !forceHidden && (
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
              className="absolute inset-0 rounded-full bg-secondary/50 pointer-events-none"
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-secondary/50 pointer-events-none"
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeOut', delay: 0.5 }}
            />
          </>
        )}

        <MagneticButton
          as="button"
          type="button"
          strength={0.4}
          whileHover={{ scale: 1.08 }}
          onClick={() => {
            setNudgeVisible(false)
            setOpen((o) => !o)
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING, delay: 0.6 }}
          aria-label={open ? 'Close contact options' : 'Open contact options'}
          aria-expanded={open}
          className="relative w-16 h-16 rounded-full bg-secondary text-on-secondary border border-white/20 shadow-[0_32px_80px_-32px_rgba(134,86,45,0.45)] flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-[0_35px_100px_-30px_rgba(134,86,45,0.55)]"
        >
          {!prefersReducedMotion && (
            <motion.span
              className="absolute inset-0 rounded-full bg-white/15"
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.16, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <motion.span
            animate={{ rotate: open ? 135 : 0 }}
            transition={SPRING}
            className="relative material-symbols-outlined text-[30px] drop-shadow-[0_10px_20px_rgba(15,23,42,0.25)]"
          >
            add
          </motion.span>
        </MagneticButton>
      </div>
    </motion.div>
  )
}
