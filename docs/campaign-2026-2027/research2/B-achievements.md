# BÁO CÁO NGHIÊN CỨU THÀNH TÍCH CLB ROBOTICS SÓC SƠN (B-ACHIEVEMENTS)

**Ngày tra cứu & kiểm chứng:** 29/10/2026  
**Đơn vị thực hiện:** Agent `ResAchievements`  
**Phương pháp:** Kiểm chứng độc lập nguồn mở (OSINT), đọc trực tiếp trang web báo chí chính thống, hệ thống FIRST/FTC Scout/Robolyst và giải mã trực tiếp 28 tệp hình ảnh lưu trữ tại `public/Images/Achievements/**`.  
**Quy ước nhãn:**
- `[ĐÃ MỞ]`: Nguồn/ảnh/trang đã được mở và đọc trực tiếp nội dung trong phiên làm việc ngày 29/10/2026.
- `[SUY LUẬN]`: Kết luận được suy luận logic từ dữ kiện có căn cứ, không phải khẳng định trực tiếp từ câu chữ của một nguồn đơn lẻ.
- `Không tìm thấy`: Nội dung không tìm thấy nguồn kiểm chứng công khai kèm danh sách các câu lệnh truy vấn/đường link đã thử.

---

## 1. VIETNAM ROBOTICS CHALLENGE (VRC) 2023

### 1.1. Bảng đối chiếu: Tuyên bố trong Repo vs Nguồn kiểm chứng thực tế

| Tiêu chí | Tuyên bố trong Repo | Nguồn thực tế xác minh | Nguồn trích dẫn (URL / Repo line) | Ngày mở | Nhãn |
|---|---|---|---|---|---|
| **Thời gian & Địa điểm** | 2023–2024 (`src/data/achievements.ts:36`); hoặc 15–16/07/2023 tại ĐH FPT Hòa Lạc (`docs/ho-so-clb.md:51`) | **15–16/07/2023** tại Khuôn viên Đại học FPT Hà Nội (Khu CNC Hòa Lạc, Thạch Thất, Hà Nội). Năm học 2022–2023 (không phải 2023–2024) | Ảnh gốc backdrop `public/Images/Achievements/VRC/IMG_0663.webp`, `IMG_0665.webp` ghi: *"15TH - 16TH JULY, 2023 - FPT UNIVERSITY HOA LAC CAMPUS"* | 29/10/2026 | `[ĐÃ MỞ]` |
| **Đơn vị tổ chức** | Trường Đại học FPT (`docs/old project/Thành tích.md:2`) | **Tổ chức Giáo dục FPT (FPT Education / Trường Đại học FPT)** phối hợp cùng **Hội đồng chuyên môn Maker Việt (MAKER VIỆT Professional Council)** | Ảnh gốc backdrop `IMG_0663.webp` & logo trên biển giải thưởng | 29/10/2026 | `[ĐÃ MỞ]` |
| **Chủ đề cuộc thi** | "Zero Carbon" (`src/data/achievements.ts:42`) | **"ZERO CARBON"** (hướng đến mục tiêu giảm thiểu tích tụ CO₂ khí quyển và Net Zero) | Ảnh gốc backdrop `IMG_0663.webp`, `IMG_0665.webp`; `src/data/achievements.ts:42` | 29/10/2026 | `[ĐÃ MỞ]` |
| **Thứ hạng toàn quốc** | "Top 4 toàn quốc" (`src/data/achievements.ts:37`); "Hạng 4" (`docs/campaign-2026-2027/03-thanh-tich-chuan-hoa.md:13`) | **Hạng 4 Toàn quốc (Top 4)**. Báo Giáo dục & Thời đại ghi nhận đội tuyển THPT Sóc Sơn đạt Hạng 4; Báo Thanh Niên ghi nhận đội tuyển giành Top 4 toàn quốc | - Báo GD&TĐ (06/10/2023): `https://giaoducthoidai.vn/nam-sinh-thpt-soc-son-mang-chung-ket-olympia-ve-ha-noi-post656583.html`<br>- Báo Thanh Niên (08/10/2023): `https://thanhnien.vn/dang-chung-ket-duong-len-dinh-olympia-2023-giai-thuong-50000-usd-se-thuoc-ve-ai-185231007195558848.htm` | 29/10/2026 | `[ĐÃ MỞ]` |
| **Tên giải thưởng chính thức** | "Top 4 toàn quốc" (không nêu tên giải thưởng trên kỷ niệm chương) | **"BEST RUNNER"** (kèm tiền thưởng 2.500.000 VNĐ) và **"FPT UNIVERSITY AWARD - 10% SCHOLARSHIP"** | Ảnh biển giải thưởng tại `IMG_0663.webp`, `IMG_0664.webp`, `IMG_0665.webp`: Biển ghi rõ *"BEST RUNNER - TOTAL: 2,500,000 VND"* và *"FPT UNIVERSITY AWARD - 10% SCHOLARSHIP FOR ACHIEVING BEST RUNNER PRIZE IN THE VIETNAM ROBOTICS CHALLENGE 2023 COMPETITION"* | 29/10/2026 | `[ĐÃ MỞ]` |
| **Quy mô số đội tham gia** | "66 đội" (`src/data/achievements.ts:46`, `docs/old project/Thành tích.md:2`) | Trang FIRST Global ghi VRC tiếp cận hơn 490 học sinh, 100 giáo viên với sự tham gia của **70 đội THPT toàn quốc**. Không có bài báo nào công bố độc lập số "66 đội" (đây là số liệu nội bộ) | - FIRST Global Team Vietnam 2023 Profile: `https://first.global/2023-nations/vietnam-2023/`<br>- `src/data/achievements.ts:46` | 29/10/2026 | `[ĐÃ MỞ]` (FIRST Global); `[SUY LUẬN]` (số 66 đội là số đăng ký thi đấu thực tế vòng chung kết) |
| **Đội trưởng & Nhân sự thi đấu** | Chưa có danh sách thành viên cụ thể trong `achievements.ts` | - Đội trưởng: **Mai Tuấn Kiệt** (thẻ đeo ghi rõ: *CAPTAIN - MAI TUAN KIET - ROBOTICS SOC SON - SOC SON HIGH SCHOOL*).<br>- Lập trình chính: **Nguyễn Việt Thành** (Báo Thanh Niên xác nhận). | - Thẻ đeo trong ảnh `IMG_0526.webp`<br>- Báo Thanh Niên (08/10/2023) | 29/10/2026 | `[ĐÃ MỞ]` |

