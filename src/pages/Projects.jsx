import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SEO, { buildBreadcrumbs } from '../components/SEO'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import MagneticButton from '../components/MagneticButton'
import ParallaxImage from '../components/ParallaxImage'
import InvestmentCalculator from '../components/InvestmentCalculator'
import SoldTicker from '../components/SoldTicker'
import { PACKAGES } from '../data/packages'
import { getCityPlotMap, flattenPlots } from '../data/plotMap'
import etorCity1 from '../assets/images/etor-city-1.webp'
import etorCity2 from '../assets/images/etor-city-2.webp'
import etorCity34 from '../assets/images/etor-city-3-4.webp'

const FILTERS = [
  { label: 'All Projects', value: 'all' },
  { label: 'City 1', value: 'city-1' },
  { label: 'City 2', value: 'city-2' },
  { label: 'City 3 & 4', value: 'city-3-4' },
]

// Real package details — from Welcome-To-ETOR-GROUP.pdf. All three packages
// share the same benefits checklist; only price/sq.yd and location differ.
const PACKAGE_PERKS = [
  '3 Crores Yield Benefits',
  'Buyback / Cashback Plan Available',
  '100% Cash Back In 100 Months',
  'River View Plots',
  "First Time In India — 100% Organic Dairy Farm",
  '3 Star Free Accommodation & Recreation',
  '100% Free Maintenance By The Company — 33 Years',
  'Costliest Miyazaki Mango Plantation',
]

// One consistent card template for all three cities — pricing comes from
// data/packages.js (single source of truth, shared with the calculator) and
// the "plots available" figure is computed live from the same plot-map data
// SoldTicker uses, rather than a fixed acreage number no brochure page
// actually gives per city.
const PROJECTS = [
  { id: 'city-1', location: 'Sariapalli', title: 'ETOR City 1', image: etorCity1 },
  { id: 'city-2', location: 'Sottadivalasa', title: 'ETOR City 2', image: etorCity2 },
  { id: 'city-3-4', location: 'Ichapuram', title: 'ETOR City 3 & 4', image: etorCity34 },
]

// One Place entry per real location — this is the schema most likely to
// surface ETOR City in "land for sale near [town]" style local searches,
// since it names the actual towns rather than just "Andhra Pradesh".
const PROJECTS_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ETOR City Locations',
    itemListElement: PROJECTS.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Place',
        name: `${project.title}, ${project.location}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: project.location,
          addressRegion: 'Andhra Pradesh',
          addressCountry: 'IN',
        },
      },
    })),
  },
  buildBreadcrumbs([{ name: 'Projects', path: '/projects' }]),
]

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const visibleProjects = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((project) => project.id === filter)),
    [filter],
  )

  return (
    <div className="flex flex-col w-full">
      <SEO
        title="ETOR City Projects — Sariapalli, Sottadivalasa & Ichapuram"
        description="Browse ETOR City land plots across Sariapalli, Sottadivalasa and Ichapuram, Andhra Pradesh — real surveyed layouts, live plot availability, and pricing from ₹3,999/sq.yd."
        path="/projects"
        schema={PROJECTS_SCHEMA}
      />
      {/* Header */}
      <section className="relative pt-xl pb-lg overflow-hidden bg-surface-container-low">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

        <div className="relative max-w-container-max mx-auto px-margin-mobile lg:px-xl space-y-lg">
          <Reveal tag="div" className="max-w-2xl">
            <Eyebrow>Our Portfolio</Eyebrow>
            <h1 className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-surface mt-md">
              Find your place in the <br />
              <span className="text-secondary">ETOR City</span> story
            </h1>
          </Reveal>

          <Reveal tag="div" delay={0.1} className="flex flex-wrap gap-sm">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`px-lg py-sm rounded-full font-body text-label-md uppercase tracking-widest transition-colors ${
                  filter === item.value
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface text-on-surface-variant hover:text-secondary border border-outline-variant/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </Reveal>

          <p aria-live="polite" className="sr-only">
            Showing {visibleProjects.length} of {PROJECTS.length} projects
          </p>
        </div>
      </section>

      <SoldTicker />

      {/* Package cards */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => {
                const pkg = PACKAGES.find((p) => p.id === project.id)
                const available = flattenPlots(getCityPlotMap(project.id)).filter(
                  (p) => p.status === 'available',
                ).length

                return (
                  <motion.div
                    key={project.id}
                    layout
                    data-cursor="Explore"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-secondary/60 transition-[border-color,box-shadow] duration-300 h-[480px]"
                  >
                    <Link to={`/projects/${project.id}/layouts`} className="block absolute inset-0">
                      <ParallaxImage src={project.image} alt={project.title} className="absolute inset-0 w-full h-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />

                      <div className="absolute top-lg left-lg px-md py-xs rounded-full bg-surface/90 backdrop-blur-md font-body text-label-md text-on-surface uppercase tracking-widest">
                        {available} Plots Available
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-lg text-on-primary">
                        <p className="font-body text-label-md text-on-primary/70 uppercase tracking-widest mb-xs">
                          {project.location}
                        </p>
                        <h3 className="font-display text-headline-lg mb-sm">{project.title}</h3>
                        <p className="font-display text-headline-md mb-md">
                          ₹{pkg.pricePerSqYd.toLocaleString('en-IN')}
                          <span className="font-body text-body-sm align-top"> /sq.yd</span>
                        </p>
                        <span className="inline-flex items-center gap-xs px-md py-xs rounded-full bg-on-primary/10 border border-on-primary/25 group-hover:bg-secondary group-hover:border-secondary group-hover:text-on-secondary transition-colors font-body text-label-md uppercase tracking-widest">
                          <span className="material-symbols-outlined text-[16px]">map</span>
                          View Layouts
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Investment calculator */}
      <section className="py-xl bg-surface-container">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Investment Calculator</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-on-surface mt-md mb-md">
              See Your Cashback Timeline
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Pick a package and an area, and see exactly how your 100% cashback breaks down month by month.
            </p>
          </Reveal>

          <Reveal tag="div" className="max-w-[56rem] mx-auto">
            <InvestmentCalculator />
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Every ETOR City Package Includes</Eyebrow>
            <h2 className="font-display text-headline-xl text-on-surface mt-md">Invest Smart, Pick Your Package</h2>
          </Reveal>

          <Reveal tag="div" className="grid grid-cols-1 md:grid-cols-2 gap-md max-w-[48rem] mx-auto">
            {PACKAGE_PERKS.map((perk) => (
              <div key={perk} className="flex items-center gap-sm p-md rounded-xl bg-surface border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                <span className="font-body text-body-sm text-on-surface">{perk}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal
            tag="div"
            className="rounded-[2.5rem] bg-surface-container-low border border-outline-variant/30 p-xl text-center"
          >
            <h2 className="font-display text-headline-xl lg:text-display-lg text-on-surface mb-md">
              Ready to take the next step?
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-xl">
              Review the master plan, ask any question, and decide at your own pace — no pressure, no countdown.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <MagneticButton
                as={Link}
                to="/contact"
                className="w-full sm:w-auto px-xl py-md bg-primary text-on-primary rounded-full font-body text-label-md uppercase tracking-widest inline-flex justify-center whitespace-nowrap"
              >
                Speak to ETOR
              </MagneticButton>
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="w-full sm:w-auto px-xl py-md border border-outline-variant text-on-surface rounded-full font-body text-label-md uppercase tracking-widest hover:bg-surface-container transition-colors whitespace-nowrap"
              >
                View All Plans
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
