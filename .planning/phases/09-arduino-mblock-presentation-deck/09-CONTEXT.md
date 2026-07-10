# Phase 9: Arduino mBlock presentation deck — Context

**Gathered:** 2026-07-10
**Status:** Ready for planning
**Source:** User brief + wireframe session (`/course/arduino-mblock-deck`)

<domain>

## Phase Boundary

Ship a **single-page, PPTX-style presentation** teaching Arduino + mBlock for robotics education. ~30 slides covering the user's four-part brief (basics, teaching advantages, synergy, why for kids). Navigation is **left/right only** — tap zones or arrow keys; **no hover-dependent UI**.

**In scope:**
- Production route `/course/arduino-mblock-deck` (wireframe already exists)
- Typed bilingual slide data (`LocalizedText` / `getLocalized`)
- Production visual design per `DESIGN.md` light theme (replace dashed wireframe chrome)
- 10 layout templates from wireframe spec
- Immersive AppShell (no footer; full viewport deck)
- Keyboard `←` / `→`, progress bar, slide counter, exit to `/course`
- Optional link from `/course` (Method or AI section — planner discretion)

**Out of scope:**
- PDF/PPTX export download
- Presenter notes panel
- Auto-advance / autoplay
- PostHog deck-specific events (unless trivial reuse of `PageAnalytics`)
- New `/Images/` assets requirement — use `MediaPlaceholder` or CSS diagrams until assets exist
- English copy can ship with VI-primary; EN fields must exist (can mirror VI initially)

</domain>

<decisions>

## Implementation Decisions

### Navigation & interaction (DECK-01)
- **D-NAV-01:** Previous = left **18%** tap zone; next = right **18%** tap zone; same as wireframe.
- **D-NAV-02:** Keyboard `ArrowLeft` / `ArrowRight` with `preventDefault` on deck page.
- **D-NAV-03:** **No hover-only affordances** — no tooltips, no hover-reveal content, no carousel dots that require hover.
- **D-NAV-04:** Progress bar + `n / 30` counter always visible in deck chrome.
- **D-NAV-05:** First slide disables prev; last slide disables next (opacity + `cursor-not-allowed`).

### Content & data (DECK-02)
- **D-DATA-01:** Exactly **30 slides** mapped from `docs/course/arduino-mblock-deck/WIREFRAME.md`.
- **D-DATA-02:** Slide content uses **`LocalizedText`** for title, subtitle, bullets, column labels, diagram lines.
- **D-DATA-03:** Rename/refactor `arduinoMblockDeckWireframe.ts` → production module `arduinoMblockDeck.ts` (wireframe types become production types).
- **D-DATA-04:** Preserve layout union: `title | section | headline-bullets | two-column | grid-4 | grid-3 | diagram | split-media | example | summary | closing`.

### Visual design (DECK-03, DSGN-04)
- **D-UX-01:** **Remove wireframe chrome** — no `WIREFRAME` labels, no dashed placeholder boxes in production; use real typography hierarchy + `MediaPlaceholder` where images TBD.
- **D-UX-02:** Follow **light theme** (`DESIGN.md` v2): white surfaces, `#2563eb` primary, ink text — not dark arena / cyan HUD.
- **D-UX-03:** Section-break slides (`layout: section`) use large type + subtle primary wash — not numbered `01/02/03` eyebrows on every slide.
- **D-UX-04:** Slide transitions = **instant swap** or subtle crossfade only; respect `prefers-reduced-motion` (no slide animations gated on visibility).
- **D-UX-05:** Deck chrome: minimal top bar (title + counter + exit); hide site footer via existing `AppShell` immersive path.

### Architecture (DECK-04)
- **D-ARCH-01:** Split into `src/components/course/deck/` — `DeckPlayer.tsx`, `DeckSlide.tsx`, layout subcomponents.
- **D-ARCH-02:** Page `src/app/course/arduino-mblock-deck/page.tsx` composes `DeckPlayer` + `PageAnalytics` optional.
- **D-ARCH-03:** Keep route **client component** for keyboard and tap state.

### Integration (DECK-05)
- **D-LINK-01:** Add discoverability — text link or CTA on `/course` pointing to deck (e.g. `CourseMethod` or new band); bilingual label.
- **D-LINK-02:** `generateMetadata` on layout — VI title/description; `noindex` not required unless product wants hidden (default: indexable educational content).

### Claude's discretion
- Exact slide transition (instant vs 150ms opacity).
- Which course section hosts the deck link.
- Whether to add `public/Images/Course/deck/` placeholders later.
- Icon usage on grid slides (lucide vs text-only).

</decisions>

<canonical_refs>

## Canonical References

### Deck spec (wireframe — source of truth for structure)
- `docs/course/arduino-mblock-deck/WIREFRAME.md` — 30-slide map, interaction model, layout templates
- `src/data/arduinoMblockDeckWireframe.ts` — existing slide data (VI copy)
- `src/app/course/arduino-mblock-deck/page.tsx` — wireframe player (refactor target)

### Design & product
- `DESIGN.md` — light theme tokens, typography scale
- `PRODUCT.md` — competition-grade STEM, not cartoon kid UI
- `src/app/globals.css` — CSS variables

### Patterns to reuse
- `src/lib/course/getLocalized.ts` — locale field resolution
- `src/components/layout/AppShell.tsx` — immersive route list
- `src/components/shared/MediaPlaceholder.tsx` — image TBD surfaces
- `src/components/shared/PageAnalytics.tsx` — optional page view
- `src/app/course/CourseMethod.tsx` — section link pattern

### Phase dependencies
- Phase 7 — light theme migration (complete)
- Phase 8 — production readiness (in progress; deck should not block on PostHog)

</canonical_refs>

<specifics>

## Specific Ideas

- User content is Vietnamese-first robotics teaching narrative: Arduino as brain/nervous system, mBlock as thinking/behavior, teaching advantages, real-time loop, AI/IoT examples, kids debugging and competitions (MakeX, WRO).
- Closing slide ties to course brand **"Từ Khối Lệnh Đến Phần Cứng"** with CTA to `/course`.
- Wireframe route already live; phase upgrades wireframe → production without changing URL.

</specifics>

<deferred>

## Deferred Ideas

- PDF / PPTX export
- Presenter notes / speaker view
- Fullscreen API hiding navbar
- Dedicated deck image assets under `/Images/Course/deck/`
- PostHog per-slide analytics

</deferred>

---

*Phase: 09-arduino-mblock-presentation-deck*
*Context gathered: 2026-07-10*
