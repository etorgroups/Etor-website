import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Click-to-zoom wrapper for proof/certificate-style images — visitors can
// inspect fine print (dates, categories, seals) without leaving the page.
export default function ImageLightbox({ src, alt, children, className = '' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`text-left cursor-zoom-in ${className}`}
        aria-label={`View larger: ${alt}`}
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/90 backdrop-blur-md p-lg"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
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
