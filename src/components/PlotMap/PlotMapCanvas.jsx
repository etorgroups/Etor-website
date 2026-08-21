import { useCallback, useEffect, useState } from 'react'
import { PLOT_STATUS } from '../../data/plotMap'

const CELL = 32

function PlotRect({ plot, dimmed, selected, onSelect, onHover, onHoverEnd }) {
  const status = PLOT_STATUS[plot.status]

  const describePlot = () => {
    if (plot.status === 'sold') return `Plot ${plot.number}, ${plot.block}, sold to ${plot.customerName} on ${plot.soldDate}`
    if (plot.status === 'booked') return `Plot ${plot.number}, ${plot.block}, booked by ${plot.customerName}`
    if (plot.status === 'hold') return `Plot ${plot.number}, ${plot.block}, on hold`
    return `Plot ${plot.number}, ${plot.block}, available, ${plot.sizeSqYd} sq.yd`
  }

  const handleMouseMove = (event) => {
    onHover(plot, event.clientX, event.clientY)
  }

  const handleFocus = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    onHover(plot, rect.left + rect.width / 2, rect.top)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(plot)
    }
  }

  return (
    <g
      data-plot-id={plot.id}
      data-cursor="View"
      tabIndex={0}
      role="button"
      aria-label={describePlot()}
      onMouseEnter={handleMouseMove}
      onMouseMove={handleMouseMove}
      onMouseLeave={onHoverEnd}
      onFocus={handleFocus}
      onBlur={onHoverEnd}
      onClick={() => onSelect(plot)}
      onKeyDown={handleKeyDown}
      style={{ cursor: 'pointer', outline: 'none', opacity: dimmed ? 0.25 : 1, transition: 'opacity .15s' }}
    >
      <rect
        x={plot.x}
        y={plot.y}
        width={CELL}
        height={CELL}
        rx={6}
        fill={status.fill}
        stroke={selected ? '#0051d5' : status.stroke}
        strokeWidth={selected ? 3 : 1.6}
      />
      <text
        x={plot.x + CELL / 2}
        y={plot.y + CELL / 2 + 3.5}
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="700"
        fontFamily="var(--font-body, Inter, sans-serif)"
        fill={status.text}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {plot.number}
      </text>
    </g>
  )
}

function Landmark({ landmark }) {
  if (landmark.type === 'road') {
    return (
      <rect
        x={landmark.x}
        y={landmark.y}
        width={landmark.width}
        height={landmark.height}
        fill="#d7d5d2"
      />
    )
  }
  if (landmark.type === 'park') {
    return (
      <g>
        <rect
          x={landmark.x}
          y={landmark.y}
          width={landmark.width}
          height={landmark.height}
          rx={18}
          fill="#c9e8c4"
          stroke="#7cb87e"
          strokeWidth={2}
        />
        <text
          x={landmark.x + landmark.width / 2}
          y={landmark.y + landmark.height / 2 - 6}
          textAnchor="middle"
          fontSize="26"
          fill="#3f7a45"
          className="material-symbols-outlined"
        >
          park
        </text>
        <text
          x={landmark.x + landmark.width / 2}
          y={landmark.y + landmark.height / 2 + 22}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.06em"
          fill="#3f7a45"
          style={{ textTransform: 'uppercase' }}
        >
          {landmark.label}
        </text>
      </g>
    )
  }
  return null
}

function BlockBackdrop({ block }) {
  return (
    <g>
      <rect
        x={block.x - 8}
        y={block.y - 8}
        width={block.width + 16}
        height={block.height + 16}
        rx={10}
        fill="#f3ecd9"
      />
      <text
        x={block.x - 8}
        y={block.y - 12}
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.05em"
        fill="#8a7a4f"
        style={{ textTransform: 'uppercase' }}
      >
        {block.label}
      </text>
    </g>
  )
}

