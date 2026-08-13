# ETOR Group — Phase 3 Asset Production Plan

Status: ready for image/video production

## Art direction

The visual world is **quiet cinematic agriculture**: premium but human, tactile rather
than glossy. Think dawn light over real Andhra Pradesh land, documentary details, and
architectural framing. Avoid generic fintech gradients, neon technology, fake luxury
estate renders, excessive lens flares, and impossible AI vegetation.

### Visual rules

- Palette: charcoal black, warm porcelain, aged bronze, deep botanical green.
- Light: early morning or late afternoon; soft directional light; controlled highlights.
- Camera: 35mm / 50mm documentary lenses, slow dolly or locked-off compositions.
- Texture: real soil, leaves, water, stone, wood, brushed metal and paper.
- People: Indian farmers, planners and families shown naturally; no posed stock-photo
  smiles, no invented uniforms or logos.
- Architecture: grounded, low-rise, climate-aware, human scale.
- Grade: warm highlights, muted greens, deep neutral shadows, restrained saturation.
- Composition: leave intentional negative space for copy; never place detailed foliage
  behind important text.

## Existing asset audit

Keep as supporting material after color grading / cropping:

- `mango-orchard.webp` — strongest current hero foundation; use with a darker copy-safe
  left side or replace with the new hero still.
- `etor-city-1.webp`, `etor-city-2.webp`, `etor-city-3-4.webp` — project cards and map
  entry points.
- `etor-milk-hero.webp`, `etor-milk-flyer.webp` — dairy section support.
- `founder-ceo.webp` — About page, subject to a clean crop and neutral treatment.
- `etor-coin-logo.webp` — brand mark only; do not use as a competing hero visual.

Move below the primary narrative or use only on the ventures index:

- `etor-crypto.webp`
- `etor-forex.webp`
- `etor-gaming.webp`
- `etor-money-card.webp`
- `etor-money-gaming.webp`

These images are visually disconnected from the land-led story when placed above the
fold.

## Required Stitch stills

Generate one approved master image for each slot. Use 16:9 for desktop hero/story
images, 4:5 for editorial cards, and 1:1 only for compact package thumbnails.

### S01 — Hero landscape

**Filename:** `hero-etor-landscape.webp`  **Ratio:** 16:9

**Stitch prompt:**  

> Cinematic documentary photograph of a premium mango orchard in coastal Andhra Pradesh
> at first light, rows of mature mango trees leading toward low green hills and a quiet
> river valley, subtle mist, warm porcelain dawn sky, deep botanical greens, tactile soil
> in the foreground, believable Indian agricultural landscape, no buildings dominating,
> no text, no logo, no people looking at camera. Compose with the left 42 percent dark and
> uncluttered for white editorial headline text; visual interest weighted to the right.
> Premium magazine photography, natural light, 35mm lens, restrained color grade, no
> fantasy, no oversaturation, no CGI.

### S02 — ETOR City flagship

**Filename:** `etor-city-flagship.webp`  **Ratio:** 16:9

**Stitch prompt:**

> High-end editorial aerial photograph of a planned riverside land development in Andhra
> Pradesh, real roads, young orchard plots, open green space, modest low-rise amenities,
> river and tree lines creating a clear natural structure, late afternoon light, premium
> real-estate journal style, believable scale, no skyscrapers, no futuristic city, no
> text, no logo, no invented signage. Keep the lower-left quarter calm for a caption.

### S03 — Living asset: mango

**Filename:** `asset-miyazaki-mango.webp`  **Ratio:** 4:5

**Stitch prompt:**

> Editorial still life of a ripe premium mango resting on a dark natural stone beside a
> single green leaf and a small trace of orchard soil, warm side light, deep charcoal
> background, subtle aged-bronze reflection, tactile skin detail, restrained luxury food
> photography, no price badge, no text, no packaging, no artificial neon colors.

### S04 — Living asset: dairy

**Filename:** `asset-organic-dairy.webp`  **Ratio:** 4:5

