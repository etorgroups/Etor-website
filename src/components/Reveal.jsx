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

// Fades + slides an element into view as it enters the viewport, and fades it
// back out as it leaves (once=false) so the effect replays on scroll up too.
export default function Reveal({
  children,
  tag = 'div',
  delay = 0,
  duration = 0.9,
  y = 40,
  x = 0,
  scale = 1,
  once = false,
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
