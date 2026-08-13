// A small, quiet disclosure note — sits directly beneath any return,
// cashback, price or testimonial claim sourced from the brochure but not yet
// independently verified. Per the creative brief: these are presented as
// "programme terms as described in the brochure," never as guaranteed fact.
export default function Disclosure({ children, className = '' }) {
  return (
    <p className={`font-body text-[11px] text-on-surface-variant/75 leading-snug ${className}`}>
      <span className="material-symbols-outlined text-[13px] align-text-bottom mr-0.5">info</span>
      {children}
    </p>
  )
}
