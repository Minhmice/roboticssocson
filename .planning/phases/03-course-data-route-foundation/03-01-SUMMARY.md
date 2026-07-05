# Plan 03-01 Summary: SEO Registry and Course Route Metadata

**Completed:** 2026-07-05  
**Requirements:** QUAL-01

## Shipped

- `src/lib/seo/metadata.ts` — `Locale`, `RouteSeo`, `buildMetadata()`
- `src/lib/seo/course-seo.ts` — bilingual `courseSeo` registry (vi/en)
- `src/app/course/layout.tsx` — server `generateMetadata()` using `courseSeo.vi`

## Verification

- `npm run build` — pass
- `/course` `<title>`: `Từ Khối Lệnh Đến Phần Cứng | Robotics Sóc Sơn`
- No `useDynamicMetadata` or `document.title` under `src/app/course/`

## Key files created

- `src/lib/seo/metadata.ts`
- `src/lib/seo/course-seo.ts`
- `src/app/course/layout.tsx`
