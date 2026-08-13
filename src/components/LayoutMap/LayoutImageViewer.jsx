import { useCallback, useState } from 'react'
import usePanZoom from '../PlotMap/usePanZoom'
import { PLOT_STATUS } from '../../data/plotMap'
import LayoutPlotOverlay from './LayoutPlotOverlay'

// Real surveyed layout, shown as a pan/zoom image. When `plots` is supplied
// (see src/data/plotOverlays), an interactive layer of real plot markers —
// extracted from the PDF's own text positions — is drawn in lockstep with
// the image via a shared transform, reusing the same status colors/behavior
// as the site's original synthetic Plot Map.
export default function LayoutImageViewer({ layout, plots, statusFilter, selectedPlotId, onSelectPlot }) {
  const panZoom = usePanZoom()
  const { containerRef, transform, handlers } = panZoom
  const [hover, setHover] = useState(null)

  const handleHoverPlot = useCallback((plot, clientX, clientY) => setHover({ plot, clientX, clientY }), [])
  const handleHoverEnd = useCallback(() => setHover(null), [])

  return (
    <div className="relative w-full h-[64vh] min-h-[420px] max-h-[720px]">
      <div
        ref={containerRef}
        data-cursor="Drag"
        className="absolute inset-0 rounded-[1.5rem] border border-outline-variant/30 bg-[#f4f1ea] overflow-hidden touch-none select-none"
        style={{ cursor: panZoom.isPanning ? 'grabbing' : 'grab' }}
        {...handlers}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transformOrigin: '0 0',
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          <img
            src={layout.image}
            alt={`${layout.name} layout plan — ${layout.location}`}
            width={layout.width}
            height={layout.height}
            draggable={false}
            onLoad={(event) => {
              const img = event.currentTarget
              panZoom.fit(img.naturalWidth || layout.width, img.naturalHeight || layout.height)
            }}
            style={{ display: 'block', width: layout.width, height: layout.height, maxWidth: 'none' }}
          />
          {plots && plots.length > 0 && (
            <LayoutPlotOverlay
              plots={plots}
              width={layout.width}
              height={layout.height}
              statusFilter={statusFilter}
              selectedPlotId={selectedPlotId}
              onSelectPlot={onSelectPlot}
              onHoverPlot={handleHoverPlot}
              onHoverEndPlot={handleHoverEnd}
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-xs">
        <button
          type="button"
          onClick={panZoom.zoomIn}
          aria-label="Zoom in"
          className="w-10 h-10 rounded-full bg-surface shadow-md border border-outline-variant/40 flex items-center justify-center text-on-surface hover:text-secondary hover:border-secondary/60 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
        <button
          type="button"
          onClick={panZoom.zoomOut}
          aria-label="Zoom out"
          className="w-10 h-10 rounded-full bg-surface shadow-md border border-outline-variant/40 flex items-center justify-center text-on-surface hover:text-secondary hover:border-secondary/60 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">remove</span>
        </button>
        <button
          type="button"
          onClick={() => panZoom.fit(layout.width, layout.height)}
          aria-label="Reset view"
          className="w-10 h-10 rounded-full bg-surface shadow-md border border-outline-variant/40 flex items-center justify-center text-on-surface hover:text-secondary hover:border-secondary/60 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">filter_center_focus</span>
        </button>
      </div>

      <p className="absolute top-4 left-4 hidden sm:flex items-center gap-xs px-md py-xs rounded-full bg-surface/90 backdrop-blur-md font-body text-[11px] text-on-surface-variant uppercase tracking-widest">
        <span className="material-symbols-outlined text-[14px]">pan_tool</span>
        Drag to pan · Scroll to zoom
      </p>

      {hover && (
        <div className="fixed z-50 pointer-events-none" style={{ left: hover.clientX + 14, top: hover.clientY + 14 }}>
          <div className="min-w-[160px] max-w-[220px] rounded-xl bg-primary text-on-primary shadow-xl px-md py-sm">
            <div className="flex items-center gap-xs mb-xs">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: PLOT_STATUS[hover.plot.status].dot }}
              />
              <p className="font-body text-label-md uppercase tracking-wider">Plot {hover.plot.number}</p>
            </div>
            <p className="font-body text-body-sm text-secondary font-semibold">{PLOT_STATUS[hover.plot.status].label}</p>
            {hover.plot.status === 'sold' && (
              <div className="mt-xs pt-xs border-t border-on-primary/15 space-y-0.5">
                <p className="font-body text-body-sm">{hover.plot.customerName}</p>
                <p className="font-body text-[11px] text-on-primary/60">Sold on {hover.plot.soldDate}</p>
              </div>
            )}
            {hover.plot.status === 'booked' && (
              <div className="mt-xs pt-xs border-t border-on-primary/15 space-y-0.5">
                <p className="font-body text-body-sm">{hover.plot.customerName}</p>
                <p className="font-body text-[11px] text-on-primary/60">Booking held since {hover.plot.bookedDate}</p>
              </div>
            )}
            {hover.plot.status === 'available' && (
              <p className="font-body text-[11px] text-on-primary/60 mt-xs">
                {hover.plot.sizeSqYd} sq.yd · ₹{hover.plot.pricePerSqYd}/sq.yd
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
