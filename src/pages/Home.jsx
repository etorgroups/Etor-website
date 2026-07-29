import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import MagneticButton from '../components/MagneticButton'
import { PILLARS } from '../data/pillars'
import { TESTIMONIALS } from '../data/testimonials'
import TiltCard from '../components/TiltCard'
import Counter from '../components/Counter'
import TestimonialCarousel from '../components/TestimonialCarousel'
import EcosystemGrid from '../components/EcosystemGrid'
import mangoOrchard from '../assets/images/mango-orchard.webp'
import etorCity1 from '../assets/images/etor-city-1.webp'
import etorCity2 from '../assets/images/etor-city-2.webp'
import etorCity34 from '../assets/images/etor-city-3-4.webp'
import etorVentures from '../assets/images/etor-ventures.webp'
import etorlogo from "../assets/images/etor-coin-logo.webp";

const METRICS = [
  { target: 12, suffix: '+', label: 'Years Experience', toneClass: 'text-secondary' },
  { target: 1900, suffix: '+', label: 'Acres Across ETOR City', toneClass: 'text-primary' },
  { target: 100, suffix: '%', label: 'Cashback In 100 Months', toneClass: 'text-secondary' },
  { value: 'Global', label: 'Impact Vision', toneClass: 'text-primary' },
]

