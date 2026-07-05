# Phase 5: Integration, Teaser & Launch - Context

**Gathered:** 2026-07-05
**Status:** Ready for planning
**Source:** `$gsd-discuss-phase 5` + impeccable shape UX pass

<domain>

## Phase Boundary

Wire the completed `/course` page into the rest of the site: **homepage `CourseTeaser`**, **navbar/footer course links**, **pathname-aware course anchors**, **full `CourseRegister` section** (Google Form primary + Messenger fallback), **sticky register CTA on `/course`**, and **launch verification** (build/lint/assets + club route regression).

**In scope:** `CourseTeaser`, `CourseRegister` (replaces `CourseRegisterBridge`), `Navbar`/`Footer` updates, `messages/vi.json` + `en.json` nav keys, sticky bottom bar component, `courseTeaser.ts` data (if needed), scroll-spy on `/course` nav, QUAL-02/03 verification.

**Out of scope:** Zalo/phone registration channels, inline form with client validation (unless added in a future phase), analytics events, `[locale]` URL segments, `/Images/Course/` real photography, LMS/backend `POST /api/register`, scroll-spy on non-course routes.

</domain>

<decisions>

## Implementation Decisions

### Registration path (REG-01, REG-02)
- **D-REG-01:** **Google Form primary** — locale-specific URL from `courseRegistrationConfig.googleFormLinks`; opens in new tab (pattern: `src/app/sponsor/page.tsx`).
- **D-REG-02:** When `googleFormLinks[locale]` is empty: render **disabled** primary CTA with label e.g. "Google Form đang cập nhật" / "Google Form is being updated" + helper text directing to Messenger — **never** render `<a href="">` or clickable empty URL.
- **D-REG-03:** **Messenger-only fallback** for MVP — do not ship Zalo or phone CTAs; keep data model extensible for future channels but UI renders **Google Form + Messenger only**.
- **D-REG-04:** **No inline input fields** on page. Section shows: primary Google Form CTA, active Messenger CTA, **"What we ask" bullets** (informational list of Google Form fields), **trust line** (privacy + ~1–2 min to complete).
- **D-REG-05:** Replace `CourseRegisterBridge` with **`CourseRegister`** at `#course-register`; button/disabled state derived from config, not hardcoded per locale.

### Homepage teaser (TEAS-01, TEAS-02)
- **D-TEAS-01:** Place `CourseTeaser` **after `MissionSection`, before `TheChallengeSection`** in `HomePage` composition.
- **D-TEAS-02:** **Full section** with `SectionHeader` — not a compact-only band.
- **D-TEAS-03:** Journey strip labels: **Logic → Hardware → Capstone** (Scratch/flowchart → mBlock/Arduino → capstone projects).
- **D-TEAS-04:** **Single primary CTA** to `/course` ("Xem khóa học" / "View course") — no secondary register/Messenger on teaser.
- **D-TEAS-05:** Journey UI = **pit-slate step rail** with connector on `md+` (like course Method rail) — **not** a 3× GlowCard grid.
- **D-TEAS-06:** Wrap in **`FadeInSection`** for subtle entrance (match `/course` sections).

### Navbar & footer (NAV-02, NAV-03, NAV-04)
- **D-NAV-01:** On `pathname === '/course'`, **swap** nav links from CLB anchors to course anchors: `#course-curriculum`, `#course-projects`, `#course-faq`, `#course-register` — hide broken `#about-first` / `#achievements` on course page.
- **D-NAV-02:** Add global **`t("nav.course")` → `/course`** link **before Sponsorship** in nav order (homepage + all routes).
- **D-NAV-03:** Add **`/course`** to **Footer** quick links (Next `Link` or plain href — not `scrollToSection`).
- **D-NAV-04:** On `/course`, navbar right CTAs **swap** from sponsor/contact to single **"Đăng ký tư vấn" → `#course-register`** (compact `CTAButton`).
- **D-NAV-05:** Implement **scroll-spy** on `/course` — highlight active nav link for current section while scrolling (`IntersectionObserver` or equivalent).

### Sticky register CTA (PRD sticky CTA)
- **D-STICKY-01:** Ship **bottom sticky bar** on `/course` only (`CourseStickyCTA` or similar).
- **D-STICKY-02:** Bar **appears after scrolling past hero** (~300px threshold) — hidden at top of page.
- **D-STICKY-03:** **Single full-width register button** scrolling to `#course-register` — Messenger stays in register section only.
- **D-STICKY-04:** **Safe-area padding** + **bottom spacer** on course page so bar does not cover Footer links; `z-40` (below mobile menu `z-50`).
- **D-STICKY-05:** Visual = **glass pit-slate**: `bg-slate-950/90 backdrop-blur-md border-t border-slate-800`, subtle upward shadow.

### UI/UX shape (impeccable + DESIGN.md) — extends DSGN-04
- **D-UX-08:** `CourseRegister` = **stacked centered CTAs** + bullets/trust line below in `max-w-lg` prose — not split columns, not GlowCard fake form.
- **D-UX-09:** Disabled Google Form CTA = **muted** (`opacity-50`, `cursor-not-allowed`, `border-slate-700`, no cyan glow) + helper text in `text-muted-foreground`.
- **D-UX-10:** `CourseTeaser` on club homepage must **not** use second `AuroraBackground` or PRD light/kid palette — pit-slate rail on dark arena, sparse optional badge only.
- **D-UX-11:** Sticky bar must not feel like generic app chrome — match competition-floor tokens, no bounce animation.

### Carried forward from Phase 4 (do not re-decide)
- Dark arena brand, `getLocalized` / `LocalizedText`, existing `/course` sections unchanged in content order.
- `FadeInSection`, `SectionHeader`, `CTAButton`, pit-slate surfaces, cyan glow on interaction only.
- Section `id`s already on `/course` page.
- `npm run check:assets` after any new image refs.

