# Phase 9 Research: Arduino mBlock presentation deck

**Researched:** 2026-07-10
**Status:** Complete

## RESEARCH COMPLETE

## Summary

Phase 9 upgrades an existing wireframe deck into a production presentation surface. The codebase already has route shell, immersive AppShell hook, 30-slide VI data, and a monolithic page component. The main work is **data i18n**, **component extraction**, and **visual polish** per light-theme DESIGN.md — not greenfield routing.

## Existing implementation

| Artifact | State |
|----------|--------|
| `src/app/course/arduino-mblock-deck/page.tsx` | ~400 lines monolithic wireframe player |
| `src/data/arduinoMblockDeckWireframe.ts` | 30 slides, VI-only strings |
| `src/app/course/arduino-mblock-deck/layout.tsx` | Metadata present |
| `AppShell.tsx` | Immersive + hideFooter for deck route |
| `docs/course/arduino-mblock-deck/WIREFRAME.md` | Full slide map |

## Technical approach

### Presentation state machine

- Single `useState` index `0..29` — sufficient for 30 slides; no URL hash sync needed in v1.
- `useCallback` for prev/next; `useEffect` keydown listener with cleanup.
- Tap zones as `<button type="button">` overlays (accessible, keyboard-focusable optional).

### Layout rendering

- **Strategy:** `DeckSlide` receives normalized slide + locale; switch on `layout` enum (same as wireframe).
- Extract layout bodies into `src/components/course/deck/layouts/*.tsx` only if file size exceeds ~250 lines; otherwise keep in `DeckSlide.tsx` for fewer files.

### i18n

- Pattern: `LocalizedText` on all user-facing strings; `useTranslatedData().getField` or `getLocalized(slide.title, locale)`.
- EN copy: translate from VI source in data file (executor can mirror structure; quality pass later).

### Styling migration

- Replace `slate-200` wireframe boxes with:
  - `bg-muted` / `border-border` for diagram cards
  - `text-foreground` / `text-muted-foreground` for hierarchy
  - `bg-primary` progress fill (already in wireframe)
- Section slides: `bg-accent` full-bleed optional band behind title.

### Performance

- Only one slide mounted at a time (current pattern) — good for 30 slides.
- No framer-motion required; CSS `transition-opacity` if crossfade desired.

### SEO

- `layout.tsx` already uses `buildMetadata`; update title/description for production (not "Wireframe").

## Risks

| Risk | Mitigation |
|------|------------|
| Monolithic page hard to polish | Split `DeckPlayer` + `DeckSlide` in plan 09-02 |
| Missing images | `MediaPlaceholder` with alt text from slide `mediaAlt` field |
| Tap zones overlap content on mobile | Keep `px-[20%]` content padding from wireframe |
| Phase 8 build fails (posthog-js) | Deck code independent; verify lint on touched files |

## Validation Architecture

Nyquist dimension 8 (manual):
- Manual: navigate all 30 slides via tap + keyboard
- Manual: toggle VI/EN on sample slides with bullets
- Automated: `npm run lint`
- Automated: `npm run build` (may fail on unrelated posthog dep — note in verify)

## Dependencies

- No new npm packages required.
- No database/CMS.
