---
mapped_at: 2026-07-04
focus: quality
---

# Codebase Testing And Verification

## Current Test Stack

No dedicated unit/integration test runner is configured in `package.json`.

Current verification relies on:

- `npm run lint`
- `npm run build`
- `npm run check:assets`
- Manual browser review through the Next dev server on port 4000.

## Available Commands

### Lint

```bash
npm run lint
```

Runs ESLint with Next core web vitals and TypeScript rules from `eslint.config.mjs`.

### Production Build

```bash
npm run build
```

Runs Next.js production build. Recent runs passed after image, audit, and aurora changes. One known non-feature warning may appear: `MODULE_TYPELESS_PACKAGE_JSON`, related to module type/package config rather than app behavior.

### Asset Check

```bash
npm run check:assets
```

Runs `scripts/check-assets.mjs`.

Behavior:

- Scans `src/**/*.ts(x)` for `/Images/...` references.
- Verifies corresponding files exist under `public/`.
- Prints referenced/found/missing counts.
- Exits non-zero if missing images are detected.

Limitations:

- It does not validate `/Logo/...` references.
- It does not detect unused assets.
- It does not validate `next/image` performance props like `sizes`.

## Manual QA Areas

### Visual

- Hero aurora visibility in `src/components/ui/aurora-background.tsx`.
- Logo aspect ratio in `Navbar` and `Footer`.
- Image galleries and cards after asset optimization.
- Mobile navbar overlay and body scroll lock.
- Dark theme contrast for muted body copy.

### Localization

- Toggle VI/EN and confirm:
  - Navbar labels.
  - Hero headline/subtitle.
  - Data-driven section copy.
  - Dynamic metadata if applicable.

### Navigation

- Anchor links in `src/components/layout/Navbar.tsx` should scroll to existing section IDs.
- Offset should account for fixed navbar height.
- Sponsor CTA and contact links should point to intended sections/routes.

### Forms

- Contact form should be manually checked for validation, disabled/loading states, and actual submission behavior.
- No backend integration is confirmed in the current map.

## Recommended Future Test Additions

- Add component tests for `LanguageContext`, `useTranslatedData`, and data-driven section rendering.
- Add Playwright smoke tests for homepage render, locale toggle, nav anchors, and sponsor CTA.
- Extend `scripts/check-assets.mjs` to validate `/Logo/...`, unused assets, and `next/image` conventions where possible.
- Add a simple accessibility audit step for focus rings, contrast, and heading order.

## Verification Checklist For Future Changes

For most UI/content work:

1. Run `npm run lint`.
2. Run `npm run check:assets` if image paths changed.
3. Run `npm run build` before claiming production readiness.
4. Manually inspect the affected route at `http://localhost:4000` if the dev server is running.

For asset changes:

1. Preserve filenames or update all references.
2. Run `npm run check:assets`.
3. Check browser console for `next/image` warnings.

For localization changes:

1. Add both VI and EN strings.
2. Toggle language in the UI.
3. Verify fallback does not show raw keys.
