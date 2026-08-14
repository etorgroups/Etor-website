import { Link } from 'react-router-dom'
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
import SoldTicker from '../components/SoldTicker'
import KineticHeadline from '../components/KineticHeadline'
import MaskReveal from '../components/MaskReveal'
import Disclosure from '../components/Disclosure'
import { COMPANY } from '../data/company'
import heroLandscape from '../assets/images/hero-etor-landscape.png'
import mangoOrchard from '../assets/images/mango-orchard.webp'
import etorCityFlagship from '../assets/images/etor-city-flagship.png'
import assetMango from '../assets/images/asset-miyazaki-mango.png'
import assetDairy from '../assets/images/asset-organic-dairy.png'
import assetCropPortfolio from '../assets/images/asset-crop-portfolio.png'
import etorCity1 from '../assets/images/etor-city-1.webp'
import etorCity2 from '../assets/images/etor-city-2.webp'
import etorCity34 from '../assets/images/etor-city-3-4.webp'
import founderCeo from '../assets/images/founder-ceo.webp'
import awardPlaque from '../assets/images/award-viswaguru-world-records-2026.webp'

const HERO_TRUST_POINTS = [
  { value: '12+', label: 'Years' },
  { value: '250+', label: 'Acres' },
  { value: '4', label: 'Locations' },
]

const METRICS = [
  { target: 12, suffix: '+', label: 'Years Experience', toneClass: 'text-secondary' },
  { target: 250, suffix: '+', label: 'Acres Across ETOR City', toneClass: 'text-on-surface' },
  { target: 100, suffix: '%', label: 'Cashback In 100 Months', toneClass: 'text-secondary' },
  { value: '4', label: 'ETOR City Locations', toneClass: 'text-on-surface' },
]

