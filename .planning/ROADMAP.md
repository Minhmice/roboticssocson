# Roadmap: Robotics Sóc Sơn Sponsorship Site

**Created:** 2026-07-04  
**Updated:** 2026-07-05  
**Mode:** Vertical MVP  
**Current Milestone:** v2.0 Implement Course Landing

## Milestone v2.0 Goal

Ship production course surface for **"Từ Khối Lệnh Đến Phần Cứng"**: `/course` landing page, homepage teaser, bilingual static data, registration CTA, and nav integration — per `docs/course/`.

---

## Completed Milestones

### v1.0 — Curriculum Shape & Site Split (Complete)

| Phase | Name | Status |
|-------|------|--------|
| 1 | Shape Curriculum Experience | Complete |
| 2 | Separate Sponsorship From Homepage | Complete |

---

## Active Phases (v2.0)

### Phase 3: Course Data & Route Foundation

**Goal:** Add typed course data modules, `/course` route shell with layout metadata, and minimal hero — proving data contract and SEO before full sections.

**Mode:** mvp  
**Status:** Complete  
**UI hint:** yes

**Requirements:** DATA-01, DATA-02, NAV-01, QUAL-01, I18N-01

**Depends on:**

- `docs/course/DATA_CONTRACT.md`
- `docs/course/technical_SPEC.md` §3–5
- Existing patterns: `src/data/hero.ts`, `src/app/sponsor/page.tsx`, `src/hooks/useTranslatedData.ts`

**Success Criteria:**

1. `src/data/course*.ts` exports Lesson[], Project[], FAQItem[], registration config with bilingual fields (`LocalizedText` for curriculum).
2. `/course` route renders with `layout.tsx` metadata and `CourseHero` using `AuroraBackground` + data-driven copy.
3. Language toggle switches hero copy between vi/en.
4. `npm run build` passes with new route.

**Plans:** 3 plans in 2 waves

| Wave | Plans | Objective |
|------|-------|-----------|
| 1 | 03-01, 03-02 | SEO registry + course static data layer (parallel) |
| 2 *(blocked on Wave 1)* | 03-03 | `/course` route shell + `CourseHero` |

- `03-01-PLAN.md` — SEO registry and course route metadata (QUAL-01)
- `03-02-PLAN.md` — Course static data layer (DATA-01, DATA-02, I18N-01)
- `03-03-PLAN.md` — Course route shell and hero (NAV-01, I18N-01)

---

### Phase 4: Course Page Sections

**Goal:** Implement all PRD content sections on `/course` (problem through FAQ) using shared components and static data.

**Mode:** mvp  
**Status:** Complete  
**UI hint:** yes

**Requirements:** PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, DSGN-04

**Depends on:**

- Phase 3 data modules and route shell
- `docs/course/PRD.md` section copy
- `GlowCard`, `SectionHeader`, `MediaPlaceholder`, `FadeInSection`
- `.planning/phases/04-course-page-sections/04-CONTEXT.md`

**Success Criteria:**

1. All 11 sections render in order with stable section `id`s for anchors.
2. Curriculum lists 12 lessons from data; FAQ has ≥7 expandable items.
3. Two capstone projects render from `courseProjects.ts`.
4. UI matches dark arena tokens; responsive at 375px without horizontal overflow.
5. Manual review: visitor understands course promise in ~30 seconds.

**Plans:** 4 plans in 3 waves

| Wave | Plans | Objective |
|------|-------|-----------|
| 1 | 04-01 | Section data fill + FadeInSection helper |
| 2 | 04-02, 04-03 | Narrative sections + curriculum/projects/CTA (parallel) |
| 3 *(blocked on Wave 2)* | 04-04 | FAQ, register bridge, page composition + verify |

- `04-01-PLAN.md` — Course section data and FadeIn helper (PAGE-02 data)
- `04-02-PLAN.md` — Trust and narrative sections (PAGE-02, PAGE-05, DSGN-04)
- `04-03-PLAN.md` — Curriculum, projects, mid-page CTA (PAGE-03, PAGE-04)
- `04-04-PLAN.md` — FAQ, register bridge, page compose (PAGE-01, PAGE-06, DSGN-04)

