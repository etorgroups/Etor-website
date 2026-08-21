import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import coinLogo from '../assets/images/etor-coin-logo.webp'
import splashWhoosh from '../assets/audio/splash-whoosh.mp3'

const SESSION_KEY = 'etor-intro-seen'

// Kept low and used once — a cinematic accent on the reveal sweep, not a
// sound effect that announces itself. Browsers block audio-with-sound from
// autoplaying before any user interaction on a cold load, so this is a
// best-effort touch: it plays on visits where the browser allows it (e.g.
// arriving via a link click, or on any later navigation once the tab has
// had interaction) and silently does nothing otherwise — never an error,
// never a retry prompt.
function playSplashWhoosh() {
  try {
    const audio = new Audio(splashWhoosh)
    audio.volume = 0.4
    audio.play()?.catch(() => {
      // Autoplay blocked — expected on most cold loads, not a bug.
    })
  } catch {
    // Non-fatal — the visual reveal still plays regardless.
  }
}

function shouldShow() {
  try {
    if (sessionStorage.getItem(SESSION_KEY) === '1') return false
  } catch {
    // Storage unavailable — fall through and show once per tab regardless.
  }
  return !prefersReducedMotion()
}

// Cold-load-only boot sequence (once per tab via sessionStorage) — logo
// scales in, a counter ticks to 100, then the whole panel sweeps up to
// reveal the hero underneath. Computed as lazy initial state (not an
// effect) so there's no flash of the page before this covers it.
export default function Preloader() {
  const [mounted, setMounted] = useState(shouldShow)
  const [visible, setVisible] = useState(mounted)
  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    if (!visible) return

    const progress = { value: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          // Non-fatal — worst case the intro replays next tab.
        }
        setVisible(false)
        setTimeout(() => setMounted(false), 750)
      },
    })

    // Real content (hero photo, headline) is fully loaded and painted behind
    // this overlay well before the timeline finishes -- the 2.5s the old
    // durations added up to (0.5 + 1.1 + 0.2 + 0.7) was pure artificial delay
    // on top of actual load time, not covering for anything still loading.
    // Kept as a quick branded flourish rather than cut entirely, just fast
    // enough that it reads as a moment, not a wait.
    tl.from(logoRef.current, { opacity: 0, scale: 0.85, duration: 0.3, ease: 'expo.out' })
      .to(
        progress,
        {
          value: 100,
          duration: 0.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(progress.value))
            if (barRef.current) barRef.current.style.width = `${progress.value}%`
          },
        },
        0.1,
      )
      .to({}, { duration: 0.1 })
      .call(playSplashWhoosh)
      .to(overlayRef.current, { yPercent: -100, duration: 0.4, ease: [0.76, 0, 0.24, 1] })

    return () => tl.kill()
  }, [visible])

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center gap-lg"
    >
      <img ref={logoRef} src={coinLogo} alt="" className="w-16 h-16 object-contain" />
      <div className="flex items-baseline gap-xs">
        <span ref={countRef} className="font-display text-headline-md text-on-primary tabular-nums">
          0
        </span>
        <span className="font-body text-label-md text-on-primary/50 uppercase tracking-widest">%</span>
      </div>
      <div className="w-40 h-px bg-on-primary/15 overflow-hidden rounded-full">
        <div ref={barRef} className="h-full bg-secondary" style={{ width: '0%' }} />
      </div>
    </div>
  )
}
