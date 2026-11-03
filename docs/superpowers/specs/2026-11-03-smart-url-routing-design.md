# Smart URL routing — Design

Date: 2026-11-03
Status: approved in chat (4 sections), amended for 404 mechanism
Supersedes: §2.2, §3.2 rule 3, and the "Redirect compatibility" out-of-scope item of
`2026-11-03-locale-prefixed-public-routes-design.md`.

## 1. Goal

Wrong or old URLs land on the right page in one redirect. Unknown URLs get a branded,
bilingual 404 that suggests the page the visitor probably wanted. Locale-prefixed URLs
(`/vi/...`, `/en/...`) remain the only canonical public URLs.

Five behaviours:

1. **Language at `/` and any locale-less path:** cookie → browser → `vi`.
2. **Legacy slugs redirect** to their new page, in both locales.
3. **Typo normalisation:** case, trailing slash, duplicate slashes, `/vn`.
4. **Unknown paths 404 directly**, without first redirecting to `/vi/...`.
5. **404 page suggests** up to 3 close matches.

## 2. Shared route table

New module `src/lib/routes/public-routes.ts`. Pure data and functions; imports only
`@/data/resources`, `@/data/courseRegistration` and type-only i18n modules. No React,
no Next imports, so the proxy, sitemap and 404 view can all use it.

### 2.1 Public routes

Each route is a locale-less suffix:

| Suffix | Label vi | Label en | Sitemap |
|---|---|---|---|
| `/` | Trang chủ | Home | weekly, 1 |
| `/fundraising` | Gây quỹ | Fundraising | weekly, 0.9 |
| `/profile` | Hồ sơ CLB | Club profile | weekly, 0.9 |
| `/recruitment` | Tuyển thành viên | Recruitment | monthly, 0.85 |
| `/contact-us` | Liên hệ | Contact | monthly, 0.8 |
| `/resources` | Tài nguyên | Resources | weekly, 0.85 |
| `/resources/community` | Hỏi đáp | Q&A | weekly, 0.6 |
| `/ftc-rules` | Luật FTC | FTC rules | weekly, 0.85 |
| `/course` * | Khóa học | Course | weekly, 0.9 |
| `/course-register-form` * | Đăng ký khóa học | Course registration | weekly, 0.85 |
| `/course-register-form/success` * | Đăng ký thành công | Registration complete | not listed |

\* Only when `courseSurfacesEnabled` is true.

Data-driven routes, same rules as each page's `generateStaticParams`:

- `/resources/{category.id}` for every category except `rules`. In the sitemap only
  when the category is not `programming` and has at least one `ready` article
  (monthly, 0.75).
- `/resources/{article.categoryId}/{article.slug}` for every article. In the sitemap
  only when `ready` and not `programming` (monthly, 0.7). Label = article title.

Pattern route:

- `/resources/community/{id}` where `id` matches `^\d{1,9}$`. Valid shape only; the
  page itself 404s when the question does not exist. Never in the sitemap.

### 2.2 Legacy aliases

| Old prefix | New route |
|---|---|
| `/ho-so` | `/profile` |
| `/luat-ftc` | `/ftc-rules` |
| `/resources/rules` | `/ftc-rules` |
| `/sponsor` | `/fundraising` |
| `/sponsorship` | `/fundraising` |

An alias matches the exact segment or any sub-path (`/luat-ftc/abc` → `/ftc-rules`;
the tail is dropped). Applies with no locale, with `/vi` and with `/en`.

### 2.3 Exports

```ts
export type RouteLabel = { vi: string; en: string };
export type SitemapMeta = { changeFrequency: "weekly" | "monthly"; priority: number };

export function isPublicRoute(suffix: string): boolean;
export function resolveLegacy(suffix: string): string | null;
export function suggestRoutes(suffix: string, limit: number): { path: string; label: RouteLabel }[];
export function sitemapRoutes(): ({ path: string } & SitemapMeta)[];
```

`suffix` is always locale-less, lower-case, starts with `/`, no trailing slash
(except `/`).

## 3. Request resolution (proxy)

Proxy decisions move into a pure function so they are testable without a server.

`src/lib/routes/resolve-request.ts`:

```ts
export type Resolution =
  | { kind: "next" }
  | { kind: "redirect"; location: string; status: 307 | 308 }
  | { kind: "notFound"; locale: Locale };

export function resolveRequest(input: {
  pathname: string;
  search: string;
  cookieLocale: string | undefined;
  acceptLanguage: string | null;
}): Resolution;

export function pickLocale(cookieLocale: string | undefined, acceptLanguage: string | null): Locale;
```

Order:

