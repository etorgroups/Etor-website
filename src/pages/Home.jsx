import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO, { ORGANIZATION_ID, WEBSITE_ID, SITE_URL } from '../components/SEO'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import MagneticButton from '../components/MagneticButton'
import TiltCard from '../components/TiltCard'
import ImageLightbox from '../components/ImageLightbox'
import { publicUrl } from '../lib/basePath'
import { PARTICIPATION_STEPS } from '../data/participationSteps'
import Counter from '../components/Counter'
import GoogleReviews from '../components/GoogleReviews'
import InvestJourney from '../components/InvestJourney'
import InvestmentCalculator from '../components/InvestmentCalculator'
import SoldTicker from '../components/SoldTicker'
import KineticHeadline from '../components/KineticHeadline'
import MaskReveal from '../components/MaskReveal'
import { COMPANY } from '../data/company'
import heroLandscape from '../assets/images/hero-etor-landscape.webp'
import mangoOrchard from '../assets/images/mango-orchard.webp'
import etorCityFlagship from '../assets/images/etor-city-flagship.webp'
import assetMango from '../assets/images/asset-miyazaki-mango.webp'
import assetDairy from '../assets/images/asset-organic-dairy.webp'
import assetSandalwood from '../assets/images/asset-sandalwood.webp'
import assetCustardApple from '../assets/images/asset-custard-apple.webp'
import assetDragonFruit from '../assets/images/asset-dragon-fruit.webp'
import assetGreenSugar from '../assets/images/asset-green-sugar.webp'
import assetAloeVera from '../assets/images/asset-aloe-vera.webp'
import assetAllTimeMango from '../assets/images/asset-all-time-mango.webp'
import etorCity1 from '../assets/images/etor-city-1.webp'
import etorCity2 from '../assets/images/etor-city-2.webp'
import etorCity34 from '../assets/images/etor-city-3-4.webp'
import founderCeo from '../assets/images/founder-ceo.webp'
import awardPlaque from '../assets/images/award-viswaguru-world-records-2026.webp'

// FAQPage lives on Contact (that's the FAQ section's real home) — Home just
// gets the base WebPage type since it's the entry point, not a landing page
// with its own distinct question set.
const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': SITE_URL,
  name: 'ETOR City — Managed Land & Agriculture Investment in Andhra Pradesh',
  description:
    "ETOR Group's managed land and agriculture programme across Andhra Pradesh — plantation crops, an organic dairy income stream, and a 100-month cashback plan.",
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORGANIZATION_ID },
}

const METRICS = [
  { target: 12, suffix: '+', label: 'Years Experience', toneClass: 'text-secondary-strong' },
  { target: 250, suffix: '+', label: 'Acres Across ETOR City', toneClass: 'text-on-surface' },
  { target: 100, suffix: '%', label: 'Cashback In 100 Months', toneClass: 'text-secondary-strong' },
  { value: '4', label: 'ETOR City Locations', toneClass: 'text-on-surface' },
]

const FEATURED_ASSETS = [
  {
    tag: 'Flagship crop',
    title: 'Miyazaki Mango',
    body:
      "ETOR Group's brochure describes Miyazaki mango as the world's most expensive fruit, and ETOR as the first in the real-estate industry to plan a Miyazaki plantation inside a residential-style development.",
    priceTag: '₹2,75,000 / kg',
    highlights: ['Rich in zinc, calcium & vitamins C, E, A, K', 'Served as a welcome fruit at Burj Khalifa & other 5-star hotels'],
    image: assetMango,
    alt: 'Ripe Miyazaki mango still life',
    note: 'Fruit prices are described as market/auction-dependent — see the 12-year example in "Invest smart" below.',
  },
  {
    tag: 'Organic dairy',
    title: 'ETOR Organic Dairy Farm',
    body:
      'A herd raised on 100% organic feed and irrigated with Gosthani river water. The brochure example: a ₹5,00,000 top-up on an existing plot targets ₹25,000 every month for 100 months — ₹25,00,000 in total.',
    image: assetDairy,
    alt: 'Organic dairy farm at first light',
    note: 'Example figures shown as printed in the brochure — a programme term, not a guaranteed return.',
  },
]

