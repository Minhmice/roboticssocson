# 01 — Brand guide cho social

Quy chuẩn chung để mọi poster và video nhìn như cùng một đội làm ra. Lấy từ `DESIGN.md` của website: nền giấy trắng, viền xám thép, xanh kỹ thuật là màu nhấn duy nhất.

## Màu

| Tên | Mã | Dùng cho |
|---|---|---|
| Paper White | `#ffffff` | Nền chính |
| Cool Surface | `#f8fafc` | Nền khối phụ, thẻ thông tin |
| Tech Blue | `#2563eb` | Số tiền, nút, thanh tiến độ, highlight **1 thứ/ảnh** |
| Ink Text | `#0f172a` | Tiêu đề |
| Ink Body | `#1e293b` | Chữ thường |
| Steel Border | `#e2e8f0` | Viền thẻ, đường kẻ |
| Muted Label | `#64748b` | Chú thích nhỏ, nguồn |
| Accent Wash | `#eff6ff` | Nền ô số tiền |

**Không dùng:** nền đen toàn ảnh, neon, cyan, chữ gradient, quá 1 màu nhấn.
**Ngoại lệ:** ảnh chân dung thành viên dùng nền đen (theo bộ ảnh team trên web), đặt trong khung trắng.

## Chữ

- **Một font duy nhất: Inter** (có sẵn trên Canva).
- Tiêu đề: Inter Black (900), cỡ 96–140px trên ảnh 1080px.
- Tiêu đề phụ: Inter Bold (700), 48–64px.
- Thân: Inter Regular/Medium, 32–40px. Trên ảnh không viết quá 25 chữ.
- Số tiền: Inter Black, màu Tech Blue, dùng dấu chấm ngăn nghìn (`33.975.000 ₫`).

## Khung chuẩn (1080×1350, dọc 4:5)

```
┌──────────────────────────────┐ ← lề 64px
│ [logo RBS]        FTC #39256 │ ← thanh trên, cao 96px
│                              │
│  TIÊU ĐỀ LỚN                 │
│  tiêu đề phụ                 │
│                              │
│  ┌────────────────────────┐  │
│  │      ẢNH / HÌNH CHÍNH  │  │ ← bo góc 24px, viền #e2e8f0
│  └────────────────────────┘  │
│                              │
│  ┌──────────┐  ┌──────────┐  │
│  │ SỐ TIỀN  │  │    QR    │  │ ← QR tối thiểu 260×260px
│  └──────────┘  └──────────┘  │
│ BUILD THE NEXT ROBOT · /support │ ← chân trang, chữ #64748b
└──────────────────────────────┘
```

- Logo: `public/Logo/RBS Logo.svg` (góc trên trái, cao 64px).
- Góc trên phải ghi `FTC #39256`.
- Chân trang ghi `BUILD THE NEXT ROBOT · roboticssocson.com/support`.
- Không dùng logo FIRST một mình. Nếu cần nhắc đến, viết chữ "FIRST® Tech Challenge" thay vì chèn logo (xem [../10-support-thanh-toan-phap-ly.md](../10-support-thanh-toan-phap-ly.md) §6).

## Kích thước

| Loại | Kích thước | Ghi chú |
|---|---|---|
| Bài feed / carousel | 1080×1350 | Mặc định |
| Story / Reels / TikTok | 1080×1920 | Chừa 250px trên và 350px dưới cho giao diện app |
| Ảnh bìa Facebook | 1640×624 | Vùng an toàn giữa 1200×500 |
| Avatar khung | 1080×1080 | Hình tròn |
| In A3 | 297×420mm, 300dpi | Thêm lề cắt 3mm |

## Kho ảnh sẵn có (trong repo website)

| Cần | Lấy ở đâu |
|---|---|
| Logo CLB | `public/Logo/RBS Logo.svg` |
| Ảnh thành viên (nền đen) | `public/Images/Teams/*.webp` |
| Ảnh VRC 2023 | `public/Images/Achievements/VRC/` |
| Ảnh VORC 2024 | `public/Images/Achievements/VORC/` |
| Ảnh FTC 2024–2025 | `public/Images/Achievements/FTC 2024-2025/` |
| Ảnh Motions In Fire 2025 | `public/Images/Achievements/Motion Fire/` |
| Ảnh hoạt động / outreach | `public/Images/Mission/` |
| Ảnh trường | `public/Images/About SocSonHighschool/` |

Ảnh linh kiện (Control Hub, Viper Slide, pin, motor) **chưa có**. Hai cách:
1. Chụp linh kiện cùng loại mà đội đang có (motor, bánh, pin cũ).
2. Dùng ảnh sản phẩm từ revrobotics.com / gobilda.com, ghi nguồn nhỏ ở chân ảnh ("Ảnh: REV Robotics").

## Hashtag cố định

`#RoboticsSocSon #FTC39256 #BuildTheNextRobot #BIOBUZZ #FIRSTTechChallenge`

Thêm 1–2 tag theo bài: `#ChuyenLinhKien` `#MakerDay` `#STEMVietnam`.
