import { useMemo, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

// "Magnetic" button per DESIGN.md: attracts toward the cursor within its bounds
// on a spring, and springs back to rest on mouse leave. `as` may be a DOM tag
// name ('button', 'a') or a component (e.g. React Router's Link).
export default function MagneticButton({ children, className = '', strength = 0.35, as = 'button', ...rest }) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = useMemo(() => (typeof as === 'string' ? motion[as] : motion.create(as)), [as])

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  )
}
