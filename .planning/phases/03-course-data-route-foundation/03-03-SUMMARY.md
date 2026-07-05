# Plan 03-03 Summary: Course Route Shell and Hero

**Completed:** 2026-07-05  
**Requirements:** NAV-01, I18N-01, QUAL-01

## Shipped

- `src/app/course/CourseHero.tsx` — `AuroraBackground`, bilingual copy via `getLocalized`, `MediaPlaceholder` (no image asset)
- `src/app/course/page.tsx` — thin composer rendering `CourseHero` only

## Verification

- `npm run build` — pass
- `npm run lint` — pass
- `/course` route listed in build output
- Navbar/Footer/homepage untouched (Phase 5 scope)

## Key files created

- `src/app/course/CourseHero.tsx`
- `src/app/course/page.tsx`
