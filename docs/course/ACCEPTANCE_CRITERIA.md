# Acceptance Criteria: Course “Từ Khối Lệnh Đến Phần Cứng”

**Refs:** `docs/course/technical_SPEC.md`, `docs/course/DATA_CONTRACT.md`, `docs/course/PRD.md`

---

## 1. Functional

### Routes & nav

- [ ] **F-01** `/course` renders 11 sections (Hero → Register) in PRD order.
- [ ] **F-02** Homepage `/` shows `CourseTeaser` with CTA to `/course`.
- [ ] **F-03** `Navbar` includes link to `/course` (`t("nav.course")`).
- [ ] **F-04** On `/course`, in-page anchors scroll to `#course-curriculum`, `#course-projects`, `#course-faq`, `#course-register` (offset ~80px).
- [ ] **F-05** On `/course`, clicking CLB-only anchors (`#about-first`, …) either hidden or navigate to `/#about-first` — **no dead scroll**.
- [ ] **F-06** Hero CTAs scroll to curriculum and register sections.
- [ ] **F-07** Language toggle updates course copy (data `_vi`/`_en` or equivalent).

### Content

- [ ] **F-08** Curriculum renders **12** lessons from `src/data/courseCurriculum.ts` (not hardcoded in JSX).
- [ ] **F-09** Each lesson shows title, goal, product, primaryLevel, secondaryLevel (+ challenge if in data).
- [ ] **F-10** Projects section shows **2** capstones from data.
- [ ] **F-11** FAQ shows ≥ **7** items; expand/collapse works.
- [ ] **F-12** Problem (3), Solution, Outcomes, Method, Leveling, AI sections match PRD intent.

### Registration

- [ ] **F-13** Register section has working CTA — **at least one:**
  - Google Form opens in new tab (locale-correct URL from `courseRegistration.ts`), **or**
  - Inline form with validation + success message (ContactForm pattern).
- [ ] **F-14** Messenger link `https://m.me/roboticssocson` works if shown.

---

## 2. UI / Responsive

- [ ] **UI-01** Dark theme — uses site tokens (`bg-background`, `text-foreground`, `primary` cyan); **not** PRD light palette.
- [ ] **UI-02** Section spacing matches site: `py-12 sm:py-16 md:py-24`.
- [ ] **UI-03** Container/padding consistent with existing sections (`max-w-7xl` or `max-w-4xl`, `px-4 sm:px-6 md:px-8`).
- [ ] **UI-04** Cards use `GlowCard` or `AnimatedCard` — not ad-hoc one-off styles.
- [ ] **UI-05** Single H1 on `/course` (CourseHero).
- [ ] **UI-06** Mobile 375px: no horizontal overflow; touch targets ≥ 44px.
- [ ] **UI-07** Images via `MediaPlaceholder` or `next/image` with `sizes`.
- [ ] **UI-08** Reuses global `Navbar` + `Footer` from `layout.tsx` — no duplicate header/footer components.

---

## 3. Content Quality

- [ ] **C-01** Course title “Từ Khối Lệnh Đến Phần Cứng” visible in Hero.
- [ ] **C-02** Visitor understands promise within ~30s (Hero + Problem) — manual review.
- [ ] **C-03** Curriculum order: buổi 1–6 Scratch, 7–11 hardware, 12 capstone.
- [ ] **C-04** AI section: assistant for explain/debug — not “AI does homework”.
- [ ] **C-05** Teaser does **not** list all 12 sessions.
- [ ] **C-06** FAQ covers PRD minimum questions.

---

## 4. Form (if inline form shipped)

- [ ] **FM-01** parentName required, ≥ 2 chars.
- [ ] **FM-02** phone required, ≥ 9 chars.
- [ ] **FM-03** age required, integer 6–15.
- [ ] **FM-04** experience required enum.
- [ ] **FM-05** email optional with format check when present.
- [ ] **FM-06** Success feedback visible (banner ≥ 3s or persist until dismiss).

*(Skip FM-* if Google Form only — then F-13 Google path must pass.)*

---

## 5. SEO / Accessibility

- [ ] **SEO-01** `/course` has dedicated `metadata.title` and `description` via `src/app/course/layout.tsx`.
- [ ] **SEO-02** OG tags present; image URL resolves.
- [ ] **A11Y-01** Form inputs have associated labels.
- [ ] **A11Y-02** FAQ keyboard operable; focus ring visible.
- [ ] **A11Y-03** Icon buttons have `aria-label`.
- [ ] **A11Y-04** Long body text readable contrast on dark bg.

---

## 6. Regression (CLB site)

- [ ] **R-01** `/` still renders all existing sections in current order (Hero through FinalCTA).
- [ ] **R-02** `/sponsor` stepper, Google Form, QR download unchanged.
- [ ] **R-03** `npm run build` exits 0.
- [ ] **R-04** `npm run lint` exits 0.
- [ ] **R-05** `npm run check:assets` exits 0 after course image refs added.
- [ ] **R-06** No breaking edits to existing `src/data/*` modules (except additive exports in `index.ts`).
- [ ] **R-07** Locale persistence (`localStorage` `"locale"`) works across `/`, `/course`, `/sponsor`.

---

## 7. Definition of Done

Done when:

1. All **F-***, **UI-***, **C-***, **SEO-***, **A11Y-***, **R-*** criteria pass.
2. Form approach (Google **or** inline) fully satisfies **F-13** + relevant **FM-***.
3. Placeholders (Google Form URL, images) replaced or documented as launch blockers.
4. Manual checklist §8 executed.

---

## 8. Manual Test Checklist

```bash
npm run dev   # http://localhost:4000
```

### Homepage `/`

| # | Step | Expected |
|---|------|----------|
| 1 | Load `/` | All 12 existing sections visible |
| 2 | Find course teaser | Visible; CTA goes to `/course` |
| 3 | Toggle EN | Teaser text updates |
| 4 | Nav “Khóa học” | Opens `/course` |
| 5 | Existing nav anchors | Still scroll on `/` |

### Course `/course`

| # | Step | Expected |
|---|------|----------|
| 6 | Load page | Dark theme; global Navbar/Footer present |
| 7 | Tab title | Course-specific (not generic CLB-only) |
| 8 | Count lessons | 12 from data |
| 9 | FAQ | ≥ 7; toggle works |
| 10 | Register CTA | Google Form or inline success |
| 11 | Toggle VI/EN | Sections update |
| 12 | Width 375px | No layout break |
| 13 | Course nav anchors | Scroll to correct sections |
| 14 | From `/course`, nav CLB anchors | No broken scroll (hidden or link to `/`) |

### Sponsor `/sponsor`

| # | Step | Expected |
|---|------|----------|
| 15 | Corporate flow | Google Form link works |
| 16 | Personal flow | QR visible |

### Build

| # | Step | Expected |
|---|------|----------|
| 17 | `npm run lint` | Pass |
| 18 | `npm run build` | Pass |
| 19 | `npm run check:assets` | Pass |

---

## 9. Out of Scope

- `POST /api/register`
- Analytics events
- LMS / payments
- Replacing `/` with course landing
- Fixing all pre-existing `/sponsor` navbar anchor behavior (unless bundled intentionally)
