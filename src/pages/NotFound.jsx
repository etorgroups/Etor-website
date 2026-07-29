import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-background">
      <Reveal tag="div" className="max-w-[32rem] text-center px-margin-mobile">
        <p className="font-display text-display-lg text-secondary mb-md">404</p>
        <h1 className="font-display text-headline-xl text-primary mb-md">This page has wandered off the plantation.</h1>
        <p className="font-body text-body-lg text-on-surface-variant mb-xl">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <MagneticButton
          as={Link}
          to="/"
          className="px-xl py-md bg-primary text-on-primary rounded-full font-body text-label-md uppercase tracking-widest inline-flex"
        >
          Back to Home
        </MagneticButton>
      </Reveal>
    </section>
  )
}
