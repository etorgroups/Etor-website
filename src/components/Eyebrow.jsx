// Small pulsing-dot pill label used above headlines throughout the site.
export default function Eyebrow({ children, tone = 'light' }) {
  const tones = {
    light: 'border-secondary text-secondary-strong',
    dark: 'border-secondary-fixed-dim text-secondary-fixed-dim',
  }

  return (
    <div
      className={`inline-flex items-center gap-sm border-l-2 pl-sm py-xs ${tones[tone]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em]">{children}</span>
    </div>
  )
}
