---
mapped_at: 2026-07-04
focus: arch
---

# Codebase Architecture

## Architecture Style

This is a Next.js App Router marketing site with a single primary landing page composed from section components. The architecture is component-driven and data-driven: visual sections live in `src/app/**`, reusable primitives live in `src/components/**`, and most bilingual content lives in `src/data/**` plus `messages/*.json`.

## Primary Layers

### App Shell

- `src/app/layout.tsx`
  - Loads global CSS and Inter font.
  - Defines metadata and viewport.
  - Wraps all pages with `LanguageProvider`.
  - Renders `Navbar`, route content, and `Footer`.
- `src/app/page.tsx`
  - Client component that composes the home page sequence.
  - Imports section components from route-group-like folders such as `1. competition`, `2. team`, `3. financial-need`, and `4. sponsorship`.
- `src/app/sponsor/page.tsx`
  - Dedicated sponsor page route.

### Feature Sections

The landing page is assembled from feature sections:

- `src/app/1. competition/Hero.tsx`
- `src/app/1. competition/AboutFIRST.tsx`
- `src/app/1. competition/AboutFTC.tsx`
- `src/app/2. team/AboutSocSonHighSchool.tsx`
- `src/app/2. team/TeamCarousel.tsx`
- `src/app/2. team/Achievements.tsx`
- `src/app/2. team/Mission.tsx`
- `src/app/2. team/TheChallenge.tsx`
- `src/app/3. financial-need/BudgetFundraising.tsx`
- `src/app/3. financial-need/BudgetBreakdown.tsx`
- `src/app/4. sponsorship/WhySponsor.tsx`
- `src/app/shared/FinalCTA.tsx`

### Shared Marketing Components

- `src/components/shared/CTAButton.tsx`: sponsor-facing action button variants.
- `src/components/shared/GlowCard.tsx`: dark glass/cyan-glow content surface.
- `src/components/shared/MediaPlaceholder.tsx`: image/video placeholder and `next/image` renderer.
- `src/components/shared/ImageGallery.tsx`: gallery pattern.
- `src/components/shared/SectionHeader.tsx`: section title/subtitle/badge rhythm.
- `src/components/shared/Metric.tsx`, `Timeline.tsx`, `PackageCard.tsx`, `BudgetTable.tsx`, `ContactForm.tsx`: domain-specific display primitives.

### UI Primitives

- `src/components/ui/button.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `tabs.tsx`, `tooltip.tsx`, `progress.tsx`, etc.
- These follow shadcn/Radix conventions with Tailwind class composition and `cn()`.
- `src/components/ui/aurora-background.tsx` is the hero background layer.
- `src/components/ui/glass-button.tsx` contains a custom glass CTA treatment.

### Data Layer

- `src/data/*.ts` files export static content objects and arrays.
- Bilingual fields use suffixes such as `_vi` and `_en`.
- `src/hooks/useTranslatedData.ts` selects localized fields based on the current locale.
- `messages/vi.json` and `messages/en.json` provide navigation and common UI strings.

### Localization Layer

- `src/contexts/LanguageContext.tsx` owns locale state, message loading, and `t(key)`.
- `src/components/shared/LanguageToggle.tsx` changes locale.
- Components call either `t("nav.about")` for message keys or `getField(data, "headline")` for data-driven bilingual fields.

## Data Flow

1. Root layout renders `LanguageProvider`.
2. `LanguageProvider` loads `messages/{locale}.json` dynamically and exposes `locale`, `messages`, `setLocale`, and `t`.
3. Page sections import static data from `src/data/**`.
4. Sections call `useTranslatedData()` or `useLanguage()` to render Vietnamese/English fields.
5. Section components compose shared cards, CTAs, image galleries, and UI primitives.
6. Assets are served from `public/Images/**` and `public/Logo/**`.

## Rendering Model

- Many top-level page sections are client components because they use hooks, language context, Framer Motion, or browser APIs.
- The site remains static-first because content is local and there is no database dependency.
- `next/image` is used for optimized local image rendering.

## Styling Model

- Global theme tokens are declared in `src/app/globals.css`.
- Components mostly use Tailwind utility classes.
- `tailwind.config.ts` maps semantic color names to CSS variables and extends shadows/animation.
- The design system is documented in `DESIGN.md`.

## Build Order Implications

- New sections should start with data shape in `src/data/`, then a section component, then page composition in `src/app/page.tsx`.
- New reusable visual patterns should go in `src/components/shared/` if domain-specific or `src/components/ui/` if primitive.
- Any new images should be placed under `public/Images/**` and validated with `npm run check:assets`.

## Boundaries To Preserve

- Keep content data out of visual primitives.
- Keep UI primitives generic; avoid baking Robotics-specific copy into `src/components/ui/**`.
- Keep bilingual support at the data/message layer instead of duplicating entire section components.
