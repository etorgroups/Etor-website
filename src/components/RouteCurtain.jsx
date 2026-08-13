import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../lib/gsap'

// A brand-colored curtain that sweeps fully across the screen on every route
// change and back off again, so the actual page swap underneath (see
// AnimatedRoutes' near-instant PageWrapper fade) always happens while
// completely hidden — no cross-fade timing to get right, no flash of
// half-mounted content.
export default function RouteCurtain() {
  const location = useLocation()
  const ref = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    gsap
      .timeline()
      .set(el, { visibility: 'visible', scaleX: 0, transformOrigin: 'left' })
      .to(el, { scaleX: 1, duration: 0.4, ease: 'power2.in' })
      .set(el, { transformOrigin: 'right' })
      .to(el, { scaleX: 0, duration: 0.4, ease: 'power2.out', delay: 0.2 })
      .set(el, { visibility: 'hidden' })
  }, [location.pathname])

  return <div ref={ref} aria-hidden="true" className="fixed inset-0 z-[250] bg-secondary pointer-events-none" style={{ visibility: 'hidden', transform: 'scaleX(0)' }} />
}
