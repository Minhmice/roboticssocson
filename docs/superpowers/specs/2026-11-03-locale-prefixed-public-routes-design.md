# Locale-prefixed English public routes
> **Amended by** `2026-11-03-smart-url-routing-design.md`: §2.2 (404 without redirect), §3.2 rule 3, and the out-of-scope "Redirect compatibility" item no longer apply. Locale-less paths and legacy slugs now redirect; unknown paths still 404.


Ngày: 03/11/2026  
Trạng thái: Thiết kế đã được người dùng duyệt; chờ duyệt bản spec trước khi lập kế hoạch triển khai.

## 1. Mục tiêu

Chuẩn hóa toàn bộ URL public của website thành slug tiếng Anh và luôn có tiền tố locale:

- Vietnamese: `/vi/...`
- English: `/en/...`

Trang hồ sơ dùng `/vi/profile` và `/en/profile`. Không còn slug public tiếng Việt như `/ho-so` hoặc `/luat-ftc`. URL cũ và URL không có locale trả `404`; không tạo redirect tương thích.

Mục tiêu không đổi nội dung, dữ liệu, thiết kế hoặc hành vi nghiệp vụ của các trang. Thay đổi chỉ tập trung vào public URL contract, locale routing, internal links, metadata và sitemap.

## 2. URL contract

### 2.1. Route chuẩn

Mỗi route trong bảng là suffix dùng chung cho hai locale:

| Suffix | Vietnamese | English |
|---|---|---|
| `/` | `/vi` | `/en` |
| `/profile` | `/vi/profile` | `/en/profile` |
| `/fundraising` | `/vi/fundraising` | `/en/fundraising` |
| `/recruitment` | `/vi/recruitment` | `/en/recruitment` |
| `/contact-us` | `/vi/contact-us` | `/en/contact-us` |
| `/course` | `/vi/course` | `/en/course` |
| `/course-register-form` | `/vi/course-register-form` | `/en/course-register-form` |
| `/course-register-form/success` | `/vi/course-register-form/success` | `/en/course-register-form/success` |
| `/resources` | `/vi/resources` | `/en/resources` |
| `/ftc-rules` | `/vi/ftc-rules` | `/en/ftc-rules` |
| `/resources/{category}` | `/vi/resources/{category}` | `/en/resources/{category}` |
| `/resources/{category}/{slug}` | `/vi/resources/{category}/{slug}` | `/en/resources/{category}/{slug}` |

Resource category and article slugs already come from English data IDs and remain unchanged. Move the existing rules manual from `/resources/rules` to the approved top-level `/ftc-rules` suffix for both locales.

### 2.2. URL không hợp lệ

Các URL sau phải trả `404`, without redirect:

- Mọi public path không có locale: `/`, `/profile`, `/fundraising`, `/course`, `/resources`, `/contact-us`, `/ho-so`, `/luat-ftc`, `/resources/rules`.
- Mọi Vietnamese path cũ: `/vi/ho-so`, `/vi/luat-ftc`, `/vi/resources/rules`.
- Mọi English path cũ hoặc trùng slug: `/en/ho-so`, `/en/luat-ftc`, `/en/resources/rules`.
- `/profile` không phải alias của `/en/profile`; nó là URL không có locale và trả `404`.

`/vi` và `/en` là hai ngoại lệ không có trailing route segment: đây là canonical home URL của từng locale.

Internal routes, API routes, analytics, internal deck routes, asset URLs and files with extensions remain outside this public URL contract.

## 3. Routing architecture

### 3.1. Filesystem

Public App Router directories under `src/app/(site)/[locale]/` use English slug names:

- Move profile page implementation from `ho-so/` to `profile/`.
- Delete the obsolete `ho-so/` route directory after all imports and links migrate.
- Keep existing English directories (`course`, `course-register-form`, `contact-us`, `fundraising`, `recruitment`, `resources`).
- Move the rules manual route from `resources/rules/` to `ftc-rules/`; migrate imports, metadata, search results, navigation and all links to `/ftc-rules`.

Shared profile rendering may live in a focused component/data module, but only one canonical page entry exists per locale path. The page receives the `[locale]` route parameter and rejects unsupported values through the existing locale validation.

The site layout continues to generate static params for `vi` and `en`. Unknown locale segments remain not found.

### 3.2. Proxy

`src/proxy.ts` must stop rewriting an unprefixed request to `/vi/...` and stop redirecting `/vi/...` to an unprefixed URL.

Required behavior:

1. `/vi` and `/vi/*` pass through to the `[locale]` route.
2. `/en` and `/en/*` pass through to the `[locale]` route.
3. Other public requests are not rewritten to a locale; normal Next routing returns `404`.
4. Existing exclusions for API, analytics, internal deck, assets and file extensions remain unchanged.

No proxy redirect is added for old slugs. This makes the canonical contract enforceable and prevents old links from silently becoming new public URLs.

### 3.3. Locale path helpers

`src/lib/i18n/routes.ts` becomes the single URL construction convention:

