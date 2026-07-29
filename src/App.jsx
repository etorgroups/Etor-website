import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import SkipLink from './components/SkipLink'
import ScrollProgress from './components/ScrollProgress'
import ContactFab from './components/ContactFab'
import TawkWidget from './components/TawkWidget'
import CookieConsent from './components/CookieConsent'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
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
        <TawkWidget />
        <CookieConsent />
      </BrowserRouter>
    </MotionConfig>
  )
}
