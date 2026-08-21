import { Link } from 'react-router-dom'
import SEO, { buildBreadcrumbs } from '../components/SEO'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import etorRoi from '../assets/images/etor-roi.webp'
import etorGaming from '../assets/images/etor-gaming.webp'
import etorForex from '../assets/images/etor-forex.webp'
import etorCrypto from '../assets/images/etor-crypto.webp'
import etorVenturesCard from '../assets/images/etor-ventures-card.webp'
import etorMoneyCard from '../assets/images/etor-money-card.webp'

const VENTURES = [
  {
    icon: 'trending_up',
    name: 'ETOR ROI',
    description: 'Precision-driven returns through quantitative asset allocation and risk-mitigated strategies.',
    image: etorRoi,
  },
  {
    icon: 'sports_esports',
    name: 'ETOR Gaming',
    description: 'Next-gen interactive entertainment ecosystems leveraging blockchain for true asset ownership.',
    image: etorGaming,
  },
  {
    icon: 'currency_exchange',
    name: 'ETOR Forex',
    description: 'Algorithmic trading systems operating 24/5 across major and exotic currency pairs.',
    image: etorForex,
  },
  {
    icon: 'currency_bitcoin',
    name: 'ETOR Crypto',
    description: 'Deep-liquidity pools and institutional-grade custody for digital assets and DeFi.',
    image: etorCrypto,
  },
  {
    icon: 'rocket_launch',
    name: 'ETOR Ventures',
    description: 'Incubating the disruptors of tomorrow through seed capital and strategic guidance.',
    image: etorVenturesCard,
  },
  {
    icon: 'account_balance_wallet',
    name: 'ETOR Money',
    description: 'Simplified digital banking solutions for cross-border transactions and lifestyle management.',
    image: etorMoneyCard,
  },
]

// Separated out from Services.jsx (Living Assets) so the land-led ETOR City
// narrative stays focused — these are ETOR Group's other, unrelated
// business verticals, kept here as a lower-priority index rather than
// competing with the land story above the fold.
export default function OtherVentures() {
  return (
    <div className="flex flex-col w-full">
      <SEO
        title="Other Ventures — ROI, Gaming, Forex & Crypto"
        description="ETOR Group's ventures beyond ETOR City land and agriculture: ETOR ROI, Gaming, Forex and Crypto — separate businesses, kept apart from the land programme."
        path="/other-ventures"
        schema={buildBreadcrumbs([{ name: 'Other Ventures', path: '/other-ventures' }])}
      />
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[42rem]">
            <Eyebrow>Other Ventures</Eyebrow>
            <h1 className="font-display text-display-lg-mobile lg:text-display-lg text-on-surface mt-md mb-md">
              Beyond ETOR City
            </h1>
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
              ETOR Group also operates outside land and agriculture — in ROI, gaming, forex,
              crypto and broader ventures. These sit apart from the ETOR City programme, which
              is why they're kept here rather than mixed into the{' '}
              <Link to="/services" className="underline hover:text-secondary-strong">
                Living Assets
              </Link>{' '}
              page.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {VENTURES.map((venture) => (
              <Reveal
                key={venture.name}
                tag="div"
                className="group relative rounded-[2rem] overflow-hidden min-h-[320px] p-lg flex flex-col justify-between bg-primary"
              >
                <img
                  src={venture.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/70" />

                <div className="relative z-10">
                  <div className="w-14 h-14 mb-lg rounded-2xl bg-secondary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary-strong text-[28px]">{venture.icon}</span>
                  </div>
                  <h3 className="font-display text-headline-md text-on-primary mb-sm">{venture.name}</h3>
                  <p className="font-body text-body-sm text-on-primary/70 leading-relaxed">{venture.description}</p>
                </div>

                <Link
                  to="/contact"
                  className="relative z-10 inline-flex items-center gap-sm font-body text-label-md uppercase tracking-widest text-secondary-strong"
                >
                  Ask about this
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
