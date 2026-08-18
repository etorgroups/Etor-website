import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import KineticHeadline from '../components/KineticHeadline'
import Disclosure from '../components/Disclosure'
import LayoutImageViewer from '../components/LayoutMap/LayoutImageViewer'
import PlotMapLegend from '../components/PlotMap/PlotMapLegend'
import PlotDetailPanel from '../components/PlotMap/PlotDetailPanel'
import { CITY_META } from '../data/plotMap'
import { getLayout, getLayoutsForCity } from '../data/layouts'
import { getPlotOverlayLoader } from '../data/plotOverlays'

export default function LayoutPlots() {
  const { cityId, layoutSlug } = useParams()
  const meta = CITY_META[cityId] ?? CITY_META['city-1']
  const layout = getLayout(cityId, layoutSlug)
  const siblingCount = getLayoutsForCity(cityId).length

  const [plots, setPlots] = useState(null)
  useEffect(() => {
    setPlots(null)
    const loader = getPlotOverlayLoader(cityId, layoutSlug)
    if (!loader) return undefined
    let cancelled = false
    loader().then((data) => {
      if (!cancelled) setPlots(data)
    })
    return () => {
      cancelled = true
    }
  }, [cityId, layoutSlug])

  const [activeFilters, setActiveFilters] = useState(() => new Set())
  const [selectedPlot, setSelectedPlot] = useState(null)

  const counts = useMemo(() => {
    const result = { available: 0, sold: 0, booked: 0, hold: 0 }
    if (!plots) return result
    plots.forEach((plot) => {
      result[plot.status] = (result[plot.status] ?? 0) + 1
    })
    return result
  }, [plots])

  const handleToggleFilter = (status) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(status)) next.delete(status)
      else next.add(status)
      return next
    })
  }

  if (!layout) {
    return (
      <div className="flex flex-col w-full py-xl text-center">
        <p className="font-body text-body-lg text-on-surface-variant mb-md">That layout couldn't be found.</p>
        <Link to={`/projects/${cityId}/layouts`} className="text-secondary underline">
          View {meta.title} layouts
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <section className="relative pt-xl pb-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="flex flex-wrap items-start justify-between gap-md mb-md">
            <div>
              <Link
                to={`/projects/${cityId}/layouts`}
                className="flex w-fit items-center gap-xs font-body text-label-md text-on-surface-variant hover:text-secondary transition-colors mb-sm"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                {siblingCount > 1 ? `All ${meta.title} Layouts` : 'Back to Projects'}
              </Link>
              <Eyebrow>{meta.title}</Eyebrow>
              <KineticHeadline
                tag="h1"
                className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-surface mt-md"
              >
                {layout.name}
              </KineticHeadline>
              <p className="font-body text-body-md text-on-surface-variant mt-xs">
                {layout.location}
                {layout.plotCount ? ` · ${layout.plotCount} plots` : ''}
              </p>
              <p className="font-body text-body-sm text-on-surface-variant mt-xs">
                This plot is managed by ETOR for 33 years — your benefit is sized to what you choose.{' '}
                <Link to="/services" className="text-secondary hover:underline">
                  See dairy & plantation tiers →
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap items-start gap-md">
              {plots && (
                <div className="flex gap-md">
                  <div className="text-center px-md">
                    <p className="font-display text-headline-lg text-on-surface">{plots.length}</p>
                    <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest">
                      Total Plots
                    </p>
                  </div>
                  <div className="text-center px-md border-l border-outline-variant/30">
                    <p className="font-display text-headline-lg text-tertiary">{counts.available}</p>
                    <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest">
                      Available
                    </p>
                  </div>
                  <div className="text-center px-md border-l border-outline-variant/30">
                    <p className="font-display text-headline-lg text-error">{counts.sold}</p>
                    <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest">Sold</p>
                  </div>
                </div>
              )}
              <a
                href={layout.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-sm px-lg py-sm bg-surface border border-outline-variant/40 text-on-surface rounded-full font-body text-label-md uppercase tracking-widest hover:border-secondary/60 hover:text-secondary transition-colors shrink-0"
              >
                Directions
                <span className="material-symbols-outlined text-[18px]">directions</span>
              </a>
              <a
                href={layout.pdf}
                download
                className="inline-flex items-center gap-sm px-lg py-sm bg-primary text-on-primary rounded-full font-body text-label-md uppercase tracking-widest hover:bg-secondary transition-colors shrink-0"
              >
                Download Full PDF
                <span className="material-symbols-outlined text-[18px]">download</span>
              </a>
            </div>
          </Reveal>

          {plots && (
            <Reveal tag="div" delay={0.1}>
              <PlotMapLegend counts={counts} activeFilters={activeFilters} onToggle={handleToggleFilter} />
            </Reveal>
          )}
        </div>
      </section>

      <section className="py-lg bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div">
            <LayoutImageViewer
              layout={layout}
              plots={plots}
              statusFilter={activeFilters}
              selectedPlotId={selectedPlot?.id}
              onSelectPlot={setSelectedPlot}
            />
          </Reveal>

          <div className="mt-md flex flex-wrap items-start justify-between gap-md">
            <p className="font-body text-body-sm text-on-surface-variant max-w-2xl">
              {plots
                ? 'Tap or click any plot number for details. Drag to pan, scroll or pinch to zoom.'
                : `This is ETOR Group's official surveyed layout — drag to pan, scroll or pinch to zoom in on any plot number.`}{' '}
              {layout.note || 'For current availability on any specific plot, speak to an advisor.'}
            </p>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-xs font-body text-label-md uppercase tracking-widest text-secondary"
            >
              Ask About a Plot
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <Disclosure className="mt-lg">
            Plot numbers and dimensions are as shown in ETOR Group's official survey documents.
            {plots
              ? ' Availability shown here is an illustrative example, not live inventory — confirm the current status of any plot with an advisor.'
              : ' Availability is confirmed directly with an advisor, not shown live on this page.'}
          </Disclosure>
        </div>
      </section>

      <PlotDetailPanel plot={selectedPlot} cityTitle={layout.name} onClose={() => setSelectedPlot(null)} />
    </div>
  )
}
