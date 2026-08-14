import { motion } from 'framer-motion'

const TAGS = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  li: motion.li,
  ul: motion.ul,
}

const EASE = [0.16, 1, 0.3, 1]

// Fades + slides an element into view as it enters the viewport, then stays
// visible — it doesn't replay on scroll-up (once=true) since that caused
// visible flicker on content-dense pages, and broke print/PDF/full-page
// screenshot exports entirely (whileInView never triggers outside a real
// scroll interaction, so anything not yet scrolled past stayed invisible).
// Pass once={false} on a specific instance if a deliberate replay flourish
// is ever wanted somewhere.
export default function Reveal({
  children,
  tag = 'div',
  delay = 0,
  duration = 0.9,
  y = 40,
  x = 0,
  scale = 1,
  once = true,
  amount = 0.2,
  className,
  ...rest
}) {
  const Comp = TAGS[tag] || motion.div

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={{ opacity: 0, y, x, scale }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
