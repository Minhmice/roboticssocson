# Production readiness audit — Robotics Sóc Sơn

**Date:** 2026-07-08  
**Scope:** toàn site (homepage `/`, `/course`, `/sponsor`, `/sponsorship`)  
**Quality bar:** Flagship (đủ chuẩn public launch + Google Search Console)  
**Stack:** Next.js 16 App Router · React 19 · static-first · bilingual VI/EN client-side  

Báo cáo đối chiếu checklist bạn đưa (SEO · Performance · UX/conversion · Security · Production readiness) với codebase thực tế. Mỗi mục: **Pass / Partial / Fail / N/A**, bằng chứng (file), và việc cần làm.

---

## Executive summary

| Pillar | Score | Verdict |
|--------|-------|---------|
| 1. SEO / discoverability | **4/10** | Partial — thiếu robots/sitemap; meta không unique đủ route; i18n client phá course meta |
| 2. Performance / CWV | **5/10** | Partial — WebP tốt, nhưng motion nặng; chưa đo Lighthouse; chưa Cache-Control |
| 3. UX / conversion | **4/10** | Fail cho khóa học — Google Form trống, offer tắt, thiếu trust course |
| 4. Security | **6/10** | Pass cơ bản (static, no secrets) — thiếu headers/CSP; form chưa production |
| 5. Production readiness | **4/10** | Fail — thiếu 404/500, analytics, Sentry; deploy docs tồn tại nhưng incomplete |

**Bottom line:** Site **đã đẹp và build được**, nhưng **chưa sẵn sàng “dễ có người xem + convert + monitor”**. Launch soft (preview/VPS cho đội) OK; launch public + Search Console cần đóng các P0 bên dưới.

### Top P0 (làm trước khi submit Search Console / ads)

1. `robots.ts` + `sitemap.ts` + `NEXT_PUBLIC_SITE_URL` production  
2. Metadata SSR riêng từng route; **tắt / giới hạn** `DynamicMetadata` để không ghi đè title `/course`  
3. Điền `googleFormLinks` (hoặc form thật) + bật/ tắt rõ `courseOffer`  
4. `not-found.tsx` (+ `error.tsx`)  
5. OG image PNG/JPG ≥1200×630 (đừng dùng SVG)  
6. Analytics (GA4 hoặc Plausible) + chạy Lighthouse baseline  

### Top P1 (tuần sau launch)

7. Canonical + (nếu cần) hreflang / locale URLs  
8. JSON-LD (`Organization`, `Course`, `FAQPage`)  
9. Security headers (CSP, HSTS) trên Cloudflare/nginx  
10. Trust: review phụ huynh, giảng viên, video mẫu trên `/course`  
11. Sentry (hoặc ít nhất log Cloudflare)  
12. Nav desktop CTA `min-h-[44px]`  

---

## 1. SEO / dễ có người xem

> Google: SEO giúp bot hiểu content và giúp user quyết định có vào site không.  
> Mục tiêu: mỗi URL trả lời một search intent rõ; title/description trung thực với trang.

### 1.1 Routes hiện có

| URL | Mục đích | Đánh giá slug |
|-----|----------|---------------|
| `/` | Brand / team pitch | Pass — ngắn |
| `/course` | Landing khóa học | Pass về độ ngắn; **chưa tối ưu intent tiếng Việt** |
| `/sponsor` | Quy trình tài trợ (flow) | Pass |
| `/sponsorship` | Gói / lý do tài trợ | Pass — nhưng overlap với `/sponsor` |

**Về ví dụ** `/khoa-hoc-tieng-viet-cho-nguoi-han`: đó là pattern SEO tốt (ngôn ngữ + audience trong slug). Site bạn **không** cần đúng slug đó; nếu muốn indexing khóa học VI mạnh hơn, cân nhắc:

- `/course` → `/khoa-hoc-robotics` hoặc `/khoa-hoc-tu-khoi-lenh-den-phan-cung`  
- Giữ redirect 301 từ `/course`

| Check | Status | Evidence |
|-------|--------|----------|
| URL ngắn, đọc được | **Pass** | App Router 4 route phẳng |
| Intent rõ theo URL | **Partial** | `/course` không mô tả audience/topic VI |

