import { Link } from 'react-router-dom'
import SEO, { buildBreadcrumbs, ORGANIZATION_ID } from '../components/SEO'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import MagneticButton from '../components/MagneticButton'
import MaskReveal from '../components/MaskReveal'
import TiltCard from '../components/TiltCard'
import ImageLightbox from '../components/ImageLightbox'
import { JOURNEY } from '../data/journey'
import { WHY_CHOOSE_US } from '../data/whyChooseUs'
import heroStory from '../assets/images/asset-etor-stewardship.webp'
import founderCeo from '../assets/images/founder-ceo.webp'
import mangoOrchard from '../assets/images/mango-orchard.webp'
import awardPlaque from '../assets/images/award-viswaguru-world-records-2026.webp'

const AWARD_DETAILS = [
  { icon: 'workspace_premium', label: 'Awarded by', value: 'Viswaguru World Records' },
  { icon: 'calendar_month', label: 'Awarded on', value: '22 March 2026' },
  { icon: 'eco', label: 'Category', value: 'Green Entrepreneur' },
  { icon: 'location_on', label: 'Venue', value: 'Hotel Daspalla, Visakhapatnam, Andhra Pradesh' },
]

const ABOUT_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About ETOR Group',
    description:
      'ETOR Group has led real estate and agriculture investment since 2014, founded and run by B. Nagesh — IRDA & FMC certified financial advisor and Vishwaguru World Record holder.',
    about: { '@id': ORGANIZATION_ID },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'B. Nagesh',
    jobTitle: 'Founder & CEO',
    worksFor: { '@id': ORGANIZATION_ID },
    description:
      '12+ years in financial services, wealth management and investment advisory. IRDA & FMC certified Financial Advisor. Guided and mentored over 4 lakh traders and investors. Vishwaguru World Record holder for planting 10 lakh trees within two years. Recipient of 2 FMC Awards for Excellence in Portfolio Management.',
    award: ['Vishwaguru World Record — 10 lakh trees planted in two years', '2 FMC Awards for Excellence in Portfolio Management', 'Green Entrepreneur, Viswaguru World Records Ugadi Puraskaralu 2026'],
  },
  buildBreadcrumbs([{ name: 'The Story', path: '/about' }]),
]

const VISWAGURU_URL = 'https://viswaguruworldrecords.com/'

const RECOGNITION_HIGHLIGHTS = [
  { icon: 'military_tech', title: 'Prestigious Honor', body: 'Awarded by Viswaguru World Records' },
  { icon: 'workspace_premium', title: 'Recognized Excellence', body: 'In the category of Green Entrepreneur' },
  { icon: 'groups', title: 'Leadership That Inspires', body: 'A milestone that strengthens our commitment to a sustainable future' },
  { icon: 'eco', title: 'Building a Better Tomorrow', body: 'Driving sustainable solutions and creating lasting impact for society and the planet' },
]

const CORE_VALUES = [
  {
    icon: 'handshake',
    title: 'Trust',
    body: "We build lasting relationships through honesty, integrity, and reliability, so every promise made is a promise kept.",
  },
  {
    icon: 'lightbulb',
    title: 'Innovation',
    body: 'From the Miyazaki mango plantation model to the cashback programme, we look for approaches beyond what real estate usually does.',
  },
  {
    icon: 'workspace_premium',
    title: 'Excellence',
    body: 'We commit to the highest standards in every aspect of our operations, delivering superior quality in our projects and services.',
  },
  {
    icon: 'visibility',
    title: 'Transparency',
    body: 'Open communication and clear processes are fundamental to our approach, so stakeholders have real visibility into our projects.',
  },
  {
    icon: 'eco',
    title: 'Sustainability',
    body: 'Our projects are designed with respect for the land and a commitment to long-term ecological balance.',
  },
]

