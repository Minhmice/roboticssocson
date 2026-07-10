# Data Contract: Course “Từ Khối Lệnh Đến Phần Cứng”

**Source of truth:** Static TypeScript trong `src/data/` — cùng pattern với `hero.ts`, `mission.ts`, `sponsorPage.ts`, `sponsorship.ts`.

**Không dùng v1:** CMS, MDX, JSON rời, API, database.

---

## 1. Conventions (đọc từ codebase)

### 1.1 Bilingual fields

Hai pattern đang coexist — course **nên** dùng `useTranslatedData` (như `Hero.tsx`):

```ts
const { getField } = useTranslatedData();
getField(lesson, "title"); // → title_vi | title_en
```

Pattern thay thế (đang dùng ở `WhySponsor.tsx`, `FinalCTA.tsx`):

```ts
locale === "vi" ? item.title_vi : item.title_en
```

### 1.2 UI strings

Nav và label ngắn → `messages/vi.json`, `messages/en.json` (`t("nav.course")`).

Copy dài (paragraphs, curriculum) → `src/data/course*.ts`.

### 1.3 Images

- Path: `/Images/Course/...` (web path từ `public/`)
- Validate: `npm run check:assets` (script quét regex `/Images/...` trong `src/`)
- Render: `MediaPlaceholder` hoặc `next/image` qua wrapper shared
- Logo: `/Logo/...` — **không** được check bởi script

### 1.4 Shared settings (read-only import)

Từ `src/data/settings.ts`:

- `sponsorEmail` — `roboticssocson@gmail.com`
- `socials.facebook` — `https://www.facebook.com/roboticssocson`
- Messenger CTA site-wide: `https://m.me/roboticssocson` (hardcoded Navbar/sponsor, chưa trong settings)

### 1.5 Export

Thêm vào `src/data/index.ts`:

```ts
export * from "./courseHero";
export * from "./courseCurriculum";
// ...
```

---

## 2. Backward Compatibility

| Rule | Lý do |
|------|-------|
| Không sửa field/export breaking trong `hero.ts`, `team.ts`, `sponsorPage.ts`, … | Regression CLB/sponsor |
| Course data chỉ trong file mới `course*.ts` | Tách domain |
| Không đổi `LanguageContext` API | Global i18n |
| `ContactForm.tsx` không mount — **không** extend cho course as-is | EN-only, wrong fields |

---

## 3. Types

### 3.1 `CoursePart`

```ts
export type CoursePart = "scratch" | "hardware" | "capstone";
```

### 3.2 `Lesson`

PRD § Curriculum (12 buổi) + SHAPE-BRIEF optional fields.

```ts
export interface Lesson {
  id: string;              // "lesson-01"
  number: number;          // 1–12
  part: CoursePart;
  title_vi: string;
  title_en: string;
  duration_vi?: string;
  duration_en?: string;
  goal_vi: string;
  goal_en: string;
  product_vi: string;
  product_en: string;
  primaryLevel_vi: string;
  primaryLevel_en: string;
  secondaryLevel_vi: string;
  secondaryLevel_en: string;
  challenge_vi?: string;
  challenge_en?: string;
  // Optional — shape brief / phase 2 UI
  theory_vi?: string;
  theory_en?: string;
  practice_vi?: string;
  practice_en?: string;
  coreItems_vi?: string[];
  coreItems_en?: string[];
  flowchartPrompt_vi?: string;
  flowchartPrompt_en?: string;
  aiPrompt_vi?: string;
  aiPrompt_en?: string;
}
```

| Field | Required v1 |
|-------|-------------|
| `id`, `number`, `part`, `title_*`, `goal_*`, `product_*`, `primaryLevel_*`, `secondaryLevel_*` | Yes |
| `challenge_*`, `duration_*` | Recommended |
| Extended shape-brief fields | No |

**PRD mapping 12 buổi:**

| # | part | Title (vi) |
|---|------|------------|
| 1 | scratch | Làm quen Scratch |
| 2 | scratch | Lệnh tuần tự |
| 3 | scratch | Vòng lặp forever |
| 4 | scratch | Repeat + animation |
| 5 | scratch | If/else + va chạm |
| 6 | scratch | Biến điểm số + game mini |
| 7 | hardware | Điện cơ bản |
| 8 | hardware | LED chớp |
| 9 | hardware | Đèn giao thông |
| 10 | hardware | Nút nhấn |
| 11 | hardware | Cảm biến siêu âm + servo |
| 12 | capstone | Dự án cuối khóa |

### 3.3 `Project`

```ts
export interface Project {
  id: string;
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
  components_vi: string[];
  components_en: string[];
  logic_vi: string[];
  logic_en: string[];
  skills_vi: string[];
  skills_en: string[];
  imageSrc?: string;
  imageAlt_vi?: string;
  imageAlt_en?: string;
}
```

Required: `id`, all `title_*`, `description_*`, arrays min length 1.

PRD: `project-smart-bin`, `project-parking-warning`.

### 3.4 `FAQItem`

```ts
export interface FAQItem {
  id: string;
  question_vi: string;
  question_en: string;
  answer_vi: string;
  answer_en: string;
}
```

Minimum **7** items — questions listed in PRD § FAQ.

### 3.5 `ExperienceLevel` + Registration

```ts
export type ExperienceLevel = "none" | "scratch" | "arduino" | "other";
```

