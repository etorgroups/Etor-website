# ETOR Group — Cinematic Scroll Plan

## The important production decision

Do not make one long AI video and place it behind the whole page. It will be heavy,
hard to control, difficult to crop on mobile, and impossible to align precisely with
the story.

Create a set of short, related Flow shots. Each shot has one emotional job. React then
controls the timing, copy and transitions around those shots.

## Landing experience

The landing sequence is a 45–60 second visual journey distributed across the page:

| Scene | Story beat | Clip | User action |
|---|---|---:|---|
| 01 | Empty land becomes possibility | 8s | Hero loads quietly |
| 02 | Water and paths reveal place | 6–8s | Scroll reveals ETOR City |
| 03 | Cultivation becomes a portfolio | 6–8s | Scroll moves through crops |
| 04 | Care becomes a living system | 6–8s | Dairy / stewardship section |
| 05 | Place becomes participation | 6–8s | Packages and terms |
| 06 | The visitor is invited in | 4–6s | Final contact CTA |

The actual runtime can be shorter because many clips will be used as short loops or
scroll-scrubbed excerpts. The page should never require a visitor to watch a film before
they can understand the proposition.

## Continuity system

Create these Flow ingredients before producing the clips:

- `ingredient-landscape` — the master orchard / valley environment.
- `ingredient-etor-city` — the believable planned development environment.
- `ingredient-water` — a consistent river and water texture.
- `ingredient-farmer` — one anonymous local farmer, only if a human shot is needed.
- `ingredient-materials` — soil, leaf, stone, timber and brushed metal palette.

Use the same ingredients and color language across every clip. Save a strong frame from
each approved clip as the starting frame for the next scene where possible. Flow supports
ingredients, frames and scene building; use those continuity tools instead of regenerating
each scene from an unrelated prompt. [Flow scene and camera features](https://blog.google/innovation-and-ai/products/google-flow-veo-ai-filmmaking-tool/)

## Shot direction

### Scene 01 — “The ground”

Camera starts almost still above dark, textured soil at dawn. A small amount of water
passes through the furrow. The camera rises slowly to reveal the orchard and distant hills.
The final frame has copy-safe dark space on the left.

Emotion: grounded, quiet, credible.

### Scene 02 — “The path”

Use the final frame of Scene 01 as the first frame. A slow forward camera movement follows
a real path toward the planned ETOR City landscape. Water, roads and planted plots become
legible without a futuristic city transformation.

Emotion: direction, possibility.

### Scene 03 — “The living portfolio”

Use a wide landscape frame as the first frame, then transition through tactile close-ups:
mango skin, sandalwood leaves, sitafal and dragon fruit. Keep it as one visual grammar,
not a rapid montage.

Emotion: abundance, care.

### Scene 04 — “The hands that steward it”

Use ingredients for the farmer and dairy environment. A slow side movement follows a
farmer checking an orchard row, then match-cuts to humane dairy care. No talking faces,
lip-sync or invented uniforms.

Emotion: trust, responsibility.

### Scene 05 — “The terms”

Do not generate financial numbers or text inside the video. Use a slow overhead movement
over a physical site plan, plot markers, paper and bronze metal. React will render all
prices, package names and disclosures as real HTML text.

Emotion: clarity, confidence.

### Scene 06 — “The invitation”

Return to a calm late-afternoon landscape. Camera settles at the edge of the land with
visible depth and open space for the final CTA. End on a clean hold frame.

Emotion: belonging, considered action.

## Technical output requirements

- Generate landscape masters at 16:9, 1920×1080 where Flow allows.
- Generate one portrait-safe crop for mobile only if the composition cannot be cropped.
- 6–8 seconds per primary shot; use 4–6 seconds for the final hold.
- No generated dialogue or music; add no audio track to the web clips.
- Export web-ready MP4 (H.264) plus a poster frame in WebP.
- Keep each web clip under roughly 3–5 MB after compression.
- Name files `scene-01-ground.mp4`, `scene-01-ground-poster.webp`, etc.
- Preserve the original Flow exports separately for future editing.

## React playback model

1. Render a poster image immediately.
2. Load the first clip only after the page is interactive.
3. Use muted, inline video with `playsInline`.
4. Desktop may scrub or crossfade clips with GSAP ScrollTrigger.
5. Mobile should use short autoplay loops or poster-to-video fades, never a heavy scrubbed
   timeline.
6. Respect `prefers-reduced-motion`: show poster frames and simple opacity transitions.
7. Never hide the copy if video fails, is blocked, or is still loading.

## Why this will feel award-level

The premium quality comes from continuity, pacing and editorial restraint: the same land,
light and material language evolves as the visitor scrolls. Flow supplies authored shots;
React supplies the interactive timing, text hierarchy and accessibility. Neither is asked
to do the other’s job.

## Next action

Produce Scene 01 only. Approve its realism, camera motion, color and final frame before
creating Scene 02. The first prompt is supplied in the next handoff.
