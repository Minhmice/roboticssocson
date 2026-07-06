# Phase 6: Marketing copy integration — Discussion Log

> **Audit trail only.** Decisions are in `06-CONTEXT.md`.

**Date:** 2026-07-06
**Phase:** 06-marketing-copy-integration-parent-facing-screen-time-narrati
**Areas discussed:** Giọng văn, Hero & CTA, Problem/Solution/Outcomes, Offer, FAQ, Homepage teaser

---

## Giọng văn & mức sales

| Option | Description | Selected |
|--------|-------------|----------|
| STEM làm mềm | Hook phụ huynh, bỏ slang sales mạnh | ✓ |
| Phụ huynh trực diện | Dopamine/variable reward, không brainrot | |
| Sales đầy đủ | Giữ hack, 1%, urgency mạnh | |

**Follow-ups:**
- Khoa học: **Khoa học nhẹ** (dopamine, variable reward — không claim y khoa cứng)
- Song ngữ: **Cả hai locale làm mềm**
- FOMO: **Urgency nhẹ** — không 1% vs 99%

---

## Hero & CTA

| Decision | Choice |
|----------|--------|
| Headline | **Dual** — H1 tên khóa + hook phụ huynh ở subtitle |
| Primary CTA | **Xem lộ trình** → `#course-curriculum` |
| Visual | **Aurora only** — không ảnh Phase 6 |
| Secondary CTA | **Đăng ký tư vấn** → `#course-register` |

---

## Problem & Solution

| Decision | Choice |
|----------|--------|
| Problem cards | **Giữ 3 STEM + card 4** màn hình thụ động |
| Problem prose | **Prose ngắn** (~3–4 câu) dưới cards |
| Solution | **Prose trước + giữ 5 cards** |
| Outcomes | **Refresh nhẹ** + emphasis tập trung sâu |

---

## Offer & scarcity

| Decision | Choice |
|----------|--------|
| Publish offer | **Chỉ khi team xác nhận** offer thật |
| Placement | **Band trước Register** (sau FAQ) |
| Data model | **`enabled` flag** trong config |
| Offer CTA | **Scroll `#course-register`** |

---

## FAQ

| Decision | Choice |
|----------|--------|
| Strategy | **Replace** — không append-only |
| Which to keep | **Core STEM** + swap arduino → chi phí linh kiện |
| Free trial FAQ | **Align đăng ký tư vấn** |
| Total count | **~8–10 items** |

---

## Homepage teaser

| Decision | Choice |
|----------|--------|
| Hook | **Subtitle hook** — headline journey giữ nguyên |
| Tone | **Match /course** soft STEM |
| CTA | **Giữ "Xem khóa học"** → `/course` |
| Data | **`courseTeaser.ts`** |

---

## Agent discretion

- Exact prose wording within tone rules
- Icon for 4th problem card
- Minor FAQ trim if over ~10 items

## Deferred Ideas

- Hero photography split layout
- Long collapsible neuroscience copy
- Homepage secondary register CTA
