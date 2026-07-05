---
mapped_at: 2026-07-04
focus: quality
---

# Codebase Conventions

## Language And Module Style

- TypeScript is used throughout `src/`.
- `tsconfig.json` enables `strict: true`, `isolatedModules: true`, and `moduleResolution: "bundler"`.
- Import alias `@/*` maps to `src/*`.
- React components are functional components.
- Components that use hooks, Framer Motion, browser APIs, or language context start with `"use client"`.

## Component Organization

- Page-level narrative sections live under `src/app/**`.
- Reusable marketing components live under `src/components/shared/**`.
- Generic UI primitives live under `src/components/ui/**`.
- Layout components live under `src/components/layout/**`.
- Keep domain copy and data out of `src/components/ui/**`.

## Styling Conventions

- Tailwind utilities are the default styling mechanism.
- Theme tokens are CSS custom properties in `src/app/globals.css`.
- Semantic Tailwind colors map to CSS variables in `tailwind.config.ts`.
- Use `cn()` from `src/lib/utils.ts` for class merging and conditional class composition.
- Follow `DESIGN.md`: dark arena background, pit slate surfaces, cyan as the limited signal accent, glow as an interaction state.

## UI Patterns

- Sponsor CTAs should use `src/components/shared/CTAButton.tsx` or the custom glass button when appropriate.
- Content surfaces commonly use `GlowCard` (`rounded-2xl`, slate background, cyan glow hover).
- Section headings should use `SectionHeader` for consistent title/subtitle/badge rhythm.
- Image rendering should prefer `MediaPlaceholder` or `ImageGallery` so `next/image` props and path encoding stay consistent.

## Localization Conventions

- Global UI labels live in `messages/vi.json` and `messages/en.json`.
- The `t(key)` function in `LanguageContext` resolves dotted keys.
- Data modules use `_vi` and `_en` suffixes.
- `useTranslatedData().getField(data, "fieldName")` returns `fieldName_vi` or `fieldName_en`.
- Default locale is Vietnamese.

## Data Conventions

- Static content lives in `src/data/*.ts`.
- Prefer updating data files over hardcoding content inside components.
- Export shared data through `src/data/index.ts` when useful.
- Keep budgets, sponsorship packages, achievements, team members, and hero copy typed and centralized.

## Asset Conventions

- Public images are referenced as web paths beginning with `/Images/`.
- Logo assets are referenced as `/Logo/...`.
- `scripts/check-assets.mjs` only scans `/Images/...` paths, so logo validation is manual.
- For `next/image fill`, always provide `sizes` and ensure the parent has explicit height or aspect ratio.
- Preserve filename references when optimizing assets unless all code references are updated.

## Accessibility Conventions

- CTAs should maintain at least 44px touch target height.
- Focus rings should remain visible, typically cyan rings on dark backgrounds.
- Body text should use high-contrast foreground tokens, not muted text for long paragraphs.
- Motion should respect reduced-motion where practical; current global animations should be audited when adding new motion.

## Error Handling Patterns

- `LanguageContext` logs dynamic message import failures to console.
- `useLanguage()` throws if used outside `LanguageProvider`.
- `MediaPlaceholder` falls back to placeholder UI when no image source exists.
- Contact/form handling should add explicit validation and submission error states before production use.

## Formatting And Lint

- ESLint uses Next core web vitals and TypeScript rules in `eslint.config.mjs`.
- The repo does not currently define a separate Prettier config.
- Existing files mix semicolon styles in places; follow the surrounding file style when editing.

## Git/Docs Context

- `.planning/` is new GSD output and should be tracked if planning docs remain committed.
- Existing untracked/modified files from Impeccable and optimization work should not be reverted by future agents.
