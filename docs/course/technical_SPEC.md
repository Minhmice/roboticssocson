# Technical Spec: Course Page “Từ Khối Lệnh Đến Phần Cứng”

**Status:** Implementation-ready  
**Repo:** `roboticssocson-sponsorship-site`  
**Product refs:** `docs/course/PRD.md`, `.planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md`

---

## 1. Existing Project Summary

### 1.1 Stack (đọc từ `package.json`, `src/app/layout.tsx`)

| Layer | Thực tế trong repo |
|-------|-------------------|
| Framework | **Next.js 16** App Router (`next@^16.2.9`) |
| React | **19** (`react@^19.2.7`) |
| Language | TypeScript **6** strict (`tsconfig.json`: `strict: true`, alias `@/*` → `src/*`) |
| CSS | **Tailwind CSS 4** (`tailwindcss@^4.3.2`, `@tailwindcss/postcss`) |
| Tokens | CSS variables trong `src/app/globals.css`; map semantic colors trong `tailwind.config.ts` |
| UI kit | Radix + shadcn-style primitives trong `src/components/ui/` |
| Icons | `lucide-react` |
| Motion | `framer-motion` (Hero, `AnimatedComponents`) |
| Forms | `react-hook-form` **có trong dependencies**; `src/components/ui/form.tsx` wrap RHF — **chưa dùng ở page nào** |
| Validation | **Không có `zod` trong `package.json`** |
| Port | `npm run dev` / `npm start` → **4000** |

### 1.2 Kiến trúc hiện tại

```
src/app/layout.tsx          → shell: LanguageProvider, DynamicMetadata, Navbar, <main pt-16>, Footer
src/app/page.tsx            → homepage (client), compose sections từ folder có prefix số
src/app/sponsor/page.tsx    → route phụ duy nhất hiện có
src/app/{1..4}. */          → section components (KHÔNG phải route riêng)
src/app/shared/             → FinalCTA.tsx
src/components/layout/      → Navbar, Footer, DynamicMetadata
src/components/shared/      → CTAButton, GlowCard, SectionHeader, Timeline, MediaPlaceholder, …
src/components/ui/          → button, input, card, aurora-background, form, tabs, …
src/data/*.ts               → static bilingual content (_vi / _en)
src/contexts/LanguageContext.tsx
src/hooks/useTranslatedData.ts, useDynamicMetadata.ts
messages/vi.json, messages/en.json
public/Images/**, public/Logo/**
```

**Không có:** `src/app/api/**`, database, CMS, auth, analytics script, trang `/privacy`.

### 1.3 Routes hiện có

| URL | File | Ghi chú |
|-----|------|---------|
| `/` | `src/app/page.tsx` | Single-page scroll CLB/tài trợ |
| `/sponsor` | `src/app/sponsor/page.tsx` | Stepper + Google Form + QR |

### 1.4 Pattern section homepage (reference khi implement course)

Ví dụ `WhySponsor.tsx`:

```tsx
<section id="why-sponsor" className="relative py-12 sm:py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <SectionHeader badge={...} title={...} subtitle={...} />
    {/* GlowCard / AnimatedCard content */}
  </div>
</section>
```

- Section `id` cho anchor nav (Navbar/Footer scroll).
- Copy bilingual: `locale === "vi" ? x_vi : x_en` **hoặc** `useTranslatedData().getField(data, "title")`.
- Data import từ `src/data/*.ts`.

### 1.5 Layout shell (course page kế thừa, không tạo Header/Footer riêng)

`src/app/layout.tsx`:

- `<html className="scroll-smooth dark">`
- Navbar **fixed** `h-14 sm:h-16`, content offset `pt-16`
- Footer global luôn render
- **Không** tạo `Header.tsx` / `Footer.tsx` riêng cho course

### 1.6 Navbar thực tế (`src/components/layout/Navbar.tsx`)

- Links desktop/mobile: anchor `#about-first`, `#achievements`, `#budget-section`, `#why-sponsor` — **chỉ hoạt động trên `/`**
- Route link: `CTAButton href="/sponsor"`
- External: Messenger `https://m.me/roboticssocson`
- `scrollToSection()` offset **80px**
- **Chưa có** link course; anchor homepage **sẽ fail** khi user đang ở `/course`

### 1.7 Form / lead capture thực tế

| Component | Trạng thái |
|-----------|------------|
| `ContactForm.tsx` | Có code, **không mount ở page nào**; submit = `console.log`; copy hardcoded EN |
| `sponsor/page.tsx` | **Production pattern:** `googleFormLinks` trong `src/data/sponsorPage.ts`, mở tab mới |
| API route | **Không tồn tại** |

