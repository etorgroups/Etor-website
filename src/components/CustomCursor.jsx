import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"], [data-cursor]'

// Desktop-only contextual cursor: a small dot plus a lagging ring that grows
// and picks up a label when hovering an interactive element. Tag any element
// with data-cursor="Drag" / data-cursor="View" etc. to customize the label;
// plain links/buttons still get the enlarged-ring treatment for free.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState({ active: false, label: '' })
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const noTouch = window.matchMedia('(hover: hover)').matches
    if (!isFinePointer || !noTouch) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }
    const onOver = (event) => {
      const target = event.target.closest?.(INTERACTIVE_SELECTOR)
      if (target) {
        setVariant({ active: true, label: target.dataset.cursor || '' })
      }
    }
    const onOut = (event) => {
      const leavingTarget = event.target.closest?.(INTERACTIVE_SELECTOR)
      const enteringInteractive = event.relatedTarget?.closest?.(INTERACTIVE_SELECTOR)
      if (leavingTarget && !enteringInteractive) {
        setVariant({ active: false, label: '' })
      }
    }
    const onLeaveWindow = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mouseout', onLeaveWindow)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mouseout', onLeaveWindow)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!enabled) return null

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none" style={{ opacity: visible ? 1 : 0 }} aria-hidden="true">
      <motion.div
        className="absolute rounded-full bg-secondary"
        style={{ x, y, translate: '-50% -50%', width: 6, height: 6 }}
      />
      <motion.div
        className="absolute rounded-full border border-secondary flex items-center justify-center overflow-hidden"
        animate={{
          width: variant.active ? (variant.label ? 76 : 44) : 28,
          height: variant.active ? (variant.label ? 76 : 44) : 28,
          backgroundColor: variant.active ? 'rgba(0, 81, 213, 0.08)' : 'rgba(0, 81, 213, 0)',
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: ringX, y: ringY, translate: '-50% -50%' }}
      >
        {variant.label && (
          <span className="font-body text-[10px] font-bold uppercase tracking-widest text-secondary-strong">
            {variant.label}
          </span>
        )}
      </motion.div>
    </div>
  )
}
