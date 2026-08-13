import { useEffect, useRef } from 'react'
import { SplitText } from 'gsap/SplitText'
import { gsap, prefersReducedMotion } from '../lib/gsap'

gsap.registerPlugin(SplitText)

const TAGS = { p: 'p', h2: 'h2', h3: 'h3', div: 'div', span: 'span' }

// Splits a paragraph into lines, each masked by an overflow:hidden wrapper
// (SplitText's `mask` option), and rises them into place one at a time as
// the block scrolls into view — the "editorial reveal" pattern for body
// copy, distinct from KineticHeadline's per-character mount animation.
export default function MaskReveal({ children, tag = 'p', className = '', stagger = 0.07, ...rest }) {
  const ref = useRef(null)
  const Comp = TAGS[tag] || 'p'

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const split = new SplitText(el, { type: 'lines', mask: 'lines' })
    const tween = gsap.from(split.lines, {
      yPercent: 110,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      stagger,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      split.revert()
    }
  }, [stagger])

  return (
    <Comp ref={ref} className={className} {...rest}>
      {children}
    </Comp>
  )
}