→ Course registration **không** spec `POST /api/register` trừ khi team quyết định thêm backend sau.

### 1.8 SEO thực tế

- Static `export const metadata` trong `src/app/layout.tsx`
- `metadataBase`: `process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000"`
- `DynamicMetadata` + `useDynamicMetadata` patch `document.title` / meta theo locale — **áp dụng global**, chưa có per-route metadata (sponsor page cũng dùng chung)

### 1.9 Scripts verify

```bash
npm run lint
npm run build
npm run check:assets   # quét /Images/... trong src/, so khớp public/
```

---

## 2. Feature: Thêm Course Surface

### 2.1 Mô hình IA (từ SHAPE-BRIEF, đã approve)

1. **Homepage teaser** trên `/` — ngắn, CTA sang trang course.
2. **Dedicated page** `/course` — full landing scroll (11 sections PRD).

**Không** thay `/` bằng course landing. **Không** build LMS.

### 2.2 Route mới

| URL | File mới | Pattern theo |
|-----|----------|--------------|
| `/course` | `src/app/course/page.tsx` | `src/app/sponsor/page.tsx` (route folder + compose sections) |
| (optional) | `src/app/course/layout.tsx` | `export const metadata` riêng cho course |

Slug `/course` — **Assumption:** verify với product; có thể thêm alias `/khoa-hoc` sau.

---

## 3. Proposed File Tree

```
src/app/
├── page.tsx                          # + import CourseTeaser
├── shared/
│   └── CourseTeaser.tsx              # teaser homepage (cùng level FinalCTA)
└── course/
    ├── layout.tsx                    # metadata /course
    ├── page.tsx                      # "use client" compose sections
    ├── CourseHero.tsx
    ├── CourseProblem.tsx
    ├── CourseSolution.tsx
    ├── CourseOutcomes.tsx
    ├── CourseCurriculum.tsx
    ├── CourseProjects.tsx
    ├── CourseMethod.tsx
    ├── CourseLeveling.tsx
    ├── CourseAIUsage.tsx
    ├── CourseFAQ.tsx
    └── CourseRegister.tsx

src/data/
├── courseHero.ts
├── courseTeaser.ts
├── courseCurriculum.ts               # Lesson[]
├── courseProjects.ts
├── courseFaq.ts
├── courseRegistration.ts             # labels + googleFormLinks
├── courseSections.ts                 # problem, solution, outcomes, method, leveling, ai
└── index.ts                          # + export course modules

messages/
├── vi.json                           # nav.course, course.nav.*
└── en.json

public/Images/Course/                 # assets mới
```

**Không tạo:**

- `src/components/Hero.tsx` flat (sai pattern — sections nằm under `src/app/`)
- `src/app/api/register/route.ts`
- `src/lib/analytics.ts`, `src/lib/validators.ts` (v1)

---

## 4. Component Tree (runtime)

```
RootLayout (layout.tsx)
├── Navbar                          ← cần sửa: link /course + pathname-aware anchors
├── main.pt-16
│   └── /course/page.tsx
│       ├── CourseHero              # AuroraBackground (như Hero, sponsor)
│       ├── CourseProblem
│       ├── CourseSolution
│       ├── CourseOutcomes
│       ├── CourseCurriculum
│       ├── CourseProjects
│       ├── CourseMethod
│       ├── CourseLeveling
│       ├── CourseAIUsage
│       ├── CourseFAQ
│       └── CourseRegister
└── Footer                          ← optional link /course
```

### Reuse từ repo (bắt buộc ưu tiên)

| Cần | File thật |
|-----|-----------|
| Section title | `src/components/shared/SectionHeader.tsx` |
| Card surface | `src/components/shared/GlowCard.tsx`, `AnimatedCard` từ `AnimatedComponents.tsx` |
| CTA | `src/components/shared/CTAButton.tsx`, `src/components/ui/glass-button.tsx` |
| Hero background | `src/components/ui/aurora-background.tsx` |
| Image | `src/components/shared/MediaPlaceholder.tsx` |
| Input form | `src/components/ui/input.tsx`, `textarea.tsx`, `button.tsx` |
| i18n data | `src/hooks/useTranslatedData.ts` |
| i18n UI | `useLanguage().t("key")` |
| Email/social | `src/data/settings.ts` → `sponsorEmail`, `socials` |

### Section IDs (anchor trên `/course`)

| Section | `id` |
|---------|------|
| Hero | `course-hero` |
| Problem | `course-problem` |
| Curriculum | `course-curriculum` |
| Projects | `course-projects` |
| FAQ | `course-faq` |
| Register | `course-register` |