### 1.2. Phân tích chi tiết về Giải "Best Runner" và Học bổng FPT
- Tấm biển giải thưởng trao ngày 16/07/2023 xác nhận cơ cấu giải thưởng của VRC 2023: Sau các vị trí Top 3 (Quán quân, Á quân, Quý quân), đội xếp vị trí thứ 4 (Hạng 4) được Ban tổ chức trao danh hiệu **"BEST RUNNER"** kèm giải thưởng tiền mặt **2.500.000 VNĐ**.
- Đi kèm với danh hiệu "Best Runner", Trường Đại học FPT trao tặng suất học bổng mang tên **"FPT UNIVERSITY AWARD - 10% SCHOLARSHIP"** (học bổng 10% học phí toàn khóa tại Trường Đại học FPT dành cho các thành viên đội đạt giải).

### 1.3. Mục "Không tìm thấy" (VRC 2023)
- **Không tìm thấy:** Bảng thông cáo báo chí chính thức liệt kê toàn bộ danh sách các đội đạt giải Quán quân, Á quân, Quý quân của giải VRC 2023 trên cổng thông tin Đại học FPT hoặc báo chí đại chúng.
- **Các truy vấn & URL đã thử:**
  - `site:daihoc.fpt.edu.vn "Vietnam Robotics Challenge" "2023"`
  - `site:fpt.edu.vn "Vietnam Robotics Challenge" "2023" "Zero Carbon"`
  - `"Vietnam Robotics Challenge 2023" "Quán quân" OR "giải Nhất" OR "vô địch"`
  - `"Vietnam Robotics Challenge 2023" "Zero Carbon" ("Đại học FPT" OR "Hòa Lạc") trao giải "Best Runner"`
  - `https://daihoc.fpt.edu.vn/tin-tuc-su-kien/`

---

## 2. VIETNAM OPEN ROBOTICS CHALLENGE (VORC) 2024 (MÃ ĐỘI: VORC24010)

### 2.1. Bảng đối chiếu: Tuyên bố trong Repo vs Nguồn kiểm chứng thực tế

| Tiêu chí | Tuyên bố trong Repo | Nguồn thực tế xác minh | Nguồn trích dẫn (URL / Repo line) | Ngày mở | Nhãn |
|---|---|---|---|---|---|
| **Tên giải & Mã đội** | Vietnam Open Robotics Challenge 2024; mã **VORC24010** (`03-thanh-tich-chuan-hoa.md:14`) | **VIETNAM OPEN ROBOTICS CHALLENGE 2024** (VORC 2024); mã đội chính thức: **VORC24010** | Poster kết quả BTC tại `public/Images/Achievements/VORC/Image (1).webp` | 29/10/2026 | `[ĐÃ MỞ]` |
| **Đơn vị tổ chức & Đối tác** | ĐH FPT (`docs/old project/Thành tích.md:8`) | - Đơn vị tổ chức: **Trường Đại học FPT (FPT University / FPT Education)**<br>- Đối tác kỹ thuật: **MAKER VIỆT**<br>- Đối tác cộng đồng: **VIET NAM STEAM UNION** và **TEAM VIETNAM** | Logo & tên trên Infographic công bố kết quả VORC 2024 (`Image (1).webp`) | 29/10/2026 | `[ĐÃ MỞ]` |
| **Thứ hạng: Có đạt Top 8 không?** | "Top 8 toàn quốc" (`src/data/achievements.ts:63`) | **CÓ! ĐẠT TOP 8 TOÀN QUỐC.** Xếp Hạng 8/8 đội xuất sắc nhất Vòng Thử thách để giành vé vào Vòng Tứ kết (Playoff) | Infographic chính thức của BTC: *"CÔNG BỐ KẾT QUẢ VÒNG THỬ THÁCH"* (`Image (1).webp`) | 29/10/2026 | `[ĐÃ MỞ]` |
| **Sai lệch năm trong web** | Ghi "2024–2025" (`src/data/achievements.ts:62`) | Giải diễn ra trong năm dương lịch **2024** (không phải mùa giải vắt năm 2024–2025) | Infographic & Poster VORC 2024 (`Image (1).webp`, `Image (2).webp`) | 29/10/2026 | `[ĐÃ MỞ]` |

### 2.2. Danh sách đầy đủ các đội vượt qua Vòng thử thách (Top 8 VORC 2024)
Căn cứ theo công bố chính thức của Ban tổ chức trên Infographic `public/Images/Achievements/VORC/Image (1).webp`:

| Hạng vòng loại | Mã số đội | Tên đội thi | Trường THPT / Đơn vị | Tỉnh / Thành phố |
|:---:|:---:|---|---|---|
| **1** | VORC24022 | STEAM GIA THIỀU | THPT Nguyễn Gia Thiều | Hà Nội |
| **2** | VORC24030 | THAIPHIEN OPEN STEAM | THPT Thái Phiên | Hải Phòng |
| **3** | VORC24094 | AGT | THPT Sơn Tây | Hà Nội |
| **4** | VORC24092 | ADUDU | THPT Chuyên Đại học Sư phạm | Hà Nội |
| **5** | VORC24089 | STEAM BÌNH LONG | THPT TX Bình Long | Bình Phước |
| **6** | VORC24071 | MECHA PLATYPUS | THPT Chuyên Lê Quý Đôn | Đà Nẵng |
| **7** | VORC24047 | TPCIRCLE ROBOTIC TEAM | THPT Chuyên Trần Phú | Hải Phòng |
| **8** | **VORC24010** | **ROBOTICS SÓC SƠN** | **THPT Sóc Sơn** | **Hà Nội** |