### 1.2 Title, description, H1 duy nhất

| Route | SSR title/description | Unique H1 | Status |
|-------|----------------------|-----------|--------|
| `/` | Chỉ inherit root `"RBS - Sponsorship Site"` | Có (`Hero.tsx`) | **Partial** |
| `/course` | Tốt qua `course/layout.tsx` + `lib/seo/course-seo.ts` | Có (`CourseHero.tsx`) | **Pass*** |
| `/sponsor` | Inherit root | Có | **Partial** |
| `/sponsorship` | Inherit root | **Không** — chỉ `h2` qua `SectionHeader` | **Fail** |

\*Sau hydrate, `DynamicMetadata` + `useDynamicMetadata.ts` **ghi đè** title mọi trang (kể cả course) về chuỗi sponsorship — **Fail cho crawler/social sau JS**.

| Check | Status | Evidence |
|-------|--------|----------|
| Mỗi page title + description | **Partial** | Root: `src/app/layout.tsx`; Course: `src/app/course/layout.tsx`, `src/lib/seo/*` |
| H1 duy nhất | **Partial** | `/sponsorship` thiếu H1 |
| Client không phá SSR meta | **Fail** | `src/components/layout/DynamicMetadata.tsx`, `src/hooks/useDynamicMetadata.ts` |

### 1.3 robots.txt, sitemap, canonical

| Check | Status | Evidence |
|-------|--------|----------|
| `robots.txt` hoặc `app/robots.ts` | **Fail** | Không có trong `src/` hay `public/` |
| `sitemap.xml` hoặc `app/sitemap.ts` | **Fail** | Không có |
| `metadataBase` | **Partial** | `layout.tsx`: `NEXT_PUBLIC_SITE_URL \|\| http://localhost:4000` |
| `alternates.canonical` | **Partial** | Chỉ `/course` (`lib/seo/metadata.ts`) |
| hreflang / locale URLs | **Fail** | i18n chỉ `localStorage` — bot không có URL EN riêng |

### 1.4 Ảnh alt, OG/Twitter, schema

| Check | Status | Notes |
|-------|--------|-------|
| Alt trên ảnh | **Partial** | `MediaPlaceholder` luôn có alt (fallback `"Image"` / caption). Cải thiện: alt cụ thể hơn caption. |
| Open Graph / Twitter | **Partial** | Có ở root + course. `/sponsor`, `/sponsorship` inherit. OG image = SVG logo — nhiều mạng bỏ qua. |
| JSON-LD | **Fail** | Không có `Organization` / `Course` / `FAQPage` |

### 1.5 Semantic / i18n SEO

| Check | Status | Notes |
|-------|--------|-------|
| `html lang` | **Partial** | SSR `lang="vi"`; client đổi `lang` — OK cho UX, yếu cho EN crawl |
| Nested `<main>` | **Fail (a11y)** | `layout.tsx` + `HomePage` / sponsor pages đều bọc `<main>` |
| `className="dark"` trên HTML | **Partial** | Theme hiện tại light (`globals.css`); class leftover |

### 1.6 Google Search Console

| Check | Status |
|-------|--------|
| Property verified + sitemap submitted | **Fail (ops)** — chưa có artifact trong repo; phải làm sau khi HTTPS + sitemap live |

### SEO — việc cần làm (chi tiết)

1. Thêm `src/app/robots.ts` (allow `/`, disallow admin nếu sau này có).  
2. Thêm `src/app/sitemap.ts` liệt kê `/`, `/course`, `/sponsor`, `/sponsorship` với `lastModified`.  
3. `generateMetadata` (hoặc layout) cho `/`, `/sponsor`, `/sponsorship`.  
4. Refactor `DynamicMetadata`: chỉ cập nhật phần UI cần thiết, **không** overwrite `document.title` / meta description của route đã có SSR (đặc biệt `/course`).  
5. Thêm `<h1>` trên `/sponsorship`; gỡ nested `<main>`.  
6. Tạo `public/Images/og-default.png` (1200×630); trỏ OG/Twitter vào đó.  
7. (Optional) redirect `/course` → slug VI; 301.  
8. JSON-LD tối thiểu: Organization + Course + FAQPage trên `/course`.  
9. Set env production: `NEXT_PUBLIC_SITE_URL=https://roboticssocson.minhmice.com`.  
10. Submit GSC sau khi HTTPS ổn định.

