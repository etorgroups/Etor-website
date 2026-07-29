import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import Counter from '../components/Counter'
import MagneticButton from '../components/MagneticButton'
import ShaderBackground from '../components/ShaderBackground'
import TiltCard from '../components/TiltCard'
import { JOURNEY } from '../data/journey'
import { WHY_CHOOSE_US } from '../data/whyChooseUs'
import etorCity34 from '../assets/images/etor-city-3-4.webp'
import founderCeo from '../assets/images/founder-ceo.webp'
import etorMoneyGaming from '../assets/images/etor-money-gaming.webp'

// Grounded, verifiable figures only — see Welcome-To-ETOR-GROUP.pdf. The
// document doesn't give hard branch/client counts (those are "0+" dynamic
// placeholders in the source), so we count what's actually real instead of
// inventing precision numbers.
const STATS = [
  { target: 12, suffix: '+', label: 'Years of Trust' },
  { target: 6, suffix: '', label: 'Core Ventures' },
  { target: 3, suffix: '', label: 'ETOR City Projects' },
]

// Full descriptions live on the Services page — About only needs the
// name/icon for a quick-glance chip strip, so descriptions aren't repeated here.
const VENTURES = [
  { icon: 'trending_up', name: 'ETOR ROI' },
  { icon: 'sports_esports', name: 'ETOR Gaming' },
  { icon: 'currency_exchange', name: 'ETOR Forex' },
  { icon: 'currency_bitcoin', name: 'ETOR Crypto' },
  { icon: 'rocket_launch', name: 'ETOR Ventures' },
  { icon: 'payments', name: 'ETOR Money' },
]

const CORE_VALUES = [
  {
    icon: 'handshake',
    title: 'Trust',
    body: "We build lasting relationships through unwavering honesty, integrity, and reliability, ensuring every promise made is a promise kept. Our investors' confidence is the bedrock of our success.",
  },
  {
    icon: 'lightbulb',
    title: 'Innovation',
    body: "We continuously seek and implement novel solutions, from our unique Miyazaki Mango Plantation model to our comprehensive cashback program, pushing the boundaries of what's possible in real estate.",
  },
  {
    icon: 'workspace_premium',
    title: 'Excellence',
    body: 'We commit to the highest standards in every aspect of our operations, delivering superior quality in our projects, services, and investor experiences.',
  },
  {
    icon: 'visibility',
    title: 'Transparency',
    body: 'Open communication and clear processes are fundamental to our approach. We ensure all stakeholders have complete visibility into our projects and financial dealings.',
  },
  {
    icon: 'eco',
    title: 'Sustainability',
    body: 'Our projects are designed with a deep respect for the environment and a commitment to long-term ecological balance, ensuring prosperity for future generations.',
  },
]