**Stitch prompt:**

> Documentary photograph inside a clean, humane organic dairy farm in coastal India,
> healthy native cows near open ventilation, a farmer’s hands preparing fresh feed, warm
> morning light through timber structure, honest materials, calm and dignified, premium
> editorial agriculture magazine style, no text, no logos, no exaggerated cleanliness,
> no distressed animals, no stock-photo posing.

### S05 — Living asset: crops

**Filename:** `asset-crop-portfolio.webp`  **Ratio:** 4:5

**Stitch prompt:**

> A refined documentary composition showing sandalwood sapling leaves, custard apple,
> dragon fruit and orchard soil arranged as a living crop portfolio, natural field table,
> deep green and warm clay palette, soft directional sunlight, botanical editorial
> photography, realistic Indian cultivation context, no labels, no text, no fake fruit,
> no clutter.

### S06 — People and stewardship

**Filename:** `asset-etor-stewardship.webp`  **Ratio:** 4:5

**Stitch prompt:**

> Quiet documentary portrait of an Indian agricultural planner and a local farmer walking
> through a young orchard, seen in profile from a respectful distance, reviewing the land
> together, natural gestures, warm late-afternoon light, premium editorial brand campaign,
> authentic clothing, no staged handshake, no text, no logo, no corporate stock-photo
> look.

### S07 — Services hero: one living portfolio

**Filename:** `asset-living-portfolio.webp`  **Ratio:** 1:1

Context: replaces `etor-city-1.webp` in the Services page hero `TiltCard` — that
slot currently shows a literal photo of one specific city block (already reused on
the Home and Projects package cards), but the copy beside it is about the combined
portfolio ("Land, cultivation and long-term value" / "managed land, orchards and an
organic dairy farm") with a floating caption reading "4 ETOR City locations." The
image needs to read as one integrated living system, not a single site snapshot.

**Stitch prompt:**

> Cinematic documentary photograph of a managed agricultural land development in
> coastal Andhra Pradesh, combining young orchard rows on one side with an open
> grazing pasture and a distant timber-framed dairy shelter on the other, a quiet
> gravel path dividing the two, warm early-morning light, soft mist over a distant
> tree line, deep botanical greens and warm clay-brown soil, believable working-land
> scale, no buildings dominating the frame, no people, no text, no logos, no invented
> signage. Compose as a balanced square frame, lower third calm and less detailed so
> a caption card can sit just below it; premium editorial agriculture photography,
> 35mm lens, restrained natural color grade, no CGI, no oversaturation.

## Optional Google Flow hero film

Only produce this after S01 is approved. A still-led hero is the default fallback.

**Input:** `hero-etor-landscape.webp`

**Google Flow prompt:**

> Create a 9-second cinematic loop from this still image. Begin with a nearly static dawn
> view of the orchard. Add a very slow forward camera drift along the central path, gentle
> leaf movement from a light coastal breeze, barely perceptible mist movement over the
> distant valley, and a natural change in warm sunlight. Preserve the exact landscape,
> tree geometry, horizon and negative space on the left. No new people, buildings, text,
> logos, birds, dramatic zoom, speed ramp, artificial particles or fantasy effects. End
> on a composition matching the opening frame for a seamless loop. Documentary luxury
> agriculture film, quiet and believable.

**Filename:** `hero-etor-landscape-loop.mp4`

## Production checklist

- Generate three variants per still, not ten.
- Reject any image with incorrect fruit morphology, invented logos, unreadable hands,
  impossible architecture or overly saturated colors.
- Export WebP stills and one compressed MP4 only if the motion remains subtle.
- Preserve negative space for copy at the crop stage.
- Do not add generated imagery to legal, testimonial or document-proof sections.

## Handoff to React

Assets should be placed in `src/assets/images/` with the exact filenames above. After the
first approved hero and flagship images arrive, Phase 4 will wire them into the existing
React sections and replace the weakest current crops.
