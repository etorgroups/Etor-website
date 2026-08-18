import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import SkipLink from './components/SkipLink'
import ScrollProgress from './components/ScrollProgress'
import ContactFab from './components/ContactFab'
import ExploreNowTab from './components/ExploreNowTab'
import TawkWidget from './components/TawkWidget'
import Analytics from './components/Analytics'
import CookieConsent from './components/CookieConsent'
import SmoothScroll from './components/SmoothScroll'
import RouteCurtain from './components/RouteCurtain'

const CommandPalette = lazy(() => import('./components/CommandPalette'))

// cmdk pulls in its own chunk that's never needed for first paint — fetch it
// once the browser is idle rather than compete with critical-path JS.
function useDeferredMount() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200))
    const cancel = window.cancelIdleCallback || clearTimeout
    const id = schedule(() => setReady(true))
    return () => cancel(id)
  }, [])
  return ready
}

export default function App() {
  const paletteReady = useDeferredMount()

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename="/EtorGrops-website">
        <SmoothScroll>
          <RouteCurtain />
          {paletteReady && (
            <Suspense fallback={null}>
              <CommandPalette />
            </Suspense>
          )}
          <SkipLink />
          <ScrollProgress />
          <div className="flex flex-col min-h-screen bg-background text-on-background">
            <Header />
            <main id="main-content" className="flex-1 w-full pt-20 overflow-x-hidden">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
          <ContactFab />
          <ExploreNowTab />
          <TawkWidget />
          <Analytics />
          <CookieConsent />
        </SmoothScroll>
      </BrowserRouter>
    </MotionConfig>
  )
}
