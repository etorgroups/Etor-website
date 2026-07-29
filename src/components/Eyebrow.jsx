// Small pulsing-dot pill label used above headlines throughout the site.
export default function Eyebrow({ children, tone = 'light' }) {
  const tones = {
    light: 'bg-secondary/20 border-secondary/30 text-secondary',
    dark: 'bg-on-primary/10 border-on-primary/20 text-on-primary',
  }

  return (
    <div
      className={`inline-flex items-center gap-sm px-md py-xs rounded-full backdrop-blur-md border ${tones[tone]}`}
    >
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      <span className="font-body text-label-md uppercase tracking-widest">{children}</span>
    </div>
  )
}
