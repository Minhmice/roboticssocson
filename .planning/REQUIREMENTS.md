# Requirements: Robotics Sóc Sơn Sponsorship Site

**Defined:** 2026-07-04  
**Milestone:** v2.0 Implement Course Landing  
**Core Value:** Prospective sponsors, students, and educators must quickly trust Robotics Sóc Sơn as a serious, hands-on STEM team with clear learning outcomes and credible execution.

## v1 Requirements (Milestone v1.0 — Complete)

### Curriculum Positioning

- [x] **CURR-01**: User can understand the course promise: moving from Scratch block logic to real Arduino/mBlock hardware projects.
- [x] **CURR-02**: User can identify the intended course duration, audience level, and final learning outcomes.
- [x] **CURR-03**: User can see why the curriculum belongs to Robotics Sóc Sơn's sponsor/education story.

### Information Architecture

- [x] **INFO-01**: User can distinguish the two main learning parts: Scratch foundations and mBlock/Arduino hardware.
- [x] **INFO-02**: User can scan the complete lesson sequence without reading a dense syllabus wall.
- [x] **INFO-03**: User can understand the recommended hybrid integration: homepage teaser plus dedicated curriculum page.

### Lesson Model

- [x] **LESS-01**: Each lesson has a consistent shape: objective, theory, practice, core blocks/components, and student output.
- [x] **LESS-02**: Scratch lessons visibly progress from events and sequence into loops, repeat, conditionals, and sensing.
- [x] **LESS-03**: Hardware lessons visibly progress from digital output into input, ultrasonic sensing, servo control, custom blocks, and capstone integration.

### Learning Method

- [x] **METH-01**: User can see AI as a guided learning/debugging assistant, not a shortcut that replaces thinking.
- [x] **METH-02**: User can see draw.io flowcharts as a pre-coding scaffold before Scratch/mBlock implementation.
- [x] **METH-03**: User can understand the repeatable learning routine: explain → flowchart → build blocks → test → debug.

### Capstone

- [x] **CAP-01**: User can compare at least two capstone directions: smart trash bin and reverse parking warning system.
- [x] **CAP-02**: Each capstone shows which prior concepts it combines, especially ultrasonic sensor + servo + conditionals.

### Design Direction (Shape)

- [x] **DSGN-01**: The curriculum shape preserves the existing dark arena/cyan/silver Robotics Sóc Sơn identity from `DESIGN.md`.
- [x] **DSGN-02**: The shape avoids cartoonish/kid-only STEM visuals and presents the course with sponsor-grade credibility.
- [x] **DSGN-03**: The shape includes responsive hierarchy guidance so the curriculum remains readable on mobile.

### Homepage (Phase 2)

- [x] **HOME-01**: User landing on `/` sees club introduction only without budget or sponsorship pitch sections.
- [x] **HOME-02**: Navigation and CTAs on the homepage no longer anchor to removed sponsorship sections.
- [x] **HOME-03**: Homepage remains bilingual and preserves the existing dark arena/cyan brand system.

### Sponsorship Surface (Phase 2)

- [x] **SPON-01**: User can access former homepage sponsorship/financial sections from `/sponsorship`.
- [x] **SPON-02**: Sponsorship page includes budget fundraising, budget breakdown, why sponsor, and final sponsor CTA.
- [x] **SPON-03**: Existing `/sponsor` donation/stepper flow continues to work and is linked from nav.

### Archives (Phase 2)

- [x] **ARCH-01**: Archive `sponsorship-homepage` preserves full pre-split homepage composition.
- [x] **ARCH-02**: Archive `sponsorship` preserves sponsorship-only section bundle.

## v2.0 Requirements (Milestone v2.0 — Active)

Implementation per `docs/course/technical_SPEC.md` and `ACCEPTANCE_CRITERIA.md`.

### Route & Navigation

