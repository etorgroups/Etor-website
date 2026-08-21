import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from './Reveal'

// Visually richer "ecosystem" presentation: a connecting line threads
// through each pillar's icon node (echoing that these ventures form one
// interconnected system), with a numbered badge, a gradient icon ring, and a
// large ghost numeral watermarked behind each card for depth.
export default function EcosystemGrid({ pillars }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 60%'],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })

  return (
    <div ref={containerRef} className="relative">
      {/* Connecting line — desktop only, threads through each icon node */}
      <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-0.5 bg-outline-variant/30 z-0">
        <motion.div style={{ scaleX: lineProgress }} className="absolute inset-0 bg-secondary origin-left" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {pillars.map((pillar, index) => (
          <Reveal
            key={pillar.title}
            tag="div"
            delay={index * 0.1}
            className={`group relative overflow-hidden p-lg rounded-[2rem] transition-all hover:-translate-y-2 shadow-sm ${
              pillar.highlight
                ? 'bg-secondary text-on-secondary hover:shadow-2xl hover:shadow-secondary/40'
                : 'bg-surface/80 backdrop-blur-sm border border-outline-variant/30 hover:border-secondary/50 hover:shadow-2xl'
            }`}
          >
            {/* Ghost numeral watermark */}
            <span
              className={`font-display absolute -top-4 -right-2 text-[7rem] leading-none font-bold select-none pointer-events-none ${
                pillar.highlight ? 'text-on-secondary/10' : 'text-on-surface/5'
              }`}
            >
              0{index + 1}
            </span>

            <div className="relative z-10">
              <div
                className={`relative w-16 h-16 mb-lg rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                  pillar.highlight ? 'bg-on-secondary/10' : 'bg-gradient-to-br from-secondary/20 to-secondary/5'
                }`}
              >
                <span
                  className={`absolute inset-0 rounded-2xl border-2 border-dashed ${
                    pillar.highlight ? 'border-on-secondary/20' : 'border-secondary/20'
                  } group-hover:rotate-180 transition-transform duration-[1.5s] ease-out`}
                  aria-hidden="true"
                />
                <span
                  className={`material-symbols-outlined text-[32px] ${
                    pillar.highlight ? 'text-on-secondary' : 'text-secondary-strong'
                  }`}
                >
                  {pillar.icon}
                </span>
              </div>
              <h4
                className={`font-display text-headline-md mb-md ${
                  pillar.highlight ? 'text-on-secondary' : 'text-on-surface'
                }`}
              >
                {pillar.title}
              </h4>
              <p
                className={`font-body text-body-md leading-relaxed ${
                  pillar.highlight ? 'text-on-secondary/80' : 'text-on-surface-variant'
                }`}
              >
                {pillar.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
