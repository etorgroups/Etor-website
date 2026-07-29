import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import Counter from '../components/Counter'
import MagneticButton from '../components/MagneticButton'
import TiltCard from '../components/TiltCard'
import InvestJourney from '../components/InvestJourney'
import { INVEST_STEPS } from '../data/investSteps'
import etorCity1 from '../assets/images/etor-city-1.webp'
import etorMilkHero from '../assets/images/etor-milk-hero.webp'
import etorRoi from '../assets/images/etor-roi.webp'
import etorGaming from '../assets/images/etor-gaming.webp'
import etorForex from '../assets/images/etor-forex.webp'
import etorCrypto from '../assets/images/etor-crypto.webp'
import etorVenturesCard from '../assets/images/etor-ventures-card.webp'
import etorMoneyCard from '../assets/images/etor-money-card.webp'

const SERVICES = [
  {
    icon: 'trending_up',
    name: 'ETOR ROI',
    description: 'Precision-driven returns through quantitative asset allocation and risk-mitigated strategies.',
    cta: 'Learn More',
    ctaIcon: 'north_east',
    image: etorRoi,
  },
  {
    icon: 'sports_esports',
    name: 'ETOR Gaming',
    description: 'Next-gen interactive entertainment ecosystems leveraging blockchain for true asset ownership.',
    cta: 'Explore Universe',
    ctaIcon: 'play_circle',
    image: etorGaming,
  },
  {
    icon: 'currency_exchange',
    name: 'ETOR Forex',
    description: 'Algorithmic trading systems operating 24/5 across major and exotic currency pairs.',
    cta: 'View Analysis',
    ctaIcon: 'insights',
    image: etorForex,
  },
  {
    icon: 'currency_bitcoin',
    name: 'ETOR Crypto',
    description: 'Deep-liquidity pools and institutional-grade custody for digital assets and DeFi.',
    cta: 'Audit Trail',
    ctaIcon: 'shield',
    image: etorCrypto,
  },
  {
    icon: 'rocket_launch',
    name: 'ETOR Ventures',
    description: 'Incubating the disruptors of tomorrow through seed capital and strategic guidance.',
    cta: 'Our Portfolio',
    ctaIcon: 'hub',
    image: etorVenturesCard,
  },
  {
    icon: 'account_balance_wallet',
    name: 'ETOR Money',
    description: 'Simplified digital banking solutions for cross-border transactions and lifestyle management.',
    cta: 'Join Waitlist',
    ctaIcon: 'arrow_forward',
    image: etorMoneyCard,
    highlight: true,
  },
]

// From Welcome-To-ETOR-GROUP.pdf's "ETOR Milk" feature list.
const MILK_FEATURES = [
  { icon: 'eco', title: '100% Pure & Natural', body: 'Free from additives, preservatives, or chemicals.' },
  { icon: 'agriculture', title: 'Farm Fresh Goodness', body: 'Collected directly from trusted dairy farms.' },
  { icon: 'nutrition', title: 'Rich in Nutrition', body: 'High in protein, calcium, and essential vitamins for a healthy family.' },
  { icon: 'sanitizer', title: 'Hygienically Processed', body: 'Packaged with advanced technology to retain freshness.' },
]

// Grounded, verifiable figures only — see Welcome-To-ETOR-GROUP.pdf.
const STATS = [
  { target: 100, suffix: '%', label: 'Cashback Guarantee' },
  { target: 24, suffix: '/7', label: 'Client Support' },
  { target: 12, suffix: '+', label: 'Years of Trust' },
  { target: 5, suffix: '', label: 'Investment Sectors' },
]

