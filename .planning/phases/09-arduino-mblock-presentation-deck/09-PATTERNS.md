# Phase 9 Pattern Map

**Mapped:** 2026-07-10

## PATTERN MAPPING COMPLETE

## Files to create/modify

| File | Role | Closest analog |
|------|------|----------------|
| `src/data/arduinoMblockDeck.ts` | Bilingual slide data | `src/data/courseCurriculum.ts` + wireframe data |
| `src/components/course/deck/DeckPlayer.tsx` | Navigation + chrome | `src/components/homepage/TeamCarousel.tsx` (index state, prev/next) |
| `src/components/course/deck/DeckSlide.tsx` | Layout renderer | `src/app/course/arduino-mblock-deck/page.tsx` SlideBody |
| `src/app/course/arduino-mblock-deck/page.tsx` | Route compose | `src/app/course/page.tsx` |
| `src/components/layout/AppShell.tsx` | Immersive | Already has deck route |

## Code excerpts

### LocalizedText pattern (`getLocalized`)

```typescript
// src/lib/course/getLocalized.ts
export function getLocalized(text: LocalizedText, locale: Locale): string {
  return locale === "en" ? text.en : text.vi;
}
```

### Immersive route (`AppShell`)

```typescript
const immersive =
  pathname === "/contact-us" ||
  pathname === "/analytics" ||
  pathname?.startsWith("/course-register-form") === true ||
  pathname === "/course/arduino-mblock-deck";
```

### Carousel prev/next state (`TeamCarousel`)

```typescript
const handlePrev = useCallback(() => {
  setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
}, [totalSlides]);
```

### Page compose (`course/page.tsx`)

```typescript
export default function CoursePage() {
  return (
    <div>
      <PageAnalytics event={AnalyticsEvents.COURSE_PAGE_VIEWED} surface="/course" />
      <CourseHero />
      ...
    </div>
  );
}
```

## Data shape recommendation

```typescript
export interface DeckSlide {
  id: number;
  layout: DeckSlideLayout;
  section?: LocalizedText;
  title: LocalizedText;
  subtitle?: LocalizedText;
  bullets?: LocalizedText[];
  // columns, diagram, mediaAlt similarly localized
}
```

## Anti-patterns to avoid

- Do not duplicate entire slide components per locale.
- Do not use Radix Carousel (hover/swipe semantics differ from tap zones).
- Do not reintroduce dark `slate-9` / cyan HUD from pre-Phase-7 course.
