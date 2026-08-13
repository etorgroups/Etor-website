import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from '../pages/Home'

const About = lazy(() => import('../pages/About'))
const Services = lazy(() => import('../pages/Services'))
const OtherVentures = lazy(() => import('../pages/OtherVentures'))
const Projects = lazy(() => import('../pages/Projects'))
const Layouts = lazy(() => import('../pages/Layouts'))
const LayoutPlots = lazy(() => import('../pages/LayoutPlots'))
const PlotMap = lazy(() => import('../pages/PlotMap'))
const Contact = lazy(() => import('../pages/Contact'))
const Privacy = lazy(() => import('../pages/Privacy'))
const Terms = lazy(() => import('../pages/Terms'))
const NotFound = lazy(() => import('../pages/NotFound'))

// Scrolls to top on every route change, except when the URL carries a hash
// (e.g. /contact#faq) — then it scrolls to that section instead. The target
// section lives inside a lazy-loaded page chunk that may not have mounted
// yet (fetch + parse + Suspense resolution + AnimatePresence's exit-before-
// enter "wait" mode can take longer than a few animation frames), so this
// watches the DOM for it to appear rather than polling a fixed budget.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return undefined
    }

    const scrollToTarget = () => {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
      return !!el
    }

    if (scrollToTarget()) return undefined

    const observer = new MutationObserver(() => {
      if (scrollToTarget()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true, subtree: true })
    const timeout = setTimeout(() => observer.disconnect(), 5000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [pathname, hash])
  return null
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.05 }}
    >
      {children}
    </motion.div>
  )
}

// Only reached on a cold load straight into a non-Home route (a bookmark or
// shared link) — client-side navigations are already hidden behind
// RouteCurtain's sweep by the time a lazy chunk would need to resolve.
function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="w-8 h-8 rounded-full border-2 border-secondary/30 border-t-secondary animate-spin" />
    </div>
  )
}

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/other-ventures" element={<PageWrapper><OtherVentures /></PageWrapper>} />
            <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
            <Route path="/projects/:cityId/layouts" element={<PageWrapper><Layouts /></PageWrapper>} />
            <Route path="/projects/:cityId/:layoutSlug/plots" element={<PageWrapper><LayoutPlots /></PageWrapper>} />
            <Route path="/projects/:cityId/plots" element={<PageWrapper><PlotMap /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}
