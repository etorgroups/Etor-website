import { useMemo } from 'react'
import { getActivityFeed } from '../data/plotMap'

function Chip({ item, isLast }) {
  return (
    <div className="flex items-center gap-xs px-lg font-body text-body-sm text-on-surface-variant whitespace-nowrap">
      <span className="material-symbols-outlined text-secondary-strong text-[16px]">{item.icon}</span>
      {item.text}
      {!isLast && (
        <span className="text-outline-variant ml-lg" aria-hidden="true">
          •
        </span>
      )}
    </div>
  )
}

// Live-feeling activity strip driven by real plot-inventory counts (see
// getActivityFeed) — no invented customer names, just anonymized counts and
// plot/block references, so it reads as genuine status rather than staged
// testimonials. Static and wrapped rather than an auto-scrolling marquee —
// the creative brief calls for calm proof, not perpetual decorative motion.
export default function SoldTicker() {
  const items = useMemo(() => getActivityFeed(), [])

  return (
    <div className="flex flex-wrap items-center justify-center gap-y-xs py-sm bg-surface-container-low border-y border-outline-variant/20">
      {items.map((item, index) => (
        <Chip key={index} item={item} isLast={index === items.length - 1} />
      ))}
    </div>
  )
}