export default function PlotMapCanvas({ cityMap, panZoom, statusFilter, selectedPlotId, onSelectPlot }) {
  const [hover, setHover] = useState(null)
  const { containerRef, transform, handlers } = panZoom

  useEffect(() => {
    panZoom.fit(cityMap.canvas.width, cityMap.canvas.height)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityMap.cityId])

  const handleHover = useCallback((plot, clientX, clientY) => {
    setHover({ plot, clientX, clientY })
  }, [])
  const handleHoverEnd = useCallback(() => setHover(null), [])

  const isDimmed = (plot) => statusFilter && statusFilter.size > 0 && !statusFilter.has(plot.status)

  return (
    <div className="relative w-full h-[64vh] min-h-[420px] max-h-[720px]">
      <div
        ref={containerRef}
        data-cursor="Drag"
        className="absolute inset-0 rounded-[1.5rem] border border-outline-variant/30 bg-[#eee9dd] overflow-hidden touch-none select-none"
        style={{ cursor: panZoom.isPanning ? 'grabbing' : 'grab' }}
        {...handlers}
      >
        <svg
          width={cityMap.canvas.width}
          height={cityMap.canvas.height}
          style={{
            transformOrigin: '0 0',
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          }}
        >
          <rect x={0} y={0} width={cityMap.canvas.width} height={cityMap.canvas.height} fill="#eee9dd" />
          {cityMap.landmarks
            .filter((l) => l.type === 'road')
            .map((l) => <Landmark key={l.id} landmark={l} />)}
          {cityMap.blocks.map((block) => (
            <BlockBackdrop key={block.id} block={block} />
          ))}
          {cityMap.landmarks
            .filter((l) => l.type === 'park')
            .map((l) => <Landmark key={l.id} landmark={l} />)}
          {cityMap.blocks.flatMap((block) =>
            block.plots.map((plot) => (
              <PlotRect
                key={plot.id}
                plot={plot}
                dimmed={isDimmed(plot)}
                selected={plot.id === selectedPlotId}
                onSelect={onSelectPlot}
                onHover={handleHover}
                onHoverEnd={handleHoverEnd}
              />
            )),
          )}
        </svg>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-xs">
        <button
          type="button"
          onClick={panZoom.zoomIn}
          aria-label="Zoom in"
          className="w-10 h-10 rounded-full bg-surface shadow-md border border-outline-variant/40 flex items-center justify-center text-on-surface hover:text-secondary-strong hover:border-secondary/60 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
        <button
          type="button"
          onClick={panZoom.zoomOut}
          aria-label="Zoom out"
          className="w-10 h-10 rounded-full bg-surface shadow-md border border-outline-variant/40 flex items-center justify-center text-on-surface hover:text-secondary-strong hover:border-secondary/60 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">remove</span>
        </button>
        <button
          type="button"
          onClick={() => panZoom.fit(cityMap.canvas.width, cityMap.canvas.height)}
          aria-label="Reset view"
          className="w-10 h-10 rounded-full bg-surface shadow-md border border-outline-variant/40 flex items-center justify-center text-on-surface hover:text-secondary-strong hover:border-secondary/60 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">filter_center_focus</span>
        </button>
      </div>

      <p className="absolute bottom-4 left-4 hidden sm:flex items-center gap-xs font-body text-[11px] text-on-surface-variant bg-surface/80 backdrop-blur px-sm py-xs rounded-full border border-outline-variant/30">
        <span className="material-symbols-outlined text-[14px]">drag_pan</span>
        Drag to pan · Scroll or pinch to zoom
      </p>

      {hover && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: hover.clientX + 14, top: hover.clientY + 14 }}
        >
          <div className="min-w-[160px] max-w-[220px] rounded-xl bg-primary text-on-primary shadow-xl px-md py-sm">
            <div className="flex items-center gap-xs mb-xs">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: PLOT_STATUS[hover.plot.status].dot }}
              />
              <p className="font-body text-label-md uppercase tracking-wider">
                Plot {hover.plot.number} · {hover.plot.block}
              </p>
            </div>
            <p className="font-body text-body-sm text-secondary-strong font-semibold">
              {PLOT_STATUS[hover.plot.status].label}
            </p>
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
