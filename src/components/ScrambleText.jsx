import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/gsap'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'
const TAGS = { span: 'span', div: 'div' }
const DURATION_MS = 550

// Classic "decrypt" hover effect: cycles random characters across the
// string, locking each position in left-to-right until it resolves back to
// the real label. Driven by elapsed wall-clock time (not tick count), so a
// slow first frame or throttled tab can't make it resolve early or stall.
export default function ScrambleText({ text, className = '', tag = 'span' }) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(null)
  const Tag = TAGS[tag] || 'span'

  const scramble = () => {
    if (prefersReducedMotion() || frameRef.current) return
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION_MS, 1)
      const revealCount = progress * text.length

      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < revealCount) return text[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
        frameRef.current = null
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    setDisplay(text)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [text])

  return (
    <Tag className={className} onMouseEnter={scramble}>
      {display}
    </Tag>
  )
}
