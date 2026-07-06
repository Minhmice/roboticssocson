# Phase 07: Light theme migration — white + blue tech palette across entire site - Context

**Gathered:** 2026-07-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate the entire Robotics Sóc Sơn site from dark arena + HUD cyan to a light Stripe/Vercel-style white + tech blue palette. Scope: all routes (`/`, `/course`, `/sponsorship`, `/sponsor`), design tokens (`globals.css`, `tailwind.config.ts`), `DESIGN.md`, and shared/component hardcoded dark classes. No copy, data, or route architecture changes.
</domain>

<decisions>
## Implementation Decisions

### Visual Direction (from shape interview — locked)
- **D-01:** Anchor lane = Stripe / Vercel — clean white surfaces, tech blue accent, minimal decorative glow.
- **D-02:** Color strategy = Restrained — white/cool gray ≥85%, blue accent ≤10% of any screen.
- **D-03:** Primary blue = `#2563eb` (Tailwind blue-600). Ring/focus uses same hue.
- **D-04:** Page background = `#ffffff`; alternate section tint = `#f8fafc` via `--muted`.
- **D-05:** Body ink = `#0f172a` / `#1e293b`; muted labels = `#64748b` only (not long prose).
- **D-06:** Keep Inter typography and existing section rhythm (`SectionHeader`, anchor nav). No font change this phase.

### Depth & Motion
- **D-07:** Replace cyan glow with subtle blue shadow on light surfaces: `0 4px 14px rgba(37,99,235,0.12)` default, `0 8px 24px rgba(37,99,235,0.18)` on hover.
- **D-08:** Cards use border + shadow at rest; hover adds lift (scale optional, keep ≤1.02) + stronger blue shadow — not flat-by-default dark pit panels.
- **D-09:** Aurora hero adapts to light: lower opacity, soft blue mesh; grid pattern uses blue at ~4% on white.
- **D-10:** Pulse-glow CTA → static blue-tinted band or subtle shadow; respect `prefers-reduced-motion`.
- **D-11:** Navbar scrolled = `bg-white/80 backdrop-blur` + light border shadow (not dark drop shadow).

### Component Strategy
- **D-12:** Token-first: update `:root` in `globals.css` so shadcn primitives inherit light theme automatically.
- **D-13:** Sweep shared primitives first (`GlowCard`, `CTAButton`, `SectionHeader`, `GlassButton` styles in globals, `LanguageToggle`).
- **D-14:** Replace hardcoded `slate-8/9`, `cyan-*` in page components with semantic tokens (`bg-card`, `border-border`, `text-primary`, `text-foreground`, `text-muted-foreground`) or project shadow utilities.
- **D-15:** Remove gradient text on new/edited surfaces (`PackageCard`, `Metric`) — use solid `text-primary` for emphasis per design bans.
- **D-16:** `BorderBeam` default color → `#2563eb`.

### Scope & Verification
- **D-17:** Full production — all four routes + `DESIGN.md` + `PRODUCT.md` design principles update.
- **D-18:** Verify with `npm run lint`, `npm run build`, `npm run check:assets`. Manual spot-check homepage hero, course FAQ, sponsorship budget table.

### Agent Discretion
- Exact hover scale values (1.02 vs 1.05) on cards — prefer subtler on light theme.
- Whether alternate sections use `bg-muted/50` or `bg-secondary` — either is fine if contrast holds.

</decisions>

<canonical_refs>
## Canonical References

### Design & Product
- `PRODUCT.md` — brand register, anti-references, accessibility targets
- `DESIGN.md` — design system (must be rewritten for light theme in this phase)
- `AGENTS.md` — project constraints (bilingual, static-first, dark→light is explicit phase work)

### Prior shape decisions
- Shape interview 2026-07-06: Stripe/Vercel lane, subtle blue shadow, full prod scope (conversation context)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/globals.css` — single `:root` token block drives most shadcn + body styles
- `src/components/shared/GlowCard.tsx`, `CTAButton.tsx`, `SectionHeader.tsx` — high-leverage marketing primitives
- `src/components/ui/aurora-background.tsx` — hero background; uses CSS vars, adapts when tokens change
- `src/data/settings.ts` — `cyan`, `glowRGBA` constants need blue equivalents

### Established Patterns
- Semantic Tailwind colors map to CSS variables in `tailwind.config.ts`
- Navbar already uses `bg-background/40`, `text-muted-foreground`, `text-primary` — mostly token-ready
- ~40 files contain hardcoded `slate-*` / `cyan-*` / rgba cyan glow — require sweep after token update

### Integration Points
- `tailwind.config.ts` custom `cyan-500/600` and `glow-cyan` shadows — rename/retarget to blue
- `globals.css` utilities: scrollbar, pulse-glow, grid-pattern, glass-button — all cyan-tinted
- Course sections use `bg-slate-950/40` banding — convert to `bg-muted/30`

</code_context>

<specifics>
## Specific Ideas

- Scene: sponsor at bright desk / phone outdoors — clarity and trust over competition-floor darkness
- References: Stripe, Vercel, Linear light mode
- Keep sponsor-grade credibility; avoid cream/warm AI default backgrounds

</specifics>

<deferred>
## Deferred Ideas

- Font change away from Inter — future phase if brand refresh warrants
- Dark mode toggle — out of scope; site becomes light-only default
- Logo SVG recolor — use existing assets unless contrast fails on white

</deferred>

---

*Phase: 07-light-theme-migration*
*Context gathered: 2026-07-06*
