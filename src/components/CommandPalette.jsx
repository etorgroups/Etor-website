import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { toggleTheme } from '../lib/theme'
import { CITY_META } from '../data/plotMap'

const PAGES = [
  { label: 'Home', to: '/', icon: 'home', keywords: ['home', 'landing'] },
  { label: 'The Story', to: '/about', icon: 'info', keywords: ['about', 'story', 'team', 'founder', 'history'] },
  { label: 'ETOR City', to: '/projects', icon: 'domain', keywords: ['projects', 'city', 'plots', 'packages', 'land'] },
  { label: 'Living Assets', to: '/services', icon: 'apps', keywords: ['services', 'assets', 'mango', 'dairy', 'sandalwood'] },
  { label: 'Other Ventures', to: '/other-ventures', icon: 'storefront', keywords: ['ventures', 'roi', 'gaming', 'forex', 'crypto'] },
  { label: 'Contact', to: '/contact', icon: 'mail', keywords: ['contact', 'reach', 'phone', 'email', 'whatsapp'] },
  { label: 'Privacy Policy', to: '/privacy', icon: 'shield', keywords: ['privacy', 'cookies', 'data'] },
  { label: 'Terms', to: '/terms', icon: 'gavel', keywords: ['terms', 'conditions', 'legal'] },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    const onExternalToggle = () => setOpen((prev) => !prev)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('command-palette:toggle', onExternalToggle)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('command-palette:toggle', onExternalToggle)
    }
  }, [])

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    if (open) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      window.dispatchEvent(new CustomEvent('lenis:pause'))
    } else {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.dispatchEvent(new CustomEvent('lenis:resume'))
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.dispatchEvent(new CustomEvent('lenis:resume'))
    }
  }, [open])

  const go = (to) => {
    navigate(to)
    setOpen(false)
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Quick navigation"
      className="fixed top-[14vh] left-1/2 -translate-x-1/2 z-[300] w-[calc(100vw-2rem)] max-w-[36rem] bg-surface border border-outline-variant/30 rounded-[1.25rem] shadow-2xl overflow-hidden"
      overlayClassName="fixed inset-0 z-[299] bg-primary/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-sm px-lg pt-md pb-sm border-b border-outline-variant/20">
        <span className="material-symbols-outlined text-on-surface-variant">search</span>
        <Command.Input
          autoFocus
          placeholder="Jump to a page, a city's plot map, or toggle theme…"
          className="w-full bg-transparent outline-none font-body text-body-md text-on-surface placeholder:text-on-surface-variant py-sm"
        />
        <kbd className="hidden sm:inline font-body text-[10px] text-on-surface-variant border border-outline-variant/40 rounded px-1.5 py-0.5">
          Esc
        </kbd>
      </div>

      <Command.List
        className="max-h-[60vh] overflow-y-auto p-sm overscroll-contain"
        onWheel={(event) => event.stopPropagation()}
        onTouchMove={(event) => event.stopPropagation()}
      >
        <Command.Empty className="py-lg text-center font-body text-body-sm text-on-surface-variant">
          No matches — try a page name or city.
        </Command.Empty>

        <Command.Group
          heading="Pages"
          className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest px-md pt-sm pb-xs [&_[cmdk-group-heading]]:px-md [&_[cmdk-group-heading]]:pt-sm [&_[cmdk-group-heading]]:pb-xs [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-on-surface-variant"
        >
          {PAGES.map((page) => (
            <Command.Item
              key={page.to}
              onSelect={() => go(page.to)}
              keywords={page.keywords}
              className="flex items-center gap-sm px-md py-sm rounded-lg cursor-pointer font-body text-body-sm text-on-surface data-[selected=true]:bg-secondary/10 data-[selected=true]:text-secondary-strong"
            >
              <span className="material-symbols-outlined text-[18px]">{page.icon}</span>
              {page.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group className="[&_[cmdk-group-heading]]:px-md [&_[cmdk-group-heading]]:pt-sm [&_[cmdk-group-heading]]:pb-xs [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-on-surface-variant" heading="Real Layouts">
          {Object.entries(CITY_META).map(([id, meta]) => (
            <Command.Item
              key={id}
              onSelect={() => go(`/projects/${id}/layouts`)}
              className="flex items-center gap-sm px-md py-sm rounded-lg cursor-pointer font-body text-body-sm text-on-surface data-[selected=true]:bg-secondary/10 data-[selected=true]:text-secondary-strong"
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
              {meta.title}
              <span className="ml-auto text-[11px] text-on-surface-variant">{meta.location}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group className="[&_[cmdk-group-heading]]:px-md [&_[cmdk-group-heading]]:pt-sm [&_[cmdk-group-heading]]:pb-xs [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-on-surface-variant" heading="Appearance">
          <Command.Item
            onSelect={() => {
              toggleTheme()
              setOpen(false)
            }}
            className="flex items-center gap-sm px-md py-sm rounded-lg cursor-pointer font-body text-body-sm text-on-surface data-[selected=true]:bg-secondary/10 data-[selected=true]:text-secondary-strong"
          >
            <span className="material-symbols-outlined text-[18px]">contrast</span>
            Toggle light / dark theme
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
