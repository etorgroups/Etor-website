import { Link, useParams } from 'react-router-dom'
import SEO, { buildBreadcrumbs } from '../components/SEO'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import KineticHeadline from '../components/KineticHeadline'
import LayoutCardMedia from '../components/LayoutMap/LayoutCardMedia'
import { CITY_META } from '../data/plotMap'
import { getLayoutsForCity } from '../data/layouts'

export default function Layouts() {
  const { cityId } = useParams()
  const meta = CITY_META[cityId] ?? CITY_META['city-1']
  const layouts = getLayoutsForCity(cityId)

  return (
    <div className="flex flex-col w-full">
      <SEO
        title={`${meta.title} Layouts — ${meta.location}`}
        description={`${layouts.length} real surveyed layout blocks for ${meta.title} in ${meta.location}, Andhra Pradesh — view the full plot map for each.`}
        path={`/projects/${cityId}/layouts`}
        schema={buildBreadcrumbs([
          { name: 'Projects', path: '/projects' },
          { name: `${meta.title} Layouts`, path: `/projects/${cityId}/layouts` },
        ])}
      />
      <section className="relative pt-xl pb-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-2xl">
            <Link
              to="/projects"
              className="flex w-fit items-center gap-xs font-body text-label-md text-on-surface-variant hover:text-secondary transition-colors mb-sm"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to All Projects
            </Link>
            <Eyebrow>Real Surveyed Layouts</Eyebrow>
            <KineticHeadline
              tag="h1"
              className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-surface mt-md"
            >
              {meta.title} Layouts
            </KineticHeadline>
            <p className="font-body text-body-md text-on-surface-variant mt-xs">
              {layouts.length} surveyed {layouts.length === 1 ? 'block' : 'blocks'} in {meta.location}. Pick one to
              view its full plot layout.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-lg bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {layouts.map((layout, index) => (
              <Reveal key={layout.slug} tag="div" delay={index * 0.06}>
                <Link
                  to={`/projects/${cityId}/${layout.slug}/plots`}
                  className="group block rounded-[1.5rem] overflow-hidden border border-outline-variant/30 bg-surface-container-low hover:border-secondary/60 hover:shadow-2xl transition-[border-color,box-shadow,transform] duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f1ea]">
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                      <LayoutCardMedia
                        images={layout.photos ? [layout.thumb, ...layout.photos] : [layout.thumb]}
                        index={index}
                        alt={`${layout.name} layout thumbnail`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    {layout.plotCount ? (
                      <div className="absolute top-3 right-3 bg-secondary text-on-secondary text-[11px] px-2 py-1 rounded-full font-body shadow-md">
                        {layout.plotCount} plots
                      </div>
                    ) : null}
                  </div>
                  <div className="p-lg flex flex-col justify-between gap-md">
                    <div className="flex items-start gap-md">
                      <div className="min-w-0 flex-1">
                        <h3 title={layout.name} className="font-display text-headline-md text-on-surface mb-xs line-clamp-2">
                          {layout.name}
                        </h3>
                        <p className="font-body text-body-sm text-on-surface-variant mb-sm truncate">{layout.location}</p>
                        {layout.note && (
                          <p className="hidden md:block font-body text-body-xs text-on-surface-variant mb-sm">
                            {layout.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-sm mt-xs">
                      <button
                        type="button"
                        className="px-sm py-xs text-label-sm bg-surface border border-outline-variant/20 rounded-full font-body text-on-surface hover:bg-surface-container-low transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          const link = document.createElement('a')
                          link.href = layout.pdf
                          link.download = ''
                          link.click()
                        }}
                      >
                        Download
                      </button>

                      <span className="inline-flex items-center gap-xs px-sm py-xs bg-secondary/10 text-secondary rounded-full text-label-sm font-body">
                        View Layout
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
