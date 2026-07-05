---
mapped_at: 2026-07-04
focus: concerns
---

# Codebase Concerns

## Known Technical Debt

### No Automated Test Runner

The repo has lint/build/asset checks but no unit, integration, or browser smoke tests. UI regressions currently depend on manual review.

**Files/context:** `package.json`, `eslint.config.mjs`, `scripts/check-assets.mjs`

**Risk:** Visual, i18n, and form regressions can ship unnoticed.

**Mitigation:** Add Playwright smoke tests for homepage, language toggle, nav anchors, and sponsor CTA.

### Client-Heavy Landing Page

`src/app/page.tsx` is marked `"use client"` and imports every homepage section. Many sections likely need client behavior, but this makes the main page more client-heavy than necessary.

**Risk:** Larger JS bundle and less benefit from server components.

**Mitigation:** Keep interactive sections client-side but consider moving static sections back to server components over time.

### Language Handling Is Client-Side

`src/contexts/LanguageContext.tsx` stores locale in `localStorage` and loads messages dynamically. Root HTML remains `lang="vi"` in `src/app/layout.tsx`.

**Risk:** SEO/accessibility metadata may not fully reflect selected English language.

**Mitigation:** If bilingual SEO matters, consider route-based locales (`/vi`, `/en`) or dynamic root language handling.

### Contact Form Integration Unclear

`react-hook-form` is installed and `ContactForm` exists, but no confirmed backend/API/webhook integration was identified in this mapping.

**Risk:** Sponsor conversion path may look complete while not actually sending messages.

**Mitigation:** Verify `ContactForm` behavior and wire to a reliable email/webhook endpoint with validation and spam protection.

## Recent Issues Already Addressed

### Next Image Warnings

Recent work added `sizes` to `next/image fill` usages, ensured image parents have explicit height, and fixed logo aspect ratio.

**Files touched recently:** `src/components/shared/MediaPlaceholder.tsx`, `src/components/shared/ImageGallery.tsx`, several section components, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/ui/member-card.tsx`

**Residual risk:** Continue checking console warnings after new image components are added.

### Aurora Background Visibility

`src/components/ui/aurora-background.tsx` was fixed after using undefined CSS variables. It now uses existing design tokens and visible layer blending.

**Residual risk:** Visual tuning is subjective; screenshot/browser review is recommended after color changes.

### npm Audit

High vulnerabilities were fixed safely through lockfile updates. Two moderate vulnerabilities remain from `next -> postcss`; npm's `--force` suggestion would downgrade Next to a breaking old version.

**Risk:** Moderate advisory noise remains until upstream Next/PostCSS dependency resolves.

**Mitigation:** Track Next updates and avoid `npm audit fix --force` unless a conscious migration/downgrade decision is made.

## Design Risks

### Overuse Of Glow/Glass

The brand system intentionally uses cyan glow and occasional glass effects. Overuse can quickly make the site feel like generic neon/cyberpunk.

**Reference:** `DESIGN.md`

**Mitigation:** Keep glow to CTAs, hover states, and important highlights. Avoid applying glass treatment to every card.

### Gradient Text Existing In Package Card

`src/components/shared/PackageCard.tsx` contains a gradient text price treatment. `DESIGN.md` flags gradient text as a pattern not to spread.

**Risk:** New sections may copy the treatment and weaken visual discipline.

**Mitigation:** Use solid cyan/silver text for new emphasis unless explicitly redesigning the sponsorship tier system.

## Asset Risks

### Path Names With Spaces/Unicode

Some public image paths contain spaces, parentheses, and Vietnamese characters. `MediaPlaceholder` encodes filenames, but direct `Image` usage may still need care.

**Risk:** Broken images or inconsistent local/prod behavior.

**Mitigation:** Prefer `MediaPlaceholder`/`ImageGallery`, or standardize future filenames to lowercase ASCII slugs.

### Logo Validation Gap

`scripts/check-assets.mjs` validates `/Images/...` references only.

**Risk:** Broken `/Logo/...` references will not be caught by the asset check.

**Mitigation:** Extend the script to include `/Logo/...`.

## Build/Config Risks

### Minimal Next Config

`next.config.js` is minimal. This is good for simplicity, but no security headers, image config, redirects, or CSP are defined.

**Risk:** Production hardening may be incomplete.

**Mitigation:** Add headers/CSP only when deployment path and third-party integrations are known.

### Package Module Warning

Recent build output mentioned `MODULE_TYPELESS_PACKAGE_JSON`.

**Risk:** Build noise can hide real warnings over time.

**Mitigation:** Investigate module type config if the warning persists and becomes disruptive.

## Documentation Drift

README is comprehensive but may describe aspirational routes/features that differ from current implementation.

**Risk:** Future agents may trust README over actual code.

**Mitigation:** Treat `.planning/codebase/` as current-state mapping and README as historical/product context unless verified against source.