#### Config (`CourseRegistrationConfig`)

```ts
export interface CourseRegistrationConfig {
  title_vi: string;
  title_en: string;
  subtitle_vi: string;
  subtitle_en: string;
  submitLabel_vi: string;
  submitLabel_en: string;
  successMessage_vi: string;
  successMessage_en: string;
  googleFormLinks: { vi: string; en: string };
  messengerUrl?: string;
  fieldLabels: {
    parentName_vi: string;
    parentName_en: string;
    phone_vi: string;
    phone_en: string;
    email_vi: string;
    email_en: string;
    studentName_vi: string;
    studentName_en: string;
    age_vi: string;
    age_en: string;
    experience_vi: string;
    experience_en: string;
    note_vi: string;
    note_en: string;
  };
  experienceOptions: Array<{
    value: ExperienceLevel;
    label_vi: string;
    label_en: string;
  }>;
}
```

Mirror structure of `googleFormLinks` in `src/data/sponsorPage.ts` (lines 165–168).

#### Payload (`RegistrationFormPayload`) — chỉ khi inline form

```ts
export interface RegistrationFormPayload {
  parentName: string;
  phone: string;
  email?: string;
  studentName?: string;
  age: number;
  experience: ExperienceLevel;
  note?: string;
  locale: "vi" | "en";
}
```

### 3.6 Card / section blobs

Pain points, outcomes, method steps — mirror `MissionItem` / `whySponsorCards` style:

```ts
export interface CourseCard {
  id: string;
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
  icon?: string; // lucide name, map in component
}
```

---

## 4. Validation Rules

### Inline form (if implemented)

| Field | Rule |
|-------|------|
| `parentName` | trim, length ≥ 2 |
| `phone` | trim, length ≥ 9, `/^[\d\s+\-()]+$/` |
| `email` | optional; if set: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` (same as `ContactForm.tsx` L38–40) |
| `studentName` | optional, max 100 |
| `age` | integer 6–15 |
| `experience` | enum member |
| `note` | optional, max 500 |

Submit disabled until required valid — pattern `ContactForm` `isFormValid`.

### Google Form path

No client validation — URL must be non-empty in data before launch.

---

## 5. Example Data

### Lesson excerpt

```ts
// src/data/courseCurriculum.ts
export const courseLessons: Lesson[] = [
  {
    id: "lesson-01",
    number: 1,
    part: "scratch",
    title_vi: "Làm quen Scratch",
    title_en: "Introduction to Scratch",
    goal_vi: "Làm quen giao diện, sprite, sân khấu, sự kiện.",
    goal_en: "Learn interface, sprites, stage, and events.",
    product_vi: "Nhân vật di chuyển khi nhấn phím.",
    product_en: "Character moves on key press.",
    primaryLevel_vi: "Kéo khối di chuyển.",
    primaryLevel_en: "Drag motion blocks.",
    secondaryLevel_vi: "Giải thích thứ tự lệnh.",
    secondaryLevel_en: "Explain command order.",
  },
  // ... lesson-02 .. lesson-12
];
```

### Registration config

```ts
// src/data/courseRegistration.ts
export const courseRegistrationConfig: CourseRegistrationConfig = {
  title_vi: "Đăng ký khóa học",
  title_en: "Course registration",
  subtitle_vi: "Điền form — chúng tôi liên hệ sớm nhất có thể.",
  subtitle_en: "Submit — we will contact you as soon as possible.",
  submitLabel_vi: "Gửi đăng ký khóa học",
  submitLabel_en: "Submit course registration",
  successMessage_vi: "Đã gửi! Cảm ơn bạn.",
  successMessage_en: "Submitted! Thank you.",
  googleFormLinks: {
    vi: "https://docs.google.com/forms/d/e/PLACEHOLDER/viewform",
    en: "https://docs.google.com/forms/d/e/PLACEHOLDER/viewform",
  },
  messengerUrl: "https://m.me/roboticssocson",
  fieldLabels: { /* ... */ },
  experienceOptions: [
    { value: "none", label_vi: "Chưa học", label_en: "No experience" },
    { value: "scratch", label_vi: "Đã học Scratch", label_en: "Knows Scratch" },
    { value: "arduino", label_vi: "Đã học Arduino", label_en: "Knows Arduino" },
    { value: "other", label_vi: "Khác", label_en: "Other" },
  ],
};
```

---

## 6. Timeline Component Mapping (optional)

Existing `Timeline` (`src/components/shared/Timeline.tsx`) expects:

```ts
{ year: string; title: string; description?: string; status?: "planned" | "done" }
```

Map lesson → timeline item:

```ts
{
  year: `Buổi ${lesson.number}`,
  title: getField(lesson, "title"),
  description: getField(lesson, "goal"),
  status: "done",
}
```

---

## 7. Content Sources

| Priority | Source |
|----------|--------|
| 1 | `docs/course/PRD.md` |
| 2 | `.planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md` |
| 3 | Raw curriculum markdown (verify path on disk) |
| 4 | `src/data/course*.ts` after implementation — **runtime truth** |

---

## 8. Open Items

| ID | Item | Action |
|----|------|--------|
| D1 | Google Form URLs | Replace PLACEHOLDER before launch |
| D2 | Full 12-lesson copy | Curriculum author |
| D3 | `/Images/Course/*` assets | Design + `check:assets` |
| D4 | Teaser position on homepage | Product sign-off |
