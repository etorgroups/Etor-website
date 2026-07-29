import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Interactive accordion per DESIGN.md: 1px bottom border, chevron rotate,
// active item background shifts to the alternate surface color.
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y divide-outline-variant/30">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={item.question} className={isOpen ? 'bg-surface-container-low rounded-lg' : ''}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-md py-md px-md text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-headline-md text-primary">{item.question}</span>
              <span
                className="material-symbols-outlined text-secondary shrink-0 transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                expand_more
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-body-md text-on-surface-variant px-md pb-lg leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
