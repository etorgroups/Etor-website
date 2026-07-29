import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

// Subtle 3D tilt toward the cursor for hero/feature image cards — a small
// premium touch. Disabled entirely for prefers-reduced-motion.
export default function TiltCard({ children, className = '', max = 8 }) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springPx = useSpring(px, { stiffness: 150, damping: 20 })
  const springPy = useSpring(py, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springPy, [0, 1], [max, -max])
  const rotateY = useTransform(springPx, [0, 1], [-max, max])

  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