**Các giải thưởng chuyên môn được công bố cùng đợt:**
- **Social Media Award:** Đội VORC24021 – CATAPHRACT - FASRIC (Trường TH, THCS & THPT FPT Đà Nẵng).
- **Engineering Award:** Đội VORC24048 – ARES 2 (THPT Chuyên Vĩnh Phúc).
- **Engineering Award:** Đội VORC24086 – GEARHEADS (THPT Tùng Thiện, Hà Nội).

### 2.3. Mục "Không tìm thấy" (VORC 2024)
- **Không tìm thấy:** Bảng điểm số chi tiết từng trận của Vòng đối kháng Tứ kết Top 8 trên web công khai do tên miền giải đấu cũ `ftc.io.vn/faqs` trả về mã lỗi HTTP 404.
- **Các URL & truy vấn đã thử:**
  - `https://ftc.io.vn/faqs` (HTTP 404)
  - `https://ftc.io.vn/2324/index.html` (HTTP 404)
  - `"VORC 2024" OR "Vietnam Open Robotics Challenge 2024" "VORC24010"`
  - `"VORC" "2024" ("THPT Sóc Sơn" OR "Robotics Sóc Sơn" OR "VORC24010")`

---

## 3. MOTIONS IN FIRE 2025 (STEAMESE FESTIVAL 2025)

### 3.1. Bảng đối chiếu: Tuyên bố trong Repo vs Nguồn kiểm chứng thực tế

| Tiêu chí | Tuyên bố trong Repo | Nguồn thực tế xác minh | Nguồn trích dẫn (URL / Repo line) | Ngày mở | Nhãn |
|---|---|---|---|---|---|
| **Sự kiện & Thời gian** | 19/10/2025 tại ĐH Bách Khoa Hà Nội (`src/data/achievements.ts:137, 143`) | **19/10/2025** trong khuôn khổ **STEAMese Festival 2025 - AI for All** tại Đại học Bách Khoa Hà Nội (Trạm 2: *AI in Motions: Motions In Fire*) | - Cổng thông tin STEAM for Vietnam: `https://steamforvietnam.org/steamese-festival2025`<br>- Ảnh màn hình LED sân khấu chính: `public/Images/Achievements/Motion Fire/Image (1).webp`, `Image (5).webp` | 29/10/2026 | `[ĐÃ MỞ]` |
| **Đơn vị tổ chức** | ĐHBK Hà Nội, STEAM for Vietnam, UNICEF Việt Nam, ĐSQ Hoa Kỳ (`src/data/achievements.ts:143`) | **STEAM for Vietnam, Đại học Bách Khoa Hà Nội, UNICEF Việt Nam (kỷ niệm 50 năm) và Phái đoàn Ngoại giao Hoa Kỳ tại Việt Nam (U.S. Embassy & Consulate)** | Logo & văn bản chính thức trên màn hình LED sân khấu (`Image (1).webp`, `Image (5).webp`) | 29/10/2026 | `[ĐÃ MỞ]` |
| **Đặc thù kỹ thuật** | Giao hữu robotics mở vật liệu mô phỏng National Robotics Competition | Thi đấu Giao hữu Robotics mở vật liệu trên sa bàn có gờ nổi và bóng lỗ pickleball/wiffleball | Màn hình LED `Image (1).webp` & ảnh thực địa sân thi đấu `Image (4).webp` | 29/10/2026 | `[ĐÃ MỞ]` |
| **Kết quả Á quân (Runner-up)** | "Á quân chung cuộc" (`src/data/achievements.ts:138`) | **XÁC NHẬN: Á QUÂN (FIRST RUNNER-UP).** Màn hình LED ghi rõ logo "robotics socson" và danh hiệu *"Motions in Fire - First Runner-Up"*. Đội nhận bảng giải, hoa và phần thưởng laptop ThinkPad do UNICEF đồng tài trợ | Ảnh trao giải chính thức trên sân khấu: `public/Images/Achievements/Motion Fire/Image (5).webp` | 29/10/2026 | `[ĐÃ MỞ]` |
| **Kết quả Hạng 1 Vòng loại** | "Hạng 1 vòng loại" (`src/data/achievements.ts:138`, `docs/old project/Thành tích.md:10`) | Là thông tin tự khai nội bộ của CLB. Cổng thông tin `steamforvietnam.org` chỉ mô tả trạm thi đấu, không lưu trữ bảng điểm vòng loại công khai | `docs/old project/Thành tích.md:10`; `steamforvietnam.org/steamese-festival2025` | 29/10/2026 | `[SUY LUẬN]` (khớp với tiến trình thi đấu vào trận chung kết tranh giải Nhất/Nhì) |

### 3.2. Chi tiết Lễ trao giải Motions In Fire 2025
- Căn cứ theo ảnh `public/Images/Achievements/Motion Fire/Image (1).webp` và `Image (5).webp`:
  - **Trận chung kết & Trao giải:** Có 2 đội bước lên bục vinh quang cao nhất:
    - **First Prize Winner (Vô địch / Giải Nhất):** Đội thi mặc đồng phục áo polo màu cam rực rỡ (`Image (1).webp`).
    - **First Runner-Up (Á quân / Giải Nhì):** Đội **Robotics Sóc Sơn** (`Image (5).webp`), màn hình LED hiện logo chính thức của CLB "robotics socson", tên danh hiệu "First Runner-Up", các thành viên mặc đồng phục sơ mi trắng THPT đứng cùng cô giáo phụ trách áo dài cam và thầy giáo áo sơ mi trắng.