export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-primary">
        <ShaderBackground className="absolute inset-0 w-full h-full opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/20 to-primary/80" />

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile lg:px-xl py-xl w-full">
          <div className="flex flex-col lg:flex-row items-center gap-xl">
            <Reveal tag="div" y={30} className="w-full lg:w-2/3 space-y-lg">
              <Eyebrow tone="dark">Building a Sustainable Future, Together</Eyebrow>
              <h1 className="font-display text-display-lg-mobile lg:text-display-lg text-on-primary leading-none">
                12 Years of <span className="text-secondary">Trust,</span> Innovation & Growth
              </h1>
              <p className="font-body text-body-lg text-on-primary/80 max-w-[36rem]">
                Established over 12 years ago, ETOR Group has consistently operated under a strong leadership
                philosophy focused on innovation, integrity, and a clear vision for future success — pioneering
                projects that are both economically viable and environmentally conscious.
              </p>
              <div className="flex flex-wrap gap-md">
                <MagneticButton
                  as={Link}
                  to="/projects"
                  className="px-xl py-md bg-on-primary text-primary rounded-full font-body text-label-md uppercase tracking-widest inline-flex"
                >
                  Our Journey
                </MagneticButton>
                <MagneticButton
                  as={Link}
                  to="/services"
                  className="px-xl py-md bg-surface-container/20 border border-on-primary/20 backdrop-blur-md text-on-primary rounded-full font-body text-label-md uppercase tracking-widest hover:bg-on-primary/10 transition-colors inline-flex"
                >
                  The Ecosystem
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal tag="div" delay={0.2} x={30} y={0} className="hidden lg:block w-1/3 relative">
              <TiltCard>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-on-primary/20">
                  <img
                    src={etorCity34}
                    alt="ETOR City venture overview"
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </TiltCard>
              <div className="absolute -top-6 -right-6 bg-surface/95 backdrop-blur-md rounded-2xl px-lg py-md shadow-xl">
                <p className="font-display text-headline-md text-secondary leading-none">12+ Years</p>
                <p className="font-body text-body-sm text-on-surface-variant">Legacy of Excellence</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-container py-xl">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg text-center">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} tag="div" delay={index * 0.1}>
                <Counter
                  target={stat.target}
                  suffix={stat.suffix}
                  className="font-display text-display-lg text-primary block"
                />
                <p className="font-body text-label-md text-on-surface-variant uppercase tracking-widest mt-sm">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>Twelve Years of Vision & Growth</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-primary mt-md">Our Journey</h2>
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
                <p className="font-body text-label-md text-secondary uppercase tracking-widest mb-sm">
                  {stage.period}
                </p>
                <h3 className="font-display text-headline-md text-primary mb-sm">{stage.title}</h3>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">{stage.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures at a glance — full breakdown lives on Services, this just
          acknowledges the breadth without repeating that page's content */}
      <section className="py-lg bg-surface-container-low border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="flex flex-col lg:flex-row items-center gap-md">
            <p className="font-body text-label-md text-on-surface-variant uppercase tracking-widest shrink-0">
              Six Ventures, One Ecosystem
            </p>
            <div className="flex flex-wrap justify-center gap-sm flex-1">
              {VENTURES.map((venture) => (
                <span
                  key={venture.name}
                  className="inline-flex items-center gap-xs px-md py-xs rounded-full bg-surface border border-outline-variant/30 font-body text-label-md text-on-surface"
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">{venture.icon}</span>
                  {venture.name}
                </span>
              ))}
            </div>
            <Link
              to="/services"
              className="shrink-0 font-body text-label-md text-secondary uppercase tracking-widest border-b-2 border-secondary pb-xs hover:opacity-70 transition-opacity"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-xl bg-surface overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <Reveal tag="div" x={-30} y={0} className="relative">
              <div className="absolute -inset-6 bg-secondary/10 rounded-[2.5rem] rotate-3" aria-hidden="true" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] max-w-[28rem] mx-auto">
                <img
                  src={founderCeo}
                  alt="B. Nagesh, Founder & CEO of ETOR Group"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-lg">
                  <p className="font-display text-headline-md text-on-primary">B. Nagesh</p>
                  <p className="font-body text-body-sm text-on-primary/70">Founder & CEO</p>
                </div>
              </div>
            </Reveal>

            <Reveal tag="div" delay={0.15} x={30} y={0} className="space-y-lg">
              <div>
                <h2 className="font-display text-headline-xl text-primary mb-md">Leadership Philosophy</h2>
                <div className="w-20 h-1 bg-secondary rounded-full mb-lg" />
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  ETOR Group's leadership is guided by a proactive and visionary philosophy. We believe in fostering a
                  culture of accountability, empowering our teams, and making decisions that prioritize the long-term
                  benefit of our investors and the communities where we operate.
                </p>
              </div>

              <div className="space-y-md">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary">verified_user</span>
                  </div>
                  <div>
                    <p className="font-body text-label-md text-primary">Accountability First</p>
                    <p className="font-body text-body-sm text-on-surface-variant">
                      Empowering every team to deliver on the promises we make to investors.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary">engineering</span>
                  </div>
                  <div>
                    <p className="font-body text-label-md text-primary">Hands-On Execution</p>
                    <p className="font-body text-body-sm text-on-surface-variant">
                      Deeply involved in every project, from meticulous planning through execution.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-xl bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl mb-xl">
            <Reveal tag="div">
              <span className="material-symbols-outlined text-secondary text-[40px] mb-md block">target</span>
              <h3 className="font-display text-headline-lg text-on-primary mb-md">Our Mission</h3>
              <p className="font-body text-body-lg text-on-primary/70 leading-relaxed">
                To redefine real estate investment through innovative, sustainable projects that deliver
                unparalleled returns, ensuring 100% cashback on investments and guaranteed revenue, while fostering
                community growth and environmental stewardship.
              </p>
            </Reveal>

            <Reveal tag="div" delay={0.1}>
              <span className="material-symbols-outlined text-secondary text-[40px] mb-md block">visibility</span>
              <h3 className="font-display text-headline-lg text-on-primary mb-md">Our Vision</h3>
              <p className="font-body text-body-lg text-on-primary/70 leading-relaxed">
                To be a global leader in innovative and sustainable real estate development, recognized for our
                commitment to investor prosperity, community well-being, and pioneering eco-friendly ventures.
              </p>
            </Reveal>
          </div>

          <div className="w-16 h-px bg-on-primary/15 mx-auto mb-xl" aria-hidden="true" />

          <Reveal tag="div" className="text-center mb-lg">
            <h3 className="font-display text-headline-lg text-on-primary">Our Core Values</h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-md">
            {CORE_VALUES.map((value, index) => (
              <Reveal
                key={value.title}
                tag="div"
                delay={index * 0.08}
                className="p-md rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 mb-md bg-secondary/20 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-[22px]">{value.icon}</span>
                </div>
                <h4 className="font-display text-headline-md text-on-primary mb-xs">{value.title}</h4>
                <p className="font-body text-body-sm text-on-primary/70 leading-relaxed">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal tag="div" className="max-w-[36rem] mx-auto text-center mb-xl">
            <Eyebrow>What Sets Us Apart</Eyebrow>
            <h2 className="font-display text-headline-xl lg:text-display-lg text-primary mt-md">
              Why Choose ETOR Group?
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-xl gap-y-lg max-w-4xl mx-auto">
            {WHY_CHOOSE_US.map((item, index) => (
              <Reveal key={item.title} tag="div" delay={index * 0.06} className="flex gap-md">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-display text-headline-md text-primary mb-xs">{item.title}</h4>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile lg:px-xl">
          <Reveal
            tag="div"
            className="relative h-[400px] rounded-[2rem] overflow-hidden flex items-center justify-center"
          >
            <img
              src={etorMoneyGaming}
              alt="ETOR Group digital finance network"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-primary/70" />
            <div className="relative z-10 max-w-[32rem] text-center bg-surface/90 backdrop-blur-xl rounded-[2rem] p-xl mx-md shadow-2xl">
              <h2 className="font-display text-headline-xl text-primary mb-md">Ready to Scale?</h2>
              <p className="font-body text-body-md text-on-surface-variant mb-lg">
                Partner with a team building legacies — profitable for investors, enriching for communities, and
                sustainable for the planet.
              </p>
              <MagneticButton
                as={Link}
                to="/contact"
                className="group px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest inline-flex items-center gap-sm"
              >
                Partner With Us
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
