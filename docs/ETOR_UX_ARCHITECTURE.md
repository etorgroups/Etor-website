# ETOR Group — Phase 2 UX and Content Architecture

Status: approved working architecture for the React frontend

## Primary user outcome

Within the first two minutes, a visitor should understand:

1. What ETOR Group is.
2. What ETOR City offers.
3. Why the model is tangible and different.
4. What the brochure claims versus what still needs verification.
5. How to request details or speak to the team.

The primary conversion is **Request the ETOR City master plan**. Secondary conversions
are **Explore projects**, **Ask a question**, and **Contact an advisor**.

## Navigation

Desktop navigation:

- Home
- The Story
- ETOR City
- Living Assets
- Contact

Utility actions:

- Download master plan
- Theme toggle
- Partner login

Mobile navigation follows the same order, with the master plan as the first highlighted
action. Existing routes remain available for compatibility:

- `/` — editorial overview
- `/about` — story, people, history and proof
- `/services` — living assets and operating verticals
- `/projects` — ETOR City packages and plot map entry points
- `/contact` — enquiry, contact details and FAQ
- `/privacy`, `/terms` — legal information

## Homepage scroll narrative

### Scene 1 — The ground

Full-bleed orchard / land image. The opening statement is short and readable:

> Build value that keeps growing.

Support line: ETOR brings land, cultivation, community and long-term participation
together across Andhra Pradesh.

Actions: Explore ETOR City / Read our story.

Interaction: slow image drift only; no competing floating logo or card.

### Scene 2 — The proof rail

A compact horizontal proof band with only verified or clearly labelled figures:

- Founded / operating history
- ETOR City locations
- Acreage shown in the brochure
- Programme documents

Each figure links to its supporting section or document. No unsupported “guarantee”
language in the proof rail.

### Scene 3 — ETOR City

One flagship landscape image and a narrative explaining that ETOR City is a managed
place combining plots, cultivation, amenities and hospitality.

Actions: Explore packages / Download master plan.

Interaction: image-to-detail reveal; the image remains visible while copy changes.

### Scene 4 — A living portfolio

Four asset chapters presented as a calm editorial sequence:

- Miyazaki mango
- Organic dairy
- Sandalwood
- Sitafal and dragon fruit

Each chapter contains: what it is, why ETOR includes it, what the brochure says, and a
small “programme terms / market-dependent” disclosure where relevant.

### Scene 5 — How participation works

Five numbered steps:

1. Start a conversation.
2. Choose a city / package.
3. Review the master plan and terms.
4. Complete documentation.
5. Receive ongoing project and programme updates.

The flow must make the process feel understandable, not urgent or speculative.

### Scene 6 — Packages

Three comparable package cards:

- ETOR City 1 — Sariapalle — ₹3,999 / sq. yd
- ETOR City 2 — Sottadivalasa — ₹3,999 / sq. yd
- ETOR City 3 & 4 — Ichapuram — ₹4,999 / sq. yd

Each card links to the plot map, relevant brochure details, and the enquiry form.
Prices must be marked “as shown in the brochure” until confirmed current.

### Scene 7 — The place around the plot

Amenities and development proof: accommodation, restaurant, theatre, security, CCTV,
gardens, power, water, pool, recreation, maintenance and title-related information.

Avoid presenting every amenity as a badge grid. Use three grouped themes:

- Stay and hospitality
- Safety and infrastructure
- Nature and recreation

### Scene 8 — Trust and disclosure

Show founder / team context, address, documents, FAQ and plain-language disclosure.
Return examples must be shown as brochure examples, not guaranteed outcomes.

### Scene 9 — The invitation

Quiet final CTA:

> See the land. Understand the terms. Decide with clarity.

Actions: Request master plan / Speak to ETOR.

## Supporting page architecture

### About

Narrative order: origin → founder → ETOR City journey → values → operating philosophy →
proof → contact.

### Services / Living Assets

Replace an equal-weight six-card grid with an editorial index. ETOR City is first, then
dairy, crops, and the wider venture portfolio. Each item explains its relationship to
the central land-led story.

### Projects / ETOR City

Start with a clean project comparison, then show package detail, benefits, calculator,
master plan download, plot map and FAQ. The calculator must state that it illustrates
brochure terms and is not a promise of future performance.

### Contact

Start with the promise of a human response, then enquiry form, address, phone/email,
master plan shortcut, and FAQ. Plot-map enquiries prefill the form but remain editable.

## Interaction rules

- Every scroll effect must have a readable resting state.
- Scroll should reveal relationships, never hide essential information.
- Hover adds depth, not a layout jump.
- No autoplay sound.
- No forced full-screen takeover after the first visit.
- Focus states remain visible and keyboard order follows the visual story.
- Mobile uses normal vertical reading; desktop may use horizontal or pinned moments only
  when the content benefits from comparison.

## Conversion and trust rules

- The master plan is always reachable in one click.
- Investment and return claims sit next to their disclosure.
- “Guaranteed”, “first in India”, “world’s most expensive”, ratings and projections are
  never treated as independently verified facts.
- Contact actions use clear verbs, not vague “Learn more” labels where a stronger action
  is available.

## Phase 3 handoff

Asset slots are now defined. The next phase will produce a shot list for exactly:

- 1 hero still or hero video
- 1 ETOR City flagship landscape
- 4 living-asset stills
- 3 package/location stills
- 1 amenities / development montage
- 1 founder / people image treatment

No asset should be generated until its slot, crop, lighting, and page purpose are known.