### Launch verification (QUAL-02, QUAL-03)
- **D-QUAL-02:** Phase 5 completes when `npm run lint`, `npm run build`, `npm run check:assets` pass.
- **D-QUAL-03:** Manual regression: `/`, `/sponsorship`, `/sponsor` behavior unchanged (no broken nav on club pages).

### the agent's Discretion
- Exact scroll-spy threshold and IntersectionObserver rootMargin.
- `courseTeaser.ts` data file vs inline copy in component.
- Component file path: prefer `src/components/homepage/CourseTeaser.tsx` wired from `HomePage.tsx` unless technical spec path `src/app/shared/` is cleaner — match existing homepage patterns.
- Whether scroll-spy updates URL hash (default: no hash update).
- Footer course link label uses `t("nav.course")`.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Course specs
- `docs/course/PRD.md` — registration fields, sticky CTA, header/footer, teaser intent
- `docs/course/technical_SPEC.md` — §6 CourseTeaser, §8 Form, §11 Navbar/Footer, §14 implementation order
- `docs/course/DATA_CONTRACT.md` — registration validation, Google Form links, field labels
- `docs/course/ACCEPTANCE_CRITERIA.md` — F-02, F-03, F-13, R-02 manual checklist
- `.planning/REQUIREMENTS.md` — TEAS-01..02, NAV-02..04, REG-01..02, QUAL-02..03

### Phase 4 outputs
- `.planning/phases/04-course-page-sections/04-CONTEXT.md` — D-UX-01..07, section boundaries
- `.planning/phases/04-course-page-sections/04-SUMMARY.md` — what shipped on `/course`
- `src/app/course/CourseRegisterBridge.tsx` — replace with `CourseRegister`
- `src/data/courseRegistration.ts` — googleFormLinks, messengerUrl, field labels for bullets

### Design system
- `DESIGN.md` — dark arena, pit slate, HUD cyan, glow rules
- `.impeccable/design.json` — brand tokens, anti-patterns
- `PRODUCT.md` — competition-grade STEM, reject cartoon kid-STEM

### Code patterns
- `src/components/layout/Navbar.tsx` — pathname-aware nav, scroll offset 80px
- `src/components/layout/Footer.tsx` — quick links pattern
- `src/components/homepage/HomePage.tsx` — teaser insertion point
- `src/app/sponsor/page.tsx` — Google Form + Messenger dual CTA pattern
- `src/components/shared/CTAButton.tsx`, `FadeInSection.tsx`, `SectionHeader.tsx`
- `messages/vi.json`, `messages/en.json` — add `nav.course`

### Impeccable
- `.claude/skills/impeccable/SKILL.md` — craft rules, motion, contrast
- `DESIGN.md` — register as brand reference for integration surfaces

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets
- `CTAButton` — supports `disabled`, `target="_blank"`, variants; use for Google Form, Messenger, sticky bar, navbar register CTA.
- `FadeInSection` — teaser + optional register motion.
- `SectionHeader` — teaser and register section titles; sparse badge on teaser optional.
- `courseRegistrationConfig` — `googleFormLinks`, `messengerUrl`, `fieldLabels`, `experienceOptions` for bullet copy.
- `Navbar.scrollToSection` — 80px offset already implemented; extend for course section ids.
- Sponsor page Google Form locale switch — copy pattern for `CourseRegister`.

### Established Patterns
- `"use client"` layout components with `useLanguage` + `t()`.
- Club homepage sections under `src/components/homepage/`.
- Course page uses `getLocalized` for data-driven copy; teaser/register may use messages or new `courseTeaser.ts`.
- Phase 4 pit-slate rails (`CourseMethod`) — visual reference for teaser journey.

### Integration Points
- `src/components/homepage/HomePage.tsx` — insert `CourseTeaser` after `MissionSection`.
- `src/app/course/page.tsx` — swap `CourseRegisterBridge` → `CourseRegister`, add `CourseStickyCTA`.
- `src/components/layout/Navbar.tsx` + `Footer.tsx` — course link + pathname-aware links.
- `messages/*.json` — `nav.course` vi/en.

</code_context>

<specifics>

## Specific Ideas

### CourseRegister copy (when Google Form empty)
VI helper: "Trong thời gian này, phụ huynh có thể nhắn Messenger để được tư vấn."
EN helper: "For now, parents can contact us through Messenger for consultation."

### "What we ask" bullets (from discussion)
- Họ tên phụ huynh / Parent name
- Số điện thoại / Phone
- Tên và độ tuổi/lớp học sinh / Student name and age/grade
- Kinh nghiệm: chưa học / Scratch / Arduino
- Ghi chú tùy chọn / Optional notes

Trust line: information used only for class consultation; ~1–2 minutes to complete.

### Registration config shape (MVP)
```ts
type RegistrationLinks = {
  googleForm: Partial<Record<"vi" | "en", string>>;
  messenger: Partial<Record<"vi" | "en", string>>;
};
```
Render logic: `Boolean(url?.trim())` before any `<a>`.

</specifics>

<deferred>

## Deferred Ideas

- **Zalo / phone registration channels** — config-extensible later; not in MVP UI.
- **Inline validated form** (`ContactForm` clone) — REG-01 satisfied by Google Form path; revisit if Form URLs remain blocked.
- **Analytics events** (PRD §7) — non-goal v1 per technical spec.
- **`[locale]` URL segments** — future i18n routing.
- **Navbar scroll-spy on club homepage** — only `/course` in Phase 5.
- **Real `/Images/Course/` assets** — when photography available.

</deferred>

---

*Phase: 05-integration-teaser-launch*
*Context gathered: 2026-07-05*
