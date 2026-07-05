---
mapped_at: 2026-07-04
focus: tech
---

# Codebase Stack

## Overview

This is a Next.js sponsorship/marketing site for Robotics Soc Son. It is a bilingual, static-first React application with content stored in TypeScript data files and localized UI strings in JSON message files.

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