In-page nav (sub-nav course page hoặc mở rộng Navbar khi `pathname === '/course'`): scroll `#course-curriculum`, `#course-projects`, `#course-faq`, `#course-register` với offset 80px (match Navbar).

---

## 5. Styling (bám code thật, không PRD “theme sáng”)

| Item | Giá trị thực tế |
|------|-----------------|
| Theme | **Dark** — `html.dark`, tokens `--background`, `--foreground`, `--primary` (cyan) |
| Section padding | `py-12 sm:py-16 md:py-24` (match `Achievements`, `WhySponsor`, …) |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 md:px-8` (sections rộng) hoặc `max-w-4xl` (sponsor-style focused) |
| Cards | `GlowCard`: `rounded-2xl border border-slate-800 bg-slate-900/50`, cyan glow hover |
| Text heading | `text-foreground` / `text-slate-100`; subtitle `text-muted-foreground` |
| CTA | `CTAButton` primary = `bg-cyan-500`; min height **44px** |
| Design doc | `DESIGN.md`, `PRODUCT.md` — dark arena, **không** palette sáng kid-STEM |

PRD mô tả “màu sáng, thân thiện” — **override bởi brand CLB:** giữ dark competition-floor; “thân thiện” qua copy/icon, không đổi theme.

---

## 6. Content Sections (map PRD → implementation)

| # | Section | PRD | Data file |
|---|---------|-----|-----------|
| 1 | Hero | § Hero | `courseHero.ts` |
| 2 | Problem | § Problem — 3 pain points | `courseSections.ts` |
| 3 | Solution | § Solution | `courseSections.ts` |
| 4 | Outcomes | § Learning Outcomes | `courseSections.ts` |
| 5 | Curriculum | § Curriculum — **12 buổi** | `courseCurriculum.ts` |
| 6 | Projects | § Project — 2 capstone | `courseProjects.ts` |
| 7 | Method | § Method | `courseSections.ts` |
| 8 | Leveling | § Leveling | `courseSections.ts` |
| 9 | AI Usage | § AI Section | `courseSections.ts` |
| 10 | FAQ | § FAQ — ≥7 câu | `courseFaq.ts` |
| 11 | Register | § Registration Form | `courseRegistration.ts` |

### Homepage teaser (`CourseTeaser.tsx`)

- Vị trí đề xuất trong `page.tsx`: sau `MissionSection`, trước `TheChallengeSection` — **Assumption, verify product**
- Nội dung: promise + 3-step journey (Logic → Hardware → Capstone) + CTA `href="/course"`
- **Không** list 12 buổi

### Curriculum UI

- Render `courseLessons` từ data — **không hardcode JSX**
- Mobile: list dọc; expand row cho chi tiết (local `useState`)
- Optional: adapt `Timeline.tsx` (`year` ← lesson number, `title`, `description`) — component có sẵn tại `src/components/shared/Timeline.tsx`
- Radix Accordion: **chưa cài** — FAQ v1 dùng `<details>` hoặc `useState`; hoặc add shadcn accordion sau

---

## 7. State Management

| State | Where | How |
|-------|-------|-----|
| Locale | Global | `LanguageContext` + `localStorage` key `"locale"` |
| FAQ open | `CourseFAQ` | `useState<string \| null>` |
| Lesson expanded | `CourseCurriculum` | `useState<Set<string>>` |
| Form (nếu inline) | `CourseRegister` | `useState` như `ContactForm` |
| Navbar menu | Global | existing `useState` |

Không cần global store.

---

## 8. Form Behavior

### Fields (PRD)

| Field | Required |
|-------|----------|
| parentName | Yes |
| phone | Yes |
| email | No |
| studentName | No |
| age | Yes (6–15) |
| experience | Yes (`none \| scratch \| arduino \| other`) |
| note | No |

### v1 — Recommended: Google Form (giống sponsor)

Theo `src/data/sponsorPage.ts`:

```ts
export const courseGoogleFormLinks = {
  vi: "<URL>",  // Assumption — chưa có trong repo
  en: "<URL>",
};
```

`CourseRegister.tsx`:

- Primary CTA: `<a href={locale === "vi" ? links.vi : links.en} target="_blank">`
- Secondary: Messenger `https://m.me/roboticssocson` (pattern sponsor page)
- **Không cần** API route

### v1 — Alternate: Inline form

Clone pattern `ContactForm.tsx`:

- `useState` + manual validation (regex email giống ContactForm)
- Submit → `console.log` + success banner 3s
- Labels bilingual qua data/messages
- Có thể dùng `src/components/ui/form.tsx` + RHF nếu muốn — **optional**, không bắt buộc v1

### Không làm v1

- `POST /api/register`
- Zod schema (package chưa có)
- Toast library (dùng inline banner như ContactForm)

---

## 9. SEO / Meta

### Course route metadata

Tạo `src/app/course/layout.tsx`:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Từ Khối Lệnh Đến Phần Cứng | Robotics Sóc Sơn",
  description:
    "Khóa STEM Scratch, mBlock, Arduino cho học sinh cấp 1–2 — Robotics Sóc Sơn.",
  openGraph: {
    title: "Từ Khối Lệnh Đến Phần Cứng",
    description: "...",
    type: "website",
    images: [{ url: "/Logo/RBS Logo.svg", ... }], // hoặc /Images/Course/og.webp khi có
  },
};
```

| Rule | Detail |
|------|--------|
| H1 | Một H1 trong `CourseHero` |
| `metadataBase` | Kế thừa root layout |
| Locale meta | v1: layout static VI-first; EN dynamic meta = **future** (root `useDynamicMetadata` chưa pathname-aware) |
| OG image | Fallback `/Logo/RBS Logo.svg` như root cho đến khi có asset |

---

## 10. Analytics

**Repo không có tracking.** PRD liệt kê events (`cta_click`, `form_submit_success`, …) — **non-goal v1**.

Ghi TODO trong code comment nếu product yêu cầu sau.

---

## 11. Navbar / Footer Changes (bắt buộc cho UX đúng)

### Navbar (`src/components/layout/Navbar.tsx`)

1. Thêm `{ label: t("nav.course"), href: "/course", isAnchor: false }`
2. **Pathname-aware:** dùng `usePathname()` từ `next/navigation`
   - Trên `/`: giữ anchor links hiện tại
   - Trên `/course`: nav links → `#course-curriculum`, … hoặc ẩn anchor CLB, chỉ show course anchors
   - Trên `/sponsor`: anchor CLB không apply (hiện tại cũng broken — không regression scope trừ khi fix chung)

### Footer (`src/components/layout/Footer.tsx`)

- Optional: quick link `{ label: t("nav.course"), href: "/course" }` — dùng `<Link>` Next.js, không `scrollToSection`

### Messages

```json
// messages/vi.json
"nav": { "course": "Khóa học" }
// messages/en.json
"nav": { "course": "Course" }
```

---

## 12. Non-Goals

- LMS, login, progress, video hosting, payment
- CMS / MDX pipeline
- `POST /api/register`, database
- Analytics provider
- Light theme / mascot cartoon palette (PRD visual ≠ brand CLB)
- Thay homepage `/` bằng course-only site
- Automated E2E tests (repo chưa có)

---

## 13. Risks & Constraints

| Risk | Detail | Mitigation |
|------|--------|------------|
| Spec cũ sai stack | Next 14, Vercel-only, Zod, API route | Doc này thay thế nội dung cũ |
| Navbar anchor cross-route | `#about-first` trên `/course` không có element | Pathname-aware nav |
| `DynamicMetadata` ghi đè title course | Hook chạy global | Course `layout.tsx` metadata; cân nhắc skip hook trên `/course` |
| Nested `<main>` | `layout.tsx` + `page.tsx` đều có `<main>` | Giữ pattern hiện có (homepage đã vậy); course `page.tsx` có thể dùng `<div>` wrapper |
| `ContactForm` không i18n | EN hardcoded | Course form **không** reuse ContactForm as-is; viết `CourseRegister` bilingual |
| Google Form URL thiếu | Chưa trong repo | Placeholder + launch blocker |
| 12 buổi content | PRD vs PROJECT “6+ lessons” | Data model 12 items; dễ mở rộng |

---

## 14. Implementation Order

1. `src/data/course*.ts` — types + content (see `DATA_CONTRACT.md`)
2. `src/app/course/layout.tsx` + section components
3. `src/app/course/page.tsx`
4. `src/app/shared/CourseTeaser.tsx` + wire `src/app/page.tsx`
5. `Navbar.tsx` + `messages/*.json`
6. `public/Images/Course/*` + `npm run check:assets`
7. `src/data/index.ts` exports
8. `npm run lint && npm run build`

---

## 15. Related Docs

- `docs/course/DATA_CONTRACT.md` — types, validation, examples
- `docs/course/ACCEPTANCE_CRITERIA.md` — DoD, manual tests
- `.planning/codebase/ARCHITECTURE.md` — codebase map (2026-07-04)