---

## 2. Performance / Core Web Vitals

> Target: LCP nhanh · CLS &lt; 0.1 · INP thấp.  
> **Chưa có số liệu đo thực** trong session này — các điểm dưới là tín hiệu code.

### 2.1 Ảnh

| Check | Status | Evidence |
|-------|--------|----------|
| WebP/AVIF | **Pass (WebP)** | Phần lớn `public/Images/**` là `.webp`; data refs tương ứng |
| `next/image` + `sizes` | **Pass** | `MediaPlaceholder`, heroes |
| Lazy-load mặc định | **Pass** | Next Image; `priority` chỉ hero |
| AVIF | **Partial** | Chưa cấu hình formats trong `next.config.js` |

### 2.2 JavaScript / motion

| Check | Status | Evidence |
|-------|--------|----------|
| Bundle lean | **Partial** | Nhiều client components; ~20 file `framer-motion`; GSAP/`ScrollTrigger` trong `Mission.tsx` |
| Animation nặng | **Partial** | Hero char-spring + aurora + float chips — đẹp nhưng rủi LCP/INP mobile |
| `prefers-reduced-motion` | **Pass** | Có ở Hero, course FAQ, globals |

### 2.3 Cache headers

| Check | Status | Evidence |
|-------|--------|----------|
| `Cache-Control` trong Next/nginx | **Fail / Partial** | `next.config.js` minimal; cần Cloudflare/nginx cho `/_next/static`, images |

### 2.4 Đo lường

| Check | Status |
|-------|--------|
| Lighthouse / PageSpeed baseline | **Fail (chưa chạy trong audit)** |
| RUM / CrUX | **Fail** |

### Performance — việc cần làm

1. Chạy PageSpeed trên production URL (mobile + desktop); ghi LCP/CLS/INP.  
2. Giảm motion above-the-fold trên mobile (hero ambient).  
3. Cân nhắc lazy-load section dưới fold; dynamic import GSAP.  
4. `images.formats: ['image/avif','image/webp']` trong Next config nếu phù hợp.  
5. Cache-Control: Cloudflare rule hoặc nginx cho static + `immutable` cho hashed assets.  
6. Đảm bảo font Inter không gây CLS (`display: swap` đã có trong `layout.tsx`).

**Score ước lượng (chưa đo):** Performance code signals **5/10**.

---

## 3. UX / conversion

### 3.1 Homepage

| Check | Status | Notes |
|-------|--------|-------|
| Hero: ai / học gì / lợi ích | **Partial** | Ai = đội FTC rõ; lợi ích khóa học **không** nằm hero |
| CTA rõ (“Xem khóa học”, “Đăng ký”) | **Partial** | Hero = “Liên hệ” mailto; “Xem khóa học” chỉ ở `CourseTeaser` |
| Mobile first / touch | **Partial** | Layout OK; desktop nav CTA `min-h-[30px]` (`Navbar.tsx`) |
| Trust | **Partial** | Achievements, team — không phải social proof khóa học |

### 3.2 `/course` (conversion landing)

| Check | Status | Evidence |
|-------|--------|----------|
| Hero who/what/benefit | **Pass** | `courseHero.ts` + `CourseHero.tsx` |
| CTA đăng ký | **Partial** | Primary = “Xem lộ trình”; secondary hỏi lịch; mid-CTA “Đăng ký tư vấn” |
| Funnel cấu trúc | **Partial** | Problem → Outcomes → Curriculum → Mid CTA → FAQ → Register — tốt về skeleton |
| Form ngắn + loading/success/error | **Fail** | Không có inline form; Google Form links **rỗng** (`courseRegistration.ts` L46) |
| Offer “Đăng ký ngay” | **Fail** | `courseOffer.enabled: false` → component return null |
| Reviews | **Fail** | Không có trong `src/` |
| Video mẫu | **Fail** | Chỉ ảnh hero; `settings.youtube` rỗng |
| Giảng viên | **Fail** | Không có bio/ảnh GV |
| FAQ | **Pass** | `CourseFAQ` + `courseFaq.ts` |