1. **Normalise:** collapse `//+` to `/`; drop trailing `/` (not on `/`); lower-case.
2. **Locale segment:** first segment `vi` or `en` → keep it. `vn` → `vi`. Otherwise the
   locale is missing and `pickLocale` chooses one.
3. **Legacy:** `resolveLegacy(suffix)` replaces the suffix when it matches.
4. **Unknown:** if `!isPublicRoute(suffix)` → `{ kind: "notFound", locale }`. No redirect.
5. **Compare:** canonical = `/{locale}{suffix === "/" ? "" : suffix}` + original search.
   Equal to the request → `next`. Different → `redirect`.

Status:

- **307** when the locale was missing (destination depends on the visitor). Response
  carries `Vary: Cookie, Accept-Language`.
- **308** otherwise (legacy slug, typo, `/vn`): permanent, passes ranking to the new URL.

`pickLocale`:

1. Cookie `NEXT_LOCALE` equal to `vi` or `en` → that value. Anything else is ignored.
2. `Accept-Language`: `en` only when its highest q for any `en*` tag is strictly greater
   than the highest q for any `vi*` tag (missing tag = 0, missing q = 1).
3. Otherwise `vi`.

`src/proxy.ts` becomes a thin adapter:

- `next` → `NextResponse.next()`
- `redirect` → `NextResponse.redirect(url, status)`, plus `Vary` on 307
- `notFound` → `NextResponse.rewrite('/{locale}{suffix}')`. The path matches no route,
  so Next renders the global 404 with status 404. Address bar is unchanged, and
  `usePathname()` on the 404 page reports the rewritten path, so it carries both the
  locale and the original suffix.

Matcher unchanged: `_next/`, `api/`, `ingest/`, `analytics`, `course/arduino-mblock-deck`,
`Images/`, `Logo/` and paths with a file extension are excluded.

## 4. Language cookie

`LanguageToggle` sets the cookie in its existing `onClick`, before navigation:

```
NEXT_LOCALE={code}; Path=/; Max-Age=31536000; SameSite=Lax
```

Written on every click, including the active locale. Never written by the proxy or by
visiting an `/en` link. Not `HttpOnly`: holds no sensitive data and is written client-side.

## 5. 404 page

**Amendment to the approved design:** `[locale]/not-found.tsx` is never reached for
unmatched URLs, because `[locale]/layout.tsx` is the root layout and sets
`dynamicParams = false`. Next 16 documents `app/global-not-found.tsx` for exactly this
setup (root layout behind a dynamic segment). It is marked experimental; the
user accepted that risk.

- `next.config.js`: `experimental.globalNotFound: true`.
- `src/app/global-not-found.tsx`: full HTML document (`<html>`, `<body>`, imports
  `./globals.css`), `metadata.title` "404", `robots: noindex`. Renders `NotFoundView`.
- `src/components/shared/NotFoundView.tsx` (client): reads `usePathname()`, takes the
  locale from the first segment (`en` → English, else Vietnamese) and the suffix via
  `stripLocale`. Wraps its content in its own `LanguageProvider locale={locale}
  messages={{}}`, because `global-not-found` sits outside `RootShell` and
  `StatusBoard` → `CTAButton` calls `useLanguage()` (only `locale` is read; no `t()`).
  Renders `StatusBoard` with:
  - existing copy and actions; "Back home" / "Về trang chủ" points to `/` and is
    localised by `CTAButton` to `/{locale}`;
  - when `suggestRoutes(suffix, 3)` is non-empty, a "Có phải bạn muốn tìm:" /
    "Did you mean:" list of links built with `localizedHref`.
- `src/app/(site)/[locale]/not-found.tsx` renders the same `NotFoundView` for
  request-time `notFound()` calls (e.g. a missing community question).

Suggestions are computed during render from `usePathname()`, so they are in the
server HTML, with no client-only flash. `public-routes` (and `@/data/resources`) is a
static import of the two 404-only modules; Next code-splits both, so other pages do
not load it. No BootLoader exists on the global 404, so `requestBootNavigation`
returns false and CTA links navigate normally.

### 5.1 Suggestion ranking

Candidates: every public route plus every resource article. For the request suffix:

1. **Prefix:** the last segment of the request is a prefix (≥ 3 chars) of a candidate's
   last segment. Score 0.
2. **Typo:** Levenshtein distance between last segments ≤ `max(2, floor(len * 0.3))`.
   Score = distance.
3. **Article slug:** request's last segment is a prefix or within the typo limit of an
   article slug. Same scores.

Sort by score, then shorter path. Deduplicate. Return at most `limit`. Empty when
nothing qualifies (`/qqqqqq` → []).

