import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-background">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist or has been moved." path="/404" noindex />
      <Reveal tag="div" className="max-w-[32rem] text-center px-margin-mobile">
        <p className="font-display text-display-lg text-secondary-strong mb-md">404</p>
        <h1 className="font-display text-headline-xl text-on-surface mb-md">This page has wandered off the plantation.</h1>
        <p className="font-body text-body-lg text-on-surface-variant mb-xl">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-md">
          <MagneticButton
            as={Link}
            to="/"
            className="px-xl py-md bg-primary text-on-primary rounded-full font-body text-label-md uppercase tracking-widest inline-flex"
          >
            Back to Home
          </MagneticButton>
          <MagneticButton
            as={Link}
            to="/projects"
            className="px-xl py-md border border-outline-variant/50 text-on-surface rounded-full font-body text-label-md uppercase tracking-widest hover:bg-surface-container-low transition-colors inline-flex"
          >
            Explore ETOR City
          </MagneticButton>
        </div>
        <Link
          to="/contact"
          className="mt-lg inline-flex items-center gap-xs font-body text-label-md uppercase tracking-widest text-secondary-strong hover:text-secondary-container transition-colors"
        >
          Or contact us directly
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </Reveal>
    </section>
  )
}