---

### Phase 5: Integration, Teaser & Launch

**Goal:** Wire homepage teaser, navbar/footer course links, registration CTAs, pathname-aware anchors, and full verification.

**Mode:** mvp  
**Status:** Complete  
**UI hint:** yes

**Requirements:** TEAS-01, TEAS-02, NAV-02, NAV-03, NAV-04, REG-01, REG-02, QUAL-02, QUAL-03

**Depends on:**

- Phase 4 complete `/course` page
- `src/components/layout/Navbar.tsx`, `Footer.tsx`, `HomePage.tsx`
- `courseRegistration.ts` Google Form links (empty = disabled CTA + Messenger fallback)

**Success Criteria:**

1. `CourseTeaser` on `/` with CTA to `/course`; does not list 12 lessons.
2. Navbar shows course link; on `/course`, anchors scroll to curriculum/projects/faq/register.
3. Register section: Google Form primary + Messenger fallback + what-we-ask bullets.
4. `npm run lint`, `npm run build`, `npm run check:assets` pass.
5. `/`, `/sponsorship`, `/sponsor` regression check pass.

**Plans:** 3 plans in 2 waves

| Wave | Plans | Objective |
|------|-------|-----------|
| 1 | 05-01, 05-02 | CourseTeaser + Navbar/Footer/scroll-spy |
| 2 | 05-03 | CourseRegister + sticky CTA + verify |

- `05-01-PLAN.md` — Homepage CourseTeaser
- `05-02-PLAN.md` — Navbar, Footer, scroll-spy
- `05-03-PLAN.md` — Register, sticky CTA, verification

---

## Requirement Coverage (v2.0)

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | 3 | Complete |
| DATA-02 | 3 | Complete |
| NAV-01 | 3 | Complete |
| QUAL-01 | 3 | Complete |
| I18N-01 | 3 | Complete |
| PAGE-01 | 4 | Complete |
| PAGE-02 | 4 | Complete |
| PAGE-03 | 4 | Complete |
| PAGE-04 | 4 | Complete |
| PAGE-05 | 4 | Complete |
| PAGE-06 | 4 | Complete |
| DSGN-04 | 4 | Complete |
| TEAS-01 | 5 | Complete |
| TEAS-02 | 5 | Complete |
| NAV-02 | 5 | Complete |
| NAV-03 | 5 | Complete |
| NAV-04 | 5 | Complete |
| REG-01 | 5 | Complete |
| REG-02 | 5 | Complete |
| QUAL-02 | 5 | Complete |
| QUAL-03 | 5 | Complete |

**Coverage:** 18 / 18 v2.0 requirements mapped.

### Phase 6: Marketing copy integration — parent-facing screen-time narrative on /course

**Goal:** Integrate soft-STEM parent narrative (screen time, hands-on focus) into `/course` copy, FAQ, optional offer band, and homepage teaser — without changing section architecture or registration flow.

**Mode:** content  
**Status:** Complete  
**Depends on:** Phase 5

**Plans:** 3 plans in 2 waves

| Wave | Plans | Objective |
|------|-------|-----------|
| 1 | 06-01 | Marketing data layer (hero, sections prose, FAQ, offer, teaser) |
| 2 *(blocked on Wave 1)* | 06-02, 06-03 | Narrative UI + offer band + verification (parallel) |

- `06-01-PLAN.md` — Marketing data layer
- `06-02-PLAN.md` — Hero, Problem/Solution prose UI, teaser
- `06-03-PLAN.md` — CourseOffer band, page compose, verify

### Phase 7: Light theme migration — white + blue tech palette across entire site

**Goal:** Migrate entire site from dark arena + HUD cyan to light Stripe/Vercel-style white + tech blue (`#2563eb`). Update tokens, shared primitives, all routes, and DESIGN.md.