### 3.3. Mục "Không tìm thấy" (Motions In Fire 2025)
- **Không tìm thấy:** Bảng điểm số chi tiết từng trận vòng loại (Qualification Match Scores) của Motions In Fire 2025 trên website STEAM for Vietnam (do sự kiện giao hữu trong khuôn khổ Festival ngày hội không lập trang thống kê giải đấu chi tiết như VEX hay FIRST).
- **Các URL đã thử:**
  - `https://steamforvietnam.org/steamese-festival2025` [ĐÃ MỞ]
  - `https://www.steamforvietnam.org/blog/`

---

## 4. DỮ LIỆU THI ĐẤU FIRST TECH CHALLENGE (FTC) & GHI NHẬN BÁO CHÍ KHÁC

### 4.1. Bảng đối chiếu thành tích FIRST Tech Challenge qua 3 mùa giải

| Mùa giải | Mã số đội | Tên đăng ký | Thứ hạng vòng loại | Tỷ số (W-L-T) | Chỉ số OPR / Điểm cao nhất | Tình trạng giải thưởng | Nguồn xác thực | Nhãn |
|---|:---:|---|:---:|:---:|:---:|:---:|---|:---:|
| **2024–2025** (CENTERSTAGE / INTO THE DEEP) | **#28762** | Robotics Sóc Sơn | **Rank 11 / 33** | 3–3–0 (50% Win rate) | OPR 33.13; Điểm cao nhất: **226** (trận Q-24 thắng 226–45) | 0 giải thưởng phụ (0 awards) | Robolyst (`robolyst.org/team/ftc/28762`), FTC Scout API (`api.ftcscout.org/rest/v1/teams/28762/events/2024`) | `[ĐÃ MỞ]` |
| **2025–2026** (DECODE) | **#33518** | Robotics Sóc Sơn | **Rank 36 / 38** | 1–4–0 (20% Win rate) | OPR 25.76; Điểm cao nhất: **92** (trận Q-18 thắng 92–74) | 0 giải thưởng phụ (0 awards) | Robolyst (`robolyst.org/team/ftc/33518`), FTC Scout API (`api.ftcscout.org/rest/v1/teams/33518/events/2025`) | `[ĐÃ MỞ]` |
| **2026–2027** (BIOBUZZ™) | **#39256** | Robotics Soc Son (Soc Son High School) | Chưa thi đấu | 0–0–0 | Rookie Year 2026; Hồ sơ hoạt động đã kích hoạt | Đang chuẩn bị mùa giải | FTC Scout API (`api.ftcscout.org/rest/v1/teams/39256`), FIRST Event Web | `[ĐÃ MỞ]` |

### 4.2. Thẩm định độc lập về nhân vật Nguyễn Việt Thành

Căn cứ đối chiếu các bài báo chính thống và phóng sự truyền hình trực tiếp trận Chung kết Đường lên đỉnh Olympia năm thứ 23:

| Nội dung đối chiếu | Repo khai nhận | Nguồn báo chí / Truyền hình thực tế | Kết luận thẩm định |
|---|---|---|---|
| **Vai trò tại CLB Robotics** | "Đồng sáng lập CLB" (`docs/campaign-2026-2027/02-ke-hoach-tong-the.md:73`) | Báo GD&TĐ (06/10/2023) viết: *"Thành là một trong những người đầu tiên tham gia Câu lạc bộ Robotics nhà trường. Bên cạnh đó, Thành còn là quản lý 2 trang fanpage của trường là Olympia Sóc Sơn và Robotic Sóc Sơn."* | **KHÔNG CÓ CĂN CỨ GỌI LÀ ĐỒNG SÁNG LẬP.** Nguồn chỉ xác nhận Thành là "một trong những người đầu tiên tham gia" và quản lý fanpage. |
| **Vai trò kỹ thuật tại VRC 2023** | Thành viên đội thi (`docs/ho-so-clb.md:105`) | Báo Thanh Niên (08/10/2023) xác nhận: *"Việt Thành... là lập trình chính cho đội tuyển Robotics Sóc Sơn giành top 4 toàn quốc tại cuộc thi Viet Nam Robotics Challenge năm 2023."* | **XÁC THỰC CHÍNH XÁC:** Nguyễn Việt Thành là **Lập trình chính** của đội Robotics Sóc Sơn tại VRC 2023. |
| **Thứ hạng Chung kết Olympia 23** | "Á quân Olympia 23" (`docs/campaign-2026-2027/02-ke-hoach-tong-the.md:73`) | VTV.vn (08/10/2023), Tạp chí Giáo chức (09/10/2023) và Báo Thanh Niên (08/10/2023) tường thuật trực tiếp kết quả chung kết: Quán quân: Lê Xuân Mạnh (220 điểm); Giải Nhì (Á quân): Nguyễn Trọng Thành (200 điểm); **Đồng Giải Ba:** Nguyễn Việt Thành (110 điểm) và Nguyễn Minh Triết (90 điểm). | **TUYÊN BỐ "Á QUÂN OLYMPIA 23" LÀ HOÀN TOÀN SAI SỰ THẬT.** Nguyễn Việt Thành đạt **Giải Ba** toàn quốc Chung kết Đường lên đỉnh Olympia năm thứ 23 (nhận giải thưởng 100 triệu đồng). |

### 4.3. Danh mục bài báo chính thống ghi nhận CLB & Trường THPT Sóc Sơn
1. **Báo Giáo dục & Thời đại (Cơ quan ngôn luận của Bộ GD&ĐT), ngày 06/10/2023:**
   - *Tiêu đề:* "Nam sinh THPT Sóc Sơn mang chung kết Olympia về Hà Nội".
   - *URL:* `https://giaoducthoidai.vn/nam-sinh-thpt-soc-son-mang-chung-ket-olympia-ve-ha-noi-post656583.html` `[ĐÃ MỞ]`
   - *Nội dung:* Xác nhận CLB Robotics nhà trường, fanpage "Robotic Sóc Sơn", và thành tích đạt **Hạng 4 toàn quốc Cuộc thi Vietnam Robotics Challenge 2023**.
