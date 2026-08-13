import { useEffect, useRef, useState } from 'react'

// Cycles a layout card's image between its real surveyed map and the
// client's actual drone/site photos, crossfading in place. Each card is
// given its own interval + start delay (derived from its grid index) so a
// full page of cards drifts in and out of sync rather than pulsing in
// lockstep — deliberately not using the same timer for every card.
export default function LayoutCardMedia({ images, index = 0, alt, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (images.length <= 1 || prefersReducedMotion.current || paused) return undefined

    const intervalMs = 3600 + (index % 5) * 550 // 3.6s–5.8s, varies per card
    const startDelayMs = (index % 4) * 850 // desyncs the first tick too

    // A single recursive timeout chain, not setTimeout + setInterval running
    // side by side — two independent timers both advancing the same index
    // fire close together and cancel each other out (toggle forward, then
    // immediately back), which is why cards briefly flip and then jump back
    // to the map. One chain, one advance per tick.
    let timer
    const tick = (delay) => {
      timer = setTimeout(() => {
        setActiveIndex((current) => (current + 1) % images.length)
        tick(intervalMs)
      }, delay)
    }
    tick(startDelayMs + intervalMs)

    return () => clearTimeout(timer)
  }, [images.length, index, paused])

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : `${alt} — real site photo`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm text-white text-[10px] font-body uppercase tracking-widest">
          <span className="material-symbols-outlined text-[12px]">
            {activeIndex === 0 ? 'map' : 'photo_camera'}
          </span>
          {activeIndex === 0 ? 'Survey Map' : 'Site Photo'}
        </div>
      )}
    </div>
  )
}
