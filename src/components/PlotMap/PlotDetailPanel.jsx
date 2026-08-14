import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PLOT_STATUS } from '../../data/plotMap'

export default function PlotDetailPanel({ plot, cityTitle, onClose }) {
  return (
    <AnimatePresence>
      {plot && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-surface z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-lg space-y-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body text-label-md text-secondary uppercase tracking-widest">{cityTitle}</p>
                  <h3 className="font-display text-headline-lg text-on-surface mt-xs">
                    Plot {plot.number}
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant">{plot.block}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close plot details"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div
                className="inline-flex items-center gap-xs px-md py-xs rounded-full font-body text-label-md"
                style={{ backgroundColor: PLOT_STATUS[plot.status].fill, color: PLOT_STATUS[plot.status].text, border: `1px solid ${PLOT_STATUS[plot.status].stroke}` }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PLOT_STATUS[plot.status].dot }} />
                {PLOT_STATUS[plot.status].label}
              </div>

              <div className="grid grid-cols-2 gap-md p-md rounded-2xl bg-surface-container-low border border-outline-variant/20">
                <div>
                  <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest">Size</p>
                  <p className="font-display text-headline-md text-on-surface">{plot.sizeSqYd} sq.yd</p>
                </div>
                <div>
                  <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest">Price / sq.yd</p>
                  <p className="font-display text-headline-md text-on-surface">₹{plot.pricePerSqYd.toLocaleString('en-IN')}</p>
                </div>
                <div className="col-span-2 pt-sm border-t border-outline-variant/20">
                  <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest">Total Value</p>
                  <p className="font-display text-headline-lg text-on-surface">
                    ₹{(plot.sizeSqYd * plot.pricePerSqYd).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {plot.status === 'sold' && (
                <div className="p-md rounded-2xl bg-error-container/30 border border-error/20 space-y-xs">
                  <p className="font-body text-label-md text-on-error-container uppercase tracking-widest">Sold To</p>
                  <p className="font-display text-headline-md text-on-surface">{plot.customerName}</p>
                  <p className="font-body text-body-sm text-on-surface-variant">Sold on {plot.soldDate}</p>
                </div>
              )}

              {plot.status === 'booked' && (
                <div className="p-md rounded-2xl bg-amber-50 border border-amber-300/40 space-y-xs" style={{ backgroundColor: '#fef3c7', borderColor: '#fcd34d' }}>
                  <p className="font-body text-label-md uppercase tracking-widest" style={{ color: '#92400e' }}>
                    Booking Held By
                  </p>
                  <p className="font-display text-headline-md" style={{ color: '#211d18' }}>
                    {plot.customerName}
                  </p>
                  <p className="font-body text-body-sm" style={{ color: '#615950' }}>
                    Since {plot.bookedDate}
                  </p>
                </div>
              )}

              {plot.status === 'hold' && (
                <div className="p-md rounded-2xl bg-surface-container border border-outline-variant/30">
                  <p className="font-body text-body-sm text-on-surface-variant">
                    This plot is temporarily on hold and unavailable for booking right now.
                  </p>
                </div>
              )}

              {plot.status === 'available' && (
                <Link
                  to="/contact"
                  state={{
                    plotEnquiry: {
                      plotNumber: plot.number,
                      block: plot.block,
                      city: cityTitle,
                      sizeSqYd: plot.sizeSqYd,
                      pricePerSqYd: plot.pricePerSqYd,
                    },
                  }}
                  className="w-full inline-flex justify-center items-center gap-sm px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Enquire About This Plot
                  <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