const RIVERS = [
  {
    tag: 'Fertile Basins',
    title: 'Gosthani River Belt',
    description:
      "A sanctuary for the world's most expensive mangoes. The Gosthani basin provides a unique micro-climate that intensifies the ruby-red skin and sweetness of our Miyazaki crops.",
    image: etorCity2,
    alt: 'Gosthani River plantation belt',
    layout: 'image-left',
    variant: 'card',
    icon: 'water_drop',
    metaTitle: 'High Water Table',
    metaBody: 'Sustainable irrigation 365 days a year.',
  },
  {
    tag: 'Optimal Growth',
    title: 'Champavathi Valley',
    description:
      'Known for its mineral-rich silt deposits, the Champavathi valley hosts our secondary tier of Miyazaki plantations, focused on robust health and high-density planting techniques.',
    image: etorCity34,
    alt: 'Champavathi river valley',
    layout: 'image-right',
    variant: 'stats',
    stats: [
      { value: '98%', label: 'Soil Vitality' },
      { value: 'Eco', label: 'Certified Organic' },
    ],
  },
  {
    tag: 'Coastal Advantage',
    title: 'Bahudha River Delta',
    description:
      "The perfect balance of moisture and sunlight. Our Bahudha estates specialize in late-season harvests, ensuring ETOR Group's Miyazaki presence long after others have faded.",
    image: etorVentures,
    alt: 'Bahudha river delta estuary',
    layout: 'image-left',
    variant: 'dark',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative w-full h-screen min-h-[640px] flex items-center -mt-20 overflow-hidden">
        <img
          src={mangoOrchard}
          alt="Premium Miyazaki mango plantation at golden hour"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-background/30" />

        <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile lg:px-xl pt-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-xl">
            <Reveal tag="div" y={30} className="w-full lg:w-2/3 space-y-lg">
              <Eyebrow tone="light">Agricultural Revolution 2.0</Eyebrow>
              <h1 className="font-display text-display-lg-mobile lg:text-display-lg text-on-primary leading-none">
                Empowering Growth
                <br />
                <span className="text-secondary">Through Innovation</span>
              </h1>
              <p className="font-body text-body-lg text-on-primary max-w-[36rem] drop-shadow-md">
                Experience the future of sustainable wealth with our Miyazaki Mango Plantation—the world's most
                premium harvest—coupled with an unprecedented 100% cashback guarantee.
              </p>
              <div className="flex flex-wrap gap-md">
                <MagneticButton
                  as={Link}
                  to="/projects"
                  className="group relative px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest overflow-hidden shadow-xl shadow-secondary/30 inline-flex"
                >
                  <span className="relative z-10 flex items-center gap-sm">
                    See Packages
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
                  Learn More
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal tag="div" delay={0.2} x={30} y={0} className="hidden lg:block w-1/3 relative">
              <TiltCard>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-on-primary/20 rotate-3 hover:rotate-0 transition-transform duration-700">
                  <img src={etorlogo} alt="ETOR City venture aerial view" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                </div>
              </TiltCard>
              <div className="absolute -top-6 -left-6 bg-surface/95 backdrop-blur-md rounded-2xl px-lg py-md shadow-xl border border-outline-variant/30">
                <p className="font-display text-headline-md text-secondary leading-none">12+ Years</p>
                <p className="font-body text-body-sm text-on-surface-variant">Legacy of Excellence</p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <span className="material-symbols-outlined text-on-primary/70 text-[32px]">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Metrics / Trust Bar */}
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

      {/* Rivers of Prosperity */}
      <section className="relative py-xl bg-background overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-container-max mx-auto px-margin-mobile lg:px-xl space-y-xl">
          <Reveal tag="div" className="text-center max-w-2xl mx-auto mb-xl">
            <h2 className="font-display text-headline-xl text-primary mb-md">Rivers of Prosperity</h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Our strategic plantation locations are nestled along the life-giving veins of India, ensuring
              unmatched natural fertility and premium yield quality.
            </p>
          </Reveal>

          {RIVERS.map((river, index) => (
            <div
              key={river.title}
              className={`group relative grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center ${index > 0 ? 'pt-xl' : ''}`}
            >
              <Reveal
                tag="div"
                x={river.layout === 'image-left' ? -40 : 40}
                y={0}
                className={`lg:col-span-7 rounded-3xl overflow-hidden shadow-xl aspect-video lg:aspect-auto lg:h-[500px] ${
                  river.layout === 'image-right' ? 'order-1 lg:order-2' : ''
                }`}
              >
                <img
                  src={river.image}
                  alt={river.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </Reveal>

              <Reveal
                tag="div"
                delay={0.1}
                x={river.layout === 'image-left' ? 40 : -40}
                y={0}
                className={`lg:col-span-5 z-10 ${
                  river.layout === 'image-left' ? 'lg:-ml-20' : 'lg:-mr-20 order-2 lg:order-1'
                }`}
              >
                <div
                  className={`p-lg rounded-3xl shadow-2xl ${
                    river.variant === 'dark'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface/90 backdrop-blur-xl border border-outline-variant/30'
                  }`}
                >
                  <span className="font-body text-label-md text-secondary uppercase tracking-[0.2em] mb-xs block">
                    {river.tag}
                  </span>
                  <h3
                    className={`font-display text-headline-lg mb-md ${
                      river.variant === 'dark' ? 'text-on-primary' : 'text-primary'
                    }`}
                  >
                    {river.title}
                  </h3>
                  <p
                    className={`font-body text-body-md mb-lg ${
                      river.variant === 'dark' ? 'text-on-primary/70' : 'text-on-surface-variant'
                    }`}
                  >
                    {river.description}
                  </p>

                  {river.variant === 'card' && (
                    <div className="flex items-center gap-md">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-secondary">{river.icon}</span>
                      </div>
                      <div>
                        <p className="font-body text-label-md text-primary">{river.metaTitle}</p>
                        <p className="font-body text-body-sm text-on-surface-variant">{river.metaBody}</p>
                      </div>
                    </div>
                  )}

                  {river.variant === 'stats' && (
                    <div className="grid grid-cols-2 gap-md">
                      {river.stats.map((stat) => (
                        <div key={stat.label} className="bg-background p-sm rounded-xl">
                          <p className="font-display text-headline-md text-primary">{stat.value}</p>
                          <p className="font-body text-body-sm text-on-surface-variant">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {river.variant === 'dark' && (
                    <Link
                      to="/projects"
                      className="block w-full text-center py-md bg-on-primary text-primary font-body text-label-md uppercase tracking-widest rounded-xl hover:bg-secondary hover:text-on-secondary transition-colors"
                    >
                      View Site Details
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="flex flex-col lg:flex-row justify-between items-end mb-xl gap-md">
            <div className="max-w-[36rem]">
              <h2 className="font-display text-headline-xl lg:text-display-lg text-primary mb-md">
                The ETOR <span className="text-secondary">Ecosystem</span>
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                We don't just plant trees; we build financial infrastructures powered by nature and secured by
                technology.
              </p>
            </div>
            <Link
              to="/about"
              className="font-body text-label-md text-secondary uppercase tracking-widest border-b-2 border-secondary pb-xs hover:opacity-70 transition-opacity"
            >
              Our Full Methodology
            </Link>
          </Reveal>

          <EcosystemGrid pillars={PILLARS} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-xl bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <h2 className="font-display text-headline-xl text-primary mb-md">
              Client <span className="text-secondary">Testimonials</span>
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Our greatest achievement lies in the success of our clients and investors.
            </p>
          </Reveal>

          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-xl overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary-container/30">
        <img
          src={mangoOrchard}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/40" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-secondary/20 blur-[120px]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <span className="absolute w-[700px] h-[700px] rounded-full border border-secondary/15 animate-[spin_50s_linear_infinite]" />
          <span className="absolute w-[500px] h-[500px] rounded-full border border-secondary/15 animate-[spin_35s_linear_infinite_reverse]" />
        </div>

        <Reveal tag="div" className="relative z-10 max-w-container-max mx-auto px-margin-mobile lg:px-xl text-center">
          <div className="inline-block px-lg py-xs bg-secondary/20 rounded-full border border-secondary/40 mb-lg">
            <span className="font-body text-label-md text-secondary uppercase tracking-[0.3em]">
              Limited Opportunities
            </span>
          </div>
          <h2 className="font-display text-display-lg-mobile lg:text-display-xl text-on-primary mb-lg max-w-4xl mx-auto">
            Join the Agricultural <span className="text-secondary">Elite</span>
          </h2>
          <p className="font-body text-body-lg text-on-primary/60 max-w-2xl mx-auto mb-xl">
            Secure your share in the future of the Miyazaki Mango market today and experience the security of a 100%
            cashback guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
            <MagneticButton
              as={Link}
              to="/contact"
              className="w-full sm:w-auto px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest shadow-2xl shadow-secondary/50 inline-flex justify-center"
            >
              Invest Now
            </MagneticButton>
            <a
              href="/downloads/etor-group-whitepaper.pdf"
              download
              className="w-full sm:w-auto px-xl py-md bg-on-primary/10 text-on-primary backdrop-blur-md rounded-full font-body text-label-md uppercase tracking-widest hover:bg-on-primary/20 transition-all text-center"
            >
              Download Whitepaper
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
