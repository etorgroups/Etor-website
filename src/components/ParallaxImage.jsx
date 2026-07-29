import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

// Image that drifts/zooms toward the cursor position on hover, used for the
// project bento cards.
export default function ParallaxImage({ src, alt, className = '', imgClassName = '' }) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })

  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    const relX = (event.clientX - rect.left) / rect.width - 0.5
    const relY = (event.clientY - rect.top) / rect.height - 0.5
    x.set(relX * 24)
    y.set(relY * 24)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ x: springX, y: springY }}
        className={`w-full h-full object-cover scale-110 ${imgClassName}`}
      />
    </div>
  )
}