### 3.3 Form chung

| Surface | Status | Notes |
|---------|--------|-------|
| `ContactForm` | **Fail for prod** | Validate client OK nhưng chỉ `setSubmitted`; **không mount** trên page nào |
| Sponsor | **Partial** | Outlink Google Form / mailto / Messenger — OK nếu link live |

### UX — việc cần làm

1. Điền `googleFormLinks.vi/en` hoặc build form server-validated.  
2. Hero course: CTA chính = “Đăng ký tư vấn / học thử”.  
3. Bật offer hoặc xóa section dead.  
4. Thêm 3–5 review phụ huynh; block giảng viên; 1 video mẫu (YouTube embed hoặc file).  
5. Homepage hero: ít nhất một CTA path tới `/course`.  
6. Navbar desktop: `min-h-[44px]` cho mọi CTA.  
7. Test thật 360 / 390 / 768 / 1280 (browser hoặc Device Toolbar).

---

## 4. Security

> Site **static-first**, không auth/DB — bề mặt tấn công nhỏ. Vẫn cần hardening trước public traffic.

| Check | Status | Evidence |
|-------|--------|----------|
| Không push `.env` | **Pass** | `.gitignore`: `.env*` + `!.env.example` |
| API key chỉ server | **Pass** | Chỉ `NEXT_PUBLIC_SITE_URL` (public by design) |
| Validate form | **Partial** | ContactForm client-only; course = external form |
| HTTPS | **Partial (ops)** | Rely Cloudflare Tunnel / certbot — không encode trong Next |
| Rate limit form | **N/A / Fail** | Không có API route để limit; Google Form tự có abuse layer khi dùng |
| Security headers / CSP | **Fail** | `next.config.js` không set headers; không middleware |
| OWASP (tóm tắt) | **Partial** | No auth = no session fail; low injection; XSS low (`dangerouslySetInnerHTML` không dùng); **misconfig** = thiếu headers + fake form success |

### OWASP Top 10 mapping (rút gọn)

| Risk | Áp dụng site này? | Ghi chú |
|------|-------------------|---------|
| Broken Access Control | Thấp | Không có vùng bảo vệ |
| Cryptographic failures | Thấp | Cần HTTPS end-to-end |
| Injection | Thấp | Không DB; tránh ghép string vào HTML |
| Insecure design | Trung bình | Form “success” giả nếu mount ContactForm |
| Security misconfiguration | **Cao hơn** | Thiếu CSP/HSTS/XFO |
| Vulnerable components | Trung bình | Chạy `npm audit`; ESLint 9 pin vì Next |
| Auth failures | N/A | Không auth |
| Software/data integrity | Thấp | Deploy từ git |
| Logging/monitoring | **Fail** | Không Sentry/analytics |
| SSRF | N/A | Không server fetch user URL |

### Security — việc cần làm

1. Nginx/Cloudflare: HSTS, `X-Content-Type-Options`, `Referrer-Policy`, baseline CSP.  
2. Không ship ContactForm “success” cho đến khi có endpoint.  
3. `npm audit` định kỳ; pin major có peer conflict.  
4. Khi có form POST: validate server + rate limit (Cloudflare Turnstile / WAF).

---

## 5. Production readiness

| Check | Status | Evidence |
|-------|--------|----------|
| `npm run build` | **Pass (likely)** | Đã pass gần đây trên Next 16; nên chạy lại trước mỗi release |
| No console noise | **Pass** | Không `console.log` production; còn `console.error` load messages (OK) |
| Custom 404 | **Fail** | Không `not-found.tsx` |
| Custom 500 / `error.tsx` | **Fail** | Không có |
| Analytics GA4/Plausible | **Fail** | Không trong `src/` |
| Error tracking Sentry | **Fail** | Không `@sentry/*` |
| Backup DB/CMS | **N/A → Pass** | Nội dung = git (`src/data`, `messages`, `public`) |
| Preview trước production | **Partial** | Docs tunnel/VPS; không có CI preview tự động |
| Deploy scripts | **Partial** | Hướng dẫn README / lịch sử `deploy/` — xác nhận còn sync với stack hiện tại |

### Env checklist

