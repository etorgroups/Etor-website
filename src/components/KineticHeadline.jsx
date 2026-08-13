import { useEffect, useRef } from 'react'
import { SplitText } from 'gsap/SplitText'
import { gsap, prefersReducedMotion } from '../lib/gsap'

gsap.registerPlugin(SplitText)

const TAGS = { h1: 'h1', h2: 'h2', h3: 'h3', span: 'span', p: 'p' }

// Wrap any heading markup (including nested <br/> / colored <span> children —
// SplitText walks the existing DOM rather than requiring plain text) to have
// its characters rise into place on mount, staggered left to right.
export default function KineticHeadline({ children, tag = 'h1', delay = 0, className = '', ...rest }) {
  const ref = useRef(null)
  const Comp = TAGS[tag] || 'h1'

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    // Splitting words too (not just chars) keeps each word wrapped in its
    // own non-breaking box — otherwise every character becomes an
    // independently wrappable inline-block and the browser can (and did)
    // break lines mid-word.
    const split = new SplitText(el, { type: 'words, chars', wordsClass: 'kinetic-word' })
    const tween = gsap.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.018,
      delay,
    })

    return () => {
      tween.kill()
      split.revert()
    }
  }, [delay])

  return (
    <Comp ref={ref} className={className} {...rest}>
      {children}
    </Comp>
  )
}
