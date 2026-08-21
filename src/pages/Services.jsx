import { Link } from 'react-router-dom'
import SEO, { buildBreadcrumbs, ORGANIZATION_ID } from '../components/SEO'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import KineticHeadline from '../components/KineticHeadline'
import MaskReveal from '../components/MaskReveal'
import MagneticButton from '../components/MagneticButton'
import TiltCard from '../components/TiltCard'
import InvestJourney from '../components/InvestJourney'
import { INVEST_STEPS } from '../data/investSteps'
import assetLivingPortfolio from '../assets/images/asset-living-portfolio.webp'
import assetDairy from '../assets/images/asset-organic-dairy.webp'

const SERVICES_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Managed Land & Agriculture Investment',
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'State', name: 'Andhra Pradesh' },
    description:
      "ETOR City's living-asset portfolio: managed land, orchard plantation crops, and an organic dairy income programme, with 33 years of maintenance included.",
  },
  buildBreadcrumbs([{ name: 'Living Assets', path: '/services' }]),
]

// ETOR Organic Dairy Farm — real figures from the brochure, not a consumer
// milk-delivery feature list (this is a plot add-on programme, not a
// storefront, so the copy and CTA below are grounded in that).
const DAIRY_FACTS = [
  { icon: 'eco', title: '100% Organic Feed', body: "Cows are fed 100% organic feed, per the brochure's stated standard." },
  { icon: 'water_drop', title: 'Gosthani River Irrigation', body: '9.5 pH river water used to feed and maintain herd health.' },
  { icon: 'payments', title: '₹25,000 / Month', body: 'Brochure example: for 100 months, on a ₹5,00,000 plot top-up.' },
  { icon: 'handshake', title: '50:50 Income Share', body: 'Income is shared between the company and client, per the brochure.' },
]

// The brochure's own top-up size → herd size → monthly return table — kept
// as its own small dataset (rather than folded into DAIRY_FACTS above)
// since it's a table, not a bullet fact.
const DAIRY_TIERS = [
  { area: '125 sq.yd', cows: 1, monthly: '₹3,000' },
  { area: '150 sq.yd', cows: 2, monthly: '₹6,000' },
  { area: '250 sq.yd', cows: 5, monthly: '₹15,000' },
  { area: '300 sq.yd', cows: 6, monthly: '₹18,000' },
]

// The brochure's "Plot Area & Plantation Details" table — how many of each
// plant type a plot actually carries, by plot size. Consistent across both
// brochure documents, unlike the more granular per-plant growth table (see
// note in the section below), so safe to publish as-is.
const PLANTATION_TIERS = [
  { area: '200 sq.yd', sandalwood: 25, custardApple: 25, dragonFruit: 30, miyazaki: 3, investment: '₹10,00,000', roi12yr: '₹3,62,70,000' },
  { area: '250 sq.yd', sandalwood: 30, custardApple: 30, dragonFruit: 25, miyazaki: 3, investment: '₹10,00,000', roi12yr: '₹4,16,70,000' },
  { area: '500 sq.yd', sandalwood: 60, custardApple: 60, dragonFruit: 50, miyazaki: 6, investment: '₹20,00,000', roi12yr: '₹8,33,40,000' },
]

