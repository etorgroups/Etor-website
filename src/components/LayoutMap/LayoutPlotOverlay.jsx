import { PLOT_STATUS } from '../../data/plotMap'

const DEFAULT_R = 20

// SVG markers positioned at each plot's real extracted coordinates, drawn
// in the same untransformed pixel space as the base image so a shared
// parent transform (pan/zoom) keeps both in lockstep automatically.
export default function LayoutPlotOverlay({
  plots,
  width,
  height,
  statusFilter,
  selectedPlotId,
  onSelectPlot,
  onHoverPlot,
  onHoverEndPlot,
}) {
  const isDimmed = (plot) => statusFilter && statusFilter.size > 0 && !statusFilter.has(plot.status)

  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {plots.map((plot) => {
        const status = PLOT_STATUS[plot.status]
        const dimmed = isDimmed(plot)
        // Each layout's CAD drawing uses its own plot-number font size, so a
        // one-size-fits-all radius either wastes space (dense small-font
        // layouts) or lets the drawing's own printed digits peek out past
        // the circle's edge (large-font layouts) — size from the plot's own
        // extracted text width instead (see scripts/extract-plot-overlays.mjs).
        const r = plot.r || DEFAULT_R
        const fontSize = Math.max(13, Math.min(20, Math.round(r * 0.8)))
        return (
          <g
            key={plot.id}
            data-plot-id={plot.id}
            data-cursor="View"
            tabIndex={0}
            role="button"
            aria-label={`Plot ${plot.number}, ${status.label}`}
            onClick={() => onSelectPlot(plot)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectPlot(plot)
              }
            }}
            onMouseEnter={(e) => onHoverPlot(plot, e.clientX, e.clientY)}
            onMouseMove={(e) => onHoverPlot(plot, e.clientX, e.clientY)}
            onMouseLeave={onHoverEndPlot}
            onFocus={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              onHoverPlot(plot, rect.left + rect.width / 2, rect.top)
            }}
            onBlur={onHoverEndPlot}
            style={{ cursor: 'pointer', outline: 'none', opacity: dimmed ? 0.25 : 1, pointerEvents: 'auto' }}
          >
            <circle
              cx={plot.x}
              cy={plot.y}
              r={r}
              fill={status.fill}
              fillOpacity={0.85}
              stroke={plot.id === selectedPlotId ? '#0051d5' : status.stroke}
              strokeWidth={plot.id === selectedPlotId ? 4 : 2}
            />
            <text
              x={plot.x}
              y={plot.y + fontSize * 0.35}
              textAnchor="middle"
              fontSize={fontSize}
              fontWeight={600}
              fill={status.text}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {plot.number}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