export default function About() {
  return (
    <div className="flex flex-col w-full">
      <SEO
        title="Our Story & Founder — B. Nagesh"
        description="ETOR Group has led real estate and agriculture investment since 2014, founded and run by B. Nagesh — IRDA & FMC certified advisor and Vishwaguru World Record holder."
        path="/about"
        schema={ABOUT_SCHEMA}
      />
      {/* Origin */}
      {/* bg-primary here has no visible effect (the photo + scrim overlays
          below fully cover it) -- it exists purely so --color-secondary-strong
          resolves to the bright fixed-dim gold for the Eyebrow nested inside,
          matching every other permanently-dark section (see index.css's
          .bg-primary rule). Without it this hero would inherit the light
          theme's cream-tuned darker gold, muted against a dark photo. */}
      <section className="relative w-full h-screen min-h-[560px] flex items-center -mt-20 overflow-hidden bg-primary">
        <img
          src={heroStory}
          alt="ETOR Group planners reviewing the land"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary/55" />

        {/* pr-12 clears the always-on ExploreNowTab (fixed, right-0, exactly
            30px wide) below lg — same fix as Home's hero, same reasoning:
            pr-8 (32px) only left a constant 2px gap, not real buffer. */}
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile lg:px-xl pt-20 w-full pr-12 lg:pr-xl">
          <Reveal tag="div" y={30} className="w-full max-w-[42rem] space-y-lg">
            <Eyebrow tone="light">The story</Eyebrow>
            <h1 className="font-serif-display text-display-lg-mobile lg:text-display-lg text-on-primary leading-none">
              Land first.
              <br />
              Then everything else.
            </h1>
            <p className="font-body text-body-lg text-on-primary/80 max-w-[19rem] sm:max-w-[36rem]">
              ETOR Group started in real estate in 2014. A decade later, that work became ETOR City —
              a managed land and agriculture programme led by founder B. Nagesh, built plot by plot
              across four locations in Andhra Pradesh.
            </p>
            <div className="flex flex-wrap gap-md">
              <MagneticButton
                as={Link}
                to="/projects"
                className="px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest inline-flex"
              >
                Explore ETOR City
              </MagneticButton>
              <MagneticButton
                as={Link}
                to="/services"
                className="px-xl py-md border border-on-primary/30 backdrop-blur-md text-on-primary rounded-full font-body text-label-md uppercase tracking-widest hover:bg-on-primary/10 transition-colors inline-flex"
              >
                Living Assets
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder & leadership */}
      <section className="py-xl bg-surface overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <Reveal tag="div" x={-30} y={0} className="relative group">
              <div
                className="absolute -inset-6 bg-secondary/10 rounded-[2.5rem] rotate-3 transition-transform duration-500 ease-out group-hover:rotate-1 group-hover:scale-[1.02]"
                aria-hidden="true"
              />
              <TiltCard
                max={6}
                className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/5] max-w-[28rem] mx-auto ring-1 ring-outline-variant/20 transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-24px_rgba(28,25,22,0.35)] group-hover:ring-secondary/50"
              >
                <img
                  src={founderCeo}
                  alt="B. Nagesh, Founder & CEO of ETOR Group"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/5 to-transparent pointer-events-none"
                />
                <div className="absolute inset-x-0 bottom-0 p-lg overflow-hidden">
                  <p className="font-display text-headline-md text-on-primary transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    B. Nagesh
                  </p>
                  <p className="font-body text-body-sm text-on-primary/70 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    Founder & CEO
                  </p>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal tag="div" delay={0.15} x={30} y={0} className="space-y-lg">
              <div>
                <Eyebrow>Founder & leadership</Eyebrow>
                <h2 className="font-display text-headline-xl text-on-surface mt-md mb-md">
                  Led hands-on since 2014.
                </h2>
                <MaskReveal tag="p" className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  B. Nagesh founded ETOR Group in 2014 and has led it hands-on since — from the company's
                  first real estate projects to <span className="whitespace-nowrap">ETOR City's</span> land and agriculture programme today.
                </MaskReveal>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                {[
                  'IRDA & FMC certified Financial Advisor',
                  '12+ years in financial services, wealth management & investment advisory',
                  'Guided and mentored over 4 lakh traders and investors',
                  'Vishwaguru World Record — planting 10 lakh trees within two years',
                  '2 FMC Awards for Excellence in Portfolio Management',
                ].map((credential) => (
                  <li key={credential} className="flex items-start gap-xs font-body text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary-strong text-[18px] mt-0.5 shrink-0">check_circle</span>
                    {credential}
                  </li>
                ))}
              </ul>

              <div className="space-y-md">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary-strong">verified_user</span>
                  </div>
                  <div>
                    <p className="font-body text-label-md text-on-surface">Accountability First</p>
                    <p className="font-body text-body-sm text-on-surface-variant">
                      Every team is expected to deliver on what we tell investors.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary-strong">engineering</span>
                  </div>
                  <div>
                    <p className="font-body text-label-md text-on-surface">Hands-On Execution</p>
                    <p className="font-body text-body-sm text-on-surface-variant">
                      Involved in projects from planning through execution, not just at sign-off.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section id="recognition" className="relative py-xl bg-primary overflow-hidden">
        <span
          className="material-symbols-outlined absolute -bottom-16 -right-14 text-on-primary/5 pointer-events-none select-none"
          style={{ fontSize: '380px' }}
          aria-hidden="true"
        >
          workspace_premium
        </span>

        <div className="relative max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <Reveal tag="div" delay={0.1} x={-30} y={0} className="space-y-lg order-2 lg:order-1">
              <div>
                <Eyebrow tone="dark">Recognition</Eyebrow>
                <h2 className="font-display text-headline-lg text-on-primary mt-md mb-md">
                  Honoured as a <span className="text-secondary-fixed-dim">Green Entrepreneur</span>
                </h2>
                <MaskReveal tag="p" className="font-body text-body-lg text-on-primary/70 leading-relaxed">
                  ETOR Group's Founder & CEO, B. Nagesh, was presented with the Green
                  Entrepreneur award at Viswaguru World Records' Ugadi Puraskaralu 2026, in
                  recognition of ETOR City's land-and-agriculture model.
                </MaskReveal>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                {AWARD_DETAILS.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-md">
                    <div className="w-11 h-11 rounded-full bg-on-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">
                        {detail.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-body text-label-md text-on-primary/50 uppercase tracking-widest">
                        {detail.label}
                      </p>
                      <p className="font-body text-body-md text-on-primary">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={VISWAGURU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-xs font-body text-label-md uppercase tracking-widest text-secondary-fixed-dim hover:text-secondary-strong transition-colors"
              >
                Visit Viswaguru World Records
                <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
              </a>
            </Reveal>

            <Reveal tag="div" x={30} y={0} className="relative group order-1 lg:order-2 max-w-[26rem] mx-auto">
              <div
                className="absolute -inset-6 bg-secondary/15 rounded-[2.5rem] -rotate-2 transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-[1.02]"
                aria-hidden="true"
              />
              <ImageLightbox
                src={awardPlaque}
                alt="Viswaguru World Records 'Green Entrepreneur' award plaque presented to Sri. B. Nagesh, Founder & CEO of ETOR Group, at Ugadi Puraskaralu 2026, Hotel Daspalla, Visakhapatnam"
                className="block w-full"
              >
                <TiltCard
                  max={6}
                  className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-surface p-lg ring-1 ring-on-primary/10 transition-shadow duration-500 group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] group-hover:ring-secondary/60"
                >
                  <img
                    src={awardPlaque}
                    alt="Viswaguru World Records 'Green Entrepreneur' award plaque presented to Sri. B. Nagesh, Founder & CEO of ETOR Group, at Ugadi Puraskaralu 2026, Hotel Daspalla, Visakhapatnam"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </TiltCard>
              </ImageLightbox>
              <p className="relative mt-sm flex items-center justify-center gap-xs font-body text-body-sm text-on-primary/50">
                <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                Tap to view the full certificate
              </p>
            </Reveal>
          </div>

          <Reveal
            tag="div"
            delay={0.15}
            className="mt-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg rounded-[2rem] border border-on-primary/10 bg-on-primary/5 p-lg lg:p-xl"
          >
            {RECOGNITION_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="flex items-start gap-md">
                <div className="w-11 h-11 rounded-full bg-on-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p className="font-body text-label-md text-on-primary uppercase tracking-wide mb-xs">
                    {item.title}
                  </p>
                  <p className="font-body text-body-sm text-on-primary/60 leading-snug">{item.body}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal
            tag="p"
            delay={0.2}
            className="font-serif-display italic text-headline-md text-on-primary/70 text-center max-w-2xl mx-auto mt-xl"
          >
            "This recognition belongs to our incredible team, partners and everyone who
            believes in our mission."
          </Reveal>
        </div>
      </section>

      {/* ETOR City journey */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Milestones</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-on-surface mt-md">Our Journey</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {JOURNEY.map((stage, index) => (
              <Reveal
                key={stage.title}
                tag="div"
                delay={index * 0.1}
                className="relative p-lg rounded-[1.5rem] bg-surface border border-outline-variant/30"
              >
                <span className="font-display text-display-lg text-secondary/20 absolute top-md right-lg leading-none">
                  {stage.step}
                </span>
                <p className="font-body text-label-md text-secondary-strong uppercase tracking-widest mb-sm">
                  {stage.period}
                </p>
                <h3 className="font-display text-headline-md text-on-surface mb-sm">{stage.title}</h3>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">{stage.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>What we stand for</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-on-surface mt-md">Our Core Values</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-md">
            {CORE_VALUES.map((value, index) => (
              <Reveal
                key={value.title}
                tag="div"
                delay={index * 0.08}
                className="p-md rounded-[1.5rem] bg-surface border border-outline-variant/20"
              >
                <div className="w-11 h-11 mb-md bg-secondary/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary-strong text-[22px]">{value.icon}</span>
                </div>
                <h4 className="font-display text-headline-md text-on-surface mb-xs">{value.title}</h4>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-xl bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            <Reveal tag="div">
              <span className="material-symbols-outlined text-secondary-strong text-[40px] mb-md block">target</span>
              <h3 className="font-display text-headline-lg text-on-primary mb-md">Our Mission</h3>
              <p className="font-body text-body-lg text-on-primary/70 leading-relaxed">
                To redefine real estate investment through innovative, sustainable projects — offering a 100%
                cashback programme and a transparent return model, while fostering community growth and
                environmental stewardship.
              </p>
            </Reveal>

            <Reveal tag="div" delay={0.1}>
              <span className="material-symbols-outlined text-secondary-strong text-[40px] mb-md block">visibility</span>
              <h3 className="font-display text-headline-lg text-on-primary mb-md">Our Vision</h3>
              <p className="font-body text-body-lg text-on-primary/70 leading-relaxed">
                To be a recognized leader in land-led, sustainable real estate development — known for
                investor transparency, community well-being, and eco-conscious ventures.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>What sets us apart</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-on-surface mt-md">
              Why Choose ETOR Group?
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-xl gap-y-lg max-w-4xl mx-auto">
            {WHY_CHOOSE_US.map((item, index) => (
              <Reveal key={item.title} tag="div" delay={index * 0.06} className="flex gap-md">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary-strong">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-display text-headline-md text-on-surface mb-xs">{item.title}</h4>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other ventures teaser — low-emphasis, mirrors Services.jsx; the full
          index lives at /other-ventures so it doesn't compete with the land
          story above (previously this was a prominent six-chip ribbon). */}
      <section className="py-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal
            tag="div"
            className="flex flex-col sm:flex-row items-center justify-between gap-md rounded-2xl border border-outline-variant/20 bg-surface px-lg py-md"
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

      {/* Invitation */}
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

        <Reveal tag="div" className="relative z-10 max-w-container-max mx-auto px-margin-mobile lg:px-xl text-center">
          <h2 className="font-serif-display text-display-lg-mobile lg:text-display-xl text-on-primary mb-lg max-w-4xl mx-auto">
            Come see the land <span className="text-gradient-shimmer">for yourself.</span>
          </h2>
          <p className="font-body text-body-lg text-on-primary/60 max-w-2xl mx-auto mb-xl">
            Review the master plan, ask any question, and decide at your own pace.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
            <MagneticButton
              as={Link}
              to="/projects"
              className="w-full sm:w-auto px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest shadow-2xl shadow-secondary/50 inline-flex items-center justify-center gap-sm"
            >
              Explore ETOR City
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </MagneticButton>
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
