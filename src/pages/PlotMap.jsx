import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SEO, { buildBreadcrumbs } from '../components/SEO'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import KineticHeadline from '../components/KineticHeadline'
import PlotMapCanvas from '../components/PlotMap/PlotMapCanvas'
import PlotMapLegend from '../components/PlotMap/PlotMapLegend'
import PlotDetailPanel from '../components/PlotMap/PlotDetailPanel'
import usePanZoom from '../components/PlotMap/usePanZoom'
import { CITY_META, flattenPlots, getCityPlotMap } from '../data/plotMap'

export default function PlotMap() {
  const { cityId } = useParams()
  const cityMap = useMemo(() => getCityPlotMap(cityId), [cityId])
  const meta = CITY_META[cityId] ?? CITY_META['city-1']

  const panZoom = usePanZoom()
  const [activeFilters, setActiveFilters] = useState(() => new Set())
  const [selectedPlot, setSelectedPlot] = useState(null)

  const plots = useMemo(() => flattenPlots(cityMap), [cityMap])

  const counts = useMemo(() => {
    const result = { available: 0, sold: 0, booked: 0, hold: 0 }
    plots.forEach((plot) => {
      result[plot.status] = (result[plot.status] ?? 0) + 1
    })
    return result
  }, [plots])

  const handleToggleFilter = (status) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(status)) {
        next.delete(status)
      } else {
        next.add(status)
      }
      return next
    })
  }

  const pricePerSqYd = plots[0]?.pricePerSqYd

  return (
    <div className="flex flex-col w-full">
      <SEO
        title={`${meta.title} Live Plot Map — ${meta.location}`}
        description={`Live plot availability for ${meta.title} in ${meta.location}, Andhra Pradesh — ${counts.available} plots available, ${counts.sold} sold, updated from real inventory.`}
        path={`/projects/${cityId}/plots`}
        schema={buildBreadcrumbs([
          { name: 'Projects', path: '/projects' },
          { name: `${meta.title} Plot Map`, path: `/projects/${cityId}/plots` },
        ])}
      />
      <section className="relative pt-xl pb-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="flex flex-wrap items-start justify-between gap-md mb-md">
            <div>
              <Link
                to="/projects"
                className="flex w-fit items-center gap-xs font-body text-label-md text-on-surface-variant hover:text-secondary transition-colors mb-sm"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to All Projects
              </Link>
              <Eyebrow>Live Plot Availability</Eyebrow>
              <KineticHeadline
                tag="h1"
                className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-surface mt-md"
              >
                {meta.title}
              </KineticHeadline>
              <p className="font-body text-body-md text-on-surface-variant mt-xs">
                {meta.location}
                {pricePerSqYd ? ` · ₹${pricePerSqYd.toLocaleString('en-IN')} / sq.yd` : ''}
              </p>
            </div>

            <div className="flex flex-wrap items-start gap-md">
              <div className="flex gap-md">
                <div className="text-center px-md">
                  <p className="font-display text-headline-lg text-on-surface">{plots.length}</p>
                  <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest">Total Plots</p>
                </div>
                <div className="text-center px-md border-l border-outline-variant/30">
                  <p className="font-display text-headline-lg text-tertiary">{counts.available}</p>
                  <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest">Available</p>
                </div>
                <div className="text-center px-md border-l border-outline-variant/30">
                  <p className="font-display text-headline-lg text-error">{counts.sold}</p>
                  <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest">Sold</p>
                </div>
              </div>
              <a
                href={meta.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-sm px-lg py-sm bg-surface border border-outline-variant/40 text-on-surface rounded-full font-body text-label-md uppercase tracking-widest hover:border-secondary/60 hover:text-secondary transition-colors shrink-0"
              >
                Directions
                <span className="material-symbols-outlined text-[18px]">directions</span>
              </a>
            </div>
          </Reveal>

          <Reveal tag="div" delay={0.1}>
            <PlotMapLegend counts={counts} activeFilters={activeFilters} onToggle={handleToggleFilter} />
          </Reveal>
        </div>
      </section>

      <section className="py-lg bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div">
            <PlotMapCanvas
              cityMap={cityMap}
              panZoom={panZoom}
              statusFilter={activeFilters}
              selectedPlotId={selectedPlot?.id}
              onSelectPlot={setSelectedPlot}
            />
          </Reveal>

          <p className="font-body text-body-sm text-on-surface-variant mt-md max-w-2xl">
            Tap or click any plot for full details, including who holds it and when for sold or booked plots — this
            layout reflects live inventory and updates as plots are booked.
          </p>
        </div>
      </section>

      <PlotDetailPanel plot={selectedPlot} cityTitle={meta.title} onClose={() => setSelectedPlot(null)} />
    </div>
  )
}
