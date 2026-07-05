---
mapped_at: 2026-07-04
focus: tech
---

# Codebase Integrations

## Overview

The current site has very few external runtime integrations. It is primarily a static sponsorship site with local assets, local content data, and client-side language state.

## External Services

### Google Fonts

- `src/app/layout.tsx` imports Inter through `next/font/google`.
- The font is configured with `display: "swap"` and exported as CSS variable `--font-inter`.

### Browser Local Storage

- `src/contexts/LanguageContext.tsx` stores the selected locale under `localStorage.getItem("locale")`.
- Supported locale values are `"vi"` and `"en"`.
- Default locale is Vietnamese (`"vi"`) when no saved value exists or when rendering server-side.

### Static File Serving

- Public assets are served from `public/`.
- Code references images through `/Images/...` URLs and logos through `/Logo/...`.
- `scripts/check-assets.mjs` scans source files for `/Images/...` references and verifies corresponding files exist under `public/`.

## Metadata And SEO

- `src/app/layout.tsx` defines static metadata and Open Graph/Twitter image data.
- `metadataBase` uses `process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000"`.
- `src/components/layout/DynamicMetadata.tsx` exists for client-side language-aware metadata behavior.

## Forms And Contact

- `react-hook-form` is installed.
- `src/components/shared/ContactForm.tsx` contains the current contact form UI.
- README mentions possible future Formspree, EmailJS, n8n, or API route integration, but there is no confirmed server-side mail/webhook integration in the current codebase map.

## Analytics

- No analytics provider was found in the scanned config or source file list.
- README lists analytics as a future roadmap item.

## Backend, Database, Auth

- No database client, auth provider, API route, ORM, or server action integration is currently evident.
- The application is static-first and content-driven.

## Deployment Context

- README describes deployment via Raspberry Pi and Cloudflare Tunnel.
- No deployment workflow files were found under `.github/**`.
- `next.config.js` is minimal and does not configure image remote domains, headers, redirects, or CSP.

## Asset Pipeline

- Images are stored directly in `public/Images/**`.
- Recent optimization pass compressed raster assets in place while preserving filenames.
- `public/Images/ASSETS.md` documents image asset expectations.

## Integration Risks

- Contact form behavior may still be UI-only unless `ContactForm` is wired to an email/webhook endpoint.
- Language state is client-only; root `<html lang="vi">` does not update per selected locale unless additional dynamic behavior handles it.
- `metadataBase` depends on `NEXT_PUBLIC_SITE_URL` in production for correct canonical Open Graph URLs.
