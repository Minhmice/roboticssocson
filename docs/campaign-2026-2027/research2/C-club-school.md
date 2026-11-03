# Robotics Sóc Sơn và Trường THPT Sóc Sơn — nghiên cứu dữ kiện công khai

**Ngày truy xuất và chốt báo cáo:** 2026-10-29  
**Phạm vi:** lịch sử CLB, dấu vết mạng xã hội, thông tin trường, FTC/robotics, tuyển Gen/RBS 4.0, liên hệ và QR.  
**Quy ước:** `[ĐÃ MỞ]` = đã mở và đọc nguồn trong lần truy xuất này; `[SUY LUẬN]` = kết luận nối từ dữ kiện, không phải câu chữ nguồn. `Không tìm thấy` luôn kèm truy vấn/URL đã thử. Mỗi dòng dưới đây ghi nguồn và ngày truy xuất 2026-10-29.

## 1. Lịch sử, nguồn gốc, người sáng lập, cố vấn và phòng lab

### 1.1. Những gì nguồn công khai xác nhận

- **CLB Robotics của Trường THPT Sóc Sơn đã tồn tại chậm nhất ngày 2023-10-06.** Báo Giáo dục & Thời đại viết Nguyễn Việt Thành là “một trong những người đầu tiên tham gia Câu lạc bộ Robotics nhà trường”, đồng thời quản lý fanpage “Robotic Sóc Sơn”; bài cũng ghi đội tuyển trường đạt hạng 4 toàn quốc Vietnam Robotics Challenge 2023 do Đại học FPT tổ chức. `[ĐÃ MỞ]` Nguồn: [Báo GD&TĐ, 2023-10-06](https://giaoducthoidai.vn/nam-sinh-thpt-soc-son-mang-chung-ket-olympia-ve-ha-noi-post656583.html), truy xuất 2026-10-29.
- **Nguyễn Việt Thành là thành viên được báo chí nêu tên, không phải người sáng lập đã được chứng minh.** Bài GD&TĐ chỉ dùng “một trong những người đầu tiên tham gia”; không viết “đồng sáng lập”. `[ĐÃ MỞ]` Nguồn như trên, truy xuất 2026-10-29.
- **Dữ liệu FTC Scout ghi ba mã đội liên tiếp:** #28762 có rookie year 2024, #33518 có rookie year 2025, #39256 có rookie year 2026; hồ sơ #39256 ghi trường “Soc Son High School”. API không có sponsor đăng ký cho cả ba hồ sơ. `[ĐÃ MỞ]` Nguồn: [API #28762](https://api.ftcscout.org/rest/v1/teams/28762), [API #33518](https://api.ftcscout.org/rest/v1/teams/33518), [API #39256](https://api.ftcscout.org/rest/v1/teams/39256), truy xuất bằng Chrome DevTools 2026-10-29.
- **Nguồn gốc hoạt động có bằng chứng là học sinh tham gia robotics/STEM và thi VRC 2023;** không có bài công khai nào tôi mở được mô tả đầy đủ ai khởi xướng, vì sao lập CLB, cuộc họp thành lập hay quyết định thành lập. `[SUY LUẬN]` Nguồn nền: bài GD&TĐ ở trên; hồ sơ repo `docs/ho-so-clb.md:46-61`, truy xuất 2026-10-29.

### 1.2. Năm thành lập — verdict

- **Mốc làm việc hợp lý: 2023, nhưng chưa có giấy tờ/nguồn báo chí xác nhận trực tiếp “thành lập năm 2023”.** Repo đặt `foundedYear: "2023"` trong dữ liệu website và các tài liệu chiến dịch ghi 2023; bài GD&TĐ đã mở xác nhận CLB tồn tại và có thành viên đầu tiên vào tháng 10/2023, nhưng không ghi ngày thành lập. `[ĐÃ MỞ]` Nguồn ngoài: [Báo GD&TĐ](https://giaoducthoidai.vn/nam-sinh-thpt-soc-son-mang-chung-ket-olympia-ve-ha-noi-post656583.html); nguồn repo: `src/data/about.ts`, `docs/campaign-2026-2027/02-fact-sheet-mua-giai.md:71-75`, truy xuất 2026-10-29.
- **“Gần 5 năm” mâu thuẫn với mốc 2023 khi văn bản được lập cho mùa 2026–2027.** Tôi không tìm thấy nguồn ngoài đã mở nào giải thích “gần 5 năm” hay chứng minh CLB bắt đầu trước 2023. Kết luận: dùng câu an toàn “CLB được nguồn công khai xác nhận đã hoạt động từ năm 2023; năm thành lập chính thức cần văn bản/người sáng lập xác nhận”. `[SUY LUẬN]` Nguồn mâu thuẫn nội bộ: `docs/ho-so-clb.md:50-61,248-249`; truy xuất 2026-10-29.

### 1.3. Người sáng lập, giáo viên cố vấn, phòng lab

- **Người sáng lập — Không tìm thấy:** tên người sáng lập được nguồn công khai xác nhận. Đã thử [Báo GD&TĐ](https://giaoducthoidai.vn/nam-sinh-thpt-soc-son-mang-chung-ket-olympia-ve-ha-noi-post656583.html), truy vấn web `"Robotics Sóc Sơn" câu lạc bộ thành lập 2023 Nguyễn Việt Thành`, repo `docs/ho-so-clb.md:46-61`. Kết quả xác nhận Nguyễn Việt Thành là một trong những người đầu tiên tham gia, không phải xác nhận đồng sáng lập. `[ĐÃ MỞ]` Ngày truy xuất 2026-10-29.
- **Giáo viên/cố vấn — Không tìm thấy:** tên cố vấn được nguồn công khai xác nhận. Đã thử [cổng trường](https://thptsocson.hanoi.edu.vn/), bài GD&TĐ, repo `docs/campaign-2026-2027/14-phan-cong-nhan-su.md` và truy vấn `Robotics Sóc Sơn giáo viên cố vấn`. `[ĐÃ MỞ]` Ngày truy xuất 2026-10-29.
- **Phòng lab:** Tài liệu chiến dịch nội bộ gọi cơ sở là “Phòng Thực hành STEM, Trường THPT Sóc Sơn”; không tìm thấy ảnh, diện tích, danh mục máy móc hoặc trang trường độc lập xác nhận phòng này dành riêng cho CLB. `[SUY LUẬN]` Nguồn repo: `docs/campaign-2026-2027/02-fact-sheet-mua-giai.md:149-151`, `docs/ho-so-clb.md:96-100`, truy xuất 2026-10-29.

## 2. Chỉ số và hoạt động mạng xã hội công khai

> Số liệu là ảnh chụp tại thời điểm truy xuất 2026-10-29, không coi là số liệu lịch sử ổn định. Không công bố số điện thoại cá nhân xuất hiện trong caption/post.

### 2.1. Facebook

- Fanpage **Robotics Soc Son** hiển thị **860 followers, 7 following**, danh mục “Science, technology and engineering”, email `roboticssocson@gmail.com`, tagline “Sáng Tạo - Đột Phá - Năng Động”. `[ĐÃ MỞ]` Nguồn: [facebook.com/roboticssocson](https://www.facebook.com/roboticssocson/), đã mở bằng Chrome DevTools và đọc DOM ngày 2026-10-29.
- Bài gần nhất hiển thị trong DOM có ngày **21 September** (năm không hiển thị rõ), tiêu đề **“CÔNG BỐ THÀNH VIÊN GEN 4 .0 | ROBOTICS SÓC SƠN”**; bài hiển thị **42 reactions** và một bình luận nhìn thấy. `[ĐÃ MỞ]` Nguồn cùng fanpage, URL trên, truy xuất 2026-10-29.
- Nội dung bài chúc mừng thành viên Gen 4.0 và nói các hồ sơ chưa được chọn có thể gặp lại CLB ở chặng khác. Bài có liên hệ cá nhân; số điện thoại được loại khỏi báo cáo: **[SĐT cá nhân - bỏ]**. `[ĐÃ MỞ]` Nguồn cùng fanpage, truy xuất 2026-10-29.
- `mbasic.facebook.com/roboticssocson`, Wayback CDX `https://web.archive.org/cdx/search/cdx?url=facebook.com/roboticssocson*&output=json&limit=10`, Engineering10 mirror và tìm kiếm web `site:facebook.com/roboticssocson` đã thử; mbasic/Wayback/Engineering10 không cho thêm dữ liệu đáng tin ở lần truy xuất này. `[ĐÃ MỞ]` / Không tìm thấy, ngày 2026-10-29.

### 2.2. Instagram

- Tài khoản công khai `@roboticssocson` có tên **Robotics Soc Son**, bio “Ha Noi, Viet Nam”, **48 followers**, **0 following**, chưa xác minh. `[ĐÃ MỞ]` Nguồn: [Instagram profile](https://www.instagram.com/roboticssocson/), gọi operation `instagram.getProfile` qua api-anything ngày 2026-10-29.
- API đọc được 6 bài gần đây nhất. Bài có ngày hiển thị mới nhất là **17/10/2026**, caption “our handsome head of media”; các bài ngày 14/06/2026 và 12/06/2026 nói về hoạt động đội/media. `[ĐÃ MỞ]` Nguồn: [Instagram profile](https://www.instagram.com/roboticssocson/), operation `getPosts`, truy xuất 2026-10-29.
- Bài ngày 07/02/2026 nói mùa FIRST Tech Challenge Vietnam 2025–2026/DECODE đã kết thúc và hành trình Robotics Soc Son tiếp tục; bài khác cùng ngày nói CLB chính thức tham gia FTC 2026. Không có lượt thích/bình luận trong dữ liệu API đã đọc. `[ĐÃ MỞ]` Nguồn như trên, truy xuất 2026-10-29.
- Bio link trỏ tới TikTok `@roboticssocson` và một link chia sẻ Facebook. `[ĐÃ MỞ]` Nguồn API profile Instagram như trên, truy xuất 2026-10-29.

### 2.3. TikTok

- Trang `@roboticssocson` hiển thị tên “robotics soc son”, **315 Followers**, **9,099 Likes**, **3 Following**. Trang bị puzzle/challenge nên chưa đọc được danh sách bài và ngày bài mới nhất. `[ĐÃ MỞ]` Nguồn: [TikTok @roboticssocson](https://www.tiktok.com/@roboticssocson), mở bằng Chrome DevTools ngày 2026-10-29.
- **Ngày bài mới nhất và engagement từng bài:** Không tìm thấy do trang dừng ở puzzle. Đã thử URL trên bằng Chrome và fetch; không dùng suy đoán. Ngày 2026-10-29.

### 2.4. YouTube, GitHub và kênh khác

- **YouTube chính thức:** Không tìm thấy kênh/handle chính thức `roboticssocson`. Đã thử api-anything YouTube search với `Robotics Sóc Sơn` và `roboticssocson`, cùng truy vấn web `site:youtube.com "roboticssocson"`; kết quả liên quan gồm video VRC 2023 của Đại học FPT và video THPT Sóc Sơn từ kênh khác, không phải kênh CLB. Ngày 2026-10-29.
- **GitHub:** Không tìm thấy tài khoản/tổ chức `github.com/roboticssocson` (URL trả 404) hoặc repository khớp truy vấn `site:github.com "roboticssocson" OR "Robotics Sóc Sơn"`. Ngày 2026-10-29.
- **Instagram/TikTok là hai kênh công khai mới tìm thấy ngoài Facebook.** `src/data/settings.ts:16-28` chỉ khai báo Facebook; YouTube/TikTok/GitHub để chuỗi rỗng. `[ĐÃ MỞ]` Nguồn repo và các URL nền tảng trên, truy xuất 2026-10-29.

## 3. Thông tin Trường THPT Sóc Sơn

### 3.1. Tên, website, địa chỉ hành chính

- Tên dùng trên cổng chính thức: **THPT Sóc Sơn**; tên đầy đủ trong bài Sở GD&ĐT là **Trường THPT Sóc Sơn**. Cơ quan chủ quản được hồ sơ trường ghi là Sở Giáo dục và Đào tạo thành phố Hà Nội. `[ĐÃ MỞ]` Nguồn: [cổng trường](https://thptsocson.hanoi.edu.vn/), [Sở GD&ĐT Hà Nội — bài 40 năm](https://hanoi.edu.vn/thong-tin-co-so/ky-niem-40-nam-thanh-lap-truong-thpt-soc-son-tu-hao-hanh-trinh-40-nam-xay-dung/ctmb/530/15839), truy xuất 2026-10-29.
- Website/cổng thông tin: [https://thptsocson.hanoi.edu.vn/](https://thptsocson.hanoi.edu.vn/). Cổng có các bài công khai ngân sách năm 2026 và hồ sơ tuyển sinh 2026–2027. `[ĐÃ MỞ]` Nguồn cổng trường, truy xuất 2026-10-29.
- **Địa chỉ lịch sử trên hồ sơ trường:** Quốc lộ 2, xã Phù Lỗ, huyện Sóc Sơn, thành phố Hà Nội. `[ĐÃ MỞ]` Nguồn: `docs/campaign-2026-2027/research/R8-official-info.md:13-22`, đối chiếu cổng trường và hồ sơ repo, truy xuất 2026-10-29.
- **Địa chỉ hành chính hiện hành sau 01/07/2025:** xã Phù Lỗ được sắp xếp vào **xã Sóc Sơn, thành phố Hà Nội**. Nghị quyết 1656/NQ-UBTVQH15 Điều 1 khoản 122 liệt kê thị trấn Sóc Sơn, Tân Minh, Đông Xuân, Phù Lỗ, Phù Linh, Tiên Dược và các phần địa bàn liên quan để thành lập xã Sóc Sơn; Điều 2 nêu chính quyền mới hoạt động từ 01/07/2025. Vì vậy, cách ghi cập nhật nên là **“Quốc lộ 2, xã Sóc Sơn, thành phố Hà Nội”**; giữ “xã Phù Lỗ, huyện Sóc Sơn” chỉ khi mô tả địa chỉ lịch sử. `[ĐÃ MỞ]` Nguồn: [toàn văn Nghị quyết 1656](https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-1656-nq-ubtvqh15-sap-xep-cac-dvhc-cap-xa-cua-thanh-pho-ha-noi-nam-2025-119250616192433872.htm), truy xuất 2026-10-29.

### 3.2. Liên hệ và lãnh đạo

- Điện thoại văn phòng và email công vụ từng được hồ sơ trường ghi là `(024) 3884 1042` và `c3socson@hanoiedu.vn`. Đây là **liên hệ cơ quan**, không phải số học sinh; cần trường xác nhận trước khi xuất bản ra ngoài. `[ĐÃ MỞ]` Nguồn: `docs/campaign-2026-2027/research/R8-official-info.md:16-26`, truy xuất 2026-10-29.
- Hiệu trưởng được bài kỷ niệm 40 năm năm 2024 nêu là **nhà giáo Nguyễn Thị Diệu Thanh — Bí thư Chi bộ, Hiệu trưởng**. `[ĐÃ MỞ]` Nguồn: [Sở GD&ĐT Hà Nội, bài 40 năm](https://hanoi.edu.vn/thong-tin-co-so/ky-niem-40-nam-thanh-lap-truong-thpt-soc-son-tu-hao-hanh-trinh-40-nam-xay-dung/ctmb/530/15839), đăng 2024-11-18, truy xuất 2026-10-29.
- **Xác nhận chức vụ riêng cho năm 2026:** Không tìm thấy quyết định/bài chính thức năm 2026 đã mở ghi đích danh hiệu trưởng. Cổng trường có nhiều nội dung năm 2026 nhưng trang chủ không hiển thị tên hiệu trưởng. Đã thử [cổng trường](https://thptsocson.hanoi.edu.vn/), [hanoi.edu.vn](https://hanoi.edu.vn/), truy vấn `THPT Sóc Sơn hiệu trưởng Nguyễn Thị Diệu Thanh 2026`; kết quả chắc chắn gần nhất là bài năm 2024 nêu trên. Ngày 2026-10-29.

### 3.3. Lịch sử và quy mô trường

- Ngày **19/09/1983**, phân hiệu Phù Lỗ thuộc Trường THPT Kim Anh ra đời với 11 giáo viên, hơn 300 học sinh và 6 lớp; năm học 1984–1985, UBND thành phố Hà Nội quyết định thành lập Trường THPT Sóc Sơn từ phân hiệu này; thầy Đàm Quang Phú là hiệu trưởng đầu tiên. `[ĐÃ MỞ]` Nguồn: [Sở GD&ĐT Hà Nội, bài 40 năm](https://hanoi.edu.vn/thong-tin-co-so/ky-niem-40-nam-thanh-lap-truong-thpt-soc-son-tu-hao-hanh-trinh-40-nam-xay-dung/ctmb/530/15839), truy xuất 2026-10-29.
- Năm học **2024–2025**, trường có **43 lớp, gần 2.000 học sinh, 86 cán bộ giáo viên nhân viên**. `[ĐÃ MỞ]` Nguồn cùng bài Sở GD&ĐT, truy xuất 2026-10-29.
- Trường có **gần 30.000 học sinh đã tốt nghiệp** sau 40 năm. `[ĐÃ MỞ]` Nguồn cùng bài Sở GD&ĐT, truy xuất 2026-10-29.
- Trường được bài nêu là đạt chuẩn quốc gia năm 2014 và công nhận lại năm 2021; có thành tích học sinh ở tin học, thiết kế robot và nghiên cứu khoa học kỹ thuật cấp thành phố/quốc gia. Bài không cung cấp kiểm kê riêng cho phòng STEM. `[ĐÃ MỞ]` Nguồn cùng bài Sở GD&ĐT, truy xuất 2026-10-29.

## 4. Đề cập khác, thành viên, sự kiện, đối tác và tài trợ

- **Đề cập báo chí trực tiếp:** Bài GD&TĐ 2023 là nguồn báo chí độc lập đã mở, nêu Nguyễn Việt Thành, fanpage Robotics và hạng 4 VRC 2023. `[ĐÃ MỞ]` Nguồn: [GD&TĐ](https://giaoducthoidai.vn/nam-sinh-thpt-soc-son-mang-chung-ket-olympia-ve-ha-noi-post656583.html), truy xuất 2026-10-29.
- **Bài Thanh Niên 2023:** Đã thử/mở [bài về Nguyễn Việt Thành](https://thanhnien.vn/tai-hien-truyen-thuyet-thanh-giong-tiep-lua-nha-leo-nui-nguyen-viet-thanh-18523100808390912.htm); bài tập trung điểm cầu Olympia, không xác nhận thêm lịch sử CLB, tên cố vấn hay nhà tài trợ. `[ĐÃ MỞ]` Nguồn, truy xuất 2026-10-29.
- **FTC Scout:** API xác nhận #28762, #33518, #39256 cùng tên Robotics Sóc Sơn/Robotics Soc Son; trường của #28762 là THPT Sóc Sơn, #39256 là Soc Son High School, #33518 để Unknown; cả ba có sponsors rỗng. `[ĐÃ MỞ]` Nguồn các API trong Section 1.1, truy xuất 2026-10-29.
- **Kết quả thi đấu API:** #28762 tại VNCMP 2024: rank 11, 3–3–0; #33518 tại VNCMP 2025: rank 36, 1–4–0; #39256 chưa có event trong dữ liệu API đã kiểm tra. `[ĐÃ MỞ]` Nguồn: [#28762 events](https://api.ftcscout.org/rest/v1/teams/28762/events/2024), [#33518 events](https://api.ftcscout.org/rest/v1/teams/33518/events/2025), [#39256 events](https://api.ftcscout.org/rest/v1/teams/39256/events/2026), truy xuất 2026-10-29.
- **Nhà tài trợ/nhà hảo tâm:** Không tìm thấy tên nhà tài trợ trực tiếp được nguồn công khai xác nhận cho CLB giai đoạn 2023–2026. Đã thử truy vấn `"Robotics Sóc Sơn" tài trợ`, `"Robotics Sóc Sơn" nhà tài trợ`, `THPT Sóc Sơn tài trợ`, fanpage, Engineering10 mirror và hồ sơ `docs/campaign-2026-2027/research/R6-social-sponsors.md`; không dùng tên đơn vị tổ chức giải (FPT, STEAM for Vietnam, UNICEF, Đại sứ quán Hoa Kỳ) như tên sponsor của CLB. Ngày 2026-10-29.
- **Thành viên/người được nêu công khai:** Nguyễn Việt Thành được bài GD&TĐ nêu; Đoàn Thị Thuỳ Ngân xuất hiện trong caption Instagram/website nhưng số điện thoại cá nhân bị loại; Nguyễn Bảo Ngọc xuất hiện là đầu mối trong bài Facebook Gen 4.0 nhưng số điện thoại bị loại. Không có danh sách thành viên Gen 4.0 đầy đủ trong DOM bài Facebook đã mở. `[ĐÃ MỞ]` Nguồn: các URL GD&TĐ, Instagram và Facebook ở Sections 1–2, truy xuất 2026-10-29.

## 5. Bằng chứng tuyển thành viên RBS 4.0 / Gen 4.0

- Trang tuyển thành viên trong repo hiển thị badge **“RBS 4.0”**, trạng thái **“ĐÃ ĐÓNG ĐƠN”**, tiêu đề “Đợt tuyển thành viên đã kết thúc”, và “Hồ sơ đang được xét duyệt”. `[ĐÃ MỞ]` Nguồn repo: `src/app/recruitment/RecruitmentClient.tsx:12-25`, truy xuất 2026-10-29.
- Trang tuyển dụng nói kết quả/lịch phỏng vấn sẽ gửi qua thông tin liên hệ đã đăng ký; đây là mô tả trạng thái form, không phải bằng chứng số lượng đơn hoặc danh sách trúng tuyển. `[ĐÃ MỞ]` Nguồn repo: `src/app/recruitment/RecruitmentClient.tsx:16-21`, truy xuất 2026-10-29.
- Fanpage công khai bài **“CÔNG BỐ THÀNH VIÊN GEN 4 .0 | ROBOTICS SÓC SƠN”**, hiển thị ngày “21 September”, 42 reactions và nội dung chúc mừng các thành viên được chọn. `[ĐÃ MỞ]` Nguồn: [Facebook fanpage](https://www.facebook.com/roboticssocson/), mở DOM ngày 2026-10-29.
- **Không tìm thấy danh sách tên thành viên Gen 4.0/RBS 4.0 đầy đủ, số đơn, tiêu chí chọn hoặc lịch phỏng vấn.** Đã thử trang tuyển dụng repo, bài Facebook Gen 4.0 (mở “See more”), Instagram profile/posts, truy vấn `RBS 4.0 Robotics Sóc Sơn`; không suy ra danh sách từ ảnh/ảnh đại diện. Ngày 2026-10-29.

## 6. QR, liên hệ nội bộ và dữ liệu cần che

- `src/data/settings.ts:6-14` khai báo brand `Robotics Sóc Sơn`, domain `roboticssocson.minhmice.com`, email `roboticssocson@gmail.com`, `contactPhone = "[SĐT cá nhân - bỏ]"`, contact lead “Đoàn Thùy Ngân”, Messenger `https://m.me/roboticssocson`; `src/data/settings.ts:23-28` chỉ có Facebook, các ô YouTube/TikTok/GitHub rỗng. `[ĐÃ MỞ]` Nguồn repo: `src/data/settings.ts:6-28`, truy xuất 2026-10-29.
- **Số điện thoại cá nhân:** không xuất bản giá trị trong `settings.ts`, caption Instagram, bài Facebook hoặc tài liệu nghiên cứu. Ghi thay thế: **[SĐT cá nhân - bỏ]**. Đây là yêu cầu bảo vệ dữ liệu, không phải kết luận số đó thuộc trường.
- Đã mở ảnh [QR CODE.webp](public/Images/QR CODE/QR CODE.webp). Giải mã/đối chiếu nội bộ cho thấy đây là QR VietQR/NAPAS hợp lệ; BIN **970454** là Ngân hàng Bản Việt/BVBank, chuỗi tài khoản bị che một phần trong dữ liệu giải mã (`99MM…1247`) và nội dung tham chiếu `MM_fund_detail`. `[ĐÃ MỞ]` Nguồn ảnh repo: `public/Images/QR CODE/QR CODE.webp`; đối chiếu danh sách ngân hàng: [api.vietqr.io/v2/banks](https://api.vietqr.io/v2/banks), truy xuất 2026-10-29.
- QR trên website **không khớp** với tài khoản MB Bank xuất hiện trong tài liệu chiến dịch; không xuất bản số tài khoản hoặc QR như một kênh nhận tiền đã chốt. `[SUY LUẬN]` Nguồn repo: `docs/ho-so-clb.md:190-200`, ảnh QR và `src/data/settings.ts`, truy xuất 2026-10-29.
- Email công khai hiện thấy trong website/fanpage/Instagram là `roboticssocson@gmail.com`. `contact@roboticssocson.com` chỉ xuất hiện trong tài liệu chiến dịch và chưa được nguồn trực tiếp xác nhận hoạt động. `[ĐÃ MỞ]` Nguồn: `src/data/settings.ts:8-14`, [Facebook](https://www.facebook.com/roboticssocson/), [Instagram](https://www.instagram.com/roboticssocson/), và `docs/ho-so-clb.md:213-223`, truy xuất 2026-10-29.

## Kết luận ngắn

- **Đã tìm thấy:** bằng chứng báo chí CLB hoạt động từ 2023; ba mã FTC; Facebook 860 follower/7 following, Instagram 48 follower, TikTok 315 follower/9.099 likes; bài Facebook Gen 4.0; hồ sơ RBS 4.0 đóng đơn; lịch sử trường, quy mô 43 lớp/gần 2.000 học sinh/gần 30.000 cựu học sinh và địa chỉ mới là xã Sóc Sơn.
- **Chưa tìm thấy:** văn bản xác nhận ngày thành lập, danh sách người sáng lập, giáo viên cố vấn, kiểm kê phòng lab, danh sách thành viên Gen 4.0, sponsor trực tiếp, YouTube/GitHub chính thức, engagement đầy đủ của TikTok/Instagram.
- **Founding-year verdict:** dùng **“đã hoạt động từ năm 2023”** là chắc chắn; dùng **“thành lập năm 2023”** chỉ như mốc làm việc `[SUY LUẬN]` cho đến khi có giấy tờ/người sáng lập xác nhận. “Gần 5 năm” vẫn là mâu thuẫn chưa giải thích.
- **Địa chỉ cập nhật:** “Quốc lộ 2, xã Sóc Sơn, thành phố Hà Nội” theo Nghị quyết 1656; “xã Phù Lỗ, huyện Sóc Sơn” là địa chỉ lịch sử trước 01/07/2025.
- **Bảo vệ dữ liệu:** mọi số điện thoại cá nhân trong nguồn được thay bằng **[SĐT cá nhân - bỏ]**.