**Mode:** ui  
**Status:** Complete  
**Depends on:** Phase 6

**Success Criteria:**

1. `:root` tokens in `globals.css` use light palette; body renders white with ink text.
2. Shared primitives (`GlowCard`, `CTAButton`, `SectionHeader`) use semantic tokens / blue shadows.
3. `/`, `/course`, `/sponsorship`, `/sponsor` free of dark hardcoded `slate-9`/`cyan` classes.
4. `DESIGN.md` documents light theme north star.
5. `npm run lint`, `npm run build`, `npm run check:assets` pass.

**Plans:** Crafted inline via `/impeccable craft` (no separate plan files)

### Phase 8: Production readiness — SEO, CWV, headers, PostHog analytics

**Goal:** Ship PostHog SDK across the site, instrument custom behavior events, and deliver a password-protected internal analytics dashboard aligned with DESIGN.md.

**Mode:** mvp  
**Status:** In progress  
**Depends on:** Phase 7

**Success Criteria:**

1. `posthog-js` initializes via `instrumentation-client.ts` with `/ingest` reverse proxy.
2. Custom events fire for CTA clicks, language toggle, nav, course registration, and boot loader.
3. `/analytics` requires dashboard password; HogQL summary loads when `POSTHOG_PERSONAL_API_KEY` is set.
4. `npm run lint` and `npm run build` pass.

**Plans:** Implemented via PostHog wizard pattern + `/impeccable craft`

Plans:

- [x] PostHog SDK + proxy + custom event instrumentation
- [x] Password-gated `/analytics` dashboard (DESIGN.md light theme)
- [ ] Add `POSTHOG_PERSONAL_API_KEY` for live HogQL metrics in dashboard
- [ ] Production env vars on host (Vercel / Cloudflare)

### Phase 9: Arduino mBlock presentation deck

**Goal:** Ship production 30-slide PPTX-style presentation at `/course/arduino-mblock-deck` — bilingual data, left/right navigation, light-theme DESIGN.md polish, and link from `/course`.

**Mode:** mvp  
**Status:** Planned  
**Depends on:** Phase 8 (non-blocking for deck UI)

**Requirements:** DECK-01, DECK-02, DECK-03, DECK-04, DECK-05, QUAL-01

**Success Criteria:**

1. `src/data/arduinoMblockDeck.ts` exports 30 bilingual slides covering Arduino, mBlock, teaching advantages, synergy, and kids narrative.
2. `DeckPlayer` + `DeckSlide` replace wireframe UI — no dashed placeholders or WIREFRAME labels.
3. Navigation: left/right 18% tap zones, `←`/`→` keys, progress bar, disabled at ends.
4. `/course` links to deck; metadata title does not say "Wireframe".
5. `npm run lint` passes; manual pass through all 30 slides.

**Plans:** 3 plans in 3 waves

| Wave | Plans | Objective |
|------|-------|-----------|
| 1 | 09-01 | Bilingual deck data layer |
| 2 *(blocked on Wave 1)* | 09-02 | Production DeckPlayer + layouts |
| 3 *(blocked on Wave 2)* | 09-03 | Course link, metadata, verify |

- `09-01-PLAN.md` — Bilingual slide data (DECK-02)
- `09-02-PLAN.md` — Deck player and layouts (DECK-01, DECK-03, DECK-04)
- `09-03-PLAN.md` — Integration and verification (DECK-05, QUAL-01)

Plans:
**Wave 1**

- [ ] 09-01 — Bilingual deck data layer

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 09-02 — Production deck player

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 09-03 — Course integration + verify

---

## Historical Phases (v1.0)

### Phase 1: Shape Curriculum Experience — Complete

Produced `01-SHAPE-BRIEF.md`. Requirements CURR-*, INFO-*, LESS-*, METH-*, CAP-*, DSGN-01..03 validated.

### Phase 2: Separate Sponsorship From Homepage — Complete

Live: club-only `/`, `/sponsorship`, archives. Requirements HOME-*, SPON-*, ARCH-* validated.
