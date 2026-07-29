// Invisible until keyboard-focused — lets keyboard/screen-reader users jump
// straight to the page content instead of tabbing through the whole nav.
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-2 left-2 z-[100] -translate-y-24 focus:translate-y-0 px-lg py-sm rounded-lg bg-secondary text-on-secondary font-body text-label-md uppercase tracking-widest shadow-xl transition-transform duration-200"
    >
      Skip to content
    </a>
  )
}
