# Trang hồ sơ CLB (`/profile`) và ẩn tuyển thành viên

Cập nhật: 03/11/2026.

## Trang hồ sơ

- Route: `/vi/profile`, `/en/profile`. Slug cũ `/ho-so` chuyển hướng (308) về `/profile`.
- Nội dung: `src/data/profile.ts` (song ngữ `Localized`, 11 mục, thứ tự theo hồ sơ nguồn). Hiển thị: `src/app/(site)/[locale]/profile/ProfileContent.tsx`.
- Các kiểu khối: `p`, `h`, `list`, `table`, `people`, `image`, `payment`. Không còn kiểu `note`: ghi chú "chưa xác nhận" đã bỏ khỏi trang công khai.
- Thông tin thanh toán nằm cuối mục 11, kiểu `payment`: QR (`/Images/QR CODE/QR CODE.webp`), chủ tài khoản, số tài khoản, ngân hàng. Đổi thông tin ở `src/data/profile.ts`.
- Không đưa số điện thoại cá nhân lên trang.

## In / lưu PDF

- Trang `/profile` có link "In / lưu PDF" mở `/vi|en/profile/print` ở tab mới. Trang này không navbar, footer, mục lục; tự gọi `window.print()` sau khi ảnh tải xong. `noindex`, không nằm trong sitemap.
- Ctrl+P trên `/profile` cũng sạch: Navbar, Footer, BootLoader có `print:hidden`.
- Lề in do CSS: `@page profile { margin: 0 }` và class `.profile-print` (padding 14mm, `box-decoration-break: clone`). Mục đích: Chrome không in URL và ngày giờ ở đầu/chân trang. Nếu vẫn thấy, bỏ tick "Headers and footers" trong hộp thoại in.
- Ảnh QR dùng `loading="eager"` để không in ra ô trắng.

## Tuyển thành viên đang ẩn

- Cờ: `recruitmentSurfacesEnabled` trong `src/data/recruitment.ts`, hiện là `false`.
- Khi tắt: `/recruitment` trả 404 và `noindex`; không có trong sitemap và bảng route công khai; navbar và footer không có link. Navbar và footer có link "Hồ sơ CLB" (`nav.profile`).
- Mở lại: đổi cờ thành `true`. `RecruitmentClient.tsx`, `recruitmentSeo`, `nav.recruitment`, `nav.recruitmentClosedBadge` vẫn còn trong repo.
- `npm run check:routes` kiểm tra `/recruitment` công khai đúng khi cờ bật.
