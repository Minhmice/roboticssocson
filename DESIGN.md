---
name: Robotics Sóc Sơn
description: Light tech sponsorship pitch — white surfaces with blue accent (Stripe/Vercel lane)
colors:
  paper-white: "#ffffff"
  cool-surface: "#f8fafc"
  tech-blue: "#2563eb"
  blue-hover: "#1d4ed8"
  steel-border: "#e2e8f0"
  muted-label: "#64748b"
  ink-text: "#0f172a"
  ink-body: "#1e293b"
  accent-wash: "#eff6ff"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.01em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  section-y: "64px"
  section-y-lg: "96px"
  card-pad: "24px"
  cta-x: "24px"
  cta-y: "12px"
components:
  button-primary:
    backgroundColor: "{colors.tech-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.tech-blue}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  card-surface:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
---

# Design System: Robotics Sóc Sơn

## 1. Overview

**Creative North Star: "The Sponsor Briefing Room"**

This system looks like a sponsor opening a pitch deck on a bright desk — clean white surfaces, crisp ink typography, and tech blue accents that signal competence without nightclub glow. Depth comes from borders and subtle blue shadows, not dark pit layering. Motion is restrained: hover lift, soft shadow bloom, aurora mesh on hero only.

The aesthetic serves a sponsorship pitch: sponsors should trust the team's professionalism in daylight contexts (office laptop, phone outdoors). Typography stays bold and legible (Inter throughout).

**Key Characteristics:**
- Restrained light surfaces (`#ffffff` body, `#f8fafc` muted bands) with tech blue (`#2563eb`) as sole accent
- Border + blue shadow depth instead of cyan glow on dark panels
- Inter single-family hierarchy — weight and size carry contrast
- Signature components: `CTAButton`, `GlowCard`, `GlassButton`, aurora hero background
- Bilingual section rhythm with `SectionHeader` blocks and anchor navigation

## 2. Colors

The palette is Stripe/Vercel restraint: white paper, cool gray borders, tech blue signals.

### Primary
- **Tech Blue** (`#2563eb`): Primary CTAs, icon accents, focus rings, active nav. ≤10% of any screen.
- **Blue Hover** (`#1d4ed8`): Primary button hover, stronger emphasis states.

### Neutral
- **Paper White** (`#ffffff`): Page background (`--background`).
- **Cool Surface** (`#f8fafc`): Alternate section bands (`--muted`).
- **Steel Border** (`#e2e8f0`): Borders, inputs, dividers (`--border`).
- **Ink Text** (`#0f172a`): Headings and body (`--foreground`).
- **Muted Label** (`#64748b`): Subtitles, labels only — not long prose (`--muted-foreground`).

### Named Rules
**The One Signal Rule.** Tech blue appears on CTAs, active nav, and key metrics only.

**The Ink Floor Rule.** Body copy uses ink (`#0f172a` / `#1e293b`). Muted gray is for short supporting lines only.

## 3. Typography

**Display Font:** Inter (Google Fonts, `next/font`, weight 900)
**Body Font:** Inter (weights 400, 500, 600, 700)
**Label/Mono Font:** Fira Code declared in tokens but unused in layout; mono reserved for future code snippets.

**Character:** Single sans family keeps sponsor-facing copy clean and technical. Bold weights (700–900) on headings convey competition confidence without serif display drama.

### Hierarchy
- **Display** (900, `clamp(2rem, 5vw, 3.5rem)`, line-height 1.1): Hero headlines, animated word cycles. `text-wrap: balance` on h1.
- **Headline** (700, `clamp(1.875rem, 4vw, 3rem)`, line-height 1.2): Section titles via `SectionHeader` (`text-3xl md:text-4xl lg:text-5xl`).
- **Title** (600, 1.875rem / 30px, line-height 1.3): Card titles, package tier names (`text-2xl font-bold`).
- **Body** (400, 1rem / 16px, line-height 1.6): Paragraphs, feature lists. Cap line length at 65–75ch in prose sections.
- **Label** (500, 0.875rem / 14px, slight positive tracking): Badges, nav links, pill labels (`text-xs font-medium` on section badges).

### Named Rules
**The Weight Ladder Rule.** Do not introduce a second sans family. Differentiate hierarchy with weight (400 → 700 → 900) and size steps only.

## 4. Elevation

Depth is conveyed through **tonal layering plus cyan glow**, not Material-style gray shadows. Cards rest on Pit Slate (`#0f172a`) half-opacity with `backdrop-blur-sm`; hover states add cyan outer glow (`rgba(34,211,238,0.25–0.45)`) and slight scale (`1.05`).

At rest, surfaces are flat. Shadows appear as a response to hover, focus, or CTA emphasis — never as default card decoration.

