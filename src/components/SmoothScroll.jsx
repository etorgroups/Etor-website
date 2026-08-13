import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

// Wraps the whole app in physics-based smooth scrolling and keeps GSAP's
// ScrollTrigger in sync with it. Lenis animates the real window scroll
// position (not a transformed wrapper), so ScrollTrigger needs no
// scrollerProxy — just `lenis.on('scroll', ScrollTrigger.update)` and a
// shared raf loop via gsap.ticker, per Lenis's own integration guide.
export default function SmoothScroll({ children }) {
  const location = useLocation()
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenisRef.current = lenis
    document.documentElement.classList.add('lenis')

    const pauseLenis = () => lenisRef.current?.stop()
    const resumeLenis = () => lenisRef.current?.start()

    window.addEventListener('lenis:pause', pauseLenis)
    window.addEventListener('lenis:resume', resumeLenis)

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      window.removeEventListener('lenis:pause', pauseLenis)
      window.removeEventListener('lenis:resume', resumeLenis)
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
      document.documentElement.classList.remove('lenis')
    }
  }, [])

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
    // Wait a frame so the new route's content has laid out before
    // ScrollTrigger recalculates trigger positions against it.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return children
}
