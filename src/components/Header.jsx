import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import coinLogo from '../assets/images/etor-coin-logo.webp'

// "Get In Touch" already routes to /contact, so a separate "Contact" nav
// link would just duplicate it — omitted here on purpose.
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
]

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
        scrolled ? 'bg-surface/80 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-outline-variant/20' : 'bg-surface/30'
      }`}
    >
      <div className="h-20 max-w-container-max mx-auto px-margin-mobile lg:px-xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-xs shrink-0">
          <img src={coinLogo} alt="ETOR Group" className="w-10 h-10 object-contain" />
          <span className="font-display text-headline-md tracking-tight text-primary">ETOR GROUP</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-lg">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-underline font-body text-label-md uppercase tracking-widest transition-colors ${
                  isActive ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-secondary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-md">
          <Link
            to="/contact"
            className="hidden sm:inline-flex px-md py-xs rounded-full bg-primary text-on-primary font-body text-label-md uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            Get In Touch
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-surface/95 backdrop-blur-xl border-t border-outline-variant/20"
          >
            <div className="flex flex-col px-margin-mobile py-md gap-xs">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `py-sm font-body text-label-md uppercase tracking-widest border-b border-outline-variant/20 last:border-b-0 ${
                      isActive ? 'text-secondary' : 'text-on-surface-variant'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="py-sm font-body text-label-md uppercase tracking-widest text-secondary"
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
