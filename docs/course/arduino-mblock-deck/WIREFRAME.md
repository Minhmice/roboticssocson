# Wireframe: Arduino & mBlock Robotics Deck

**Route (wireframe):** `/course/arduino-mblock-deck`  
**Format:** Single-page, PPTX-style presentation (~30 slides)  
**Interaction:** Left/right only — no hover-dependent UI  
**Status:** Production deck shipped (`DeckPlayer` + `arduinoMblockDeck.ts`)

---

## Interaction model

| Zone | Action |
|------|--------|
| Left 18% of viewport | Previous slide (click/tap) |
| Right 18% of viewport | Next slide (click/tap) |
| Keyboard `←` / `→` | Previous / next slide |
| Bottom bar | Slide index `n / 30` + progress fill |
| Top-right | Exit link → `/course` |

**Explicitly excluded in wireframe:** hover previews, tooltip reveals, auto-advance carousel, swipe-only without click zones.

---

## Viewport layout (all slides)

```
┌─────────────────────────────────────────────────────────────┐
│ [WIREFRAME]  Arduino & mBlock Deck          12 / 30  [Exit] │
├─────────────────────────────────────────────────────────────┤
│◀│                                                         │▶│
│ │              SLIDE CANVAS (16:9 safe area)              │ │
│ │                                                         │ │
│ │   [ section label ]                                     │ │
│ │   Title                                                 │ │
│ │   · bullet / diagram / media placeholder                │ │
│ │                                                         │ │
│◀│                                                         │▶│
├─────────────────────────────────────────────────────────────┤
│ ████████████░░░░░░░░░░░░░░░░░░  Tap left or right         │
└─────────────────────────────────────────────────────────────┘
```

- **Tap zones** are invisible overlays (dashed border only in wireframe mode).
- **Slide canvas** max-width ~1200px, centered, min-height `calc(100vh - header - footer)`.
- **Safe area** keeps text inside 65–75ch for body blocks.

---

## Slide map (30)

| # | Layout | Section | Title |
|---|--------|---------|-------|
| 1 | title | — | Arduino & mBlock trong Robotics |
| 2 | section | Phần 1 | Thông tin cơ bản |
| 3 | headline-bullets | 1.1 | Arduino — "Bộ não" và "Hệ thần kinh" |
| 4 | headline-bullets | 1.1 | Vai trò trung tâm |
| 5 | two-column | 1.1 | Kết nối phần cứng Robot |
| 6 | grid-4 | 1.1 | Hệ thống cảm biến |
| 7 | grid-3 | 1.1 | Cơ cấu chấp hành |
| 8 | section | 1.2 | mBlock — "Tư duy" và "Hành vi" |
| 9 | headline-bullets | 1.2 | Vai trò phần mềm |
| 10 | diagram | 1.2 | Ví dụ hành vi robot |
| 11 | headline-bullets | 1.2 | Thư viện Robotics chuyên dụng |
| 12 | grid-3 | 1.2 | Hệ sinh thái robot giáo dục |
| 13 | section | Phần 2 | Ưu điểm giảng dạy |
| 14 | split-media | 2.1 | Arduino — Tùy biến cơ khí |
| 15 | headline-bullets | 2.1 | Tiếp cận cơ điện tử thực tế |
| 16 | section | 2.2 | mBlock — Đơn giản hóa thuật toán |
| 17 | diagram | 2.2 | Lập trình bằng khối hình |
| 18 | two-column | 2.2 | Cầu nối lên C++ |
| 19 | section | Phần 3 | Bổ trợ qua lại |
| 20 | diagram | 3 | Ba trụ cột robot |
| 21 | diagram | 3 | Vòng lặp thời gian thực |
| 22 | headline-bullets | 3 | Tích hợp AI & IoT |
| 23 | example | 3 | Nhận diện khuôn mặt |
| 24 | example | 3 | Điều khiển giọng nói |
| 25 | section | Phần 4 | Tại sao hoàn hảo cho trẻ em |
| 26 | split-media | 4 | Học qua hành động |
| 27 | two-column | 4 | Debugging thực tế |
| 28 | headline-bullets | 4 | Chuẩn bị sân chơi công nghệ |
| 29 | summary | — | Tóm tắt |
| 30 | closing | — | Từ Khối Lệnh Đến Phần Cứng |

---

## Layout templates (wireframe blocks)

### `title` (slide 1)
- Full-bleed media placeholder top 55%
- Centered title + subtitle below
- Footer: team mark

### `section` (2, 8, 13, 16, 19, 25)
- Large section number label
- Single headline, optional subtitle
- No bullets — breathing room for chapter breaks

### `headline-bullets`
- Section chip (top-left)
- H2 title
- 2–4 bullet lines
- Optional right or bottom media placeholder

### `two-column`
- Title row
- 50/50 columns with dashed boxes + label headers

### `grid-4` / `grid-3`
- Title + icon/photo placeholders in responsive grid

### `diagram`
- Monospace vertical flow in center box
- Optional side media

### `split-media`
- Text left 45% / media placeholder right 55%

### `example`
- Case-study card with flow arrow placeholder

### `summary` / `closing`
- 3-bullet recap or CTA placeholder

---

## Content coverage checklist

- [x] §1.1 Arduino role, sensors, actuators
- [x] §1.2 mBlock role, extensions, mBot ecosystem
- [x] §2.1 Hardware DIY + mechatronics
- [x] §2.2 Block logic + C++ bridge
- [x] §3 Synergy, real-time loop, AI face + voice
- [x] §4 Kids: hands-on, debugging, competitions
- [x] Closing tie-in to course brand

---

## Next steps (post-wireframe)

1. Replace dashed placeholders with real photos/diagrams
2. Add EN locale via `_vi` / `_en` data fields
3. Optional: fullscreen mode hiding site chrome
4. Optional: export PDF / presenter notes panel