2. **Báo Thanh Niên, ngày 08/10/2023 (Bài 1 - trước giờ thi đấu):**
   - *Tiêu đề:* "Chung kết Đường lên đỉnh Olympia 2023, giải thưởng 50.000 USD sẽ thuộc về ai?".
   - *URL:* `https://thanhnien.vn/dang-chung-ket-duong-len-dinh-olympia-2023-giai-thuong-50000-usd-se-thuoc-ve-ai-185231007195558848.htm` `[ĐÃ MỞ]`
   - *Nội dung:* Xác nhận Nguyễn Việt Thành là *"lập trình chính cho đội tuyển Robotics Sóc Sơn giành top 4 toàn quốc tại cuộc thi Viet Nam Robotics Challenge năm 2023"*.
3. **Báo Thanh Niên, ngày 08/10/2023 (Bài 2 - phóng sự điểm cầu):**
   - *Tiêu đề:* "Tái hiện truyền thuyết Thánh Gióng, tiếp lửa 'nhà leo núi' Nguyễn Việt Thành".
   - *URL:* `https://thanhnien.vn/tai-hien-truyen-thuyet-thanh-giong-tiep-lua-nha-leo-nui-nguyen-viet-thanh-18523100808390912.htm` `[ĐÃ MỞ]`
   - *Nội dung:* Phóng sự trực tiếp không khí cổ vũ tại Khu di tích Quốc gia đặc biệt Đền Sóc của thầy cô, học sinh Trường THPT Sóc Sơn; không nhắc đến cuộc thi VRC.
4. **Báo Điện tử VTV (Đài Truyền hình Việt Nam), ngày 08/10/2023:**
   - *Tiêu đề:* "Chung kết Đường lên đỉnh Olympia 2023: Lê Xuân Mạnh giành vòng nguyệt quế".
   - *URL:* `https://vtv.vn/truyen-hinh/truc-tiep-chung-ket-duong-len-dinh-olympia-2023-20231007141706903.htm` `[ĐÃ MỞ]`
   - *Nội dung:* Công bố kết quả chính thức: Quán quân Lê Xuân Mạnh, Giải Nhì Nguyễn Trọng Thành, Giải Ba Nguyễn Việt Thành và Nguyễn Minh Triết.

---

## 5. BẢNG THẨM ĐỊNH CHI TIẾT 28 TỆP ẢNH THÀNH TÍCH (`public/Images/Achievements/**`)

Toàn bộ 28 tệp hình ảnh đã được giải mã và đọc trực tiếp nội dung thị giác ngày 29/10/2026. Bảng dưới đây đối chiếu chi tiết nội dung hiển thị thật sự trên ảnh so với chú thích gắn trong tệp `src/data/achievements.ts`:

| STT | Đường dẫn tệp ảnh | Nội dung thực tế hiển thị trên bức ảnh | Sự kiện / Mùa giải phù hợp | Có phải ảnh giải thưởng? | Chú thích hiện tại trong `achievements.ts` | Đánh giá tính chính xác & Ghi chú cờ (Flag) |
|:---:|---|---|:---:|:---:|:---:|---|
| **1** | `/Images/Achievements/VRC/IMG_0526.webp` | Cận cảnh robot VRC 2023: ốp tranh Starry Night, chổi quét bóng màu xanh, mạch MakerViet VIA. Học sinh đeo thẻ đeo: *CAPTAIN - MAI TUAN KIET - ROBOTICS SOC SON*. | VRC 2023 (15–16/07/2023) | Không | "Robot thi đấu" | **Đúng.** Thể hiện chi tiết cấu tạo cơ khí robot thi đấu. |
| **2** | `/Images/Achievements/VRC/IMG_0531.webp` | Tập thể đội thi Robotics Sóc Sơn mặc áo polo xanh đồng phục chụp ảnh kỷ niệm cùng cô phụ trách (áo vàng) trước backdrop ngoài trời VRC 2023 Zero Carbon tại ĐH FPT Hòa Lạc. | VRC 2023 (15–16/07/2023) | Không | "Đội thi" | **Đúng.** Ảnh lưu niệm tập thể đội thi. |
| **3** | `/Images/Achievements/VRC/IMG_0543.webp` | 4 thành viên đội thi ngồi tại sàn sảnh thi đấu FPT Hòa Lạc, tập trung căn chỉnh, siết ốc và sửa chữa cơ cấu robot trước giờ thi đấu. | VRC 2023 (15–16/07/2023) | Không | "Hoạt động" | **Đúng.** Hoạt động kỹ thuật / pit căn chỉnh robot. |
| **4** | `/Images/Achievements/VRC/IMG_0660.webp` | Đội thi chụp ảnh cùng cô phụ trách (áo vàng) và một thầy giáo (áo sơ mi trắng) trong sảnh nhà thi đấu ĐH FPT, robot đặt phía trước trên sàn. | VRC 2023 (15–16/07/2023) | Không | "Đội thi" | **Đúng.** Ảnh tập thể đội thi tại khu vực thi đấu. |
| **5** | `/Images/Achievements/VRC/IMG_0663.webp` | Cả đội cầm trên tay 2 tấm biển giải thưởng: *"BEST RUNNER - TOTAL 2,500,000 VND"* và *"FPT UNIVERSITY AWARD - 10% SCHOLARSHIP"*. Cô giáo cầm hoa, robot đặt phía trước. | VRC 2023 (15–16/07/2023) | **CÓ** | "Giải thưởng" | **Đúng.** Bằng chứng xác thực giải Best Runner & Học bổng FPT. |
| **6** | `/Images/Achievements/VRC/IMG_0664.webp` | Khoảnh khắc đội thi giơ cao 2 tấm biển giải thưởng Best Runner và Học bổng 10% ĐH FPT trong niềm vui chiến thắng. | VRC 2023 (15–16/07/2023) | **CÓ** | "Giải thưởng" | **Đúng.** Ảnh chụp nhận giải thưởng của đội. |
| **7** | `/Images/Achievements/VRC/IMG_0665.webp` | Đội thi nhận giải trên sân khấu chính có màn hình LED lớn ghi: *VIETNAM ROBOTICS CHALLENGE 2023 - ZERO CARBON - 15TH-16TH JULY 2023 - FPT UNIVERSITY HOA LAC CAMPUS*. Cầm 2 biển giải thưởng. | VRC 2023 (15–16/07/2023) | **CÓ** | "Giải thưởng" | **Đúng.** Lễ trao giải trên sân khấu chính thức của Ban tổ chức. |
| **8** | `/Images/Achievements/VRC/IMG_0688.webp` | Ảnh selfie cận cảnh của bạn nữ thành viên cùng toàn bộ đội thi vẫy tay, giơ hai biển giải thưởng Best Runner và Học bổng FPT ăn mừng sau lễ bế mạc. | VRC 2023 (15–16/07/2023) | **CÓ** | "Giải thưởng" | **Đúng.** Ảnh lưu niệm cùng biển giải thưởng. |
| **9** | `/Images/Achievements/VORC/Image (1).webp` | Infographic công bố chính thức của BTC VORC 2024: *"CÔNG BỐ KẾT QUẢ VÒNG THỬ THÁCH"*. Bảng xếp hạng 8 đội lọt vào vòng chung kết (Hạng 8: VORC24010 - ROBOTICS SÓC SƠN). | VORC 2024 | **CÓ** (Bảng kết quả / giải thưởng) | "Robot thi đấu" | **SAI CỜ (FLAG WRONG):** Đây là bảng Infographic công bố kết quả và giải thưởng của Ban tổ chức, không phải ảnh chụp robot thi đấu. Cần sửa thành *"Bảng kết quả Vòng thử thách VORC 2024"*. |
| **10** | `/Images/Achievements/VORC/Image (2).webp` | Poster đồ họa 3D chủ đề chính thức của giải đấu *VIETNAM OPEN ROBOTICS CHALLENGE 2024* (hình ảnh robot thợ lặn dưới đáy biển). | VORC 2024 | Không | "Đội thi" | **SAI NGHIÊM TRỌNG (FLAG WRONG):** Đây là poster chủ đề giải đấu của Ban tổ chức, hoàn toàn không có thành viên hay đội thi nào trong ảnh. Cần sửa thành *"Poster chủ đề VORC 2024"*. |
| **11** | `/Images/Achievements/VORC/Image (3).webp` | Bản vẽ kỹ thuật CAD 2D hình chiếu cạnh (side view) của robot: khung nhôm định hình, hệ bánh răng cưa nạp bóng phía trước, bánh xe đa hướng omni/con lăn. | Thiết kế CAD robot (VORC 2024 / VRC 2023) | Không | "Hoạt động" | **CHƯA CHÍNH XÁC (FLAG WRONG):** Đây là bản vẽ thiết kế kỹ thuật CAD 2D, không phải ảnh hoạt động sinh hoạt/ngoại khóa. Cần sửa thành *"Bản vẽ CAD thiết kế cơ cấu robot"*. |
| **12** | `/Images/Achievements/VORC/Image (4).webp` | Bản vẽ phối cảnh 3D CAD hoàn chỉnh của robot dạng hộp: khung nhôm định hình, băng tải răng cưa nạp bóng, máng trượt nghiêng, động cơ DC xanh. | Thiết kế CAD robot (VORC 2024 / VRC 2023) | Không | "Giải thưởng" | **SAI NGHIÊM TRỌNG (FLAG WRONG):** Bản vẽ phối cảnh 3D CAD bị chú thích nhầm thành "Giải thưởng". Cần sửa thành *"Mô hình phối cảnh 3D CAD robot"*. |
| **13** | `/Images/Achievements/VORC/Image (5).webp` | Bản vẽ kỹ thuật CAD 2D hình chiếu trước/sau (front/rear view) của robot, thấy rõ 2 động cơ DC đế bánh xe màu xanh. | Thiết kế CAD robot (VORC 2024 / VRC 2023) | Không | "Robot thi đấu" | **CHƯA CHÍNH XÁC (FLAG WRONG):** Đây là bản vẽ CAD kỹ thuật, không phải ảnh chụp robot thật đang thi đấu trên sân. Cần sửa thành *"Bản vẽ CAD hình chiếu khung gầm robot"*. |
| **14** | `/Images/Achievements/VORC/Image (6).webp` | Bản vẽ phối cảnh 3D CAD góc nhìn từ phía sau của robot dạng hộp, thể hiện khoang chứa bóng và cơ cấu truyền động. | Thiết kế CAD robot (VORC 2024 / VRC 2023) | Không | "Đội thi" | **SAI NGHIÊM TRỌNG (FLAG WRONG):** Bản vẽ CAD 3D hoàn toàn không có người nhưng lại bị chú thích là "Đội thi". Cần sửa thành *"Mô hình 3D CAD robot (góc nhìn sau)"*. |
| **15** | `/Images/Achievements/Motion Fire/Image (1).webp` | Toàn cảnh Lễ trao giải trên sân khấu chính Motions In Fire (STEAMese Festival 2025): Trao giải First Prize Winner cho đội áo cam và First Runner-Up cho đội Robotics Sóc Sơn. | Motions In Fire 2025 (19/10/2025) | **CÓ** | "Robot thi đấu" | **SAI HOÀN TOÀN (FLAG WRONG):** Ảnh Lễ trao giải trên sân khấu chính lại bị chú thích là "Robot thi đấu". Cần sửa thành *"Lễ trao giải Motions In Fire 2025"*. |
| **16** | `/Images/Achievements/Motion Fire/Image (2).webp` | Khu vực bàn kỹ thuật / Pit: Các bạn học sinh đang tập trung căn chỉnh cơ cấu bánh đà flywheel và ống phóng bóng trên khung nhôm robot. | Motions In Fire 2025 (19/10/2025) | Không | "Đội thi" | **CHƯA CHUẨN XÁC (FLAG WRONG):** Đây là ảnh hoạt động kỹ thuật tại bàn pit / căn chỉnh cơ cấu bắn bóng, không phải ảnh chụp chân dung đội thi. |
| **17** | `/Images/Achievements/Motion Fire/Image (3).webp` | Hai bạn học sinh mặc áo đấu "Electronic Athlete" đang chăm chú quan sát màn hình TV truyền hình trực tiếp trận đấu robot (robot số 003 trên sân). | Motions In Fire 2025 (19/10/2025) | Không | "Hoạt động" | **Đúng.** Hoạt động theo dõi trận đấu qua màn hình truyền hình trực tiếp. |
| **18** | `/Images/Achievements/Motion Fire/Image (4).webp` | Cận cảnh robot số **006** (khung nhôm, ống nạp bóng tròn thẳng đứng, bánh đà flywheel) xuất phát trong ô vạch xanh trên sa bàn thi đấu có gắn logo VEX. | Motions In Fire 2025 (19/10/2025) | Không | "Giải thưởng" | **SAI NGHIÊM TRỌNG (FLAG WRONG):** Ảnh robot số 006 trên sa bàn thi đấu bị chú thích nhầm thành "Giải thưởng". Cần sửa thành *"Robot thi đấu trên sa bàn Motions In Fire"*. |
| **19** | `/Images/Achievements/Motion Fire/Image (5).webp` | Đội Robotics Sóc Sơn đứng trên sân khấu chính nhận giải **Á quân (First Runner-Up)**: Màn hình LED có logo "robotics socson" và chữ *"Motions in Fire - First Runner-Up"*. Nhận bảng giải và quà tặng ThinkPad/UNICEF. | Motions In Fire 2025 (19/10/2025) | **CÓ** | "Robot thi đấu" | **SAI HOÀN TOÀN (FLAG WRONG):** Đây là bức ảnh bằng chứng quan trọng nhất về giải thưởng Á quân của Robotics Sóc Sơn, nhưng lại bị gắn chú thích là "Robot thi đấu". Cần sửa thành *"Đội nhận giải Á quân (First Runner-Up) Motions In Fire 2025"*. |
| **20** | `/Images/Achievements/Motion Fire/Image (6).webp` | 10 thành viên đội Robotics Sóc Sơn tạo dáng chụp ảnh lưu niệm trước backdrop vòm tròn ngoài trời của *STEAMESE FESTIVAL 2025 AI FOR ALL*. | Motions In Fire 2025 (19/10/2025) | Không | "Đội thi" | **Đúng.** Ảnh lưu niệm tập thể đội thi tại ngày hội. |
| **21** | `/Images/Achievements/FTC 2024-2025/Image  (1).webp` | Hai bạn nữ thành viên/cổ động viên ngồi trên khán đài nhà thi đấu tối đèn, cổ vũ và ghi hình các trận đấu của đội. | FTC Vietnam 2024–2025 | Không | "Robot thi đấu" | **SAI HOÀN TOÀN (FLAG WRONG):** Ảnh hai cổ động viên nữ trên khán đài, không có robot nào xuất hiện nhưng lại chú thích là "Robot thi đấu". Cần sửa thành *"Cổ động viên trên khán đài"*. |
| **22** | `/Images/Achievements/FTC 2024-2025/Image  (2).webp` | Cận cảnh robot thi đấu của CLB mang biển số liên minh xanh: Logo "RS" và số hiệu lớn **28762** trên sân thi đấu FTC INTO THE DEEP (mẫu vật Samples vàng/đỏ/xanh). | FTC Vietnam 2024–2025 (#28762) | Không | "Đội thi" | **SAI LỆCH (FLAG WRONG):** Đây là ảnh cận cảnh robot thi đấu chính thức mang mã số #28762, không phải ảnh chụp đội thi. Cần sửa thành *"Robot thi đấu FTC #28762 trên sân đấu"*. |
| **23** | `/Images/Achievements/FTC 2024-2025/Image  (3).webp` | Đội điều khiển (Drive Team & Coach) đeo kính bảo hộ an toàn đứng tại Driver Station cầm tay cầm điều khiển trận đấu; phía sau kính là robot #28762. | FTC Vietnam 2024–2025 (#28762) | Không | "Hoạt động" | **Tương đối phù hợp.** Cụ thể hóa là: *"Đội điều khiển (Drive Team) thi đấu tại Driver Station"*. |
| **24** | `/Images/Achievements/FTC 2024-2025/Image  (4).webp` | Cận cảnh thành viên Drive Team Robotics Sóc Sơn (áo Wild Spirit) và các thí sinh đội bạn đeo kính bảo hộ đứng quan sát diễn biến trận đấu quanh sân FTC. | FTC Vietnam 2024–2025 | Không | "Giải thưởng" | **SAI NGHIÊM TRỌNG (FLAG WRONG):** Ảnh các thí sinh đứng quan sát thi đấu quanh sân bị chú thích là "Giải thưởng". Cần sửa thành *"Thành viên quan sát trận đấu quanh sân FTC"*. |
| **25** | `/Images/Achievements/FTC 2024-2025/Image  (5).webp` | Khán đài nhà thi đấu FTC với các dải cờ giá trị cốt lõi FIRST: *INNOVATION, GRACIOUS PROFESSIONALISM, DISCOVERY, FUN, TEAMWORK*. Khán giả và thành viên theo dõi trận đấu. | FTC Vietnam 2024–2025 | Không | "Robot thi đấu" | **SAI HOÀN TOÀN (FLAG WRONG):** Toàn cảnh khán đài và cờ FIRST Core Values, không có robot nào nhưng chú thích là "Robot thi đấu". Cần sửa thành *"Khán đài và giá trị cốt lõi FIRST"*. |
| **26** | `/Images/Achievements/FTC 2024-2025/Image  (6).webp` | Cận cảnh chi tiết phần cứng robot đặt trên nền gạch: Động cơ REV HD Hex Motor, tay gắp servo REV, pin REV Slim 12V 3000mAh và sạc cam REV. | Mùa giải FTC (#28762 / #33518) | Không | "Đội thi" | **SAI HOÀN TOÀN (FLAG WRONG):** Ảnh cận cảnh phần cứng kỹ thuật của robot không có người nhưng lại chú thích là "Đội thi". Cần sửa thành *"Chi tiết cấu tạo phần cứng robot FTC"*. |
| **27** | `/Images/Achievements/FTC 2024-2025/Image  (7).webp` | Gian trại kỹ thuật (Pit) của đội tại FTC Vietnam INTO THE DEEP: Biển hiệu *ROBOTICS SÓC SƠN - FTC TEAM 28762*, màn hình trình chiếu video, các thành viên mặc áo *Electronic Athlete 00*. | FTC Vietnam 2024–2025 (#28762) | Không | "Hoạt động" | **Đúng.** Gian trại kỹ thuật (Pit) của đội tại giải đấu. |
| **28** | `/Images/Achievements/FTC 2024-2025/Image  (8).webp` | Bảng ghim bần (corkboard) trưng bày ảnh kỷ niệm tại gian Pit: Các ảnh polaroid dã ngoại, học tập, sticker logo RS và sticker CLB bạn TPCIRCLE. | FTC Vietnam 2024–2025 (#28762) | Không | "Giải thưởng" | **SAI NGHIÊM TRỌNG (FLAG WRONG):** Bảng ảnh kỷ niệm tại Pit bị chú thích là "Giải thưởng". Cần sửa thành *"Bảng ảnh kỷ niệm trưng bày tại Pit"*. |

### 5.1. Thống kê lỗi chú thích trong `src/data/achievements.ts`:
- **Tổng số ảnh:** 28 ảnh.
- **Số ảnh chú thích đúng / phù hợp:** 13/28 ảnh (~46.4%).
- **Số ảnh bị chú thích sai hoặc sai nghiêm trọng:** **15/28 ảnh (~53.6%)**.
- **Các lỗi điển hình:**
  1. Gắn nhãn "Giải thưởng" cho ảnh bản vẽ 3D CAD (`VORC/Image (4)`), ảnh robot trên sa bàn (`Motion Fire/Image (4)`), ảnh học sinh đứng xem thi đấu (`FTC/Image  (4)`), ảnh bảng ghim kỷ niệm (`FTC/Image  (8)`).
  2. Ngược lại, bức ảnh trao giải Á quân quan trọng nhất của đội tại Motions In Fire 2025 (`Motion Fire/Image (5)`) và Lễ trao giải toàn cảnh (`Motion Fire/Image (1)`) lại bị gắn nhãn "Robot thi đấu".
  3. Gắn nhãn "Đội thi" cho bản vẽ 3D CAD (`VORC/Image (6)`), poster giải đấu (`VORC/Image (2)`), và ảnh chụp phần cứng máy móc (`FTC/Image  (6)`).
  4. Gắn nhãn "Robot thi đấu" cho khán đài (`FTC/Image  (1)`, `FTC/Image  (5)`) và cho bảng Infographic công bố kết quả (`VORC/Image (1)`).

---

## 6. NHẬT KÝ TRUY VẤN VÀ CÁC THÔNG TIN CHƯA THỂ MỞ RỘNG (FAILED QUERIES LOG)

Trong quá trình điều tra ngày 29/10/2026, các thông tin sau đây không thể tìm thấy bằng chứng nguồn mở độc lập trên internet:

1. **Nguồn gốc con số "66 đội" tham gia VRC 2023:**
   - *Tình trạng:* Repo ghi "66 đội", trong khi hồ sơ quốc tế của Team Vietnam FGC 2023 trên FIRST Global ghi VRC quy tụ "70 high school teams nationwide". Không có bài báo hay văn bản công khai nào của FPT Education xác nhận con số 66.
   - *Truy vấn đã thực hiện:* `"Vietnam Robotics Challenge 2023" "66 đội"`; `"Vietnam Robotics Challenge" "Zero Carbon" "66"`; `site:fpt.edu.vn "66 đội" VRC`.
2. **Bảng kết quả toàn bộ giải thưởng VRC 2023:**
   - *Tình trạng:* Ngoại trừ giải Hạng 4 "Best Runner" của THPT Sóc Sơn (được Báo Giáo dục & Thời đại, Báo Thanh Niên và ảnh biển giải thưởng chứng thực), danh sách các trường đạt Quán quân, Á quân, Quý quân không xuất hiện trên các cổng thông tin tìm kiếm được.
   - *Truy vấn đã thực hiện:* `"Vietnam Robotics Challenge 2023" "Quán quân"`; `"Vietnam Robotics Challenge 2023" "Best Runner" "FPT"`; `site:daihoc.fpt.edu.vn "Vietnam Robotics Challenge" "2023"`.
3. **Bảng điểm chi tiết Vòng loại Motions In Fire 2025:**
   - *Tình trạng:* Trang web của STEAM for Vietnam (`steamforvietnam.org/steamese-festival2025`) chỉ giới thiệu thể lệ trạm thi đấu, không lưu trữ bảng điểm số vòng loại của từng đội. Thành tích "Hạng 1 vòng loại" hiện chỉ tồn tại trong kỷ yếu nội bộ của CLB (`docs/old project/Thành tích.md:10`).
   - *Truy vấn đã thực hiện:* `site:steamforvietnam.org "Motions in Fire" "Sóc Sơn"`; `"Motions in Fire" "Hạng 1" "vòng loại"`; `site:facebook.com "Motions in Fire" "Robotics Sóc Sơn"`.
4. **Trang thông tin tên miền cũ của giải FTC Vietnam:**
   - *Tình trạng:* Tên miền `https://ftc.io.vn` (từng chứa thông tin lưu trữ của FTC và VORC 2024) đã hết hạn hoặc ngắt kết nối, các đường link phụ (`/faqs`, `/2324/index.html`, `/2425/en`) đều trả về lỗi HTTP 404.
