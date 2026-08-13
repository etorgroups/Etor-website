# ETOR City — Master Plan: What We Have vs. What's Needed

Status: gap analysis, prepared 2026-08-12, for sharing with the client to collect
remaining requirements/materials.

## Why this document exists

The website has a "Download Master Plan" button in the header, on the homepage, and in
the contact section — but the file behind it (`public/downloads/etor-city-master-plan.pdf`)
is currently a one-page placeholder that tells visitors the real document is still being
prepared. Everything else about ETOR City (real survey layouts, plot counts, amenities,
plantation program) is already backed by real client-provided material — this is the one
piece still missing. This document lists exactly what a proper master plan needs, so the
client can be asked for whatever isn't already in hand.

## What we already have

These pieces exist and could feed directly into a finished master plan:

- **Real surveyed layout PDFs** for all 12 sub-layouts across ETOR City 1, 2, 3 & 4 —
  actual CAD drawings with plot numbers, survey numbers, dimensions and boundaries
  (source: `EtorCitiesLayouts/*.pdf`, converted and shown on the site under
  `/projects/:cityId/:layoutSlug/plots`).
- **Real survey numbers and village names** per sub-layout (e.g. Sariapalli Village
  Survey Nos. 47, 53, 57–59, 70–71 for Main Layout; Sottadivalasa Village Survey No. 5
  for Block A/B/C, etc.) — pulled directly from the survey documents themselves.
- **Verified plot counts per layout** (512, 148, 197, 135, etc. — 2,025 real plots total),
  extracted directly from each PDF's own text layer, not estimated.
- **Amenity list** from the brochure — restaurant, OTT theatre, 3-star guest
  accommodation, 24-hr security + trained dog squad, 360° CCTV, solar fencing, green
  landscaped gardens, natural swimming pool, buggies/horse riding/ATV riding,
  walking/cycling/e-biking trails, border drip irrigation, 9.5 pH river water,
  electricity/water/solar/generator/3-phase power per plot, spot registration, 33 years
  of maintenance, Vastu compliance, clear title.
- **Plantation program specifics** — per-plot plant counts (Sandalwood/Custard
  Apple/Dragon Fruit/Miyazaki Mango) for 200/250/500 sq.yd plots, investment amounts,
  and stated 12-year returns.
- **Pricing** — ETOR City 1 & 2 at ₹3,999/sq.yd, ETOR City 3 & 4 at ₹4,999/sq.yd.
- **Company/contact details** — registered address, phone, email, founder name.
- **Placeholder Google Maps pin** for "Directions" on every plot page (real per-location
  coordinates still needed — see below).

## What a proper master plan needs to contain

Based on how master plans work for plotted/township developments in India, a complete
document has these parts. Checked items are things we can already assemble from what's
listed above; unchecked items need something from the client.

### 1. Site layout drawing (bird's-eye rollup)
- [x] Individual layout drawings exist for all 12 sub-layouts (plot-level detail).
- [ ] A single rolled-up site plan showing how the sub-layouts within each city relate to
  each other geographically (adjacency, shared roads, distances) — this doesn't exist yet
  as one drawing; it would need to be produced from the individual layouts or provided by
  the client's surveyor/architect.

### 2. Land-use breakdown
- [ ] What share of each city's total acreage is saleable plots vs. roads vs. mandatory
  open space/parks vs. amenity blocks vs. utility reservations. Not currently stated
  anywhere — needs the client's own planning figures.

### 3. Amenities located on the map
- [x] We have the amenity *list*.
- [ ] We don't have *where* each amenity (restaurant, guest accommodation, dairy farm,
  swimming pool, security post, etc.) actually sits within the layout. Needs the
  client to mark these on a site plan, or confirm they're already marked on one of the
  survey drawings we haven't seen yet.

### 4. Infrastructure layout
- [ ] Water supply routing, drainage/stormwater plan, electricity/solar line routing,
  sewerage, streetlighting plan. Not shown anywhere currently — needs the client's
  engineering drawings if they exist, or a statement that this is still being finalized.

### 5. Phasing plan
- [ ] ETOR City is described as "~250 acres and extending" — but there's no phase-by-phase
  breakdown (what's developed now, what's next, rough timelines). This is one of the most
  common things serious buyers ask about — worth prioritizing.

### 6. Statutory / regulatory information
- [ ] Layout approval number and issuing authority (Panchayat / DTCP / local municipal
  body) for each of the 12 sub-layouts.
- [ ] RERA registration number, if the project is registered (needs confirmation either
  way — if it's *not* RERA-registered, the site needs to say so accurately rather than
  stay silent on it).
- [ ] Title status confirmation per layout (the amenity list already claims "clear title,
  non-scheduled land" — the master plan should be able to back that claim with something
  concrete, e.g. an encumbrance certificate reference).

### 7. Connectivity context
- [ ] Distance/travel time from each city to the nearest highway, town, and
  Visakhapatnam. Currently only village names and vague "coastal Andhra Pradesh" framing
  exist — concrete distances would strengthen the "river view plots" and location
  positioning already used on the site.
- [ ] Real GPS coordinates / Google Maps links per city (or per sub-layout, if they're
  meaningfully far apart). The "Directions" button on every plot page currently opens the
  same placeholder pin (`https://maps.app.goo.gl/SGSwyfNjHAiEqJBHA`) for all 12 layouts —
  this needs replacing with the real location(s) as soon as they're available.

## Questions to ask the client directly

1. Is there an existing, approved master-plan drawing (from an architect, town planner, or
   the approving authority) that already covers items 1–4 above? If so, we just need the
   file.
2. What is the phase-by-phase development plan/timeline across ETOR City 1, 2, 3 & 4?
3. What is the layout approval number and issuing authority for each of the 12 surveyed
   sub-layouts?
4. Is the project RERA-registered? If yes, what's the registration number? If no, that's
   fine to state plainly rather than leave unaddressed.
5. Can we get an encumbrance certificate or equivalent title document to back the
   "clear title" claim already on the site?
6. What are the real GPS coordinates (or Google Maps links) for each city/location, to
   replace the current placeholder "Directions" pin?
7. Distance/travel time from each city to the nearest highway and to Visakhapatnam?

## Once we have answers

This site already has the infrastructure to publish a real master plan the moment it's
provided: the same PDF conversion pipeline used for the 12 real layouts
(`scripts/convert-layouts.mjs`) can render a master-plan PDF to a web-ready image, and the
"Download Master Plan" links across the header, homepage, and contact section will pick it
up as soon as `public/downloads/etor-city-master-plan.pdf` is replaced with the real file.
