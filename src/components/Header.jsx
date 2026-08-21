import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import coinLogo from '../assets/images/etor-coin-logo.webp'
import ThemeToggle from './ThemeToggle'
import ScrambleText from './ScrambleText'
import { publicUrl } from '../lib/basePath'
import { CUSTOMER_LOGIN, COMPANY_APPS } from '../data/partnerApps'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'The Story', to: '/about' },
  { label: 'ETOR City', to: '/projects' },
  { label: 'Living Assets', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

// Cascade reveal for the mobile menu — the panel expands as one block, but
// each row fades/slides in a beat behind the last instead of all appearing
// at once. Reverses on close (staggerDirection: -1) so it collapses the
// same way it opened, just backwards.
const MENU_PANEL_VARIANTS = {
  closed: { opacity: 0, height: 0, transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  open: {
    opacity: 1,
    height: 'auto',
    transition: { staggerChildren: 0.045, delayChildren: 0.08 },
  },
}

// Play store modal removed per request — UI no longer shows Play badge/modal
function PlayStoreModal() {
  return null
}
const MENU_ROW_VARIANTS = {
  closed: { opacity: 0, y: 10 },
  open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
}

const MASTER_PLAN_URL = publicUrl('downloads/etor-city-master-plan.pdf')

const APP_MENU_VARIANTS = {
  closed: { opacity: 0, scale: 0.96, y: -6, transition: { duration: 0.15 } },
  open: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
}

// The customer login ("My Investment") stays its own big, unmissable button
// — that's the one link most visitors need, and it must never be one option
// among several. This is a deliberately small, visually secondary icon
// button beside it, for the minority of visitors (ETOR's own team) who
// specifically need FarmYieldIQ or CalviQ — same click-outside/Escape
// pattern as any other header menu.
function OtherAppsMenu({ className = '' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Other ETOR apps"
        title="Other ETOR apps"
        className="flex items-center justify-center w-9 h-9 rounded-full border border-outline-variant/40 hover:border-secondary/60 text-on-surface-variant hover:text-secondary-strong transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">apps</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={APP_MENU_VARIANTS}
            style={{ transformOrigin: 'top right' }}
            className="absolute right-0 mt-xs w-64 rounded-2xl bg-surface shadow-2xl border border-outline-variant/30 overflow-hidden py-xs"
          >
            <p className="px-md pt-xs pb-1.5 font-body text-[11px] uppercase tracking-widest text-on-surface-variant">
              Other ETOR apps
            </p>
            {COMPANY_APPS.map((app) => {
              let displayName = app.name
              if (app.name === 'FarmYieldIQ') displayName = 'EtorFarmYield'
              else if (app.name === 'CalviQ') displayName = 'Etor Dairy Farm'
              return (
                <a
                  key={app.name}
                  role="menuitem"
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-sm px-md py-sm hover:bg-surface-container-low transition-colors"
                >
                  <span>
                    <span className="block font-body text-label-md text-on-surface">{displayName}</span>
                    <span className="block font-body text-body-xs text-on-surface-variant">{app.description}</span>
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
                    arrow_outward
                  </span>
                </a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const { scrollY } = useScroll()
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Both the header's mobile nav panel and ContactFab are `z-50` — with a
  // tied z-index, DOM order decides the winner, and ContactFab renders
  // after Header in App.jsx, so it was painting on top of the open nav
  // panel. Tell it to hide itself instead of fighting over z-index.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobile-nav:toggle', { detail: menuOpen }))
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined

    // Toggling `overflow: hidden` on <html>/<body> is what the previous
    // version did, but that combination has long-standing bugs on real
    // mobile browsers where `position: fixed` children (the contact FAB)
    // can go invisible or stop receiving touches — it's a real, documented
    // WebKit/Chrome-mobile interaction, not something desktop testing or
    // Chromium/WebKit's desktop-emulated viewports reproduce. Locking scroll
    // by pinning <body> to `position: fixed` at its current offset avoids
    // that combination entirely and is the standard cross-browser-safe way
    // to do this.
    const { body } = document
    const savedScrollY = window.scrollY
    const previousPosition = body.style.position
    const previousTop = body.style.top
    const previousWidth = body.style.width

    body.style.position = 'fixed'
    body.style.top = `-${savedScrollY}px`
    body.style.width = '100%'
    window.dispatchEvent(new CustomEvent('lenis:pause'))

    return () => {
      body.style.position = previousPosition
      body.style.top = previousTop
      body.style.width = previousWidth
      window.scrollTo(0, savedScrollY)
      window.dispatchEvent(new CustomEvent('lenis:resume'))
    }
  }, [menuOpen])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastY.current
    if (latest < 120) {
      setHidden(false)
    } else if (delta > 4) {
      setHidden(true)
    } else if (delta < -4) {
      setHidden(false)
    }
    lastY.current = latest
  })

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <motion.header
      animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-colors duration-500 ${
        scrolled ? 'bg-surface/98 shadow-[0_8px_32px_rgba(28,25,22,0.08)] border-b border-outline-variant/45' : 'bg-surface/96 border-b border-outline-variant/25'
      }`}
    >
      <div className="h-20 max-w-container-max mx-auto px-margin-mobile lg:px-lg xl:px-xl flex items-center justify-between gap-md lg:gap-lg">
        <div className="flex items-center gap-md lg:gap-lg xl:gap-xl min-w-0">
        <Link to="/" className="flex items-center gap-xs shrink-0">
          <img src={coinLogo} alt="ETOR Group" className="w-10 h-10 object-contain" />
          <span className="font-display text-headline-md font-bold tracking-[-0.04em] text-on-surface whitespace-nowrap">ETOR GROUP</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-3 2xl:gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-underline whitespace-nowrap font-body text-[13px] 2xl:text-label-md uppercase tracking-wide 2xl:tracking-widest transition-colors ${
                  isActive ? 'text-secondary-strong font-bold' : 'text-on-surface-variant hover:text-secondary-strong'
                }`
              }
            >
              <ScrambleText text={link.label} />
            </NavLink>
          ))}
        </nav>
        </div>

        <div className="flex items-center gap-xs shrink-0">
          {/* <a
            href={MASTER_PLAN_URL}
            download
            aria-label="Download master plan"
            title="Download master plan"
            className="hidden xl:inline-flex items-center gap-xs px-sm py-xs rounded-full border border-outline-variant/40 hover:border-secondary/60 text-on-surface-variant hover:text-secondary-strong transition-colors font-body text-label-md uppercase tracking-widest whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
          </a> */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('command-palette:toggle'))}
            aria-label="Open quick navigation"
            className="hidden sm:flex lg:hidden min-[1080px]:flex! items-center gap-xs px-sm py-xs rounded-full border border-outline-variant/40 hover:border-secondary/60 text-on-surface-variant hover:text-secondary-strong transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <kbd className="hidden xl:inline font-body text-[10px] uppercase tracking-wider">⌘K</kbd>
          </button>
          <ThemeToggle className="hidden sm:flex" />
          <a
            href={CUSTOMER_LOGIN.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-xs ml-xs px-md py-xs rounded-full bg-primary text-on-primary font-body text-label-md uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            {CUSTOMER_LOGIN.label}
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </a>
          <OtherAppsMenu className="hidden sm:flex lg:hidden min-[1080px]:flex!" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              className="absolute w-5 h-[1.5px] bg-on-surface rounded-full"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 0 : -4 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute w-5 h-[1.5px] bg-on-surface rounded-full"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 0 : 4 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={MENU_PANEL_VARIANTS}
            className="lg:hidden overflow-hidden bg-surface/95 backdrop-blur-xl border-t border-outline-variant/20"
          >
            {/* The row list can now run longer than a short phone screen (nav
                links + login + two app rows + search + theme) — cap it to
                the space below the fixed header and let it scroll on its
                own, since body scroll is intentionally locked while this is
                open and would otherwise leave the bottom rows unreachable.
                data-lenis-prevent is required here, not optional styling —
                Lenis attaches its own touchmove/wheel listener at the
                document level, and once paused it calls preventDefault() on
                every such event UNLESS the target is inside an element
                carrying this attribute. Without it, real touch scrolling on
                this panel is silently swallowed even though the CSS
                (overflow-y-auto) is completely correct. */}
            <div
              data-lenis-prevent
              className="flex flex-col px-margin-mobile py-md max-h-[calc(100vh-5rem)] overflow-y-auto pb-24"
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.to} variants={MENU_ROW_VARIANTS}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block py-[1.35rem] font-body text-label-md uppercase tracking-widest border-b border-outline-variant/20 ${
                        isActive ? 'text-secondary-strong' : 'text-on-surface-variant'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.a
                variants={MENU_ROW_VARIANTS}
                href={CUSTOMER_LOGIN.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-xs mt-md px-md py-sm rounded-full bg-primary text-on-primary font-body text-label-md uppercase tracking-widest"
              >
                {CUSTOMER_LOGIN.label}
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </motion.a>
              <motion.p
                variants={MENU_ROW_VARIANTS}
                className="mt-md mb-xs font-body text-[11px] uppercase tracking-widest text-on-surface-variant"
              >
                Other ETOR apps
              </motion.p>
              {COMPANY_APPS.map((app) => {
                  let displayName = app.name
                  if (app.name === 'FarmYieldIQ') displayName = 'EtorFarmYield'
                  else if (app.name === 'CalviQ') displayName = 'Etor Dairy Farm'
                return (
                  <motion.a
                    key={app.name}
                    variants={MENU_ROW_VARIANTS}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-xs mb-xs px-md py-sm rounded-xl border border-outline-variant/40"
                  >
                    <span>
                      <span className="block font-body text-label-md text-on-surface">{displayName}</span>
                      <span className="block font-body text-body-xs text-on-surface-variant">{app.description}</span>
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
                      arrow_outward
                    </span>
                  </motion.a>
                )
              })}
              {/* <motion.a
                variants={MENU_ROW_VARIANTS}
                href={MASTER_PLAN_URL}
                download
                className="flex items-center justify-between py-[0.9rem]"
              >
                <span className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
                  Download Master Plan
                </span>
                <span className="material-symbols-outlined text-secondary-strong">download</span>
              </motion.a> */}
              {/* Play store CTA removed */}
              <motion.button
                variants={MENU_ROW_VARIANTS}
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('command-palette:toggle'))}
                className="flex items-center justify-between py-[0.9rem]"
              >
                <span className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
                  Quick Search
                </span>
                <span className="material-symbols-outlined text-secondary-strong">search</span>
              </motion.button>
              <motion.div variants={MENU_ROW_VARIANTS} className="flex items-center justify-between pt-[0.9rem]">
                <span className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
                  Theme
                </span>
                <ThemeToggle />
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* PlayStoreModal removed */}
    </motion.header>
  )
}