export default function Services() {
  return (
    <div className="flex flex-col w-full">
      <SEO
        title="Living Assets — Plantation & Dairy Income on Every Plot"
        description="Every ETOR City plot is a managed, living portfolio: Miyazaki mango, sandalwood, dragon fruit and an organic dairy income stream, maintained for 33 years."
        path="/services"
        schema={SERVICES_SCHEMA}
      />
      {/* Hero */}
      <section className="relative py-xl overflow-hidden bg-gradient-to-br from-surface via-secondary-fixed/40 to-surface">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
            <Reveal tag="div" className="lg:col-span-7 space-y-lg">
              <Eyebrow>One living portfolio</Eyebrow>
              <KineticHeadline
                tag="h1"
                className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-surface leading-tight"
              >
                Land, cultivation and <span className="text-secondary-strong">long-term value.</span>
              </KineticHeadline>
              <MaskReveal tag="p" className="font-body text-body-lg text-on-surface-variant max-w-[36rem]">
                ETOR City sits at the centre of ETOR Group's living-asset portfolio: managed land, orchards
                and an organic dairy farm you can see and visit — not just numbers on a screen. ETOR manages
                every plot for 33 years, and what it earns you is sized to its size — see below.
              </MaskReveal>
              <div className="flex items-center gap-lg flex-wrap">
                <MagneticButton
                  as={Link}
                  to="/projects"
                  className="group px-xl py-md bg-primary text-on-primary rounded-full font-body text-label-md uppercase tracking-widest inline-flex items-center gap-sm"
                >
                  Explore Portfolio
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </MagneticButton>
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 border-2 border-surface flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary-strong text-[22px]">verified</span>
                  </div>
                  <span className="font-body text-body-sm text-on-surface-variant">100% Cashback — programme term</span>
                </div>
              </div>
            </Reveal>

            <Reveal tag="div" delay={0.15} x={30} y={0} className="lg:col-span-5 relative">
              <TiltCard>
                <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                  <img
                    src={assetLivingPortfolio}
                    alt="Orchard rows and open pasture leading to a dairy shelter across ETOR City's managed land"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                </div>
              </TiltCard>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-surface/95 backdrop-blur-xl rounded-2xl p-md shadow-xl border border-outline-variant/30">
                <p className="font-body text-label-md text-on-surface-variant uppercase tracking-widest mb-xs">
                  4 ETOR City locations
                </p>
                <p className="font-body text-body-sm text-on-surface">Sariapalli · Sottadivalasa · Ichapuram</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Other ventures teaser — low-emphasis by design; the full index lives
          at /other-ventures so it doesn't compete with the land story above. */}
      <section className="py-lg bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal
            tag="div"
            className="flex flex-col sm:flex-row items-center justify-between gap-md rounded-2xl border border-outline-variant/20 bg-surface-container-low px-lg py-md"
          >
            <p className="font-body text-body-sm text-on-surface-variant">
              ETOR Group also runs ROI, Gaming, Forex, Crypto and other ventures, separate from ETOR City.
            </p>
            <Link
              to="/other-ventures"
              className="inline-flex items-center gap-xs font-body text-label-md uppercase tracking-widest text-secondary-strong shrink-0"
            >
              See Other Ventures
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ETOR Milk */}
      <section className="relative py-xl bg-primary overflow-hidden">
        <span
          className="material-symbols-outlined absolute -bottom-10 -right-10 text-on-primary/5 pointer-events-none select-none"
          style={{ fontSize: '400px' }}
          aria-hidden="true"
        >
          agriculture
        </span>

        <div className="relative max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <Reveal tag="div" x={-30} y={0} className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-[2rem] overflow-hidden ring-1 ring-on-primary/10">
                <img
                  src={assetDairy}
                  alt="ETOR Organic Dairy Farm"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-surface rounded-2xl p-md shadow-xl flex items-center gap-sm">
                <span className="material-symbols-outlined text-secondary-strong">verified</span>
                <div>
                  <p className="font-body text-label-md text-on-surface leading-none">100% Organic</p>
                  <p className="font-body text-body-sm text-on-surface-variant">Certified Quality</p>
                </div>
              </div>
            </Reveal>

            <Reveal tag="div" delay={0.15} x={30} y={0} className="order-1 lg:order-2 space-y-lg">
              <Eyebrow tone="dark">Living Asset</Eyebrow>
              <h2 className="font-display text-headline-xl text-on-primary">ETOR Organic Dairy Farm</h2>
              <p className="font-body text-body-lg text-on-primary/70">
                A herd raised on 100% organic feed and irrigated with Gosthani river water — a plot add-on, not a
                separate product to buy.
              </p>

              <div className="grid grid-cols-2 gap-md">
                {DAIRY_FACTS.map((fact) => (
                  <div key={fact.title} className="flex items-start gap-sm">
                    <span className="material-symbols-outlined text-secondary-strong shrink-0">{fact.icon}</span>
                    <div>
                      <p className="font-body text-label-md text-on-primary">{fact.title}</p>
                      <p className="font-body text-body-sm text-on-primary/60">{fact.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-on-primary/5 border border-on-primary/10 p-md">
                <p className="font-body text-label-md text-on-primary uppercase tracking-widest mb-sm">
                  Top-up size → herd size → monthly return
                </p>
                <table className="w-full text-left font-body text-body-sm">
                  <thead>
                    <tr className="text-on-primary/50 uppercase text-[11px] tracking-widest">
                      <th className="py-xs pr-md">Plot top-up</th>
                      <th className="py-xs pr-md">Cows</th>
                      <th className="py-xs">Monthly return</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DAIRY_TIERS.map((tier) => (
                      <tr key={tier.area} className="border-t border-on-primary/10">
                        <td className="py-xs pr-md text-on-primary">{tier.area}</td>
                        <td className="py-xs pr-md text-on-primary/70">{tier.cows}</td>
                        <td className="py-xs text-secondary-strong font-medium">{tier.monthly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <MagneticButton
                as={Link}
                to="/contact"
                className="px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest inline-flex"
              >
                Ask About the Dairy Programme
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Plot Area & Plantation Details — how many of each plant a plot
          actually carries, straight from the brochure's own table. */}
      <section className="py-xl bg-background overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Per-plot plantation</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-on-surface mt-md mb-md">
              What's actually planted on your plot.
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Plant counts and the crop-only 12-year return, by plot size — as printed in ETOR
              Group's brochure.
            </p>
          </Reveal>

          <p className="sm:hidden flex items-center justify-center gap-xs mb-sm font-body text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">swipe</span>
            Swipe to see Investment &amp; ROI
          </p>
          <Reveal tag="div" className="relative rounded-3xl bg-surface-container-low border border-outline-variant/30">
            <div className="p-lg lg:p-xl overflow-x-auto">
              <table className="w-full text-left font-body text-body-sm min-w-[34rem]">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-on-surface-variant uppercase text-[11px] tracking-widest">
                    <th className="py-sm pr-md">Plot size</th>
                    <th className="py-sm pr-md">Sandalwood</th>
                    <th className="py-sm pr-md">Custard apple</th>
                    <th className="py-sm pr-md">Dragon fruit</th>
                    <th className="py-sm pr-md">Miyazaki mango</th>
                    <th className="py-sm pr-md">Investment</th>
                    <th className="py-sm">Crop ROI · 12 yrs</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANTATION_TIERS.map((tier) => (
                    <tr key={tier.area} className="border-b border-outline-variant/15">
                      <td className="py-sm pr-md text-on-surface font-medium">{tier.area}</td>
                      <td className="py-sm pr-md text-on-surface-variant">{tier.sandalwood} plants</td>
                      <td className="py-sm pr-md text-on-surface-variant">{tier.custardApple} plants</td>
                      <td className="py-sm pr-md text-on-surface-variant">{tier.dragonFruit} plants</td>
                      <td className="py-sm pr-md text-on-surface-variant">{tier.miyazaki} plants</td>
                      <td className="py-sm pr-md text-on-surface-variant">{tier.investment}</td>
                      <td className="py-sm text-secondary-strong font-medium">{tier.roi12yr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              aria-hidden="true"
              className="sm:hidden pointer-events-none absolute top-0 right-0 h-full w-10 rounded-r-3xl bg-gradient-to-l from-surface-container-low to-transparent"
            />
          </Reveal>
        </div>
      </section>

      {/* How to Invest */}
      <section className="py-xl bg-background overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Your Step-by-Step Guide</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-on-surface mt-md mb-md">
              How to Invest with ETOR Group
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Five simple steps — from initial inquiry to sustained growth, fully supported by our team.
            </p>
          </Reveal>

          <InvestJourney steps={INVEST_STEPS} />
        </div>
      </section>

      {/* Investment CTA */}
      {/* A flat solid fill this large reads flat no matter how good the
          underlying color is -- a soft directional highlight plus a gentle
          opposite-corner vignette is what turns a "color swatch" into
          something with real depth, the same treatment premium banner/CTA
          sections use instead of a dead-flat fill. */}
      <section
        className="relative py-xl overflow-hidden bg-secondary bg-[radial-gradient(circle_at_18%_-15%,rgb(255_255_255_/_0.22),transparent_60%),radial-gradient(circle_at_100%_115%,rgb(0_0_0_/_0.2),transparent_55%)]"
      >
        <Reveal tag="div" className="relative z-10 max-w-container-max mx-auto px-margin-mobile lg:px-xl text-center">
          <h2 className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-secondary mb-md">
            Ready when you are.
          </h2>
          <p className="font-body text-body-lg text-on-secondary/80 mb-sm">Packages starting from</p>
          <p className="font-display text-display-xl text-on-secondary mb-xl">
            ₹3,999 <span className="font-body text-body-md align-top tracking-normal">per sq.yd</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center">
            <MagneticButton
              as={Link}
              to="/contact"
              className="w-full sm:w-auto px-xl py-md bg-primary text-on-primary rounded-full font-body text-label-md uppercase tracking-widest shadow-xl inline-flex justify-center whitespace-nowrap"
            >
              Speak to ETOR
            </MagneticButton>
            <Link
              to="/projects"
              className="w-full sm:w-auto px-xl py-md border border-on-secondary/40 text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest hover:bg-on-secondary/10 transition-colors text-center whitespace-nowrap"
            >
              View ETOR City Packages
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
