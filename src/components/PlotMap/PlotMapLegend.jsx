import { PLOT_STATUS } from '../../data/plotMap'

// Doubles as the legend and the status filter — clicking a swatch toggles
// dimming every plot that isn't that status on the map.
export default function PlotMapLegend({ counts, activeFilters, onToggle }) {
  return (
    <div className="flex flex-wrap items-center gap-sm">
      {Object.entries(PLOT_STATUS).map(([key, status]) => {
        const isActive = activeFilters.size === 0 || activeFilters.has(key)
        return (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            aria-pressed={activeFilters.has(key)}
            className={`flex items-center gap-xs px-md py-xs rounded-full border font-body text-body-sm transition-colors ${
              isActive
                ? 'border-outline-variant/50 bg-surface text-on-surface'
                : 'border-outline-variant/20 bg-transparent text-on-surface-variant/50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: status.dot }} />
            {status.label}
            <span className="font-semibold">{counts[key] ?? 0}</span>
          </button>
        )
      })}
    </div>
  )
}