const LIVING_ASSETS = [
  {
    tag: 'Flagship crop',
    title: 'Miyazaki Mango',
    body:
      "ETOR Group's brochure describes Miyazaki mango as the world's most expensive fruit, and ETOR as the first in the real-estate industry to plan a Miyazaki plantation inside a residential-style development.",
    priceTag: '₹2,75,000 / kg',
    highlights: ['Rich in zinc, calcium & vitamins C, E, A, K', 'Served as a welcome fruit at Burj Khalifa & other 5-star hotels'],
    image: assetMango,
    alt: 'Ripe Miyazaki mango still life',
    note: "Fruit prices are described as market/auction-dependent — see the 12-year example in “Invest smart” below.",
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
  {
    tag: 'Orchard portfolio',
    title: 'Sandalwood, Sitafal & Dragon Fruit',
    body:
      "White sandalwood (Srigandham) — grown in only a handful of countries worldwide, with Indian sandalwood noted for its oil quality — is planted alongside custard apple (Balanagar Sitafal) and red/yellow dragon fruit. The brochure allocates 30 sandalwood plants to each 250 sq.yd plot, with sitafal and dragon fruit reaching full fruiting within one to two years alongside the mango.",
    priceTag: 'Sandalwood ₹22,000/kg · Sitafal ₹200/kg · Dragon Fruit ₹300/kg',
    highlights: [
      'Sandalwood: antioxidant, anti-inflammatory & antimicrobial properties, used in premium cosmetics and perfumes',
      'Sitafal: high in fibre and antioxidants that support digestion and heart health',
      'Dragon fruit: rich in antioxidants, boosts immunity, supports skin and heart health',
    ],
    image: assetCropPortfolio,
    alt: 'Sandalwood, custard apple and dragon fruit portfolio',
    note: 'Per-kg prices and health claims as printed in the brochure — not independent lab or medical verification.',
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
      {/* Scene 1 — The ground */}
      <section className="relative w-full h-screen min-h-[640px] flex items-center -mt-20 overflow-hidden">
        <img
          src={heroLandscape}
          alt="Premium mango orchard in coastal Andhra Pradesh at first light"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-primary/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/66 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary/55" />

        <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile lg:px-xl pt-20 w-full">
          <div className="flex items-center">
            <Reveal tag="div" y={30} className="hero-copy w-full max-w-[58rem] space-y-lg">
              <Eyebrow tone="light">Land · Life · Long-term value</Eyebrow>
              <KineticHeadline
                tag="h1"
                className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-primary leading-none"
              >
                Build value
                <br />
                <span className="text-on-primary">that keeps growing.</span>
              </KineticHeadline>
              <p className="font-body text-body-lg text-on-primary max-w-[36rem] drop-shadow-md">
                ETOR Group brings land, cultivation, community and long-term participation
                together in one living portfolio across Andhra Pradesh.
              </p>
              <div className="flex flex-wrap gap-md">
                <MagneticButton
                  as={Link}
                  to="/projects"
                  className="group relative px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest overflow-hidden shadow-xl shadow-secondary/30 inline-flex"
                >
                  <span className="relative z-10 flex items-center gap-sm">
                    Explore ETOR City
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </span>
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  to="/about"
                  className="px-xl py-md border border-on-primary/30 backdrop-blur-md text-on-primary rounded-full font-body text-label-md uppercase tracking-widest hover:bg-on-primary/10 transition-colors inline-flex"
                >
                  Read our story
                </MagneticButton>
              </div>
              <div className="flex flex-wrap items-center gap-lg pt-xs">
                {HERO_TRUST_POINTS.map((point, index) => (
                  <div key={point.label} className="flex items-center gap-lg">
                    {index > 0 && (
                      <span className="hidden sm:block w-px h-8 bg-on-primary/20" aria-hidden="true" />
                    )}
                    <div className="flex items-baseline gap-xs">
                      <span className="font-display text-headline-md text-secondary">{point.value}</span>
                      <span className="font-body text-body-sm text-on-primary/70 uppercase tracking-wide">
                        {point.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
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
          <Disclosure className="mt-md text-center sm:text-left">
            Acreage and cashback figures are as stated in ETOR Group's programme brochure. Download the{' '}
            <a href={publicUrl("downloads/etor-city-master-plan.pdf")} download className="underline hover:text-secondary">
              master plan
            </a>{' '}
            or see{' '}
            <Link to="/terms" className="underline hover:text-secondary">
              Terms
            </Link>{' '}
            for full conditions.
          </Disclosure>
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
                <a
                  href={publicUrl("downloads/etor-city-master-plan.pdf")}
                  download
                  className="px-xl py-md border border-outline-variant/50 text-on-surface rounded-full font-body text-label-md uppercase tracking-widest hover:bg-surface-container-low transition-colors inline-flex items-center gap-sm"
                >
                  Master Plan
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </a>
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
              Four assets, one plot of land.
            </h2>
            <MaskReveal tag="p" className="font-body text-body-lg text-on-surface-variant">
              Every ETOR City plot plants the same core mix — mango, dairy access, sandalwood
              and orchard fruit — so the land is working from year one, not sitting idle.
            </MaskReveal>
          </Reveal>

          <div className="space-y-xl">
            {LIVING_ASSETS.map((asset, index) => (
              <div
                key={asset.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center ${
                  index % 2 === 1 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                <Reveal
                  tag="div"
                  x={index % 2 === 1 ? 40 : -40}
                  y={0}
                  className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl aspect-[4/5] lg:aspect-auto lg:h-[380px] [direction:ltr]"
                >
                  <img
                    src={asset.image}
                    alt={asset.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </Reveal>
                <Reveal
                  tag="div"
                  delay={0.1}
                  x={index % 2 === 1 ? -40 : 40}
                  y={0}
                  className="lg:col-span-7 space-y-sm [direction:ltr]"
                >
                  <span className="font-body text-label-md text-secondary uppercase tracking-[0.2em]">
                    {asset.tag}
                  </span>
                  <h3 className="font-display text-headline-lg text-on-surface">{asset.title}</h3>
                  {asset.priceTag && (
                    <span className="inline-flex items-center px-md py-xs rounded-full bg-secondary/10 text-secondary font-body text-label-md">
                      {asset.priceTag}
                    </span>
                  )}
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed max-w-[36rem]">
                    {asset.body}
                  </p>
                  {asset.highlights && (
                    <ul className="space-y-1.5 max-w-[36rem]">
                      {asset.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-xs font-body text-body-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5 shrink-0">check_circle</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {asset.note && (
                    <Disclosure className="max-w-[36rem]">{asset.note}</Disclosure>
                  )}
                </Reveal>
              </div>
            ))}
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
              Prices as shown in ETOR Group's brochure, until confirmed current with an advisor.
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

          {/* Illustrative return example, straight from the brochure */}
          <Reveal tag="div" className="mt-xl rounded-3xl bg-surface border border-outline-variant/30 p-lg lg:p-xl">
            <h3 className="font-display text-headline-md text-on-surface mb-xs">
              Illustrative example — ₹10,00,000 on a 250 sq.yd plot
            </h3>
            <p className="font-body text-body-sm text-on-surface-variant mb-lg">
              As printed in ETOR Group's brochure. Shown for illustration only, not a promise of
              future performance.
            </p>
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
                    <span className="font-body text-body-md text-secondary font-medium">{row.over12yr}</span>
                  </div>
                </div>
              ))}
              <div className="pt-sm">
                <p className="font-body text-body-sm font-medium text-on-surface mb-xs">
                  Total return after company share
                </p>
                <p className="font-display text-headline-md text-secondary">₹4,26,70,000</p>
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
                      <td className="py-sm text-secondary font-medium">{row.over12yr}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-sm pr-md font-medium text-on-surface">
                      Total return after company share
                    </td>
                    <td className="py-sm pr-md" />
                    <td className="py-sm text-secondary font-display text-headline-md">₹4,26,70,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Disclosure className="mt-lg">
              Miyazaki mango is described as a highly valuable, auction-priced fruit — prices vary.
              All income is shared 50:50 between the company and client, and all prices are based on
              market prices at the time. See{' '}
              <Link to="/terms" className="underline hover:text-secondary">
                Terms
              </Link>{' '}
              for full conditions.
            </Disclosure>
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
            <Disclosure className="text-on-primary/50 text-center max-w-[36rem]">
              Maintenance duration and benefit tiers are as set out in ETOR Group's brochure and your signed
              agreement — individual outcomes are not guaranteed. See{' '}
              <Link to="/terms" className="underline hover:text-secondary-fixed-dim">
                Terms
              </Link>{' '}
              for full conditions.
            </Disclosure>
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
                  <span className="material-symbols-outlined text-secondary">{theme.icon}</span>
                </div>
                <h3 className="font-display text-headline-md text-on-surface mb-md">{theme.title}</h3>
                <ul className="space-y-sm">
                  {theme.items.map((item) => (
                    <li key={item} className="flex items-start gap-sm font-body text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
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
                <p className="font-body text-body-sm text-secondary mb-sm">Founder & CEO, ETOR Group</p>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                  ETOR Group has operated since {COMPANY.foundedYear} under Mr. Nagesh's leadership. Read
                  the full story, team and history on the{' '}
                  <Link to="/about" className="underline hover:text-secondary">
                    About page
                  </Link>
                  .
                </p>
                <Link
                  to="/about#recognition"
                  className="inline-flex items-center gap-xs mt-sm px-md py-xs rounded-full bg-secondary/10 text-secondary font-body text-body-sm hover:bg-secondary/20 transition-colors"
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
                <a
                  href={publicUrl("downloads/etor-city-master-plan.pdf")}
                  download
                  className="inline-flex items-center gap-xs px-md py-xs rounded-full border border-outline-variant/40 font-body text-body-sm hover:bg-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  Master Plan
                </a>
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

          <Disclosure className="mt-xl max-w-[48rem] mx-auto text-center">
            As stated in ETOR Group's brochure: this material is a conceptual presentation, not a legal
            offering, and the developer reserves the right to alter specifications and plans. See{' '}
            <Link to="/terms" className="underline hover:text-secondary">
              Terms
            </Link>{' '}
            for full conditions.
          </Disclosure>
        </div>
      </section>

      {/* Client reviews — live from Google, not written by us. A curated
          testimonial carousel (see TestimonialCarousel.jsx / data/testimonials.js,
          still wired up but unused here) can go back above this the moment
          ETOR Group shares real, client-approved quotes. */}
      <section className="py-xl bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <h2 className="font-display text-headline-xl text-on-surface mb-md">
              Live <span className="text-secondary">Google Reviews</span>
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
          <p className="font-body text-body-lg text-on-primary/60 max-w-2xl mx-auto mb-md">
            Review the ETOR City master plan, ask any question, and take the next step at your own pace — no
            pressure, no countdown.
          </p>
          <Disclosure className="max-w-[36rem] mx-auto mb-xl text-on-primary/50">
            Cashback and return figures shown across this site are programme terms as described in ETOR Group's
            brochure, subject to the conditions in our{' '}
            <Link to="/terms" className="underline hover:text-on-primary">
              Terms
            </Link>
            , not a guarantee of performance.
          </Disclosure>
          <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
            <a
              href={publicUrl("downloads/etor-city-master-plan.pdf")}
              download
              className="w-full sm:w-auto px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest shadow-2xl shadow-secondary/50 inline-flex items-center justify-center gap-sm"
            >
              Request Master Plan
              <span className="material-symbols-outlined text-[18px]">download</span>
            </a>
            <MagneticButton
              as={Link}
              to="/contact"
              className="w-full sm:w-auto px-xl py-md bg-on-primary/10 text-on-primary backdrop-blur-md rounded-full font-body text-label-md uppercase tracking-widest hover:bg-on-primary/20 transition-all text-center"
            >
              Speak to ETOR
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
