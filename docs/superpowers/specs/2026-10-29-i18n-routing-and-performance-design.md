# Thiết kế: i18n theo URL, chuẩn dữ liệu một dạng, SEO song ngữ, giảm JS client

Ngày: 2026-10-29. Trạng thái: đã duyệt qua 4 phần trong hội thoại.

## Mục tiêu

1. Server render đúng ngôn ngữ từ URL. Hết hydration mismatch do đọc `localStorage` khi khởi tạo state.
2. Client chỉ nhận messages của một ngôn ngữ.
3. SEO tiếng Anh có thật: `/en/...` với `<html lang>`, metadata, canonical, hreflang, sitemap, JSON-LD đúng ngôn ngữ.
4. Một chuẩn dữ liệu cho nội dung trang: `Localized<T> = { vi: T; en: T }`.
5. Giảm JS client bằng LazyMotion. Không gửi trùng web vitals.

## Không làm

- Không thêm Paraglide, `next-sitemap`, SVGO. Lý do: messages thô chỉ 9.6 KB; Paraglide cần `--webpack`; `sitemap.ts` của Next có sẵn `alternates.languages`; repo chỉ có 2 SVG, tổng 8.5 KB.
- Không đụng `src/legacy/` (đã loại khỏi `tsconfig.json` và ESLint, không file ngoài import).
- Không đổi ternary inline `locale === "vi" ? ... : ...` (logic bố cục và chữ cục bộ).
- Không dọn chữ hai ngôn ngữ trong `src/data/*.ts` khỏi bundle client. Phần 3 mở đường, chưa làm.
- Plan cũ `docs/superpowers/plans/2026-10-29-locale-performance.md`: Task 2 redirect `/` về `/vi/*` bị thay bằng thiết kế dưới đây (tiếng Việt giữ URL cũ). Task 5 và 6 (bootloader, Lighthouse) ngoài phạm vi.

## 1. Routing

```
src/app/
  (site)/[locale]/        root layout: <html lang={locale}>, nạp messages 1 ngôn ngữ
    page.tsx fundraising/ recruitment/ contact-us/
    course/ course-register-form/ (gồm success/)
  (internal)/             root layout: lang="vi"
    course/arduino-mblock-deck/  analytics/  api/
  sitemap.ts robots.ts not-found.tsx error.tsx
src/proxy.ts
```

`src/proxy.ts`:

| Request | Hành vi |
|---|---|
| `/`, `/fundraising`, `/course`... | rewrite nội bộ sang `/vi/...` (URL giữ nguyên) |
| `/en`, `/en/...` | đi thẳng |
| `/vi`, `/vi/...` | redirect 308 về đường dẫn không tiền tố |
| deck, `/analytics`, `/api`, `/ingest`, `_next`, `Images`, `Logo`, file có đuôi | bỏ qua |

- Proxy không đọc cookie hay `Accept-Language`. Trang giữ prerender tĩnh.
- `generateStaticParams` trả `vi`, `en`. `dynamicParams = false`. Locale lạ trả 404.
- Deck, analytics, api nằm ngoài `[locale]`, chỉ tiếng Việt.
- `redirects()` trong `next.config.js` (`/sponsor`, `/sponsorship` về `/fundraising`) thêm bản `/en`.
- Mọi link nội bộ đi qua `localizedHref(path, locale)` ở `src/lib/i18n/routes.ts`; kèm `stripLocale(pathname)`.

## 2. Provider và messages

- `src/lib/i18n/messages.ts` (server): `loadMessages(locale)` dùng `import()` động. JSON không còn vào bundle client.
- `LanguageProvider` nhận `{ locale, messages }` qua props. Bỏ `useSyncExternalStore`, `localStorage`, `overrideLocale`, `setLocale`, hiệu ứng mờ `body.opacity`. Context còn `{ locale, messages, t }`; chữ ký `useLanguage()` giữ nguyên.
- `LanguageToggle` là `<Link>` tới URL ngôn ngữ kia, giữ hash và query. Giữ event `LANGUAGE_SWITCHED` trong `onClick`.
- Xóa `VietnameseOnlyLanguageProvider`, `DynamicMetadata`, `useDynamicMetadata`.
- Phần dùng chung hai root layout (font Inter, `globals.css`, boot-loader script, Analytics, PostHog) tách thành `RootShell`.
- Rủi ro cần kiểm khi làm: nút đổi ngôn ngữ là điều hướng thật, có thể kích hoạt bootloader. Quyết định dùng `BootLink` hay `Link` sau khi đọc `BootLink` và `boot-loader.ts`.

## 3. Chuẩn dữ liệu

| Loại chữ | Chỗ chứa | Cách đọc |
|---|---|---|
| Nội dung trang | `src/data/*.ts` dạng `Localized<T>` | `localize(field, locale)` |
| Chữ khung dùng chung nhiều route | `messages/*.json` | `t("key")` |
| Chữ gắn một component | ternary inline | giữ nguyên |

