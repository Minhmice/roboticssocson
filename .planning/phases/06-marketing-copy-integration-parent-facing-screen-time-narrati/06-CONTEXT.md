# Phase 6: Marketing copy integration — parent-facing screen-time narrative on /course - Context

**Gathered:** 2026-07-06
**Status:** Ready for planning
**Source:** `$gsd-discuss-phase 6` + prior marketing placement research

<domain>

## Phase Boundary

Integrate **parent-facing screen-time narrative** (soft STEM tone) into the existing `/course` page and homepage `CourseTeaser` — primarily **bilingual copy and light UI extensions** (4th problem card, short prose blocks, optional offer band, FAQ swaps/additions). Preserve Phase 4–5 section order, anchors, registration flow, and competition-grade visual system.

**In scope:**
- `courseHero.ts` — dual headline (course name + parent hook), CTA labels unchanged in behavior
- `courseSections.ts` — Problem card 4, short prose under Problem, Solution prose before cards, Outcomes light refresh
- `courseFaq.ts` — replace/swap entries to ~8–10 parent-relevant FAQs (keep STEM core)
- `courseTeaser.ts` — subtitle parent hook aligned with `/course` tone
- Optional `courseOffer.ts` + `CourseOffer` band before `#course-register` (disabled until team confirms offer)
- EN + VI copy with **soft STEM** tone (no brainrot slang, no 1%/99% FOMO)
- `npm run lint`, `build`, `check:assets` pass

**Out of scope:**
- New routes, second Aurora, PRD light/kid theme, navbar/footer structural changes
- Inline registration form, Zalo/phone channels, analytics
- `/Images/Course/` hero photography (Aurora-only until assets exist)
- Replacing Curriculum/Projects/Method/Leveling/AI section structure
- Publishing 15% offer copy while `offer.enabled === false`
- Aggressive sales copy ("thuốc phiện", "hack não", "brainrot", "1% vs 99%")

</domain>

<decisions>

## Implementation Decisions

### Voice & tone (marketing → STEM-soft)
- **D-MKT-TONE-01:** **STEM-soft parent voice** — keep parent hooks (screen time, focus, hands-on) but **reject** marketing-plan slang: "thuốc phiện kỹ thuật số", "hack não", "brainrot", "1% vs 99%".
- **D-MKT-TONE-02:** **Light science** — may reference dopamine, variable reward, deep focus in plain language; **no** hard medical claims (e.g. 2h/day gray matter, 10-minute attention) unless sourced later.
- **D-MKT-TONE-03:** **Both locales soft STEM** — VI and EN mirror the same toned-down narrative (not VI fear-based / EN neutral split).
- **D-MKT-TONE-04:** **Soft urgency only** in Outcomes/subtitles — e.g. habit-formation window; **no** "1% creators vs 99% consumers" framing.

### Hero & top-of-page CTAs
- **D-MKT-HERO-01:** **Dual headline** — H1 stays **"Từ Khối Lệnh Đến Phần Cứng"** / "From Blocks to Hardware"; parent hook (screen-time → hands-on projects) lives in **subtitle** or supporting line below H1.
- **D-MKT-HERO-02:** **Primary CTA unchanged behavior** — "Xem lộ trình" / "View curriculum" → `#course-curriculum` (trust-first funnel).
- **D-MKT-HERO-03:** **Secondary CTA** — "Đăng ký tư vấn" / "Register for consultation" → `#course-register`.
- **D-MKT-HERO-04:** **Aurora-only hero** — no hero split image in Phase 6; copy-only until `/Images/Course/` assets exist.

### Problem, Solution, Outcomes copy
- **D-MKT-PROB-01:** **Keep existing 3 STEM problem cards** + add **4th card** for passive screen time / short-form consumption (parent pain).
- **D-MKT-PROB-02:** Add **short prose block** (~3–4 sentences) below Problem cards — pit-slate surface, light-science dopamine/variable-reward explanation; not a wall of text.
- **D-MKT-SOL-01:** Refresh Solution **title/subtitle** + **prose block before** the existing 5 solution cards — "become maker not passive consumer" narrative without "hack" language.
- **D-MKT-OUT-01:** **Light refresh** Outcomes subtitle + one outcome emphasis on **deep focus** / sustained attention; soft urgency in subtitle only.

### Offer & scarcity (conditional)
- **D-MKT-OFFER-01:** Ship offer band **only when team confirms** real promotion (15% / first 5 slots); until then `enabled: false` and band hidden.
- **D-MKT-OFFER-02:** When enabled, place **`CourseOffer` band immediately before** `CourseRegister` (after FAQ) — not merged into `CourseMidPageCTA`, not on sticky bar.
- **D-MKT-OFFER-03:** Data in **`courseOffer.ts`** (or extend `courseRegistration.ts`) with **`enabled: boolean`** + bilingual headline/body/CTA label.
- **D-MKT-OFFER-04:** Offer CTA scrolls to **`#course-register`** (same Google Form / Messenger flow).

### FAQ expansion
- **D-MKT-FAQ-01:** **Replace strategy** — keep core STEM FAQs: no-experience, mixed-levels, capstone, AI, schedule, register; **swap/expand** `faq-arduino` → component cost/replacement; add parent FAQs: **myopia**, **hyperactive kids**, **post-course engagement**, **free trial / not interested**.
- **D-MKT-FAQ-02:** **Free trial FAQ** aligns with **consultation registration** — not a separate promise from hero primary CTA.
- **D-MKT-FAQ-03:** **Cap ~8–10 total** FAQ items after swap (single-open `<details>` behavior unchanged per D-FAQ-02).

