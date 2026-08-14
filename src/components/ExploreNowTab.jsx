import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VIDEOS } from '../data/videos'

const PANEL_VARIANTS = {
  closed: { opacity: 0, scale: 0.95, x: 12, transition: { duration: 0.15 } },
  open: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
}

// Persistent edge tab (right side, vertically centered) that opens a small
// flyout of video options — mirrors the "click the edge tab, pick from a
// short list" interaction pattern, but the list is videos rather than
// signup actions. Add more entries to src/data/videos.js and they show up
// here automatically. Global — mounted once in App.jsx.
export default function ExploreNowTab() {
  const [open, setOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState(null)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function handlePointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false)
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!activeVideo) return undefined
    function handleKeyDown(event) {
      if (event.key === 'Escape') setActiveVideo(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeVideo])

  return (
    <>
      <div ref={rootRef} className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={PANEL_VARIANTS}
              style={{ transformOrigin: 'right center' }}
              className="mr-sm w-64 rounded-2xl bg-surface shadow-2xl border border-outline-variant/30 overflow-hidden py-xs"
            >
              <div className="flex items-center justify-between px-md pt-sm pb-xs">
                <p className="font-body text-[11px] uppercase tracking-widest text-on-surface-variant">
                  Watch a video
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="w-6 h-6 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
              {VIDEOS.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setActiveVideo(video)
                    setOpen(false)
                  }}
                  className="w-full flex items-center justify-between gap-sm px-md py-sm text-left font-body text-body-sm text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-[18px] text-secondary">play_circle</span>
                    {video.title}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    chevron_right
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? 'Close video menu' : 'Open video menu'}
          className="flex items-center justify-center px-2 py-lg sm:py-xl rounded-l-xl bg-secondary text-on-secondary shadow-2xl shadow-secondary/30 hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
        >
          <span
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            className="whitespace-nowrap font-body text-label-md uppercase tracking-widest"
          >
            Explore Now
          </span>
        </button>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/90 backdrop-blur-md p-lg"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className={`relative rounded-2xl overflow-hidden shadow-2xl bg-primary ${
                activeVideo.orientation === 'portrait' ? 'aspect-[9/16] max-h-[85vh]' : 'aspect-video w-full max-w-4xl'
              }`}
            >
              <video
                src={activeVideo.src}
                poster={activeVideo.poster}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close"
              className="absolute top-lg right-lg w-11 h-11 rounded-full bg-on-primary/10 hover:bg-on-primary/20 flex items-center justify-center text-on-primary transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