Bước theo thứ tự, mỗi bước build xanh:

1. Đổi `getLocalized` thành `localize` (23 file, 168 chỗ). Xóa `lib/course/getLocalized.ts`; `LocalizedText`, `CourseLocale` chuyển vào `lib/i18n`.
2. Chụp trước: script tạm gom mọi cặp `x_vi`/`x_en` thành `{đường dẫn: {vi, en}}`, lưu JSON.
3. Chuyển từng file data `title_vi`/`title_en` sang `title: { vi, en }` (7 file `src/data`, 7 component). `tsc` chỉ ra component phải sửa.
4. Chụp lại, so với bước 2: phải khớp từng đường dẫn.
5. Xóa `useTranslatedData` và `getField`.

Xử lý tay: `Mission.tsx` (tách tiếng Anh theo vị trí đoạn `split("\n\n")[pIdx]`), `TeamCarousel.tsx` và `achievements.ts` (fallback `caption_vi || caption`). `Localized<T>` bắt buộc đủ hai ngôn ngữ; chỗ đang thiếu tiếng Anh sẽ lộ ra, liệt kê cho chủ dự án quyết định, không tự dịch.

## 4. SEO

- `buildMetadata(seo, locale)` sinh canonical tuyệt đối theo locale, `alternates.languages` (`vi`, `en`, `x-default` = vi), `openGraph.locale` (`vi_VN`, `en_US`) và `alternateLocale`.
- Mỗi `page.tsx` có `generateMetadata({ params })`. `course/layout.tsx` đổi theo locale, giữ nhánh `noindex` khi `courseSurfacesEnabled = false`.
- `sitemap.ts` xuất 2 URL mỗi route, mỗi URL có `alternates.languages`. Lọc theo `courseSurfacesEnabled`.
- `robots.ts`: khi tắt course, ẩn cả `/en/course`, `/en/course-register-form`.
- JSON-LD dùng `schema-dts` (devDependency, chỉ kiểu): `getCourseJsonLd(locale)` kiểu `WithContext<Course>` (đổi `name`, `description`, `url`, `inLanguage` theo locale); `getOrganizationJsonLd(locale)` kiểu `WithContext<EducationalOrganization>`, mạng xã hội lấy từ `src/data/settings.ts` (`socials`), bỏ giá trị rỗng. Organization đặt trong `(site)/[locale]/layout.tsx`.

## 5. Hiệu năng client

- `AppShell`: `<LazyMotion features={domAnimation} strict>`. `strict` để bất kỳ `motion` đầy đủ nào còn sót ném lỗi.
- Đổi 42 file `motion` sang `m`. Thêm rule ESLint `no-restricted-imports` cấm import `motion`.
- `layoutId` (ở `AboutFTC.tsx` dòng 279 và 335, `CourseFunnelTrendChart.tsx` dòng 197) không thuộc `domAnimation`. Hai component đó nạp `domMax` cục bộ, giữ nguyên giao diện.
- Web vitals: không thêm `useReportWebVitals`. posthog-js 1.399.1 có `capture_performance` với `web_vitals_allowed_metrics`. Bật trong `src/instrumentation-client.ts`. Cần cờ web vitals phía dự án PostHog; báo nếu tắt. Xác nhận danh sách metric hỗ trợ trước khi ghi (TTFB có thể không có).
- Sửa lệch có sẵn: `AnimatedComponents.tsx` dòng 159 mặc định `once = false` ghi đè `animationConfig.once = true`; xác nhận `RecruitmentDialog` còn `priority` và `loading="eager"` cho ảnh FTC Image 2.

## 6. Dọn và kiểm chứng

- `check-i18n` mở rộng: quét `t("...")` trong `src`; báo key mồ côi trong JSON và `t()` gọi key không tồn tại.
- Knip chạy cuối. Entry: `src/app/**/{page,layout,template,default,loading,error,not-found,route,sitemap,robots}`, `src/proxy.ts`, `src/instrumentation-client.ts`, `next.config.js`, `scripts/*.mjs`. Bỏ qua `src/legacy`. Chỉ xóa cái xác nhận không ai import.
- Verify cuối: `check:i18n`, `check:assets`, `lint`, `build`; `next start` rồi `curl` từng route ở `/` và `/en/...` kiểm `<html lang>`, `<title>`, canonical, hreflang, JSON-LD; `/sitemap.xml` đủ cặp `xhtml:link`; chuỗi riêng của `en.json` không xuất hiện trong chunk client của route `vi` và ngược lại; so kích thước chunk JS của `/` trước và sau LazyMotion.

## Hệ quả chấp nhận

- Số trang build tăng khoảng 20 lên 32.
- Người dùng cũ có `localStorage="en"` vào bản tiếng Việt lần đầu.
- Mất hiệu ứng mờ khi đổi ngôn ngữ (thay bằng điều hướng thật).
