---
name: Robotics Sóc Sơn
description: Light technical team and education site with paper-white surfaces, steel borders, and a single tech-blue signal
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

**Creative North Star: The Bright Workshop Brief**

The site should feel like opening a well-organized project brief at a school workshop: paper-white surfaces, crisp ink typography, steel dividers, real team imagery, and one blue signal that marks the next action. The system supports team identity, practical STEM education, and focused recruitment without turning the interface into a toy or a terminal simulation.

The experience serves three related moments:

- **Team and education pages:** read and understand. Authentic work, clear explanations, and measured motion lead.
- **Recruitment:** complete a task. A compact branded application surface keeps context visible and removes intimidation.
- **Contact:** ask a question. The form and contact details use the same light tokens and explicit states.

### Key characteristics

- Paper white and cool-surface bands with tech blue as the sole accent.
- Steel borders and restrained blue shadows provide depth instead of dark panels or neon glow.
- Inter remains the single project type family. Weight, scale, and spacing carry hierarchy.
- Real team images and project evidence outrank decorative UI.
- Shared controls and semantic tokens prevent route-scoped visual drift.

## 2. Colors

### Primary

- **Tech Blue** (`#2563eb`): Primary actions, selected states, focus rings, and key signals. Keep it intentional.
- **Blue Hover** (`#1d4ed8`): Hover and pressed emphasis for primary actions.

### Neutral

- **Paper White** (`#ffffff`): Main surface and application panels.
- **Cool Surface** (`#f8fafc`): Page bands, quiet panels, and recruitment background.
- **Steel Border** (`#e2e8f0`): Inputs, dividers, card edges, and structural boundaries.
- **Ink Text** (`#0f172a`): Headings, labels, and high-priority copy.
- **Ink Body** (`#1e293b`): Long-form body copy.
- **Muted Label** (`#64748b`): Short supporting labels only.
- **Accent Wash** (`#eff6ff`): Selected and highlighted light states.

### Named rules

**The One Signal Rule.** Tech blue marks actions, active states, and important moments. It is not a background wash across every component.

**The Ink Floor Rule.** Body copy uses ink. Muted gray is reserved for short supporting lines and never carries paragraph-length content.

**The Light Workshop Rule.** No active surface introduces an unrelated dark arena, cyan HUD, or neon theme.

## 3. Typography

**Display and body:** Inter through the existing `next/font` setup.

**Character:** One sans family keeps technical information legible across Vietnamese and English. Bold weights communicate confidence without adding a second visual voice.

### Hierarchy

- **Display:** 900 weight, `clamp(2rem, 5vw, 3.5rem)`, line-height 1.1. Use for hero headlines and the recruitment orientation title.
- **Headline:** 700 weight, `clamp(1.875rem, 4vw, 3rem)`, line-height 1.2. Use for section and chapter titles.
- **Title:** 600 weight, 1.875rem / 30px, line-height 1.3. Use for cards and focused prompts.
- **Body:** 400 weight, 1rem / 16px, line-height 1.6. Keep prose within 65 to 75 characters per line where possible.
- **Label:** 500 weight, 0.875rem / 14px, line-height 1.5. Use for field labels, navigation, and short metadata.

### Named rule

**The Weight Ladder Rule.** Do not introduce a second sans family. Differentiate hierarchy with weight, scale, and spacing.

## 4. Elevation and shape

Surfaces are flat at rest. Borders and tonal layers organize content; blue shadows appear only on hover, focus, or primary action states.

### Shadow vocabulary

- **Glow Blue:** `0 4px 14px 0 rgba(37,99,235,0.12)` for focused or highlighted actions.
- **Glow Blue Large:** `0 8px 24px 0 rgba(37,99,235,0.18)` for deliberate hover emphasis.
- **Ambient Stack:** Existing shadcn token shadows, used sparingly.

### Shape rules

- Marketing and recruitment actions use rounded-xl.
- Inputs and native-style controls use rounded-md.
- Content cards use rounded-2xl.
- Badges and language toggles may use full rounding when they represent compact status or choice controls.
- Do not make every surface a pill.

## 5. Recruitment surface contract

**Mode:** Operate. The applicant is completing a meaningful task, not browsing a campaign page.

**World:** Application Briefing Room. Cool-surface page background, a white content panel, a compact RBS identity header, and tech-blue progress and action signals.

**First view:** The applicant sees the RBS mark, bilingual toggle, exit path, what the application is for, approximate effort, privacy reassurance, and one clear start action before the first field. A draft may persist locally without a visible restore banner.

**Composition:** A single-column task layout. The form remains the dominant object. Mobile keeps content scrollable inside the task pane when the keyboard is open, and preserves all actions at touch size.

**Controls:** Labels sit above inputs except when the question heading already names the field. Question prompts use title scale (`clamp` ~1.375–1.875rem), not display. Inputs use white surfaces, steel borders, explicit focus rings, and inline helper/error text. Division choices use accessible radio semantics inside light briefing cards.

**Viewport:** Recruitment owns `h-dvh` with page overflow locked. Long review content may scroll inside the task pane only.

**Progress:** A thin tech-blue line under the header uses `scaleX` only. It is empty on orientation, fills as questions complete, and is instant under reduced motion. Do not restore a chapter sidebar or question-count label.

**Review:** Before sending, show a concise review of the applicant's answers and provide edit paths. Keep the draft until a confirmed success state.

## 6. Motion

Motion communicates hierarchy, continuity, and feedback only.

- Question and chapter changes use opacity plus a small vertical transform, 180 to 240ms, strong ease-out.
- Selection changes use short border/background transitions.
- Progress uses `scaleX` and never animates layout dimensions.
- Hover transforms are limited to fine pointers and never required to understand a control.
- Reduced motion removes positional movement and blur while preserving immediate state changes.
- No boot delay or ambient loop is required on recruitment.

## 7. Accessibility and content

- Keep focus-visible rings at tech blue with a visible offset.
- Keep labels, helper text, and errors readable against their surface.
- Use semantic headings and `aria-live` status regions for restoration, submission, success, and errors.
- Keep Vietnamese and English copy structurally equivalent.
- Explain the purpose of personal fields, especially date of birth, and disclose that the application is sent through the form service.
- Do not use placeholder text as the only label.

## 8. Do and do not

### Do

- Use `CTAButton`, `GlowCard`, `PillBadge`, and shared tokenized primitives where they fit.
- Let real team work and learning outcomes carry the visual story.
- Keep recruitment focused, friendly, and technically credible.
- Use one deliberate badge or status line rather than an eyebrow on every section.
- Test light-mode contrast and keyboard behavior at desktop and mobile widths.

### Do not

- Add a dark terminal, HUD, or cyan-only route world.
- Use gradient text, decorative glassmorphism, or blue glow on every surface.
- Use centered floating labels that behave like placeholders.
- Hide the purpose, length, or next step of the recruitment form.
- Put sponsorship, funding, budget, partner, or pitch conversion language in active product surfaces.
