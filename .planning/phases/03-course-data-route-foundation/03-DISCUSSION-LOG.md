# Phase 3: Course Data & Route Foundation - Discussion Log

> **Audit trail only.** Decisions are in `03-CONTEXT.md`.

**Date:** 2026-07-05
**Phase:** 3 — Course Data & Route Foundation
**Areas discussed:** Data file split, Hero visual, Metadata/i18n, Lesson data depth

---

## Data file split

| Option | Description | Selected |
|--------|-------------|----------|
| Split per spec | courseHero.ts, courseCurriculum.ts, … | ✓ |
| Monolith course.ts | Single file, split later | |
| You decide | Executor chooses | |

**Types location:**

| Option | Description | Selected |
|--------|-------------|----------|
| Inline per file | Like hero.ts, sponsorPage.ts | ✓ |
| src/types/course.ts | Shared types file | |
| src/data/courseTypes.ts | Types beside data | |

---

## Hero visual

| Option | Description | Selected |
|--------|-------------|----------|
| MediaPlaceholder no asset | Gradient/icon, no /Images/ ref | ✓ |
| Generic placeholder image | /Images/Course/hero-placeholder.webp | |
| Text-only hero | No visual block Phase 3 | |

---

## Metadata / i18n

| Option | Description | Selected |
|--------|-------------|----------|
| Static bilingual layout | layout.tsx metadata | |
| Static VI only | EN later | |
| DynamicMetadata extend | Client title patch | |
| **A+ SEO registry** | `src/lib/seo/metadata.ts` + `course-seo.ts`, `generateMetadata`, no client patch | ✓ (user upgrade) |

**User notes:** Root layout = defaults + title template only. Each major route owns metadata. Typed `RouteSeo` + `buildMetadata()`. No `useEffect`/`document.title`. `/en/course` canonical in registry for future — **orchestrator deferred URL locale segment** to future milestone (current site uses client locale toggle).

---

## Lesson data depth

| Option | Description | Selected |
|--------|-------------|----------|
| Full 12 concise | All fields, LocalizedText `{vi,en}`, no TBD | ✓ (user A+ upgrade) |
| Skeleton 12 | Title+goal only | |
| Partial 2 full | Lessons 1–2 only | |

**User notes:** `CourseLesson` with nested `LocalizedText`. Every lesson: id, title, goal, product, primaryLevel, secondaryLevel, challenge. 1–2 sentences per field. Phase 3 data only — no curriculum UI.

---

## Deferred Ideas

- `[locale]` routing (`/en/course`) — future milestone
- Update `DATA_CONTRACT.md` to `LocalizedText` shape — optional follow-up