// The rest of the orchard mix on every plot — one dedicated product shot
// per crop (same premium dark-studio style as the Miyazaki mango photo
// above), generated via Stitch from the prompts handed to the client.
const PORTFOLIO_CROPS = [
  {
    image: assetSandalwood,
    alt: 'Cross-section of a sandalwood log with a carved sandalwood chip',
    title: 'Sandalwood',
    subtitle: 'Srigandham',
    body: 'Antioxidant, anti-inflammatory & antimicrobial — used in premium cosmetics and perfumes.',
    priceTag: '₹22,000 / kg',
  },
  {
    image: assetCustardApple,
    alt: 'Whole and halved custard apple (sitafal)',
    title: 'Custard Apple',
    subtitle: 'Balanagar Sitafal',
    body: 'Drought-tolerant and low-maintenance across a wide range of soils, high in fibre and antioxidants that support digestion and heart health.',
    priceTag: '₹200 / kg',
  },
  {
    image: assetDragonFruit,
    alt: 'Whole and halved dragon fruit',
    title: 'Dragon Fruit',
    subtitle: 'Red & yellow varieties',
    body: 'Rich in antioxidants — boosts immunity, supports skin and heart health.',
    priceTag: '₹300 / kg',
  },
  {
    image: assetGreenSugar,
    alt: 'Fresh bundle of stevia leaves',
    title: 'Green Sugar',
    subtitle: 'Stevia',
    body: 'A natural, zero-calorie sweetener — a refined-sugar alternative for blood sugar and weight management.',
    priceTag: null,
  },
  {
    image: assetAloeVera,
    alt: 'Aloe vera leaf sliced open revealing the gel inside',
    title: 'Juicy Aloe Vera',
    subtitle: 'Wellness crop',
    body: 'Hydrating and rich in antioxidant compounds — valued for skin, digestion and overall wellness.',
    priceTag: null,
  },
  {
    image: assetAllTimeMango,
    alt: 'Mango orchard heavy with ripe fruit at sunrise',
    title: 'All Time Mango',
    subtitle: '365-day plantation',
    body: 'A year-round mango plantation cycle bred to deliver fresh, premium-quality fruit every season — naturally rich in vitamins A & C, antioxidants and fibre.',
    priceTag: null,
  },
]

const PACKAGES = [
  {
    name: 'ETOR City 1',
    place: 'Sariapalli',
    price: '₹3,999',
    image: etorCity1,
    href: '/projects/city-1/layouts',
  },
  {
    name: 'ETOR City 2',
    place: 'Sottadivalasa',
    price: '₹3,999',
    image: etorCity2,
    href: '/projects/city-2/layouts',
  },
  {
    name: 'ETOR City 3 & 4',
    place: 'Ichapuram',
    price: '₹4,999',
    image: etorCity34,
    href: '/projects/city-3-4/layouts',
  },
]

// Matches the brochure's own "Return on Investment of ₹10,00,000 on 250
// Sq.Yd" table exactly — the base plot ROI row was previously missing here
// and the Sandalwood/Miyazaki 12-year totals were swapped, so the four
// visible rows didn't actually add up to the ₹4,26,70,000 shown below them.
const ROI_EXAMPLE = [
  { crop: 'Plot ROI (base return)', perYear: '₹1,20,000', over12yr: '₹10,00,000' },
  { crop: 'Sandalwood (30 plants)', perYear: '—', over12yr: '₹3,75,00,000' },
  { crop: 'Miyazaki Mango (3 plants)', perYear: '₹3,00,000', over12yr: '₹30,00,000' },
  { crop: 'Custard Apple (30 plants)', perYear: '₹90,000', over12yr: '₹9,00,000' },
  { crop: 'Dragon Fruit (25 plants)', perYear: '₹22,500', over12yr: '₹2,70,000' },
]

