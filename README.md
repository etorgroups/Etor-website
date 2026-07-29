# ETOR Group

Production React site for ETOR Group — a diversified enterprise spanning premium agriculture (Miyazaki mango plantations, organic dairy), fintech (ROI, Forex, Crypto, Money), gaming, and ventures.

Built from the original `stitch_etor_group_enterprise_redesign/` design export (Tailwind-based HTML mockups + `DESIGN.md` design system).

## Stack

- React 19 + Vite
- Tailwind CSS v4 (design tokens defined in `src/index.css` `@theme`)
- Framer Motion (scroll reveals, magnetic buttons, page transitions, count-up stats)
- React Router v7

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run lint       # oxlint
```

## Structure

```
src/
  components/   Header, Footer, Reveal (scroll fade), Counter, MagneticButton,
                ParallaxImage, ShaderBackground (WebGL hero background), Eyebrow
  pages/        Home, About, Services, Projects, Contact, NotFound
  data/         Shared content (recurring "three pillars" block)
  assets/images WebP-optimized photography sourced from the original design export
```

## Notes

- `src/index.css`'s `@theme` block documents a Tailwind v4 gotcha: custom `--spacing-*`
  keys named `xs/sm/md/lg/xl` shadow the default `--container-*` scale used by
  `max-w-*` utilities. Use `max-w-[Nrem]` (or names like `2xl`/`3xl` that don't collide)
  for those sizes.
- A few images (river valleys on Home, the global office shot on About) use Unsplash
  placeholder photography since no equivalent existed in the source asset export —
  swap these for real photography when available.
