<!-- GSD:project-start source:PROJECT.md -->

## Project

**Robotics Sóc Sơn Sponsorship Site**

Robotics Sóc Sơn is a bilingual sponsorship website for a Hanoi high school robotics team competing in FIRST Tech Challenge. The current product introduces the team, achievements, mission, financial needs, and sponsorship pathways through a dark competition-floor visual system.

The next active work is to shape a new education/curriculum surface for a course titled "Từ Khối Lệnh Đến Phần Cứng" — a 6+ lesson journey from Scratch logic to mBlock/Arduino hardware projects, using AI and draw.io flowcharts to teach problem solving.

**Core Value:** Prospective sponsors, students, and educators must quickly trust Robotics Sóc Sơn as a serious, hands-on STEM team with clear learning outcomes and credible execution.

### Constraints

- **Existing brand**: Must preserve the dark competition-floor/cyan glow system — because the site is sponsor-facing and already designed around that identity.
- **Beginner audience**: Curriculum copy and structure must be understandable for students new to Scratch/electronics — because the course starts from first actions and block logic.
- **Bilingual site architecture**: New user-facing content should be prepared for Vietnamese/English patterns — because the existing site supports both locales.
- **Static-first implementation**: Prefer data-driven static content before adding backends — because current architecture has no database or CMS.
- **Verification**: Run lint/build and relevant asset checks after implementation — because there is no automated UI test runner yet.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Overview

## Runtime And Framework

- **Runtime:** Node.js 20+ implied by README guidance and modern dependency set.
- **Framework:** Next.js App Router, currently `next` `^16.2.9` in `package.json`.
- **React:** React `^19.2.7` and React DOM `^19.2.7`.
- **TypeScript:** TypeScript `^6.0.3`, with strict checking enabled in `tsconfig.json`.
- **Port:** `npm run dev` runs `next dev -p 4000`; `npm start` runs `next start -p 4000`.

## Styling Stack

- **Tailwind CSS:** Tailwind `^4.3.2` with `@tailwindcss/postcss`.
- **Global styling entry:** `src/app/globals.css`.
- **Tailwind config:** `tailwind.config.ts` extends semantic CSS-variable colors, radius, shadows, and `aurora` animation.
- **Animation CSS:** `tw-animate-css` imported in `src/app/globals.css`.
- **Design tokens:** CSS custom properties in `src/app/globals.css`, including `--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--border`, `--ring`, font variables, and shadow variables.
- **Design docs:** `PRODUCT.md`, `DESIGN.md`, and `.impeccable/design.json` describe the current dark arena/cyan glow brand system.

## Component Libraries

- **Radix UI:** Avatar, Label, Progress, Scroll Area, Separator, Slot, Tabs, Tooltip.
- **shadcn-style primitives:** Local components in `src/components/ui/` wrap Radix and Tailwind patterns.
- **Class utilities:** `class-variance-authority`, `clsx`, and `tailwind-merge` via `src/lib/utils.ts`.
- **Icons:** `lucide-react`.
- **Motion:** `framer-motion` for hero text and animated UI components.
- **Forms:** `react-hook-form` is installed; contact form implementation lives in `src/components/shared/ContactForm.tsx`.

## Application Entry Points

- `src/app/layout.tsx`: root layout, metadata, Inter font, language provider, navbar, footer.
- `src/app/page.tsx`: main landing page sequence.
- `src/app/sponsor/page.tsx`: dedicated sponsor route.

## Content And Data

- `src/data/*.ts`: typed, bilingual data modules for hero, about sections, team, achievements, mission, budget, sponsorship, sponsor page, and logos.
- `messages/vi.json` and `messages/en.json`: UI copy loaded dynamically by `LanguageContext`.
- `Documents/*.md`: source content and budget/sponsorship materials.
- `public/Images/**`: optimized image assets.
- `public/Logo/**`: SVG logo assets.

## Scripts

- `npm run dev`: starts Next dev server on port 4000.
- `npm run build`: production build.
- `npm run start`: production server on port 4000.
- `npm run lint`: ESLint across the repo.
- `npm run check:assets`: runs `scripts/check-assets.mjs` to ensure referenced `/Images/...` files exist under `public/`.

## Configuration Files

- `next.config.js`: minimal Next config with `outputFileTracingRoot: __dirname`.
- `postcss.config.mjs`: PostCSS setup for Tailwind.
- `eslint.config.mjs`: Next core web vitals and TypeScript ESLint config.
- `tsconfig.json`: strict TypeScript, bundler module resolution, `@/*` alias to `src/*`.
- `components.json`: shadcn component configuration.

## Notes For Future Agents

- Prefer existing local primitives in `src/components/ui/` and shared marketing components in `src/components/shared/`.
- Keep styling aligned with `src/app/globals.css` tokens and `DESIGN.md`.
- The project is static-first and data-driven; add content to `src/data/` before hardcoding copy in components.

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

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

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## Architecture Style

## Primary Layers

### App Shell

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/sponsor/page.tsx`

### Feature Sections

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

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
