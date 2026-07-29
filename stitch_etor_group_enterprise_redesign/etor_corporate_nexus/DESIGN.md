---
name: ETOR Corporate Nexus
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001f26'
  on-tertiary-container: '#0090a9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

This design system embodies the "Modern Enterprise" aesthetic—a fusion of corporate stability and high-velocity technology. The brand personality is authoritative yet innovative, catering to high-stakes stakeholders who value precision and forward-thinking engineering.

The visual direction utilizes **Modern SaaS** principles with a heavy emphasis on **Glassmorphism** for navigational and overlay elements. The interface prioritizes clarity through generous whitespace, high-contrast typography, and a "Technological Tactility" achieved through subtle blurs and layered depth. The emotional response should be one of absolute reliability, cutting-edge capability, and seamless sophistication.

## Colors

The palette is anchored by **Deep Navy (#0F172A)**, providing a serious, institutional foundation. **Vibrant Blue (#2563EB)** acts as the primary driver for action and focus, while **Cyan (#06B6D4)** serves as a high-tech accent for data visualization and progress indicators.

- **Primary:** Deep Navy for text, dark mode backgrounds, and structural elements.
- **Secondary:** Vibrant Blue for primary buttons, active states, and links.
- **Accent:** Cyan for secondary highlights, icons, and gradients.
- **Surface:** Pure white for main content areas, with light slate (#F8FAFC) used to differentiate sections or provide subtle grouping.

## Typography

The typographic system utilizes **Space Grotesk** for all headings to inject a technical, futuristic edge. Its geometric nature reflects the group's engineering prowess. **Inter** is used for all body text and UI labels, ensuring maximum readability and a systematic, utilitarian feel at smaller scales.

Headlines should utilize tight letter spacing and aggressive line heights for a compact, professional look. Body text should maintain generous line heights (1.5 - 1.6) to ensure clarity in data-heavy enterprise dashboards.

## Layout & Spacing

The design system employs a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. A strict **8px spacing scale** governs all internal margins and paddings.

- **Desktop (1280px+):** 12 columns, 24px gutters, 80px+ page margins.
- **Tablet (768px - 1024px):** 8 columns, 24px gutters, 48px page margins.
- **Mobile (Below 768px):** 4 columns, 16px gutters, 16px page margins.

Layouts should favor vertical stacks with generous section spacing (xl) to maintain the "premium" feel of high-end SaaS platforms.

## Elevation & Depth

Depth is achieved through a combination of **Ambient Shadows** and **Glassmorphism**. 

1.  **Level 0 (Base):** Primary background (#FFFFFF).
2.  **Level 1 (Cards):** Soft, diffused shadows (0px 4px 20px rgba(15, 23, 42, 0.05)) with a 1px border (#E2E8F0).
3.  **Level 2 (Overlays/Glass):** Used for navigation bars and mega menus. Background: rgba(255, 255, 255, 0.7) with a 12px backdrop-blur and a 1px white semi-transparent stroke for the "inner glow" effect.
4.  **Level 3 (Modals):** High-diffusion shadows (0px 20px 50px rgba(15, 23, 42, 0.15)) to separate critical tasks from the base UI.

## Shapes

The design system uses a generous **24px (rounded-xl)** standard for primary containers and cards. This softens the technical aesthetic, making the interface feel modern and approachable rather than cold.

- **Standard Buttons:** 8px (Soft).
- **Cards & Primary Sections:** 24px (Large).
- **Form Inputs:** 12px (Medium).
- **Chips/Badges:** Pill-shaped.

## Components

### Premium Cards
Cards feature a 24px corner radius and a subtle 1px border. On hover, cards should lift slightly (4px translation) and the border color should shift to the Secondary Blue.

### Magnetic Buttons
Primary buttons use a "Magnetic" interaction: when the cursor is near, the button attracts the cursor with a smooth Spring animation. Use the Vibrant Blue background with white Inter Bold text.

### Mega Menus
Navigation utilizes glassmorphic mega menus. These use a 12px backdrop blur and contain organized columns of links with icons. Entry animations should be a subtle "fade and scale" from 95% to 100%.

### Interactive Accordions
Accordions are used for FAQs and complex data hierarchies. They feature a 1px bottom border and use a "chevron rotate" animation. When expanded, the background of the active item shifts to the alternate background color (#F8FAFC).

### Input Fields
Inputs are tall (48px) with a 12px radius. The focus state uses a 2px Vibrant Blue border and a subtle blue outer glow (3px spread).