export default function Services() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative py-xl overflow-hidden bg-gradient-to-br from-surface via-secondary-fixed/40 to-surface">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
            <Reveal tag="div" className="lg:col-span-7 space-y-lg">
              <Eyebrow>Ecosystem of Excellence</Eyebrow>
              <h1 className="font-display text-display-lg-mobile lg:text-display-lg text-primary leading-tight">
                Multi-Sector <span className="text-secondary">Engineering</span> for Global Prosperity.
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-[36rem]">
                From algorithmic high-frequency trading to organic sustainability, ETOR Group bridges the gap between
                digital wealth and tangible health.
              </p>
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
                    <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
                  </div>
                  <span className="font-body text-body-sm text-on-surface-variant">100% Cashback Guarantee</span>
                </div>
              </div>
            </Reveal>

            <Reveal tag="div" delay={0.15} x={30} y={0} className="lg:col-span-5 relative">
              <TiltCard>
                <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                  <img src={etorCity1} alt="ETOR City digital architecture" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                </div>
              </TiltCard>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-surface/95 backdrop-blur-xl rounded-2xl p-md shadow-xl border border-outline-variant/30">
                <p className="font-body text-label-md text-on-surface-variant uppercase tracking-widest mb-sm">
                  Current Network Load
                </p>
                <div className="flex items-end gap-xs h-8">
                  {[0.1, 0.3, 0.2, 0.4, 0.1].map((delay, i) => (
                    <span
                      key={i}
                      className="flex-1 bg-secondary rounded-full animate-bounce"
                      style={{ height: `${30 + i * 12}%`, animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core services grid */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="flex flex-col lg:flex-row justify-between items-end mb-xl gap-md">
            <div>
              <Eyebrow>Our Specializations</Eyebrow>
              <h2 className="font-display text-headline-xl lg:text-display-lg text-primary mt-md">
                Strategic Vertical Integration
              </h2>
            </div>
            <p className="font-body text-body-lg text-on-surface-variant max-w-[24rem] lg:text-right">
              Optimized performance across six core pillars of the modern economic landscape.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {SERVICES.map((service, index) => (
              <Reveal
                key={service.name}
                tag="div"
                delay={index * 0.08}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className={`group relative min-h-[400px] rounded-[2rem] overflow-hidden p-lg flex flex-col justify-between border-2 border-transparent hover:border-secondary/60 hover:shadow-2xl transition-[border-color,box-shadow] duration-300 ${
                  service.highlight ? 'bg-secondary' : 'bg-primary'
                }`}
              >
                <img
                  src={service.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 ${service.highlight ? 'bg-secondary/70' : 'bg-primary/70'}`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 mb-lg rounded-2xl flex items-center justify-center ${
                      service.highlight ? 'bg-on-secondary/10' : 'bg-secondary/20'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[32px] ${
                        service.highlight ? 'text-on-secondary' : 'text-secondary'
                      }`}
                    >
                      {service.icon}
                    </span>
                  </div>
                  <h3
                    className={`font-display text-headline-md mb-md ${
                      service.highlight ? 'text-on-secondary' : 'text-on-primary'
                    }`}
                  >
                    {service.name}
                  </h3>
                  <p
                    className={`font-body text-body-md leading-relaxed ${
                      service.highlight ? 'text-on-secondary/80' : 'text-on-primary/70'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                <Link
                  to="/contact"
                  className={`relative z-10 inline-flex items-center gap-sm font-body text-label-md uppercase tracking-widest ${
                    service.highlight ? 'text-on-secondary' : 'text-secondary'
                  }`}
                >
                  {service.cta}
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                    {service.ctaIcon}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
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
                  src={etorMilkHero}
                  alt="ETOR Milk organic dairy farm"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -right-6 bg-surface rounded-2xl p-md shadow-xl flex items-center gap-sm animate-bounce"
                style={{ animationDuration: '4s' }}
              >
                <span className="material-symbols-outlined text-secondary">verified</span>
                <div>
                  <p className="font-body text-label-md text-primary leading-none">100% Organic</p>
                  <p className="font-body text-body-sm text-on-surface-variant">Certified Quality</p>
                </div>
              </div>
            </Reveal>

            <Reveal tag="div" delay={0.15} x={30} y={0} className="order-1 lg:order-2 space-y-lg">
              <Eyebrow tone="dark">Sustainable Living</Eyebrow>
              <h2 className="font-display text-headline-xl text-on-primary">
                ETOR Milk: Where Purity Meets Quality
              </h2>
              <p className="font-body text-body-lg text-on-primary/70">
                Moving beyond finance, we invest in the foundation of life. Our 100% Organic Dairy Farm represents the
                pinnacle of ethical agriculture and nutritional science.
              </p>

              <div className="grid grid-cols-2 gap-md">
                {MILK_FEATURES.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-sm">
                    <span className="material-symbols-outlined text-secondary shrink-0">{feature.icon}</span>
                    <div>
                      <p className="font-body text-label-md text-on-primary">{feature.title}</p>
                      <p className="font-body text-body-sm text-on-primary/60">{feature.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <MagneticButton
                as={Link}
                to="/contact"
                className="px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest inline-flex"
              >
                Order Fresh Milk
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How to Invest */}
      <section className="py-xl bg-background overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Your Step-by-Step Guide</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-primary mt-md mb-md">
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
      <section className="relative py-xl overflow-hidden bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <span className="absolute w-[800px] h-[800px] rounded-full border border-on-secondary/10 animate-[spin_60s_linear_infinite]" />
          <span className="absolute w-[600px] h-[600px] rounded-full border border-on-secondary/10 animate-[spin_40s_linear_infinite_reverse]" />
          <span className="absolute w-[400px] h-[400px] rounded-full border border-on-secondary/10 animate-[spin_20s_linear_infinite]" />
        </div>

        <Reveal tag="div" className="relative z-10 max-w-container-max mx-auto px-margin-mobile lg:px-xl text-center">
          <h2 className="font-display text-display-lg-mobile lg:text-display-lg text-on-secondary mb-md">
            Start Your Smart Investment Journey
          </h2>
          <p className="font-body text-body-lg text-on-secondary/80 mb-sm">Packages starting from only</p>
          <p className="font-display text-display-xl text-on-secondary mb-xl">
            Rs 3999/- <span className="font-body text-body-md align-top">per sq.yd</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center">
            <MagneticButton
              as={Link}
              to="/contact"
              className="px-xl py-md bg-on-secondary text-secondary rounded-full font-body text-label-md uppercase tracking-widest inline-flex justify-center"
            >
              Get Started Now
            </MagneticButton>
            <Link
              to="/contact"
              className="px-xl py-md border border-on-secondary/40 text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest hover:bg-on-secondary/10 transition-colors text-center"
            >
              Talk To An Advisor
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg text-center">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} tag="div" delay={index * 0.1}>
                <Counter
                  target={stat.target}
                  suffix={stat.suffix}
                  className="font-display text-headline-xl lg:text-display-lg text-primary block"
                />
                <p className="font-body text-label-md text-on-surface-variant uppercase tracking-widest mt-sm">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