const AMENITY_THEMES = [
  {
    title: 'Stay & hospitality',
    icon: 'hotel',
    items: ['Restaurant', 'OTT theatre', '3-star guest accommodation', 'Natural swimming pool', 'Buggies, horse riding & ATV bike riding'],
  },
  {
    title: 'Safety & infrastructure',
    icon: 'shield',
    items: [
      '24-hour security surveillance & trained dog squad',
      '360° CCTV surveillance and solar fencing',
      'Clear title, non-scheduled land, owner name on every plot',
      'Electricity, water and solar, generator & 3-phase power for each plot',
      'Spot registration',
    ],
  },
  {
    title: 'Nature & recreation',
    icon: 'park',
    items: [
      'Green landscaped gardens',
      'Border drip irrigation for every plant, fed by 9.5 pH river water',
      'Walking, cycling & e-biking trails',
      'Vastu-compliant plot planning',
    ],
  },
]

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <SEO
        title="ETOR City — Managed Land & Agriculture Investment in Andhra Pradesh"
        description="Own a managed land & agriculture plot in ETOR City, Andhra Pradesh — plantation crops, organic dairy income, and 100% cashback over 100 months. Plots from ₹3,999/sq.yd."
        path="/"
        schema={HOME_SCHEMA}
      />
      {/* Scene 1 — The ground */}
      {/* bg-primary here has no visible effect (the photo + scrim overlays
          below fully cover it) -- it exists purely so --color-secondary-strong
          resolves to the bright fixed-dim gold for the Eyebrow nested inside,
          matching every other permanently-dark section (see index.css's
          .bg-primary rule). Without it this hero would inherit the light
          theme's cream-tuned darker gold, muted against a dark photo. */}
      <section className="relative w-full min-h-screen flex items-center -mt-20 overflow-hidden bg-primary">
        <motion.img
          src={heroLandscape}
          alt="Premium mango orchard in coastal Andhra Pradesh at first light"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.16 }}
          transition={{ duration: 26, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-primary/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/66 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary/55" />

        <div className="hidden sm:block absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          {[
            { top: '28%', left: '62%', size: 6, delay: '0s' },
            { top: '48%', left: '74%', size: 4, delay: '1.6s' },
            { top: '68%', left: '58%', size: 5, delay: '3.1s' },
            { top: '38%', left: '85%', size: 3, delay: '4.4s' },
            { top: '58%', left: '90%', size: 4, delay: '2.3s' },
          ].map((mote, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-secondary-fixed-dim animate-mote-drift"
              style={{
                top: mote.top,
                left: mote.left,
                width: mote.size,
                height: mote.size,
                animationDelay: mote.delay,
                boxShadow: '0 0 8px 2px var(--color-secondary-fixed-dim)',
              }}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile lg:px-xl pt-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-xl items-center w-full">
            {/* pr-12 clears the always-on ExploreNowTab (fixed, right-0,
                exactly 30px wide at every viewport) below lg — at lg+ this
                column is grid-constrained and never reaches that edge
                anyway. Needs real buffer past the tab's own width, not just
                enough to match it: pr-8 (32px) left only a constant 2px gap
                (32-30) at every screen size, not a safety margin. */}
            <Reveal tag="div" y={30} className="hero-copy w-full pr-12 lg:pr-0 lg:col-span-7 max-w-[42rem] lg:max-w-none">
              <div className="space-y-md">
                <Eyebrow tone="light">
                  ETOR City — Believe In <br className="sm:hidden" />
                  The Future Of Earnings
                </Eyebrow>
                <KineticHeadline
                  tag="h1"
                  className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-primary leading-none"
                >
                  Build value
                  <br />
                  <span className="text-on-primary">that keeps growing.</span>
                </KineticHeadline>
                <p className="font-body text-body-lg text-on-primary max-w-[30rem] drop-shadow-md">
                  One plot. A managed orchard, real income, and a stay that's yours.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-flex mt-lg md:mt-xl"
              >
                <span
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[2rem] bg-secondary/30 blur-2xl animate-glow-pulse"
                />
                <div className="shine-sweep relative inline-flex items-center gap-sm sm:gap-lg rounded-[1.5rem] border border-secondary/40 bg-primary/60 backdrop-blur-md text-on-primary px-md py-sm sm:px-lg sm:py-md shadow-2xl">
                  <span className="material-symbols-outlined text-secondary-fixed-dim text-[22px] sm:text-[32px] shrink-0">trending_up</span>
                  <div>
                    <p className="font-body text-label-md uppercase tracking-widest text-on-primary/60">Projected Return</p>
                    <p className="font-display text-headline-md sm:text-display-lg-mobile leading-none text-secondary-fixed-dim whitespace-nowrap">
                      <Counter
                        target={25000}
                        prefix="Rs. "
                        suffix="/mo"
                        duration={1.8}
                        format={(n) => Math.floor(n).toLocaleString('en-IN')}
                      />
                    </p>
                  </div>
                </div>

                {/* Bonus ribbon — a genuine brochure perk (3-star accommodation
                    & recreation), not a discount gimmick, framed like a gift
                    tag attached to the return badge. Pops in after the badge
                    itself has settled, on the site's own dormant tertiary
                    (green) role — already designed to harmonize with the
                    gold/brown palette, just never activated anywhere. */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.4, rotate: -14, x: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6, x: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 1.3 }}
                  className="absolute -top-6 left-2 right-auto sm:left-auto sm:-top-5 sm:-right-5 z-10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-full bg-tertiary-fixed-vivid/50 blur-md animate-glow-pulse"
                  />
                  <div className="relative flex items-center gap-xs rounded-full bg-tertiary-fixed-vivid text-on-tertiary-fixed-vivid pl-sm pr-md py-xs shadow-xl ring-1 ring-on-tertiary-fixed-vivid/15">
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">redeem</span>
                    <span className="font-body text-[10px] sm:text-label-md font-bold uppercase tracking-wide whitespace-nowrap">
                      + Free 3-Star Stay
                    </span>
                  </div>
                </motion.div>
              </motion.div>
              <div className="flex flex-wrap gap-md mt-md sm:mt-lg">
                <MagneticButton
                  as={Link}
                  to="/projects"
                  className="group relative w-full sm:w-auto px-lg sm:px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest overflow-hidden shadow-xl shadow-secondary/30 inline-flex justify-center whitespace-nowrap"
                >
                  <span className="relative z-10 flex items-center gap-sm">
                    Explore ETOR City
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </span>
                </MagneticButton>
              </div>
              <div className="flex flex-wrap items-center gap-x-lg gap-y-sm mt-md">
                <a
                  href="#calculator"
                  className="flex items-center gap-xs font-body text-body-sm text-on-primary/70 hover:text-on-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">calculate</span>
                  Calculate my return
                </a>
                <a
                  href="#reviews"
                  className="flex items-center gap-xs font-body text-body-sm text-on-primary/70 hover:text-on-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">star</span>
                  Rated on Google — see live reviews
                </a>
              </div>
            </Reveal>

            <motion.div
              className="hidden lg:block lg:col-span-5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative max-w-[26rem] mx-auto"
              >
                <span
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-[3rem] bg-secondary/25 blur-2xl animate-glow-pulse"
                />
                <TiltCard
                  max={7}
                  className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[2/3] ring-1 ring-on-primary/15"
                >
                  <img
                    src={etorCityFlagship}
                    alt="Aerial view of the ETOR City riverside development at golden hour"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-lg">
                    <p className="font-body text-body-sm text-on-primary/60 uppercase tracking-widest mb-xs">
                      ETOR City, live on the ground
                    </p>
                    <p className="font-display text-headline-md text-on-primary leading-tight">
                      250+ acres, one river-view masterplan
                    </p>
                  </div>
                </TiltCard>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-6 -left-8 bg-surface/95 backdrop-blur-xl rounded-2xl px-lg py-md shadow-2xl border border-outline-variant/20 flex items-center gap-md"
                >
                  <svg width="52" height="28" viewBox="0 0 56 28" fill="none" aria-hidden="true">
                    <motion.polyline
                      points="0,24 10,20 20,22 30,12 40,14 56,2"
                      stroke="var(--color-secondary)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6, delay: 1.3, ease: 'easeOut' }}
                    />
                  </svg>
                  <div>
                    <p className="font-body text-body-sm text-on-surface-variant leading-none">Over 100 months</p>
                    <p className="font-display text-headline-md text-secondary-strong leading-none mt-1">₹25,00,000</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <span className="material-symbols-outlined text-on-primary/70 text-[32px]">keyboard_double_arrow_down</span>
        </div>
      </section>

      <SoldTicker />

      {/* Scene 2 — The proof rail */}
      <section className="bg-surface py-lg border-y border-outline-variant/30">
        <Reveal tag="div" className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg items-center">
            {METRICS.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                {metric.target !== undefined ? (
                  <Counter
                    target={metric.target}
                    suffix={metric.suffix}
                    className={`font-display text-headline-xl ${metric.toneClass}`}
                  />
                ) : (
                  <span className={`font-display text-headline-xl ${metric.toneClass}`}>{metric.value}</span>
                )}
                <span className="font-body text-label-md text-on-surface-variant uppercase tracking-widest">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Scene 2.5 — Award recognition */}
      <section className="relative py-lg bg-primary overflow-hidden">
        <Reveal tag="div" className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="flex flex-col md:flex-row items-center gap-lg rounded-[2rem] border border-on-primary/10 bg-on-primary/5 p-lg lg:p-xl">
            <ImageLightbox
              src={awardPlaque}
              alt="Viswaguru World Records 'Green Entrepreneur' award plaque presented to B. Nagesh, Founder & CEO of ETOR Group"
              className="shrink-0 block"
            >
              <TiltCard max={6} className="rounded-2xl overflow-hidden shadow-xl bg-surface p-sm w-40 sm:w-48 aspect-[3/2]">
                <img
                  src={awardPlaque}
                  alt="Viswaguru World Records 'Green Entrepreneur' award plaque presented to B. Nagesh, Founder & CEO of ETOR Group"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </TiltCard>
            </ImageLightbox>
            <div className="flex-1 text-center md:text-left">
              <p className="font-body text-label-md text-secondary-fixed-dim uppercase tracking-widest mb-xs">
                Recognition
              </p>
              <h3 className="font-display text-headline-md text-on-primary mb-xs">
                Honoured as a Green Entrepreneur
              </h3>
              <p className="font-body text-body-md text-on-primary/70">
                Viswaguru World Records — Ugadi Puraskaralu 2026, presented to our Founder & CEO,
                B. Nagesh.
              </p>
            </div>
            <MagneticButton
              as={Link}
              to="/about#recognition"
              className="shrink-0 px-lg sm:px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest inline-flex items-center justify-center gap-sm whitespace-nowrap"
            >
              See Recognition
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </MagneticButton>
          </div>
        </Reveal>
      </section>

      {/* Scene 3 — ETOR City */}
      <section className="relative py-xl bg-background overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <Reveal
              tag="div"
              x={-30}
              y={0}
              className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl aspect-video lg:aspect-auto lg:h-[460px]"
            >
              <img
                src={etorCityFlagship}
                alt="Aerial view of the ETOR City riverside development"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </Reveal>

            <Reveal tag="div" delay={0.1} x={40} y={0} className="lg:col-span-5 space-y-md">
              <Eyebrow>ETOR City</Eyebrow>
              <h2 className="font-display text-headline-xl text-on-surface">
                One managed place, not a scattered land bank.
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                ETOR City spans roughly 250 acres and is still extending, laid out across four
                locations along the Andhra Pradesh coast: Sariapalli, Sottadivalasa and
                Ichapuram. Each plot sits inside one managed development combining
                plantation plots, hospitality and on-ground amenities — not just a title
                deed on an empty field.
              </p>
              <div className="flex flex-wrap gap-md pt-sm">
                <MagneticButton
                  as={Link}
                  to="/projects"
                  className="group px-xl py-md bg-primary text-on-primary rounded-full font-body text-label-md uppercase tracking-widest inline-flex items-center gap-sm"
                >
                  Explore Packages
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </MagneticButton>
                {COMPANY.isMasterPlanReady && (
                  <a
                    href={publicUrl("downloads/etor-city-master-plan.pdf")}
                    download
                    className="px-xl py-md border border-outline-variant/50 text-on-surface rounded-full font-body text-label-md uppercase tracking-widest hover:bg-surface-container-low transition-colors inline-flex items-center gap-sm"
                  >
                    Master Plan
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scene 4 — A living portfolio */}
      <section className="relative py-xl bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl space-y-xl">
          <Reveal tag="div" className="text-center max-w-2xl mx-auto mb-xl">
            <Eyebrow>A living portfolio</Eyebrow>
            <h2 className="font-display text-headline-xl text-on-surface mt-md mb-md">
              Eight living assets, one plot of land.
            </h2>
            <MaskReveal tag="p" className="font-body text-body-lg text-on-surface-variant">
              Every ETOR City plot plants Miyazaki and all-time mango, dairy access, sandalwood,
              custard apple, dragon fruit, stevia and aloe vera — a full orchard working from day one.
            </MaskReveal>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            {FEATURED_ASSETS.map((asset, index) => (
              <Reveal
                key={asset.title}
                tag="div"
                delay={index * 0.1}
                className="group relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]"
              >
                <img
                  src={asset.image}
                  alt={asset.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/45 to-transparent" />
                <div className="absolute inset-0 p-lg lg:p-xl flex flex-col justify-end">
                  <span className="font-body text-label-md text-secondary-fixed-dim uppercase tracking-[0.2em] mb-xs">
                    {asset.tag}
                  </span>
                  <h3 className="font-display text-headline-lg text-on-primary mb-xs">{asset.title}</h3>
                  {asset.priceTag && (
                    <span className="inline-flex items-center self-start px-md py-xs rounded-full bg-on-primary/10 border border-on-primary/25 text-on-primary font-body text-label-md mb-sm">
                      {asset.priceTag}
                    </span>
                  )}
                  <p className="font-body text-body-sm text-on-primary/75 leading-relaxed max-w-[30rem] mb-sm">
                    {asset.body}
                  </p>
                  {asset.highlights && (
                    <ul className="space-y-1 mb-sm">
                      {asset.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-xs font-body text-body-sm text-on-primary/85">
                          <span className="material-symbols-outlined text-secondary-fixed-dim text-[16px] mt-0.5 shrink-0">
                            check_circle
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal tag="p" className="font-body text-label-md text-on-surface-variant uppercase tracking-widest text-center mb-md">
              Plus, growing on every plot
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md">
              {PORTFOLIO_CROPS.map((crop, index) => (
                <Reveal key={crop.title} tag="div" delay={index * 0.06} className="h-full">
                  <TiltCard max={6} className="group h-full rounded-2xl bg-surface border border-outline-variant/20 overflow-hidden flex flex-col">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={crop.image}
                        alt={crop.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-lg flex flex-col flex-1">
                      <h4 className="font-display text-body-lg text-on-surface leading-tight break-words">
                        {crop.title}
                      </h4>
                      <p className="font-body text-body-sm text-secondary-strong mb-sm">{crop.subtitle}</p>
                      <p className="font-body text-body-sm text-on-surface-variant leading-relaxed mb-md flex-1">
                        {crop.body}
                      </p>
                      {crop.priceTag && (
                        <span className="inline-flex items-center self-start px-sm py-1 rounded-full bg-secondary/10 text-secondary-strong font-body text-label-md">
                          {crop.priceTag}
                        </span>
                      )}
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scene 5 — How participation works */}
      <section className="py-xl bg-background overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-display text-headline-xl text-on-surface mt-md mb-md">
              Five steps, at your own pace.
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              No countdown, no pressure — just a clear path from first conversation to
              ongoing updates.
            </p>
          </Reveal>

          <InvestJourney steps={PARTICIPATION_STEPS} />
        </div>
      </section>

      {/* Scene 6 — Packages */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Packages</Eyebrow>
            <h2 className="font-display text-headline-xl text-on-surface mt-md mb-md">
              Invest smart, pick your package.
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Three locations, two price points, one managed programme.
            </p>
          </Reveal>

          <Reveal tag="div" className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {PACKAGES.map((pkg) => (
              <Link
                key={pkg.name}
                to={pkg.href}
                className="group relative rounded-3xl overflow-hidden shadow-lg aspect-[4/5] flex flex-col justify-end"
              >
                <img
                  src={pkg.image}
                  alt={`${pkg.name}, ${pkg.place}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="relative z-10 p-lg">
                  <p className="font-body text-label-md text-on-primary/70 uppercase tracking-widest mb-xs">
                    {pkg.place}
                  </p>
                  <h3 className="font-display text-headline-md text-on-primary mb-sm">{pkg.name}</h3>
                  <p className="font-display text-headline-lg text-on-primary">
                    {pkg.price}
                    <span className="font-body text-body-sm align-top"> /sq.yd</span>
                  </p>
                  <span className="mt-md inline-flex items-center gap-xs font-body text-label-md text-on-primary uppercase tracking-widest">
                    View Layouts
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </Reveal>

          {/* Interactive calculator — previously only lived on the Projects
              page. Moved the highest-engagement tool on the whole site onto
              Home too: a static example is someone else's number, a slider
              is your own, and that's the difference between reading about
              a return and actually exploring one. */}
          <Reveal tag="div" id="calculator" className="mt-xl">
            <div className="max-w-[42rem] mx-auto text-center mb-lg">
              <Eyebrow>See your own numbers</Eyebrow>
              <h3 className="font-display text-headline-lg text-on-surface mt-md">
                Move the slider. Watch your cashback change.
              </h3>
            </div>
            <InvestmentCalculator />
          </Reveal>

          {/* Illustrative return example, straight from the brochure. A
              second, longer-horizon wealth stream on top of the cashback
              above — the plantation's own 12-year crop income, not a
              restatement of it. */}
          <Reveal tag="div" className="mt-xl rounded-3xl bg-surface border border-outline-variant/30 p-lg lg:p-xl">
            <p className="font-body text-label-md text-secondary-strong uppercase tracking-widest mb-xs">
              Beyond the cashback: your plantation income
            </p>
            <h3 className="font-display text-headline-md text-on-surface mb-lg">
              Illustrative example — ₹10,00,000 on a 250 sq.yd plot
            </h3>
            {/* Below sm: a stacked list, since a 3-column table needs more
                width than a phone screen gives without forcing a horizontal
                scroll most visitors would never discover — that silently
                hid the "over 12 years" column and the total return. */}
            <div className="sm:hidden space-y-md">
              {ROI_EXAMPLE.map((row) => (
                <div key={row.crop} className="pb-md border-b border-outline-variant/15">
                  <p className="font-body text-body-sm text-on-surface mb-xs">{row.crop}</p>
                  <div className="flex items-baseline justify-between">
                    <span className="font-body text-body-sm text-on-surface-variant">{row.perYear} / yr</span>
                    <span className="font-body text-body-md text-secondary-strong font-medium">{row.over12yr}</span>
                  </div>
                </div>
              ))}
              <div className="pt-sm">
                <p className="font-body text-body-sm font-medium text-on-surface mb-xs">
                  Total return after company share
                </p>
                <p className="font-display text-headline-md text-secondary-strong">₹4,26,70,000</p>
              </div>
            </div>

            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left font-body text-body-sm min-w-[28rem]">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-on-surface-variant uppercase text-[11px] tracking-widest">
                    <th className="py-sm pr-md">Crop</th>
                    <th className="py-sm pr-md">Per year</th>
                    <th className="py-sm">Over 12 years</th>
                  </tr>
                </thead>
                <tbody>
                  {ROI_EXAMPLE.map((row) => (
                    <tr key={row.crop} className="border-b border-outline-variant/15">
                      <td className="py-sm pr-md text-on-surface">{row.crop}</td>
                      <td className="py-sm pr-md text-on-surface-variant">{row.perYear}</td>
                      <td className="py-sm text-secondary-strong font-medium">{row.over12yr}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-sm pr-md font-medium text-on-surface">
                      Total return after company share
                    </td>
                    <td className="py-sm pr-md" />
                    <td className="py-sm text-secondary-strong font-display text-headline-md">₹4,26,70,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Scene 7 — 33-Year Management & Investor Benefits */}
      <section className="relative py-xl bg-primary overflow-hidden">
        <span
          className="material-symbols-outlined absolute -top-10 -left-10 text-on-primary/5 pointer-events-none select-none"
          style={{ fontSize: '380px' }}
          aria-hidden="true"
        >
          engineering
        </span>

        <div className="relative max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[42rem] mx-auto text-center mb-xl">
            <Eyebrow tone="dark">33-Year Management & Investor Benefits</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-on-primary mt-md mb-md">
              We manage your plot for 33 years. Your benefit is sized to it.
            </h2>
            <Counter
              target={33}
              suffix=" Years"
              className="font-display text-display-lg text-secondary-fixed-dim block"
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
            <Reveal tag="div" x={-30} y={0} className="flex gap-md items-start">
              <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary-fixed-dim">engineering</span>
              </div>
              <div>
                <h3 className="font-display text-headline-md text-on-primary mb-xs">
                  Who manages your plot, and for how long?
                </h3>
                <p className="font-body text-body-md text-on-primary/70 leading-relaxed">
                  ETOR takes responsibility for maintaining your plot — including spot registration — for a
                  full 33 years, so upkeep is never something you have to chase down.
                </p>
              </div>
            </Reveal>

            <Reveal tag="div" delay={0.1} x={30} y={0} className="flex gap-md items-start">
              <div className="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary-fixed-dim">agriculture</span>
              </div>
              <div>
                <h3 className="font-display text-headline-md text-on-primary mb-xs">How you benefit</h3>
                <p className="font-body text-body-md text-on-primary/70 leading-relaxed">
                  Your dairy top-up return and plantation allocation are sized to your specific plot, exactly
                  as set out in ETOR's brochure — see the size-by-size breakdown in Living Assets.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal tag="div" delay={0.15} className="flex flex-col items-center mt-xl gap-md">
            <MagneticButton
              as={Link}
              to="/services"
              className="px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest inline-flex items-center gap-sm"
            >
              See What You'd Get
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* Scene 8 — The place around the plot */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Beyond the plot</Eyebrow>
            <h2 className="font-display text-headline-xl text-on-surface mt-md mb-md">
              The place around your plot.
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Amenities and development details, grouped so they're easy to scan rather than a
              wall of badges.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {AMENITY_THEMES.map((theme) => (
              <Reveal
                key={theme.title}
                tag="div"
                className="rounded-3xl bg-surface-container-low p-lg border border-outline-variant/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-secondary-strong">{theme.icon}</span>
                </div>
                <h3 className="font-display text-headline-md text-on-surface mb-md">{theme.title}</h3>
                <ul className="space-y-sm">
                  {theme.items.map((item) => (
                    <li key={item} className="flex items-start gap-sm font-body text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary-strong text-[18px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal tag="div" className="max-w-[42rem] mx-auto text-center mt-xl">
            <p className="font-display text-headline-md text-on-surface mb-xs">Pleasures, not just plots.</p>
            <p className="font-body text-body-md text-on-surface-variant">
              Owners can avail nature-friendly riverside accommodation at ETOR's resorts, with good food
              alongside family and friends — and enjoy the amenities above every year, for a lifetime.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Scene 9 — Trust and disclosure */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Trust & disclosure</Eyebrow>
            <h2 className="font-display text-headline-xl text-on-surface mt-md mb-md">
              Know who you're dealing with.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
            <Reveal tag="div" className="flex gap-md items-start">
              <img
                src={founderCeo}
                alt="B. Nagesh, Founder & CEO of ETOR Group"
                loading="lazy"
                decoding="async"
                className="w-20 h-20 rounded-2xl object-cover shrink-0"
              />
              <div>
                <p className="font-display text-headline-md text-on-surface">B. Nagesh</p>
                <p className="font-body text-body-sm text-secondary-strong mb-sm">Founder & CEO, ETOR Group</p>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                  ETOR Group has operated since {COMPANY.foundedYear} under Mr. Nagesh's leadership. Read
                  the full story, team and history on the{' '}
                  <Link to="/about" className="underline hover:text-secondary-strong">
                    About page
                  </Link>
                  .
                </p>
                <Link
                  to="/about#recognition"
                  className="inline-flex items-center gap-xs mt-sm px-md py-xs rounded-full bg-secondary/10 text-secondary-strong font-body text-body-sm hover:bg-secondary/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                  Green Entrepreneur, Ugadi Puraskaralu 2026
                </Link>
              </div>
            </Reveal>

            <Reveal tag="div" delay={0.1} className="space-y-sm">
              <p className="font-body text-label-md text-on-surface uppercase tracking-widest mb-xs">
                Registered address
              </p>
              <address className="font-body text-body-sm text-on-surface-variant not-italic leading-relaxed">
                {COMPANY.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <div className="flex flex-wrap gap-sm pt-sm">
                {COMPANY.isMasterPlanReady && (
                  <a
                    href={publicUrl("downloads/etor-city-master-plan.pdf")}
                    download
                    className="inline-flex items-center gap-xs px-md py-xs rounded-full border border-outline-variant/40 font-body text-body-sm hover:bg-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">description</span>
                    Master Plan
                  </a>
                )}
                <a
                  href={publicUrl("downloads/etor-group-whitepaper.pdf")}
                  download
                  className="inline-flex items-center gap-xs px-md py-xs rounded-full border border-outline-variant/40 font-body text-body-sm hover:bg-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  Whitepaper
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-xs px-md py-xs rounded-full border border-outline-variant/40 font-body text-body-sm hover:bg-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">help</span>
                  FAQ
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Client reviews — live from Google, not written by us. A curated
          testimonial carousel (see TestimonialCarousel.jsx / data/testimonials.js,
          still wired up but unused here) can go back above this the moment
          ETOR Group shares real, client-approved quotes. */}
      <section id="reviews" className="py-xl bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <h2 className="font-display text-headline-xl text-on-surface mb-md">
              Live <span className="text-secondary-strong">Google Reviews</span>
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Pulled directly from ETOR Group's Google Business Profile — not written by us.
            </p>
          </Reveal>
          <GoogleReviews />
        </div>
      </section>

      {/* Scene 10 — The invitation */}
      <section className="relative py-xl overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary-container/30">
        <img
          src={mangoOrchard}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/40" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-secondary/20 blur-[120px]" aria-hidden="true" />

        <Reveal tag="div" className="relative z-10 max-w-container-max mx-auto px-margin-mobile lg:px-xl text-center">
          <h2 className="font-serif-display text-display-lg-mobile lg:text-display-xl text-on-primary mb-lg max-w-4xl mx-auto">
            See the land. Understand the terms. <span className="text-gradient-shimmer">Decide with clarity.</span>
          </h2>
          <p className="font-body text-body-lg text-on-primary/60 max-w-2xl mx-auto mb-xl">
            Ask any question, and take the next step at your own pace — no pressure, no countdown.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
            {COMPANY.isMasterPlanReady && (
              <a
                href={publicUrl("downloads/etor-city-master-plan.pdf")}
                download
                className="w-full sm:w-auto px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest shadow-2xl shadow-secondary/50 inline-flex items-center justify-center gap-sm"
              >
                Request Master Plan
                <span className="material-symbols-outlined text-[18px]">download</span>
              </a>
            )}
            <MagneticButton
              as={Link}
              to="/contact"
              className={
                COMPANY.isMasterPlanReady
                  ? 'w-full sm:w-auto px-xl py-md bg-on-primary/10 text-on-primary backdrop-blur-md rounded-full font-body text-label-md uppercase tracking-widest hover:bg-on-primary/20 transition-all text-center'
                  : 'w-full sm:w-auto px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest shadow-2xl shadow-secondary/50 text-center'
              }
            >
              Speak to ETOR
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
