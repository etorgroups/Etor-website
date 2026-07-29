import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from './Reveal'

const EASE = [0.16, 1, 0.3, 1]

// Connected step-flow for the "How to Invest" process: a line that draws in
// as the reader scrolls, threading through icon nodes — horizontal on
// desktop, vertical on mobile — with the step content anchored underneath
// (desktop) or beside (mobile) each node.
export default function InvestJourney({ steps }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 55%'],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })

  return (
    <div ref={containerRef}>
      {/* Desktop: horizontal stepper */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between px-md">
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-outline-variant/30">
            <motion.div style={{ scaleX: lineProgress }} className="absolute inset-0 bg-secondary origin-left" />
          </div>

          {steps.map((step, index) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center w-[18%]">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                className="relative w-16 h-16 rounded-full bg-surface border-2 border-secondary flex items-center justify-center shadow-lg"
              >
                <span className="material-symbols-outlined text-secondary text-[26px]">{step.icon}</span>
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-secondary text-on-secondary text-[11px] font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </motion.div>

              <Reveal tag="div" delay={index * 0.1 + 0.1} className="mt-lg text-center">
                <h4 className="font-display text-headline-md text-primary mb-sm leading-snug">{step.title}</h4>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">{step.body}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet: vertical stepper */}
      <div className="lg:hidden relative">
        <div className="absolute left-7 top-7 bottom-7 w-0.5 bg-outline-variant/30">
          <motion.div style={{ scaleY: lineProgress }} className="absolute inset-0 w-full bg-secondary origin-top" />
        </div>

        <div className="space-y-xl">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex gap-md">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
                className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-surface border-2 border-secondary flex items-center justify-center shadow-lg"
              >
                <span className="material-symbols-outlined text-secondary text-[22px]">{step.icon}</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </motion.div>

              <Reveal tag="div" delay={index * 0.05} className="pt-xs">
                <h4 className="font-display text-headline-md text-primary mb-xs leading-snug">{step.title}</h4>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">{step.body}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