- [x] **NAV-01**: User can open dedicated course page at `/course`.
- [ ] **NAV-02**: User can reach `/course` from Navbar link (vi/en label).
- [ ] **NAV-03**: On `/course`, user can scroll to curriculum, projects, FAQ, and register sections via in-page anchors.
- [ ] **NAV-04**: Navbar on `/course` does not expose broken CLB-only anchors (`#about-first`, etc.) without navigating home.

### Homepage Teaser

- [ ] **TEAS-01**: User on `/` sees course teaser with journey strip and CTA linking to `/course`.
- [ ] **TEAS-02**: Teaser does not list all 12 lessons (summary only).

### Course Page Content

- [x] **PAGE-01**: User can read course hero (title, promise, badges, primary/secondary CTAs).
- [x] **PAGE-02**: User can read problem, solution, and outcomes sections.
- [x] **PAGE-03**: User can browse 12-lesson curriculum from static data with per-lesson detail (expand or equivalent).
- [x] **PAGE-04**: User can view two capstone project cards (smart bin, parking warning).
- [x] **PAGE-05**: User can read method, leveling, and AI usage sections.
- [x] **PAGE-06**: User can expand at least seven FAQ items.

### Data Layer

- [x] **DATA-01**: Course content lives in typed `src/data/course*.ts` modules with bilingual fields (`LocalizedText` for curriculum).
- [x] **DATA-02**: Data shapes match `docs/course/DATA_CONTRACT.md` (Lesson, Project, FAQItem, Registration config).

### Registration

- [ ] **REG-01**: User can request consultation via Google Form (locale vi/en URL) or inline form with client validation per DATA_CONTRACT.
- [ ] **REG-02**: User can reach Messenger fallback (`https://m.me/roboticssocson`) from register section.

### Internationalization

- [x] **I18N-01**: Course surface respects site language toggle (vi/en) for data-driven copy and UI labels.

### SEO & Quality

- [x] **QUAL-01**: `/course` has dedicated `metadata` (title, description, Open Graph).
- [ ] **QUAL-02**: `npm run lint`, `npm run build`, and `npm run check:assets` pass after implementation.
- [ ] **QUAL-03**: `/`, `/sponsorship`, and `/sponsor` behavior unchanged (regression).

### Design (Implementation)

- [x] **DSGN-04**: Course UI reuses site patterns (`SectionHeader`, `GlowCard`, `CTAButton`, `AuroraBackground`, dark tokens) — no separate light theme.

## v3 Requirements (Deferred)

- **OPS-01**: Teacher CMS or structured content workflow beyond static TS files.
- **OPS-02**: Student lesson progress tracking.
- **OPS-03**: Quizzes or checkpoints.
- **IMPL-04**: Downloadable flowchart assets per lesson.
- **ANLY-01**: Analytics events (CTA click, form submit, FAQ open).

## Out of Scope

| Feature | Reason |
|---------|--------|
| LMS accounts/progress | Not requested; static marketing surface only |
| `POST /api/register` | No API routes in repo; Google Form v1 |
| Payment/enrollment | No monetization flow |
| Analytics provider | Not in codebase; deferred v3 |
| CMS / MDX | Static-first architecture |
| Light course theme | Conflicts with CLB dark arena brand |
| Phase 2 re-implementation | Already shipped in v1.0 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CURR-01 … DSGN-03 | Phase 1 | Complete |
| HOME-01 … ARCH-02 | Phase 2 | Complete |
| DATA-01, DATA-02, NAV-01, QUAL-01, I18N-01 | Phase 3 | Complete |
| PAGE-01 … PAGE-06, DSGN-04 | Phase 4 | Complete |
| TEAS-01, TEAS-02, NAV-02, NAV-03, NAV-04, REG-01, REG-02, QUAL-02, QUAL-03 | Phase 5 | Pending |

**Coverage:** v2.0 — 18 requirements mapped across Phases 3–5. Unmapped: 0.

---
*Requirements updated: 2026-07-05 — Milestone v2.0*