### Shadow Vocabulary
- **Glow Cyan** (`box-shadow: 0 4px 14px 0 rgba(34,211,238,0.35)`): Default accent lift on primary CTAs and highlighted package cards.
- **Glow Cyan LG** (`box-shadow: 0 8px 28px 0 rgba(34,211,238,0.5)`): Stronger hover on `GlowCard` and primary button hover.
- **Ambient Stack** (`--shadow-sm` through `--shadow-xl`): shadcn token shadows — dual-layer `hsl(0 0% 0% / 0.2)` used sparingly on default `Button` and `Card` primitives.
- **Pulse Glow** (animated `0 0 20px–80px rgba(34,211,238,0.2–0.4)`): Final CTA banner only; disable under `prefers-reduced-motion`.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Cyan glow is a state response (hover, highlight, CTA), not ambient decoration on every container.

## 5. Components

### Buttons
- **Shape:** Rounded-xl (12px) on marketing CTAs; rounded-md (8px) on shadcn `Button` primitives.
- **Primary (`CTAButton`):** HUD Cyan fill (`#22D3EE`), Pit Slate text (`#0f172a`), `px-6 py-3`, min-height 44px. Hover: `#06B6D4` + glow shadow.
- **Secondary:** 2px cyan border, cyan text, transparent fill; hover adds `cyan-500/10` background.
- **Ghost:** Cyan text, subtle `cyan-950/30` hover wash.
- **Glass (`GlassButton`):** Pill or xl radius, `backdrop-filter: blur(12px)`, `rgba(56,189,248,0.1)` fill, cyan border at 20% opacity. Hover: scale 1.08 + radial shadow. Hero secondary actions.
- **shadcn `Button` default:** Signal Sky fill (`--primary`), white text, `rounded-md`, `h-9 px-4`.

### Chips / Badges
- **Section badge:** `rounded-full`, `bg-cyan-950/50`, `text-cyan-400`, `text-xs font-medium`, `px-3 py-1`.
- **Popular tier pill:** `bg-cyan-500/20`, `text-cyan-400`, `font-semibold`.
- **shadcn `Badge`:** `rounded-md`, primary or secondary token fills.

### Cards / Containers
- **`GlowCard`:** `rounded-2xl` (16px), `border-slate-800`, `bg-slate-900/50`, `p-6`, `backdrop-blur-sm`. Hover: cyan border 50%, glow shadow, `scale-105`.
- **shadcn `Card`:** `rounded-xl`, `bg-card`, `border`, default `shadow`, `p-6` header/content padding.
- **Internal Padding:** 24px (`p-6`) standard; section vertical rhythm `py-16` / `py-24`.

### Inputs / Fields
- **Style:** `rounded-md`, `border-input` (`#1f2937`), transparent background, `h-9`, `px-3`.
- **Focus:** `ring-1 ring-ring` (Signal Sky `#38bdf8`).
- **Placeholder:** `text-muted-foreground` — verify 4.5:1 against background; bump to Ice Text if failing.
- **Disabled:** `opacity-50`, `cursor-not-allowed`.

### Navigation
- **Navbar:** Fixed top, `pt-16` offset on main. Transparent → blurred dark on scroll (`scrolled` state). Logo + anchor links + `LanguageToggle` + sponsor CTA.
- **Links:** Muted default, cyan on hover/active. Smooth scroll to section IDs with 80px offset.
- **Mobile:** Full-screen overlay menu, body scroll lock, hamburger ↔ close icon.

### Aurora Hero (signature)
- **Background:** `AuroraBackground` on arena black with animated gradient aurora (60s linear). Grid pattern overlay at 3% cyan opacity (`50px` grid).
- **Content:** Centered max-w-4xl, animated rotating words (Framer Motion spring per character), badge pill, dual CTAs (glass + solid).

## 6. Do's and Don'ts

### Do:
- **Do** keep the arena black + pit slate + HUD cyan triad on every new section.
- **Do** use `CTAButton` or `GlassButton` for sponsor-facing actions — min 44px height, visible `focus-visible:ring-2 ring-cyan-500`.
- **Do** apply cyan glow only on hover, highlight, or primary CTA states.
- **Do** use `SectionHeader` for section rhythm — title at headline scale, subtitle in fog text, optional badge (not an all-caps eyebrow on every block).
- **Do** respect `prefers-reduced-motion` — replace spring hero animations and pulse-glow with instant or crossfade states.
- **Do** maintain WCAG AA contrast: Ice Text on Arena Black for body, HUD Cyan only on large/bold UI chrome or dark fills.

### Don't:
- **Don't** use cartoonish / kid-only STEM aesthetics — primary-color toy palettes, bubble fonts, clip-art robots. *"Cartoonish / kid-only STEM UI"* is an explicit anti-reference from PRODUCT.md.
- **Don't** use gradient text (`background-clip: text`) on new components — existing `PackageCard` price gradient should not spread elsewhere.
- **Don't** add colored side-stripe borders (`border-left` > 1px) on cards or callouts.
- **Don't** default to glassmorphism on every surface — reserve blur for `GlassButton`, `GlowCard`, and intentional overlays.
- **Don't** deploy the hero-metric template (big number + tiny label grids) as section scaffolding.
- **Don't** put small all-caps tracked eyebrows above every section — one deliberate badge per `SectionHeader` is enough.
- **Don't** let muted fog text (`#9ca3af`) carry paragraph-length body copy on `#0a111e` without a contrast check.