### Homepage teaser
- **D-MKT-TEAS-01:** Update **`courseTeaser.ts`** subtitle with **one-line parent hook** (hands-on vs passive screen); headline/journey rail unchanged (Logic → Hardware → Capstone).
- **D-MKT-TEAS-02:** Teaser tone **matches `/course` soft STEM** — no extended dopamine copy on homepage.
- **D-MKT-TEAS-03:** **Single CTA unchanged** — "Xem khóa học" → `/course` (preserve D-TEAS-04).

### Carried forward (do not re-decide)
- Section order on `/course` (Hero → Problem → … → FAQ → Register → sticky).
- Dark arena, pit-slate, sparse badges, `FadeInSection`, cyan on interaction only (D-UX-01..11).
- `CourseRegister` Google Form primary + disabled state + Messenger; sticky CTA after hero scroll.
- Bilingual via `LocalizedText` + `getLocalized`; no new shadcn dependencies for FAQ.

### Agent discretion
- Exact wording of soft-STEM prose blocks (writer pass within tone rules).
- Lucide icon for 4th problem card.
- Which 2nd FAQ entry to drop if count exceeds ~10 after adds (prefer dropping least parent-facing STEM duplicate).
- `CourseOffer` component naming/path (`src/app/course/CourseOffer.tsx` vs extend `CourseMidPageCTA`).
- Minor `courseSectionCopy` title/subtitle edits for Problem/Solution section headers.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Marketing source (tone reference only — do not copy verbatim)
- User-provided Marketing Plan (conversation 2026-07-06) — sections S1–S4, S6–S7; **tone must be adapted** per D-MKT-TONE-01..04

### Course specs
- `docs/course/PRD.md` — baseline section intent (adapt copy, do not revert to PRD-only STEM if conflicts with CONTEXT)
- `docs/course/technical_SPEC.md` — section IDs, component tree, styling
- `docs/course/DATA_CONTRACT.md` — `LocalizedText`, FAQ types
- `docs/course/ACCEPTANCE_CRITERIA.md` — verification patterns

### Design & product
- `PRODUCT.md` — competition-grade STEM, reject cartoon/fear-mongering
- `DESIGN.md` — dark arena, pit slate, prose surfaces
- `.impeccable/design.json` — HUD cyan, anti-patterns

### Prior phase context
- `.planning/phases/04-course-page-sections/04-CONTEXT.md` — D-UX-01..07, section rhythm, FAQ `<details>` pattern
- `.planning/phases/05-integration-teaser-launch/05-CONTEXT.md` — D-TEAS-01..06, D-REG-01..05, sticky/nav boundaries

### Data & components (integration targets)
- `src/data/courseHero.ts`
- `src/data/courseSections.ts`
- `src/data/courseFaq.ts`
- `src/data/courseTeaser.ts`
- `src/data/courseRegistration.ts`
- `src/app/course/page.tsx`
- `src/app/course/CourseHero.tsx`, `CourseProblem.tsx`, `CourseSolution.tsx`, `CourseOutcomes.tsx`, `CourseFAQ.tsx`, `CourseRegister.tsx`, `CourseMidPageCTA.tsx`
- `src/components/homepage/CourseTeaser.tsx` (or path per Phase 5 ship)

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets
- `CourseProblem` — 3-card grid on `lg`; extend to 4 cards or `lg:grid-cols-2` / 4-col pattern per planner.
- `SectionHeader` + `FadeInSection` — wrap new prose blocks consistently.
- `CourseMidPageCTA` — slate band pattern reusable for `CourseOffer` when enabled.
- `courseFaq` + `CourseFAQ` — append/replace items in data only if component maps array.
- `courseTeaser.ts` — subtitle field ready for parent hook.

### Established Patterns
- All marketing copy in `src/data/*.ts` with `{ vi, en }` — not hardcoded in components.
- Prose blocks: pit-slate `border-slate-800 bg-slate-900/30 rounded-2xl p-6` (match FAQ/curriculum rows).
- No second Aurora; offer band uses D-UX-07 mid-CTA slate treatment.

### Integration Points
- `page.tsx` — insert `CourseOffer` between `CourseFAQ` and `CourseRegister` when component exists.
- Hero/subtitle — `CourseHero` reads `courseHeroData`; may need optional `parentHook` field or expanded `subtitle`.
- Register flow unchanged — offer and FAQ "free trial" point to `#course-register`.

</code_context>

<specifics>

## Specific Ideas

- Parent hook direction (adapted): help children spend less passive screen time by building real Arduino/mBlock projects — makers not passive consumers.
- Marketing plan Section 6 FAQs to adapt: myopia (eye focal exercise), component cost (open-source Arduino), kinesthetic learners, post-course self-directed projects, free trial via consultation.
- Marketing plan Section 7 offer: "Giảm 15% học phí — 5 suất đăng ký đầu" — **data-ready, disabled until confirmed**.

</specifics>

<deferred>

## Deferred Ideas

- Hero split layout with child + Arduino + phone aside photo — when `/Images/Course/` assets land (future asset phase).
- Long collapsible "Đọc thêm" neuroscience essay — rejected for Phase 6 (short prose only).
- Dual CTA on homepage teaser — out of scope (D-TEAS-04).
- Publishing hard medical/scientific claims with citations — future content review if needed.

</deferred>

---

*Phase: 06-marketing-copy-integration-parent-facing-screen-time-narrati*
*Context gathered: 2026-07-06*