```env
NEXT_PUBLIC_SITE_URL=https://roboticssocson.minhmice.com
```

Không có secret server bắt buộc hôm nay. Khi thêm form API: đưa webhook/email key **chỉ** server env (không `NEXT_PUBLIC_`).

### Production — việc cần làm

1. `src/app/not-found.tsx` branded (VI/EN).  
2. `src/app/error.tsx` (+ optional `global-error.tsx`).  
3. Plausible **hoặc** GA4 (consent nếu target EU).  
4. Sentry Next.js SDK hoặc ít nhất Cloudflare analytics errors.  
5. CI: `lint` + `build` + `check:assets` trên PR.  
6. Checklist go-live: DNS → HTTPS → env → build → PM2/CF → GSC sitemap → smoke test CTAs.

---

## Impeccable dimensional scores (technical)

Theo khung `/impeccable audit` (0–4 mỗi chiều):

| # | Dimension | Score | Key finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | **2** | Nested main; nav touch &lt;44px desktop; lang static; focus khá tốt |
| 2 | Performance | **2** | WebP tốt; motion/GSAP nặng; chưa đo CWV |
| 3 | Responsive | **3** | Grid/padding tốt; vài CTA desktop nhỏ |
| 4 | Theming | **3** | Token light rõ; `dark` class dư thừa |
| 5 | Anti-patterns | **3** | Đã bớt side-stripe; còn risk card/motion dense |
| **Total** | | **13/20** | **Acceptable** — cần work trước flagship launch |

---

## Ma trận ưu tiên (2 tuần)

### Tuần 1 — Discoverability + don’t lie to users

| ID | Task | Owner hint |
|----|------|------------|
| P0-1 | robots + sitemap | Dev |
| P0-2 | Fix metadata / DynamicMetadata | Dev |
| P0-3 | Fill Google Form links + Messenger fallback test | Product |
| P0-4 | not-found page | Dev |
| P0-5 | OG PNG + SITE_URL | Dev + Design |
| P0-6 | Lighthouse baseline ghi số | Dev |

### Tuần 2 — Convert + harden

| ID | Task | Owner hint |
|----|------|------------|
| P1-1 | Trust: FAQ giữ, thêm review + GV + video | Content |
| P1-2 | Course hero CTA → register | Dev |
| P1-3 | Security headers (CF/nginx) | Ops |
| P1-4 | Analytics + (optional) Sentry | Dev |
| P1-5 | H1 sponsorship + nested main | Dev |
| P1-6 | GSC verify + submit sitemap | Ops |

---

## Definition of Done — “sẵn sàng public”

- [ ] `https://…/robots.txt` và `/sitemap.xml` 200  
- [ ] Mỗi route: title + description SSR đúng intent; H1 duy nhất  
- [ ] View-source (không JS) của `/course` **không** bị title sponsorship  
- [ ] Lighthouse mobile: không P0 đỏ trên LCP/CLS (đặt ngưỡng team)  
- [ ] CTA đăng ký khóa học click được tới form/Messenger thật  
- [ ] 404 branded  
- [ ] Analytics nhận pageview  
- [ ] HTTPS A+ (hoặc ít nhất valid cert + redirect)  
- [ ] GSC: property verified, sitemap submitted, không soft-404 hàng loạt  

---

## Phụ lục — File quan trọng

| Area | Paths |
|------|-------|
| Root metadata | `src/app/layout.tsx` |
| Course SEO | `src/app/course/layout.tsx`, `src/lib/seo/course-seo.ts`, `src/lib/seo/metadata.ts` |
| Client meta overwrite | `src/hooks/useDynamicMetadata.ts`, `src/components/layout/DynamicMetadata.tsx` |
| Course register | `src/data/courseRegistration.ts`, `src/app/course/CourseRegister.tsx` |
| Course offer kill-switch | `src/data/courseOffer.ts` |
| Contact stub | `src/components/shared/ContactForm.tsx` |
| Nav touch | `src/components/layout/Navbar.tsx` |
| Next config | `next.config.js` |
| Env example | `.env.example` (nếu có trong tree) |

---

*Báo cáo sinh từ audit codebase (impeccable audit mindset + checklist launch). Không thay thế Lighthouse đo trên domain production.*