Example targets:

| Request | First suggestion |
|---|---|
| `/vi/fundrasing` | `/fundraising` |
| `/vi/profle` | `/profile` |
| `/vi/fund` | `/fundraising` |
| `/vi/encoder-driving` | `/resources/programming/autonomous-encoder-driving` |

## 6. Sitemap

`src/app/sitemap.ts` maps `sitemapRoutes()` to absolute URLs with the existing
`toAbsoluteUrl` and `alternates.languages`. Its own route list and resource loops are
removed. Output must be identical in content to the current sitemap.

## 7. Testing

Project convention: `*.check.mts` run with `node --experimental-strip-types`, no framework.

- `src/lib/routes/public-routes.check.mts`:
  - every legacy alias, with sub-paths, maps correctly;
  - `isPublicRoute` for static, course-gated, category, article and community patterns,
    and rejects `/resources/rules`, `/resources/community/abc`;
  - `suggestRoutes` for the §5.1 examples and `/qqqqqq` → [];
  - **sync check:** every public static route has a `page.tsx` under
    `src/app/(site)/[locale]/`, and every non-dynamic `page.tsx` there (outside
    `[param]` dirs) is listed. Course routes are checked only when enabled.
- `src/lib/routes/resolve-request.check.mts`: every row of the §8 table, `pickLocale`
  cases (cookie wins; malformed cookie ignored; `en-US,en;q=0.9,vi;q=0.8` → `en`;
  `vi,en;q=0.9` → `vi`; missing header → `vi`), and `Vary` intent via status 307.
- Add both to an npm script `check:routes`.
- **Smoke on `next build && next start`:** the §8 table (status, `Location`, `Vary`);
  `/` with `Accept-Language: en-US` and with cookie `NEXT_LOCALE=vi`; the raw HTML of
  `/vi/fundrasing` and `/fundrasing` contains "Có phải bạn muốn tìm" and a link to
  `/vi/fundraising`; the raw HTML of `/en/profle` is English with a link to
  `/en/profile`; `/vi/resources/community/999999` shows the branded 404; one browser
  check of `/vi/fundrasing` at 390px.

## 8. Behaviour table

| Request | Result |
|---|---|
| `/` (no cookie, `Accept-Language: en-US`) | 307 → `/en` |
| `/` (no cookie, no header) | 307 → `/vi` |
| `/` (cookie `NEXT_LOCALE=en`) | 307 → `/en` |
| `/fundraising?ref=fb` (no cookie) | 307 → `/vi/fundraising?ref=fb` |
| `/HO-SO/` | 307 → `/vi/profile` |
| `/en/luat-ftc` | 308 → `/en/ftc-rules` |
| `/en/ho-so` | 308 → `/en/profile` |
| `/vi/resources/rules` | 308 → `/vi/ftc-rules` |
| `/sponsor` | 307 → `/vi/fundraising` |
| `/vn/fundraising` | 308 → `/vi/fundraising` |
| `/vi/profile/` | 308 → `/vi/profile` |
| `/vi//profile` | 308 → `/vi/profile` |
| `/VI/Profile` | 308 → `/vi/profile` |
| `/vi/` | 308 → `/vi` |
| `/vn` | 308 → `/vi` |
| `/vi` | next |
| `/xyz` | 404 (rewrite, URL unchanged) |
| `/vi/xyz` | 404 (rewrite) |
| `/vi/resources/community/42` | next |
| `/vi/resources/community/abc` | 404 |
| `/vi/fundraising?ref=fb` | next |
| `/en/profile` | next |

## 9. Out of scope

- New locales, geo-IP detection.
- API, `analytics`, internal deck, asset routes.
- Full-text search on the 404 page; matching is path and slug only.
- New dependencies. Levenshtein is local (~15 lines).
- Copy or visual redesign of `StatusBoard`.

## 10. Risks

- `globalNotFound` is experimental. Mitigation: the smoke check in §7 fails loudly if a
  Next upgrade changes it.
- A new page added without a route-table entry 404s when requested without locale.
  Mitigation: the sync check in §7.
- The proxy bundle includes `@/data/resources` (~700 lines of strings). Acceptable;
  no React or MDX is pulled in.
- §5 assumes `usePathname()` on the global 404 reports the proxy-rewritten path
  (observed earlier in this repo; see the old BootLoader comment). If it reports the
  browser path instead, `/xyz` still works (locale defaults to `vi`), but an English
  visitor's locale-less 404 would render in Vietnamese. The §7 smoke checks
  `/fundrasing` HTML, which exercises exactly this path.
