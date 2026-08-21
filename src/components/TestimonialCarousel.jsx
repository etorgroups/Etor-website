import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const AUTOPLAY_MS = 6000
const EASE = [0.16, 1, 0.3, 1]

export default function TestimonialCarousel({ testimonials }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (paused || prefersReducedMotion) return
    const id = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % testimonials.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, prefersReducedMotion, testimonials.length])

  const goTo = (next) => {
    setDirection(next > index || (index === testimonials.length - 1 && next === 0) ? 1 : -1)
    setIndex(next)
  }

  const prev = () => goTo((index - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((index + 1) % testimonials.length)

  const current = testimonials[index]
  const xOffset = prefersReducedMotion ? 0 : 40
  const hasMultiple = testimonials.length > 1

  return (
    <div
      className="relative max-w-[48rem] mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="surface-panel relative rounded-[1.25rem] p-xl overflow-hidden min-h-[20rem] flex flex-col justify-center">
        <span
          className="material-symbols-outlined absolute top-lg left-lg text-secondary/10 pointer-events-none select-none"
          style={{ fontSize: '96px' }}
          aria-hidden="true"
        >
          format_quote
        </span>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.name}
            custom={direction}
            initial={{ opacity: 0, x: xOffset * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -xOffset * direction }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="flex gap-xs mb-lg" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-secondary-fixed-dim text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>

            <p className="font-display text-headline-md text-on-surface leading-relaxed mb-lg max-w-[36rem]">
              "{current.quote}"
            </p>

            <div className="flex items-center gap-md">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary-container flex items-center justify-center text-on-secondary font-display text-headline-md shrink-0">
                {current.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-display text-headline-md text-on-surface leading-none">{current.name}</p>
                <p className="font-body text-body-sm text-secondary-strong mt-xs">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 rounded-full bg-surface border border-outline-variant/40 shadow-lg items-center justify-center hover:bg-secondary hover:text-on-secondary hover:border-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-5 w-10 h-10 rounded-full bg-surface border border-outline-variant/40 shadow-lg items-center justify-center hover:bg-secondary hover:text-on-secondary hover:border-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>

          <div className="flex justify-center gap-sm mt-lg">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1} of ${testimonials.length}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-secondary' : 'w-2 bg-outline-variant/50 hover:bg-secondary/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
