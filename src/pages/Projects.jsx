import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import MagneticButton from '../components/MagneticButton'
import ParallaxImage from '../components/ParallaxImage'
import InvestmentCalculator from '../components/InvestmentCalculator'
import { TESTIMONIALS } from '../data/testimonials'
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
// share the same benefits checklist; only acreage, price/sq.yd, and location
// differ. Locations are taken from the real ETOR City site photography.
const PACKAGE_PERKS = [
  '3 Crores Yield Benefits',
  '100% Cash Back In 100 Months',
  'River View Plots',
  "First Time In India — 100% Organic Dairy Farm",
  '3 Star Free Accommodation & Recreation',
  '100% Free Maintenance By The Company',
  'Costliest Miyazaki Mango Plantation',
]

const PROJECTS = [
  {
    id: 'city-1',
    category: 'city-1',
    badge: '250 Acres',
    tag: 'Rs 3999 / Sq.yd',
    location: 'Sariapalle',
    title: 'ETOR City 1',
    image: etorCity1,
    span: 'lg:col-span-8',
    stats: [
      { label: 'Yield Potential', value: '3 Crores' },
      { label: 'Cashback', value: '100%' },
      { label: 'Landscape', value: 'River View' },
    ],
  },
  {
    id: 'city-2',
    category: 'city-2',
    badge: '120 Acres',
    tag: 'Rs 3999 / Sq.yd',
    location: 'Sottadivalasa',
    title: 'ETOR City 2',
    image: etorCity2,
    span: 'lg:col-span-4',
    description: 'Exclusive boutique plantation community focusing on high-density Miyazaki Mango cultivation.',
    features: [
      { icon: 'eco', label: 'Organic Dairy Farm' },
      { icon: 'water_drop', label: 'River View Plots' },
    ],
  },
  {
    id: 'city-3-4',
    category: 'city-3-4',
    badge: '1600',
    badgeLabel: 'Acres Total',
    tag: 'Rs 4999 / Sq.yd',
    location: 'Ichapuram',
    title: 'ETOR City 3 & 4',
    image: etorCity34,
    span: 'lg:col-span-12',
    description:
      'Our flagship mega-development featuring a master-planned ecosystem of luxury living and commercial plantations.',
    features: [
      { icon: 'verified_user', label: 'Security', sub: '100% Free Maintenance' },
      { icon: 'trending_up', label: 'Returns', sub: '100% Cash Back In 100 Months' },
    ],
  },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const visibleProjects = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative pt-xl pb-lg overflow-hidden bg-surface-container-low">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

        <div className="relative max-w-container-max mx-auto px-margin-mobile lg:px-xl space-y-lg">
          <Reveal tag="div" className="max-w-2xl">
            <Eyebrow>Our Portfolio</Eyebrow>
            <h1 className="font-display text-display-lg-mobile lg:text-display-lg text-primary mt-md">
              Choose Your <br />
              <span className="italic text-secondary">Favourite</span> Packages
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

      {/* Bento grid */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-secondary/60 transition-[border-color,box-shadow] duration-300 h-[450px] lg:h-[500px] ${project.span}`}
                >
                  {project.id === 'city-3-4' ? (
                    <div className="flex flex-col lg:flex-row w-full h-full bg-primary">
                      <ParallaxImage src={project.image} alt={project.title} className="lg:w-1/2 h-56 lg:h-full" />
                      <div className="lg:w-1/2 p-lg lg:p-xl flex flex-col justify-center text-on-primary relative">
                        <div className="absolute top-lg right-lg w-24 h-24 rounded-full bg-secondary flex flex-col items-center justify-center rotate-6 shadow-xl">
                          <span className="font-display text-headline-md leading-none">{project.badge}</span>
                          <span className="font-body text-[10px] uppercase tracking-widest">{project.badgeLabel}</span>
                        </div>
                        <p className="font-body text-label-md text-secondary uppercase tracking-widest mb-xs">
                          {project.tag} · {project.location}
                        </p>
                        <h3 className="font-display text-headline-lg mb-md pr-24">{project.title}</h3>
                        <p className="font-body text-body-md text-on-primary/70 mb-lg max-w-[28rem]">{project.description}</p>
                        <div className="space-y-sm mb-lg">
                          {project.features.map((feature) => (
                            <div key={feature.label} className="flex items-center gap-sm">
                              <span className="material-symbols-outlined text-secondary text-[20px]">{feature.icon}</span>
                              <span className="font-body text-body-sm">
                                {feature.label} — {feature.sub}
                              </span>
                            </div>
                          ))}
                        </div>
                        <a
                          href="/downloads/etor-city-master-plan.pdf"
                          download
                          className="inline-flex items-center gap-sm w-fit px-lg py-sm bg-on-primary text-primary rounded-full font-body text-label-md uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors"
                        >
                          Download Master Plan
                          <span className="material-symbols-outlined text-[18px]">download_2</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ParallaxImage src={project.image} alt={project.title} className="w-full h-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />

                      <div
                        className={`absolute ${project.id === 'city-1' ? 'top-lg right-lg' : 'top-lg left-lg'} px-md py-xs rounded-full bg-secondary text-on-secondary font-body text-label-md uppercase tracking-widest`}
                      >
                        {project.badge}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-lg text-on-primary">
                        {project.tag && (
                          <p className="font-body text-label-md text-secondary uppercase tracking-widest mb-sm">
                            {project.tag} · {project.location}
                          </p>
                        )}
                        <h3 className="font-display text-headline-lg mb-sm">{project.title}</h3>

                        {project.description && (
                          <p className="font-body text-body-sm text-on-primary/70 mb-md max-w-[24rem]">{project.description}</p>
                        )}

                        {project.stats && (
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-md items-center pt-md border-t border-on-primary/20">
                            {project.stats.map((stat) => (
                              <div key={stat.label}>
                                <p className="font-display text-headline-md leading-none">{stat.value}</p>
                                <p className="font-body text-[11px] text-on-primary/60 uppercase tracking-widest">
                                  {stat.label}
                                </p>
                              </div>
                            ))}
                            <Link
                              to="/contact"
                              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center justify-self-end hover:scale-110 transition-transform"
                              aria-label={`Enquire about ${project.title}`}
                            >
                              <span className="material-symbols-outlined text-on-secondary text-[20px]">arrow_outward</span>
                            </Link>
                          </div>
                        )}

                        {project.features && (
                          <div className="flex items-center gap-lg pt-md border-t border-on-primary/20">
                            {project.features.map((feature) => (
                              <div key={feature.label} className="flex items-center gap-sm">
                                <span className="material-symbols-outlined text-secondary text-[20px]">{feature.icon}</span>
                                <span className="font-body text-body-sm">{feature.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Investment calculator */}
      <section className="py-xl bg-surface-container">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Investment Calculator</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-primary mt-md mb-md">
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
            <h2 className="font-display text-headline-xl text-primary mt-md">Invest Smart, Pick Your Package</h2>
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

      {/* Investor testimonial — the one PDF testimonial specifically from a
          real-estate investor, most relevant to a packages/projects page */}
      <section className="relative py-xl bg-primary overflow-hidden">
        <span
          className="material-symbols-outlined absolute -top-10 -left-10 text-on-primary/5 pointer-events-none select-none"
          style={{ fontSize: '280px' }}
          aria-hidden="true"
        >
          format_quote
        </span>

        <Reveal tag="div" className="relative max-w-[42rem] mx-auto px-margin-mobile lg:px-xl text-center">
          <div className="flex justify-center gap-xs mb-lg" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="material-symbols-outlined text-secondary text-[20px]">
                star
              </span>
            ))}
          </div>
          <p className="font-display text-headline-lg text-on-primary leading-relaxed mb-lg">
            "{TESTIMONIALS[0].quote}"
          </p>
          <div className="flex items-center justify-center gap-md">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary-container flex items-center justify-center text-on-secondary font-display text-headline-md shrink-0">
              {TESTIMONIALS[0].name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="font-display text-headline-md text-on-primary leading-none">{TESTIMONIALS[0].name}</p>
              <p className="font-body text-body-sm text-secondary mt-xs">{TESTIMONIALS[0].role}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal
            tag="div"
            className="rounded-[2.5rem] bg-surface-container-low border border-outline-variant/30 p-xl text-center"
          >
            <div className="inline-block px-lg py-xs bg-secondary/10 rounded-full mb-lg">
              <span className="font-body text-label-md text-secondary uppercase tracking-[0.3em]">
                Limited Availability
              </span>
            </div>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-primary mb-md">
              Start Your Investment Journey
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-xl">
              Connect with our strategic advisors today to find the package that aligns perfectly with your financial
              vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <MagneticButton
                as={Link}
                to="/contact"
                className="px-xl py-md bg-primary text-on-primary rounded-full font-body text-label-md uppercase tracking-widest inline-flex justify-center"
              >
                Book A Consultation
              </MagneticButton>
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="px-xl py-md border border-outline-variant text-primary rounded-full font-body text-label-md uppercase tracking-widest hover:bg-surface-container transition-colors"
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
