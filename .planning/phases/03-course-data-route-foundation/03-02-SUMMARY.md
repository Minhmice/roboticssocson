# Plan 03-02 Summary: Course Static Data Layer

**Completed:** 2026-07-05  
**Requirements:** DATA-01, DATA-02, I18N-01

## Shipped

- `src/lib/course/getLocalized.ts` — `LocalizedText`, `getLocalized()`
- `src/data/courseHero.ts` — hero copy with nested bilingual fields
- `src/data/courseCurriculum.ts` — 12 complete `CourseLesson` entries
- Stubs: `courseProjects.ts`, `courseFaq.ts`, `courseRegistration.ts`, `courseSections.ts`
- `src/data/index.ts` — re-exports all course modules

## Verification

- `courseLessons.length === 12` with ids 1–12
- No TBD/lorem/coming soon in curriculum
- `npm run build` — pass

## Key files created

- `src/lib/course/getLocalized.ts`
- `src/data/courseHero.ts`
- `src/data/courseCurriculum.ts`
- `src/data/courseProjects.ts`
- `src/data/courseFaq.ts`
- `src/data/courseRegistration.ts`
- `src/data/courseSections.ts`