- `PREFIX` is `{ vi: "/vi", en: "/en" }`.
- `localizedHref("/profile", "vi")` returns `/vi/profile`.
- `localizedHref("/profile", "en")` returns `/en/profile`.
- `localizedHref("/", locale)` returns `/vi` or `/en`.
- Query strings and hashes are preserved.
- Already-prefixed paths normalize to the target locale rather than producing a double prefix.
- `stripLocale` removes only a leading `/vi` or `/en` for comparison/helper use; it does not imply an unprefixed public URL.
- `switchLocalePath` converts `/vi/x` to `/en/x` and `/en/x` to `/vi/x`, preserving query strings and hashes.

All internal links use `localizedHref`, `LocaleLink`, `BootLink`, `CTAButton`, or an equivalent existing wrapper. No component may hand-build `/en/...` or unprefixed public paths when a locale-aware helper applies.

The helper handles route identity by suffix, not by Vietnamese aliases. `/ho-so` and `/luat-ftc` are not accepted as valid public route inputs after migration.

## 4. SEO, sitemap and language switching

### 4.1. Metadata

Each page's locale-neutral `canonicalPath` remains the English suffix (`/profile`, `/fundraising`, `/ftc-rules`, etc.). The metadata builder localizes it into:

- canonical `/vi/<suffix>` for Vietnamese;
- canonical `/en/<suffix>` for English;
- `alternates.languages.vi` and `.en` with the same locale-prefixed paths;
- `x-default` pointing to the Vietnamese canonical home/path according to the existing convention.

Profile metadata must produce `/vi/profile` and `/en/profile`; it must never produce `/ho-so` or `/en/ho-so`.

### 4.2. Sitemap

`src/app/sitemap.ts` uses one suffix per route and generates both locale URLs through `localizedHref`. Remove route-specific `enPath` exceptions after the common prefix model is in place. Sitemap output must contain only locale-prefixed public URLs and must not contain `/ho-so`, `/luat-ftc`, `/profile` without `/en`, or any other unprefixed public URL.

### 4.3. Language toggle

Language switching preserves the current route suffix:

- `/vi/profile` ↔ `/en/profile`;
- `/vi/ftc-rules` ↔ `/en/ftc-rules`;
- `/vi/resources/<category>/<slug>` ↔ `/en/resources/<category>/<slug>`.

The toggle must not navigate to a Vietnamese slug, an unprefixed path, or an obsolete route.

## 5. Content and component boundaries

In scope:

- Route directory names and page entry points.
- Proxy locale behavior.
- `localizedHref`, `stripLocale`, `switchLocalePath` and callers that rely on their URL contract.
- Internal links, navigation links, CTA links and route comparisons that must use the new prefix.
- Canonical metadata, hreflang alternates, sitemap entries and route-specific SEO data.
- Existing route tests or smoke checks that assert old paths.

Out of scope:

- Copy, translations, content data and visual redesign.
- API, analytics, internal deck and asset routes.
- Redirect compatibility for old public URLs.
- New CMS, database, middleware service or dependency.
- Changes to the site information architecture beyond slug/prefix normalization.

## 6. Error and edge behavior

- Unsupported locale values (`/fr/...`, `/profile` interpreted as a locale segment, etc.) use the existing not-found path.
- Old Vietnamese slugs return the normal 404 page and do not expose profile content.
- Missing resource category/article routes retain existing not-found behavior.
- Query strings and hash fragments do not change route validity; they remain attached to the canonical path.
- Direct loads, hard refreshes, navigation, language switching and shared canonical URLs all use the same route contract.

## 7. Acceptance tests

### Route behavior

- `/vi` returns `200`.
- `/en` returns `200`.
- `/vi/profile` returns `200` with Vietnamese metadata/content.
- `/en/profile` returns `200` with English metadata/content.
- `/profile`, `/fundraising`, `/ho-so`, `/luat-ftc`, `/resources/rules`, `/vi/ho-so`, `/vi/luat-ftc`, `/vi/resources/rules`, `/en/ho-so`, `/en/luat-ftc`, `/en/resources/rules` return `404`.
- Existing internal/API paths retain their current behavior.

### Consistency

- Search every source callsite for `ho-so`, `luat-ftc`, unprefixed public paths and hard-coded locale links.
- Confirm all route builders and language toggles use the same prefix convention.
- Confirm no `enPath` or route-specific exception remains where the common suffix model applies.
- Confirm no duplicate profile page implementation remains after moving the route.

### SEO and discovery

- `/vi/profile` canonical is `/vi/profile` and English alternate is `/en/profile`.
- `/en/profile` canonical is `/en/profile` and Vietnamese alternate is `/vi/profile`.
- Sitemap includes both profile URLs and excludes old/unprefixed variants.
- Rendered navigation contains locale-prefixed hrefs only.

### Verification commands

- `npm run lint`.
- `npm run check:i18n`.
- `npm run check:assets`.
- `npm run build`.
- A production smoke server or equivalent HTTP check for every route behavior above.
- Browser check for hard load, language switch, direct profile/resource route, keyboard focus and no horizontal overflow at mobile and desktop widths.

## 8. Rollout order

1. Update route helpers and proxy contract.
2. Rename/move profile route and remove obsolete Vietnamese route directories.
3. Migrate every internal link and route comparison.
4. Update metadata, sitemap and language switching.
5. Run consistency search before verification.
6. Run the full lint/i18n/assets/build suite and HTTP/browser smoke checks.

No code implementation begins until this spec is reviewed and approved. After approval, create a separate implementation plan covering the migration in the order above.
