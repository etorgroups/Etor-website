import { motion, useScroll, useSpring } from 'framer-motion'

// Thin brand-colored bar at the very top of the viewport showing how far
// through the page the reader has scrolled.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-secondary origin-left z-[70]"
      aria-hidden="true"
    />
  )
}
