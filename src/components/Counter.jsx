import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useTransform, animate } from 'framer-motion'

// Animated count-up number that triggers once the element scrolls into view.
export default function Counter({ target, prefix = '', suffix = '', duration = 2, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) => `${prefix}${Math.floor(latest)}${suffix}`)

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      count.set(target)
      return
    }
    const controls = animate(count, target, { duration, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [isInView, target, duration, count, prefersReducedMotion])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
