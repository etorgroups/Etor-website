import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useSpring, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { PACKAGES, CASHBACK_MONTHS } from '../data/packages'

const MIN_AREA = 100
const MAX_AREA = 3000
const DEFAULT_AREA = 500

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function AnimatedCurrency({ value, className }) {
  const spring = useSpring(value, { stiffness: 120, damping: 22 })
  const display = useTransform(spring, (v) => inr.format(Math.round(v)))

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span className={className}>{display}</motion.span>
}

export default function InvestmentCalculator() {
  const [packageId, setPackageId] = useState(PACKAGES[0].id)
  const [area, setArea] = useState(DEFAULT_AREA)

  const pkg = PACKAGES.find((p) => p.id === packageId)
  const totalInvestment = area * pkg.pricePerSqYd
  const monthlyCashback = totalInvestment / CASHBACK_MONTHS
  const progressPct = 8 // purely illustrative starting sliver on the timeline bar

  return (
    <div className="rounded-[2rem] bg-surface border border-outline-variant/30 p-lg lg:p-xl shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        {/* Inputs */}
        <div>
          <p className="font-body text-label-md text-on-surface-variant uppercase tracking-widest mb-sm">
            1. Choose a package
          </p>
          <div className="flex flex-wrap gap-sm mb-lg">
            {PACKAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPackageId(p.id)}
                aria-pressed={packageId === p.id}
                className={`px-md py-sm rounded-full font-body text-label-md transition-colors ${
                  packageId === p.id
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/40 hover:border-secondary/50'
                }`}
              >
                {p.name} · ₹{p.pricePerSqYd}/sq.yd
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-sm">
            <label htmlFor="area-slider" className="font-body text-label-md text-on-surface-variant uppercase tracking-widest">
              2. Investment area
            </label>
            <span className="font-display text-headline-md text-primary">{area.toLocaleString('en-IN')} sq.yd</span>
          </div>
          <input
            id="area-slider"
            type="range"
            min={MIN_AREA}
            max={MAX_AREA}
            step={50}
            value={area}
            onChange={(event) => setArea(Number(event.target.value))}
            className="w-full accent-secondary"
            aria-valuetext={`${area} square yards`}
          />
          <div className="flex justify-between font-body text-body-sm text-on-surface-variant mt-xs">
            <span>{MIN_AREA.toLocaleString('en-IN')} sq.yd</span>
            <span>{MAX_AREA.toLocaleString('en-IN')} sq.yd</span>
          </div>
        </div>

        {/* Results */}
        <div className="bg-surface-container-low rounded-[1.5rem] p-lg flex flex-col">
          <p className="font-body text-label-md text-on-surface-variant uppercase tracking-widest mb-sm">
            Your cashback timeline
          </p>

          <div className="grid grid-cols-2 gap-md mb-lg">
            <div>
              <AnimatedCurrency value={totalInvestment} className="font-display text-headline-lg text-primary block" />
              <p className="font-body text-body-sm text-on-surface-variant">Total investment</p>
            </div>
            <div>
              <AnimatedCurrency
                value={monthlyCashback}
                className="font-display text-headline-lg text-secondary block"
              />
              <p className="font-body text-body-sm text-on-surface-variant">Cashback / month</p>
            </div>
          </div>

          {/* Timeline bar */}
          <div className="mb-md">
            <div className="h-2 rounded-full bg-outline-variant/30 overflow-hidden">
              <motion.div
                className="h-full bg-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="flex justify-between font-body text-body-sm text-on-surface-variant mt-xs">
              <span>Month 1</span>
              <span>100% returned by Month {CASHBACK_MONTHS}</span>
            </div>
          </div>

          <div className="flex items-center gap-sm p-md rounded-xl bg-surface border border-outline-variant/20 mb-lg">
            <span className="material-symbols-outlined text-secondary">eco</span>
            <p className="font-body text-body-sm text-on-surface">
              This package's stated yield potential:{' '}
              <span className="font-display text-primary">{pkg.statedYield}</span>
              <span className="text-on-surface-variant"> — separate from the cashback above.</span>
            </p>
          </div>

          <MagneticButton
            as={Link}
            to="/contact"
            className="mt-auto w-full text-center px-xl py-md bg-secondary text-on-secondary rounded-full font-body text-label-md uppercase tracking-widest inline-flex justify-center"
          >
            Enquire About This Package
          </MagneticButton>
        </div>
      </div>

      <p className="font-body text-body-sm text-on-surface-variant mt-lg">
        This calculator illustrates ETOR Group's stated 100% cashback-in-{CASHBACK_MONTHS}-months term only. It is
        not a projection of yield, appreciation, or any other return, and does not guarantee performance. See our{' '}
        <Link to="/terms" className="text-secondary underline underline-offset-2">
          Terms of Service
        </Link>{' '}
        for full details.
      </p>
    </div>
  )
}
