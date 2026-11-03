# Smart URL Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wrong or old URLs reach the right page in one redirect, unknown URLs get a bilingual branded 404 that suggests close matches, and visitors without a locale land in their language.

**Architecture:** One pure route table (`src/lib/routes/public-routes.ts`) feeds three consumers: a pure request resolver used by `src/proxy.ts`, `src/app/sitemap.ts`, and a shared `NotFoundView`. The proxy becomes a thin adapter over `resolveRequest()`. Next's experimental `global-not-found` renders the 404 for unmatched URLs, because the root layout sits behind the dynamic `[locale]` segment.

**Tech Stack:** Next.js 16.2 App Router (Turbopack, `src/proxy.ts`), React 19, TypeScript 6 strict, Node 20+ checks via `node --experimental-strip-types *.check.mts`, no test framework, no new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-03-smart-url-routing-design.md`

## Global Constraints

- No new dependencies. Levenshtein is written locally.
- Every canonical public URL is `/vi/...` or `/en/...`. `canonical`/`hreflang` metadata is not changed.
- Status codes: `307` when the locale was missing (with `Vary: Cookie, Accept-Language`); `308` for every other redirect.
- Cookie: `NEXT_LOCALE={vi|en}; Path=/; Max-Age=31536000; SameSite=Lax`, written only by `LanguageToggle` clicks. Name exported once as `LOCALE_COOKIE` from `src/lib/i18n/locales.ts`.
- Modules imported by a `.check.mts` file use **relative imports with a `.ts` extension** for runtime values and `import type` for types. This needs `"allowImportingTsExtensions": true` (added in Task 1; safe because `noEmit` is already `true`).
- Proxy matcher stays exactly as is (excludes `_next/`, `api/`, `ingest/`, `analytics`, `course/arduino-mblock-deck`, `Images/`, `Logo/`, and paths with a file extension).
- UI follows `DESIGN.md`: tech blue `text-primary`, visible focus rings, touch targets `min-h-11` (44px), bilingual copy with equal dignity.
- **The working tree contains uncommitted user work** (homepage components, `src/app/(site)/[locale]/resources/community/`, an edit to `src/app/sitemap.ts`, API routes). Never `git add -A` or `git add .`. Each task commits only the files it lists. The `/resources/community` routes come from that work; keep them.
- **CRLF hazard:** some files use CRLF. If an edit tool doubles every line break (diff shows the whole file changed), run `git checkout -- <file>` when the file was clean before the task, or restore from your own copy, then apply the change as an exact string replacement and confirm `git diff --ignore-space-at-eol --stat` shows only your lines.
- A dev server may already listen on `:4000` (`next dev -p 4000`). Reuse it for dev smoke; if none is running, start `npx next dev -p 4000`. Production smoke uses `npx next start -p 4010`.

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `tsconfig.json` | modify | allow `.ts` import extensions |
| `src/lib/routes/public-routes.ts` | create | route table, legacy aliases, `isPublicRoute`, `resolveLegacy`, `suggestRoutes`, `sitemapRoutes` |
| `src/lib/routes/public-routes.check.mts` | create | unit + page/table sync checks |
| `src/lib/routes/resolve-request.ts` | create | `pickLocale`, `resolveRequest` (pure) |
| `src/lib/routes/resolve-request.check.mts` | create | behaviour table checks |
| `src/lib/i18n/locales.ts` | modify | `LOCALE_COOKIE` |
| `src/proxy.ts` | modify | thin adapter over `resolveRequest` |
| `scripts/smoke-routes.mjs` | create | HTTP smoke against a running server |
| `src/app/sitemap.ts` | modify | read `sitemapRoutes()` |
| `src/components/shared/LanguageToggle.tsx` | modify | write the cookie on click |
| `src/components/shared/StatusBoard.tsx` | modify | optional `children` slot |
| `src/components/shared/NotFoundView.tsx` | create | bilingual 404 + suggestions |
| `src/app/global-not-found.tsx` | create | global 404 document |
| `src/app/(site)/[locale]/not-found.tsx` | modify | render `NotFoundView` |
| `next.config.js` | modify | `experimental.globalNotFound` |
| `package.json` | modify | `check:routes`, `smoke:routes` scripts |
| `AGENTS.md`, old spec | modify | docs |

---

### Task 1: Route table, legacy aliases, sitemap data

**Files:**
- Modify: `tsconfig.json` (`compilerOptions`)
- Modify: `package.json` (`scripts`)
- Create: `src/lib/routes/public-routes.ts`
- Test: `src/lib/routes/public-routes.check.mts`

**Interfaces:**
- Consumes: `RESOURCE_CATEGORIES`, `RESOURCE_ARTICLES` from `src/data/resources.ts`; `courseSurfacesEnabled` from `src/data/courseRegistration.ts`; type `Localized` from `src/lib/i18n/localized.ts`.
- Produces:
  - `type RouteLabel = Localized<string>`
  - `type SitemapMeta = { changeFrequency: "weekly" | "monthly"; priority: number }`
  - `isPublicRoute(suffix: string): boolean`
  - `resolveLegacy(suffix: string): string | null`
  - `sitemapRoutes(): ({ path: string } & SitemapMeta)[]`
  - All take a locale-less, lower-case suffix starting with `/`, no trailing slash except `/`.

- [ ] **Step 1: Allow `.ts` import extensions**

In `tsconfig.json`, add one line after `"noEmit": true,`:

```json
    "noEmit": true,
    "allowImportingTsExtensions": true,
```

- [ ] **Step 2: Add the `check:routes` script**

In `package.json` `scripts`, after the `"check:resources"` line:

```json
    "check:resources": "node scripts/check-resources.mjs",
    "check:routes": "node --experimental-strip-types src/lib/routes/public-routes.check.mts",
```

- [ ] **Step 3: Write the failing check**

Create `src/lib/routes/public-routes.check.mts`:

```ts
import assert from "node:assert/strict";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { courseSurfacesEnabled } from "../../data/courseRegistration.ts";
import { isPublicRoute, resolveLegacy, sitemapRoutes } from "./public-routes.ts";

// Legacy aliases: exact segment and any sub-path map to the new route.
for (const [from, to] of [
  ["/ho-so", "/profile"],
  ["/ho-so/anything", "/profile"],
  ["/luat-ftc", "/ftc-rules"],
  ["/luat-ftc/abc", "/ftc-rules"],
  ["/resources/rules", "/ftc-rules"],
  ["/resources/rules/x", "/ftc-rules"],
  ["/sponsor", "/fundraising"],
  ["/sponsorship", "/fundraising"],
] as const) {
  assert.equal(resolveLegacy(from), to, from);
}
for (const keep of ["/profile", "/ho-sox", "/sponsors", "/resources"]) {
  assert.equal(resolveLegacy(keep), null, keep);
}

// Public routes.
for (const ok of [
  "/",
  "/fundraising",
  "/profile",
  "/recruitment",
  "/contact-us",
  "/resources",
  "/resources/community",
  "/resources/community/42",
  "/ftc-rules",
  "/resources/ftc-components",
  "/resources/programming",
  "/resources/programming/autonomous-encoder-driving",
]) {
  assert.ok(isPublicRoute(ok), `should be public: ${ok}`);
}
for (const bad of [
  "/xyz",
  "/ho-so",
  "/resources/rules",
  "/resources/community/abc",
  "/resources/community/1234567890",
  "/resources/ftc-components/khong-co",
]) {
  assert.ok(!isPublicRoute(bad), `should not be public: ${bad}`);
}
assert.equal(isPublicRoute("/course"), courseSurfacesEnabled, "/course follows the course flag");

// Sitemap: only listed routes, no legacy or unlisted ones.
const sitemapPaths = sitemapRoutes().map((route) => route.path);
assert.equal(sitemapPaths[0], "/", "home comes first");
assert.ok(sitemapPaths.includes("/resources/community"));
assert.ok(!sitemapPaths.includes("/resources/programming"), "programming category is not listed");
assert.ok(
  !sitemapPaths.some((path) => path.startsWith("/resources/programming/")),
  "programming articles are not listed",
);
assert.ok(!sitemapPaths.includes("/course-register-form/success"), "success page is never listed");

// Sync: every static page.tsx is in the table, every sitemap path has a page.
const APP = join(process.cwd(), "src", "app", "(site)", "[locale]");
const COURSE_PATHS = new Set(["/course", "/course-register-form", "/course-register-form/success"]);

function staticPageSuffixes(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (!name.startsWith("[")) staticPageSuffixes(full, out);
    } else if (name === "page.tsx") {
      const rel = relative(APP, dir).split(sep).join("/");
      out.push(rel ? `/${rel}` : "/");
    }
  }
  return out;
}

const pageSuffixes = staticPageSuffixes(APP);
for (const suffix of pageSuffixes) {
  assert.ok(
    isPublicRoute(suffix) || COURSE_PATHS.has(suffix),
    `page ${suffix} exists but is missing from src/lib/routes/public-routes.ts`,
  );
}
const pageSet = new Set(pageSuffixes);
for (const path of sitemapPaths) {
  assert.ok(
    pageSet.has(path) || /^\/resources\/[^/]+(\/[^/]+)?$/.test(path),
    `sitemap path ${path} has no page`,
  );
}

console.log("[public-routes.check] all checks passed");
```

- [ ] **Step 4: Run it and confirm it fails**

Run: `npm run check:routes`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/lib/routes/public-routes.ts`.

- [ ] **Step 5: Implement the route table**

Create `src/lib/routes/public-routes.ts`:

```ts
import type { Localized } from "../i18n/localized";
import { courseSurfacesEnabled } from "../../data/courseRegistration.ts";
import { RESOURCE_ARTICLES, RESOURCE_CATEGORIES } from "../../data/resources.ts";

/**
 * Single source of truth for public routes. Paths are locale-less suffixes:
 * lower-case, starting with "/", no trailing slash except "/".
 * Used by the proxy, the sitemap and the 404 page. A new page under
 * src/app/(site)/[locale]/ must be added here (npm run check:routes enforces it).
 */

export type RouteLabel = Localized<string>;
export type SitemapMeta = { changeFrequency: "weekly" | "monthly"; priority: number };
type RouteEntry = { path: string; label: RouteLabel; sitemap?: SitemapMeta };

const HOME: RouteEntry = {
  path: "/",
  label: { vi: "Trang chủ", en: "Home" },
  sitemap: { changeFrequency: "weekly", priority: 1 },
};

const COURSE_ROUTES: readonly RouteEntry[] = [
  {
    path: "/course",
    label: { vi: "Khóa học", en: "Course" },
    sitemap: { changeFrequency: "weekly", priority: 0.9 },
  },
  {
    path: "/course-register-form",
    label: { vi: "Đăng ký khóa học", en: "Course registration" },
    sitemap: { changeFrequency: "weekly", priority: 0.85 },
  },
  {
    path: "/course-register-form/success",
    label: { vi: "Đăng ký thành công", en: "Registration complete" },
  },
];

const STATIC_ROUTES: readonly RouteEntry[] = [
  {
    path: "/fundraising",
    label: { vi: "Gây quỹ", en: "Fundraising" },
    sitemap: { changeFrequency: "weekly", priority: 0.9 },
  },
  {
    path: "/profile",
    label: { vi: "Hồ sơ CLB", en: "Club profile" },
    sitemap: { changeFrequency: "weekly", priority: 0.9 },
  },
  {
    path: "/recruitment",
    label: { vi: "Tuyển thành viên", en: "Recruitment" },
    sitemap: { changeFrequency: "monthly", priority: 0.85 },
  },
  {
    path: "/contact-us",
    label: { vi: "Liên hệ", en: "Contact" },
    sitemap: { changeFrequency: "monthly", priority: 0.8 },
  },
  {
    path: "/resources",
    label: { vi: "Tài nguyên", en: "Resources" },
    sitemap: { changeFrequency: "weekly", priority: 0.85 },
  },
  {
    path: "/resources/community",
    label: { vi: "Hỏi đáp", en: "Q&A" },
    sitemap: { changeFrequency: "weekly", priority: 0.6 },
  },
  {
    path: "/ftc-rules",
    label: { vi: "Luật FTC", en: "FTC rules" },
    sitemap: { changeFrequency: "weekly", priority: 0.85 },
  },
];

/** Same rules as the resources pages' generateStaticParams. */
function resourceRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];
  for (const category of RESOURCE_CATEGORIES) {
    if (category.id === "rules") continue;
    const listed =
      category.id !== "programming" &&
      RESOURCE_ARTICLES.some((a) => a.categoryId === category.id && a.status === "ready");
    routes.push({
      path: `/resources/${category.id}`,
      label: category.title,
      sitemap: listed ? { changeFrequency: "monthly", priority: 0.75 } : undefined,
    });
  }
  for (const article of RESOURCE_ARTICLES) {
    const listed = article.status === "ready" && article.categoryId !== "programming";
    routes.push({
      path: `/resources/${article.categoryId}/${article.slug}`,
      label: article.title,
      sitemap: listed ? { changeFrequency: "monthly", priority: 0.7 } : undefined,
    });
  }
  return routes;
}

const ROUTES: readonly RouteEntry[] = [
  HOME,
  ...(courseSurfacesEnabled ? COURSE_ROUTES : []),
  ...STATIC_ROUTES,
  ...resourceRoutes(),
];
const ROUTE_PATHS = new Set(ROUTES.map((route) => route.path));

/** Runtime-created questions: valid shape only; the page 404s when the id is unknown. */
const COMMUNITY_QUESTION = /^\/resources\/community\/\d{1,9}$/;

export function isPublicRoute(suffix: string): boolean {
  return ROUTE_PATHS.has(suffix) || COMMUNITY_QUESTION.test(suffix);
}

/** Old public slugs. Matches the exact segment or any sub-path; the tail is dropped. */
const LEGACY_ALIASES: readonly (readonly [from: string, to: string])[] = [
  ["/ho-so", "/profile"],
  ["/luat-ftc", "/ftc-rules"],
  ["/resources/rules", "/ftc-rules"],
  ["/sponsor", "/fundraising"],
  ["/sponsorship", "/fundraising"],
];

export function resolveLegacy(suffix: string): string | null {
  for (const [from, to] of LEGACY_ALIASES) {
    if (suffix === from || suffix.startsWith(`${from}/`)) return to;
  }
  return null;
}

export function sitemapRoutes(): ({ path: string } & SitemapMeta)[] {
  return ROUTES.flatMap((route) => (route.sitemap ? [{ path: route.path, ...route.sitemap }] : []));
}
```

- [ ] **Step 6: Run it and confirm it passes**

Run: `npm run check:routes`
Expected: `[public-routes.check] all checks passed` (ignore Node's `MODULE_TYPELESS_PACKAGE_JSON` warning).

- [ ] **Step 7: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0, no output.

- [ ] **Step 8: Commit**

```bash
git add tsconfig.json package.json src/lib/routes/public-routes.ts src/lib/routes/public-routes.check.mts
git commit -m "feat(routes): add shared public route table"
```

---

### Task 2: 404 suggestions

**Files:**
- Modify: `src/lib/routes/public-routes.ts` (append)
- Test: `src/lib/routes/public-routes.check.mts` (append)

**Interfaces:**
- Consumes: `ROUTES` (module-private, Task 1).
- Produces: `suggestRoutes(suffix: string, limit: number): { path: string; label: RouteLabel }[]`.

- [ ] **Step 1: Write the failing check**

In `src/lib/routes/public-routes.check.mts`, change the import line to:

```ts
import { isPublicRoute, resolveLegacy, sitemapRoutes, suggestRoutes } from "./public-routes.ts";
```

and insert this block immediately before the final `console.log`:

```ts
// Suggestions for the 404 page.
const firstSuggestion = (suffix: string) => suggestRoutes(suffix, 3)[0]?.path;
assert.equal(firstSuggestion("/fundrasing"), "/fundraising", "typo");
assert.equal(firstSuggestion("/profle"), "/profile", "typo");
assert.equal(firstSuggestion("/fund"), "/fundraising", "prefix");
assert.equal(
  firstSuggestion("/encoder-driving"),
  "/resources/programming/autonomous-encoder-driving",
  "contained in an article slug",
);
assert.deepEqual(suggestRoutes("/qqqqqq", 3), [], "nothing close");
assert.deepEqual(suggestRoutes("/xyz", 3), [], "short noise");
assert.ok(suggestRoutes("/res", 2).length <= 2, "respects the limit");
assert.equal(suggestRoutes("/fundrasing", 3)[0]?.label.vi, "Gây quỹ", "carries the label");
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm run check:routes`
Expected: FAIL with `SyntaxError: The requested module './public-routes.ts' does not provide an export named 'suggestRoutes'`.

- [ ] **Step 3: Implement**

Append to `src/lib/routes/public-routes.ts`:

```ts
function lastSegment(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1);
}

function levenshtein(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
    }
    previous = current;
  }
  return previous[b.length];
}

/**
 * Close matches for a 404, ranked: prefix (0) < contained in slug (1) < typo (distance).
 * Compares last segments only; `/` and the request itself are never suggested.
 */
export function suggestRoutes(
  suffix: string,
  limit: number,
): { path: string; label: RouteLabel }[] {
  const needle = lastSegment(suffix);
  if (!needle) return [];
  const maxDistance = Math.max(2, Math.floor(needle.length * 0.3));
  const scored: { path: string; label: RouteLabel; score: number }[] = [];
  for (const route of ROUTES) {
    if (route.path === "/" || route.path === suffix) continue;
    const target = lastSegment(route.path);
    let score: number | null = null;
    if (needle.length >= 3 && target.startsWith(needle)) score = 0;
    else if (needle.length >= 5 && target.includes(needle)) score = 1;
    else {
      const distance = levenshtein(needle, target);
      if (distance <= maxDistance) score = distance;
    }
    if (score !== null) scored.push({ path: route.path, label: route.label, score });
  }
  scored.sort((a, b) => a.score - b.score || a.path.length - b.path.length);
  return scored.slice(0, limit).map(({ path, label }) => ({ path, label }));
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `npm run check:routes`
Expected: `[public-routes.check] all checks passed`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/routes/public-routes.ts src/lib/routes/public-routes.check.mts
git commit -m "feat(routes): suggest close routes for 404s"
```

---

### Task 3: Pure request resolver

**Files:**
- Create: `src/lib/routes/resolve-request.ts`
- Test: `src/lib/routes/resolve-request.check.mts`
- Modify: `package.json` (`check:routes`)

**Interfaces:**
- Consumes: `isPublicRoute`, `resolveLegacy` (Task 1); `DEFAULT_LOCALE`, type `Locale` from `src/lib/i18n/locales.ts`.
- Produces:
  ```ts
  export type Resolution =
    | { kind: "next" }
    | { kind: "redirect"; location: string; status: 307 | 308 }
    | { kind: "notFound"; rewrite: string };
  export function pickLocale(cookieLocale: string | undefined, acceptLanguage: string | null): Locale;
  export function resolveRequest(input: {
    pathname: string; search: string; cookieLocale: string | undefined; acceptLanguage: string | null;
  }): Resolution;
  ```

- [ ] **Step 1: Extend `check:routes`**

In `package.json`, replace the `check:routes` line with:

```json
    "check:routes": "node --experimental-strip-types src/lib/routes/public-routes.check.mts && node --experimental-strip-types src/lib/routes/resolve-request.check.mts",
```

- [ ] **Step 2: Write the failing check**

Create `src/lib/routes/resolve-request.check.mts`:

```ts
import assert from "node:assert/strict";
import { pickLocale, resolveRequest, type Resolution } from "./resolve-request.ts";

// Locale choice: cookie, then Accept-Language, then vi.
assert.equal(pickLocale("en", "vi"), "en", "cookie wins");
assert.equal(pickLocale("vi", "en-US"), "vi", "cookie wins over header");
assert.equal(pickLocale("fr", null), "vi", "malformed cookie ignored");
assert.equal(pickLocale("EN", null), "vi", "cookie is case-sensitive");
assert.equal(pickLocale(undefined, "en-US,en;q=0.9,vi;q=0.8"), "en");
assert.equal(pickLocale(undefined, "vi,en;q=0.9"), "vi");
assert.equal(pickLocale(undefined, "vi-VN,vi;q=0.9,en-US;q=0.8"), "vi");
assert.equal(pickLocale(undefined, "en;q=0.5,vi;q=0.5"), "vi", "tie goes to vi");
assert.equal(pickLocale(undefined, "fr-FR,fr;q=0.9"), "vi", "neither language");
assert.equal(pickLocale(undefined, "en"), "en");
assert.equal(pickLocale(undefined, null), "vi", "missing header");

const redirect = (location: string, status: 307 | 308): Resolution => ({ kind: "redirect", location, status });
const next: Resolution = { kind: "next" };
const notFound = (rewrite: string): Resolution => ({ kind: "notFound", rewrite });

const rows: { url: string; cookie?: string; accept?: string; expected: Resolution }[] = [
  { url: "/", accept: "en-US", expected: redirect("/en", 307) },
  { url: "/", expected: redirect("/vi", 307) },
  { url: "/", cookie: "en", expected: redirect("/en", 307) },
  { url: "/", cookie: "vi", accept: "en-US", expected: redirect("/vi", 307) },
  { url: "/fundraising?ref=fb", expected: redirect("/vi/fundraising?ref=fb", 307) },
  { url: "/HO-SO/", expected: redirect("/vi/profile", 307) },
  { url: "/en/luat-ftc", expected: redirect("/en/ftc-rules", 308) },
  { url: "/en/luat-ftc/abc", expected: redirect("/en/ftc-rules", 308) },
  { url: "/en/ho-so", expected: redirect("/en/profile", 308) },
  { url: "/vi/resources/rules", expected: redirect("/vi/ftc-rules", 308) },
  { url: "/sponsor", expected: redirect("/vi/fundraising", 307) },
  { url: "/vn/fundraising", expected: redirect("/vi/fundraising", 308) },
  { url: "/vi/profile/", expected: redirect("/vi/profile", 308) },
  { url: "/vi/profile/?a=1", expected: redirect("/vi/profile?a=1", 308) },
  { url: "/vi//profile", expected: redirect("/vi/profile", 308) },
  { url: "/VI/Profile", expected: redirect("/vi/profile", 308) },
  { url: "/vi/", expected: redirect("/vi", 308) },
  { url: "/vn", expected: redirect("/vi", 308) },
  { url: "/vi", expected: next },
  { url: "/en", expected: next },
  { url: "/xyz", expected: notFound("/vi/xyz") },
  { url: "/xyz", cookie: "en", expected: notFound("/en/xyz") },
  { url: "/vi/xyz", expected: notFound("/vi/xyz") },
  { url: "/constructor", expected: notFound("/vi/constructor") },
  { url: "/vi/resources/community/42", expected: next },
  { url: "/vi/resources/community/abc", expected: notFound("/vi/resources/community/abc") },
  { url: "/vi/fundraising?ref=fb", expected: next },
  { url: "/en/profile", expected: next },
];

for (const row of rows) {
  const queryAt = row.url.indexOf("?");
  const pathname = queryAt === -1 ? row.url : row.url.slice(0, queryAt);
  const search = queryAt === -1 ? "" : row.url.slice(queryAt);
  assert.deepEqual(
    resolveRequest({
      pathname,
      search,
      cookieLocale: row.cookie,
      acceptLanguage: row.accept ?? null,
    }),
    row.expected,
    `${row.url} cookie=${row.cookie ?? "-"} accept=${row.accept ?? "-"}`,
  );
}

console.log("[resolve-request.check] all checks passed");
```

- [ ] **Step 3: Run it and confirm it fails**

Run: `npm run check:routes`
Expected: public-routes passes, then FAIL with `ERR_MODULE_NOT_FOUND` for `src/lib/routes/resolve-request.ts`.

- [ ] **Step 4: Implement**

Create `src/lib/routes/resolve-request.ts`:

```ts
import { DEFAULT_LOCALE, type Locale } from "../i18n/locales.ts";
import { isPublicRoute, resolveLegacy } from "./public-routes.ts";

export type Resolution =
  | { kind: "next" }
  | { kind: "redirect"; location: string; status: 307 | 308 }
  | { kind: "notFound"; rewrite: string };

/** First path segments accepted as a locale. `vn` is a common typo for `vi`. */
const LOCALE_SEGMENTS: ReadonlyMap<string, Locale> = new Map([
  ["vi", "vi"],
  ["en", "en"],
  ["vn", "vi"],
]);

/** Highest q-value for `lang` or any `lang-*` tag; 0 when absent, 1 when q is omitted. */
function languageQuality(header: string, lang: string): number {
  let best = 0;
  for (const part of header.split(",")) {
    const [rawTag, ...params] = part.trim().toLowerCase().split(";");
    const tag = rawTag.trim();
    if (tag !== lang && !tag.startsWith(`${lang}-`)) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    const value = q ? Number(q.slice(2)) : 1;
    if (Number.isFinite(value) && value > best) best = value;
  }
  return best;
}

/** Cookie, then browser preference (English only when strictly preferred), then vi. */
export function pickLocale(cookieLocale: string | undefined, acceptLanguage: string | null): Locale {
  if (cookieLocale === "vi" || cookieLocale === "en") return cookieLocale;
  if (acceptLanguage && languageQuality(acceptLanguage, "en") > languageQuality(acceptLanguage, "vi")) {
    return "en";
  }
  return DEFAULT_LOCALE;
}

/**
 * Decides what the proxy does with a request, in one step:
 * normalise → locale → legacy alias → unknown (404 rewrite) → redirect if not canonical.
 */
export function resolveRequest(input: {
  pathname: string;
  search: string;
  cookieLocale: string | undefined;
  acceptLanguage: string | null;
}): Resolution {
  const normalized = input.pathname
    .replace(/\/{2,}/g, "/")
    .toLowerCase()
    .replace(/(.)\/$/, "$1");
  const segments = normalized.split("/");
  const segmentLocale = LOCALE_SEGMENTS.get(segments[1] ?? "");
  const localeMissing = segmentLocale === undefined;
  const locale = segmentLocale ?? pickLocale(input.cookieLocale, input.acceptLanguage);
  const rawSuffix = localeMissing ? normalized : `/${segments.slice(2).join("/")}`;
  const suffix = resolveLegacy(rawSuffix) ?? rawSuffix;
  const canonical = `/${locale}${suffix === "/" ? "" : suffix}`;

  if (!isPublicRoute(suffix)) return { kind: "notFound", rewrite: canonical };
  if (canonical === input.pathname) return { kind: "next" };
  return {
    kind: "redirect",
    location: `${canonical}${input.search}`,
    status: localeMissing ? 307 : 308,
  };
}
```

- [ ] **Step 5: Run it and confirm it passes**

Run: `npm run check:routes`
Expected: both `[public-routes.check] all checks passed` and `[resolve-request.check] all checks passed`.

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 7: Commit**

```bash
git add package.json src/lib/routes/resolve-request.ts src/lib/routes/resolve-request.check.mts
git commit -m "feat(routes): resolve locale, legacy and typo URLs in one step"
```

---

### Task 4: Proxy adapter and HTTP smoke

**Files:**
- Modify: `src/lib/i18n/locales.ts`
- Modify: `src/proxy.ts` (full replacement)
- Create: `scripts/smoke-routes.mjs`
- Modify: `package.json` (`smoke:routes`)

**Interfaces:**
- Consumes: `resolveRequest` (Task 3).
- Produces: `export const LOCALE_COOKIE = "NEXT_LOCALE"` from `src/lib/i18n/locales.ts` (used by Task 6); `npm run smoke:routes [baseUrl]` (extended by Task 7).

- [ ] **Step 1: Write the smoke script**

Create `scripts/smoke-routes.mjs`:

```js
// HTTP smoke for the routing contract (spec §8).
// Usage: node scripts/smoke-routes.mjs [baseUrl]   default http://127.0.0.1:4010
const base = process.argv[2] ?? "http://127.0.0.1:4010";
let failures = 0;

function check(ok, message) {
  if (ok) console.log(`ok   ${message}`);
  else {
    failures++;
    console.error(`FAIL ${message}`);
  }
}

const redirects = [
  // [path, request headers, status, location]
  ["/", { "accept-language": "en-US" }, 307, "/en"],
  ["/", {}, 307, "/vi"],
  ["/", { cookie: "NEXT_LOCALE=en" }, 307, "/en"],
  ["/", { cookie: "NEXT_LOCALE=vi", "accept-language": "en-US" }, 307, "/vi"],
  ["/fundraising?ref=fb", {}, 307, "/vi/fundraising?ref=fb"],
  ["/HO-SO/", {}, 307, "/vi/profile"],
  ["/en/luat-ftc", {}, 308, "/en/ftc-rules"],
  ["/en/ho-so", {}, 308, "/en/profile"],
  ["/vi/resources/rules", {}, 308, "/vi/ftc-rules"],
  ["/sponsor", {}, 307, "/vi/fundraising"],
  ["/vn/fundraising", {}, 308, "/vi/fundraising"],
  ["/vi/profile/", {}, 308, "/vi/profile"],
  ["/VI/Profile", {}, 308, "/vi/profile"],
  ["/vi/", {}, 308, "/vi"],
  ["/vn", {}, 308, "/vi"],
];

for (const [path, headers, status, location] of redirects) {
  const response = await fetch(base + path, { redirect: "manual", headers });
  const raw = response.headers.get("location");
  const got = raw ? `${new URL(raw, base).pathname}${new URL(raw, base).search}` : null;
  check(
    response.status === status && got === location,
    `${path} ${JSON.stringify(headers)} → ${response.status} ${got} (want ${status} ${location})`,
  );
  if (status === 307) {
    const vary = response.headers.get("vary") ?? "";
    check(/cookie/i.test(vary) && /accept-language/i.test(vary), `${path} Vary: ${vary}`);
  }
}

for (const path of ["/vi", "/en", "/en/profile", "/vi/fundraising?ref=fb", "/vi/ftc-rules"]) {
  const response = await fetch(base + path, { redirect: "manual" });
  check(response.status === 200, `${path} → ${response.status} (want 200)`);
}

// The proxy lets a well-formed community id through; the page decides 200 or 404.
{
  const response = await fetch(`${base}/vi/resources/community/42`, { redirect: "manual" });
  check(![307, 308].includes(response.status), `/vi/resources/community/42 not redirected (${response.status})`);
}

// [path, strings the 404 HTML must contain]
const notFound = [
  ["/xyz", []],
  ["/vi/xyz", []],
  ["/vi/fundrasing", []],
  ["/fundrasing", []],
  ["/en/profle", []],
  ["/vi/resources/ftc-components/khong-co", []],
  ["/vi/resources/community/abc", []],
];

for (const [path, needles] of notFound) {
  const response = await fetch(base + path, { redirect: "manual" });
  const html = await response.text();
  check(response.status === 404, `${path} → ${response.status} (want 404, no redirect)`);
  for (const needle of needles) check(html.includes(needle), `${path} contains ${needle}`);
}

{
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  check(sitemap.includes("/vi/profile") && sitemap.includes("/en/ftc-rules"), "sitemap lists locale URLs");
  check(!/\/ho-so|\/luat-ftc|\/resources\/rules/.test(sitemap), "sitemap has no legacy URLs");
}

if (failures > 0) {
  console.error(`\n${failures} route smoke check(s) failed`);
  process.exit(1);
}
console.log("\nall route smoke checks passed");
```

In `package.json` `scripts`, after `check:routes`:

```json
    "smoke:routes": "node scripts/smoke-routes.mjs",
```

- [ ] **Step 2: Run it against the current proxy and confirm it fails**

Make sure the dev server answers on `:4000`, then run: `npm run smoke:routes -- http://127.0.0.1:4000`
Expected: FAIL. Among others: `/HO-SO/ ... → 307 /vi/ho-so (want 307 /vi/profile)`, `/en/luat-ftc → 200 null (want 308 ...)`, `/xyz → 307 (want 404, no redirect)`, missing `Vary`.

- [ ] **Step 3: Export the cookie name**

In `src/lib/i18n/locales.ts`, after the `DEFAULT_LOCALE` line add:

```ts
/** Remembers the language a visitor picked with the VI/EN toggle. Read by the proxy. */
export const LOCALE_COOKIE = "NEXT_LOCALE";
```

- [ ] **Step 4: Replace the proxy**

Replace the whole content of `src/proxy.ts` with:

```ts
import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/lib/i18n/locales";
import { resolveRequest } from "@/lib/routes/resolve-request";

/**
 * Public URLs always carry a locale (`/vi/...`, `/en/...`). Decisions live in
 * `resolveRequest`; this adapter only turns them into responses.
 */
export function proxy(request: NextRequest) {
  const result = resolveRequest({
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
    cookieLocale: request.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: request.headers.get("accept-language"),
  });

  if (result.kind === "next") return NextResponse.next();

  if (result.kind === "notFound") {
    // Unknown path: render the 404 in place (no redirect). The rewritten path keeps the
    // locale and the original suffix so the 404 page can suggest close matches.
    const url = request.nextUrl.clone();
    url.pathname = result.rewrite;
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.redirect(new URL(result.location, request.url), result.status);
  if (result.status === 307) response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

export const config = {
  matcher: [
    // Skip internals, API, analytics proxy, the internal deck/analytics surfaces and anything with a file extension.
    "/((?!_next/|api/|ingest/|analytics|course/arduino-mblock-deck|Images/|Logo/|.*\\..*).*)",
  ],
};
```

- [ ] **Step 5: Run the smoke again and confirm it passes**

Run: `npm run smoke:routes -- http://127.0.0.1:4000`
Expected: `all route smoke checks passed`. (404 rows have no content needles yet; the default Next 404 page is expected until Task 7.)

If `/vi//profile` behaves differently in a real server than in Task 3 (some servers collapse `//` before the proxy), it is intentionally not in this HTTP table; Task 3 covers it.

- [ ] **Step 6: Typecheck, lint, unit checks**

Run: `npx tsc --noEmit && npm run lint && npm run check:routes`
Expected: exit 0, `0 errors`, both checks pass.

- [ ] **Step 7: Commit**

```bash
git add src/lib/i18n/locales.ts src/proxy.ts scripts/smoke-routes.mjs package.json
git commit -m "feat(i18n): route requests through resolveRequest" -m "Locale from cookie then browser, legacy slugs and typos redirect in one step, unknown paths 404 without a redirect."
```

---

### Task 5: Sitemap reads the route table

**Files:**
- Modify: `src/app/sitemap.ts` (full replacement)

**Interfaces:**
- Consumes: `sitemapRoutes()` (Task 1).
- Produces: unchanged `/sitemap.xml` content.

- [ ] **Step 1: Capture the current sitemap**

With the dev server on `:4000`, run:

```bash
node -e "fetch('http://127.0.0.1:4000/sitemap.xml').then(r=>r.text()).then(t=>require('fs').writeFileSync('.sitemap-before.xml',t.replace(/<lastmod>[^<]*<\/lastmod>/g,'')))"
```

Expected: `.sitemap-before.xml` exists and contains `<loc>`.

- [ ] **Step 2: Replace the sitemap**

Replace the whole content of `src/app/sitemap.ts` with:

```ts
import type { MetadataRoute } from "next";
import type { Locale } from "@/lib/i18n/locales";
import { LOCALES } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";
import { sitemapRoutes } from "@/lib/routes/public-routes";
import { getSiteUrl } from "@/lib/seo/site-url";

function toAbsoluteUrl(canonicalPath: string, locale: Locale): string {
  const origin = getSiteUrl();
  const path = localizedHref(canonicalPath, locale);
  if (path === "/") {
    return origin;
  }
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapRoutes().flatMap((route) => {
    const viUrl = toAbsoluteUrl(route.path, "vi");
    const enUrl = toAbsoluteUrl(route.path, "en");
    const languages = { vi: viUrl, en: enUrl };

    return LOCALES.map((locale) => ({
      url: locale === "vi" ? viUrl : enUrl,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages,
      },
    }));
  });
}
```

- [ ] **Step 3: Compare with the capture**

```bash
node -e "fetch('http://127.0.0.1:4000/sitemap.xml').then(r=>r.text()).then(t=>require('fs').writeFileSync('.sitemap-after.xml',t.replace(/<lastmod>[^<]*<\/lastmod>/g,'')))"
git diff --no-index --stat .sitemap-before.xml .sitemap-after.xml
```

Expected: no output from `git diff` (identical content, same order).

- [ ] **Step 4: Remove the captures and typecheck**

```bash
node -e "for (const f of ['.sitemap-before.xml','.sitemap-after.xml']) require('fs').rmSync(f,{force:true})"
npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "refactor(seo): build sitemap from the route table"
```

---

### Task 6: Remember the chosen language

**Files:**
- Modify: `src/components/shared/LanguageToggle.tsx`

**Interfaces:**
- Consumes: `LOCALE_COOKIE` (Task 4).

- [ ] **Step 1: Confirm the cookie is not written today**

In a browser at `http://localhost:4000/vi`, click `EN`, then run `document.cookie` in the console.
Expected: no `NEXT_LOCALE=` entry.

- [ ] **Step 2: Write the cookie on click**

In `src/components/shared/LanguageToggle.tsx`, change the locales import to:

```ts
import { LOCALE_COOKIE, LOCALES, type Locale } from "@/lib/i18n/locales";
```

and make the first statement of the anchor's `onClick` handler (before the existing comment and `search`/`hash` lines):

```ts
              onClick={(event) => {
                // Remember an explicit choice so locale-less URLs open in this language.
                document.cookie = `${LOCALE_COOKIE}=${code}; Path=/; Max-Age=31536000; SameSite=Lax`;
```

Keep the rest of the handler unchanged.

- [ ] **Step 3: Verify in the browser and through the proxy**

1. At `http://localhost:4000/vi`, click `EN`. In the console, `document.cookie` includes `NEXT_LOCALE=en` and the page is `/en`.
2. Open `http://localhost:4000/fundraising`. Expected: lands on `/en/fundraising`.
3. Click `VI`, then open `http://localhost:4000/`. Expected: lands on `/vi`.
4. Run: `node -e "fetch('http://127.0.0.1:4000/',{redirect:'manual',headers:{cookie:'NEXT_LOCALE=en'}}).then(r=>console.log(r.status,r.headers.get('location')))"`
   Expected: `307 /en` (absolute or relative URL ending in `/en`).

- [ ] **Step 4: Lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: exit 0, `0 errors`.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/LanguageToggle.tsx
git commit -m "feat(i18n): remember the language picked in the toggle"
```

---

### Task 7: Bilingual 404 with suggestions

**Files:**
- Modify: `next.config.js` (`experimental`)
- Modify: `src/components/shared/StatusBoard.tsx`
- Create: `src/components/shared/NotFoundView.tsx`
- Create: `src/app/global-not-found.tsx`
- Modify: `src/app/(site)/[locale]/not-found.tsx` (full replacement)
- Modify: `scripts/smoke-routes.mjs` (`notFound` table)

**Interfaces:**
- Consumes: `suggestRoutes` (Task 2); `localizedHref`, `stripLocale` from `src/lib/i18n/routes.ts`; `LanguageProvider` from `src/contexts/LanguageContext.tsx`.
- Produces: `NotFoundView` (no props); `StatusBoard` gains optional `children?: ReactNode`.

- [ ] **Step 1: Add content expectations to the smoke**

In `scripts/smoke-routes.mjs`, replace the `notFound` array with:

```js
const notFound = [
  ["/xyz", ["Không tìm thấy trang"]],
  ["/vi/xyz", ["Không tìm thấy trang"]],
  ["/vi/fundrasing", ["Không tìm thấy trang", "Có phải bạn muốn tìm", 'href="/vi/fundraising"']],
  ["/fundrasing", ["Có phải bạn muốn tìm", 'href="/vi/fundraising"']],
  ["/en/profle", ["Page not found", "Did you mean", 'href="/en/profile"']],
  ["/vi/resources/ftc-components/khong-co", ["Không tìm thấy trang"]],
  ["/vi/resources/community/abc", ["Không tìm thấy trang"]],
];
```

- [ ] **Step 2: Build, start, and confirm the smoke fails**

```bash
npm run build
npx next start -p 4010
```

In another terminal: `npm run smoke:routes`
Expected: FAIL on the content needles of every 404 row (the HTML is Next's default `This page could not be found`). Redirect and status rows pass. Stop the `next start` process.

- [ ] **Step 3: Enable the global 404**

In `next.config.js`, make `globalNotFound` the first key of the existing `experimental` object:

```js
  experimental: {
    // Root layout sits behind [locale], so unmatched URLs need the global 404.
    globalNotFound: true,
    optimizePackageImports: [
```

- [ ] **Step 4: Add a `children` slot to `StatusBoard`**

In `src/components/shared/StatusBoard.tsx`:

1. Below `import { m, useReducedMotion } from "framer-motion";` add:

```ts
import type { ReactNode } from "react";
```

2. In `type StatusBoardProps`, after `className?: string;` add:

```ts
  /** Extra content under the actions (e.g. 404 suggestions). */
  children?: ReactNode;
```

3. Add `children,` to the destructured props after `className,`.

4. Render it directly after the actions `<div className="mt-8 flex w-full max-w-md ...">…</div>` and before the right column's closing `</div>`:

```tsx
          {children}
```

- [ ] **Step 5: Create `NotFoundView`**

Create `src/components/shared/NotFoundView.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { StatusBoard } from "@/components/shared/StatusBoard";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref, stripLocale } from "@/lib/i18n/routes";
import { suggestRoutes } from "@/lib/routes/public-routes";

/**
 * 404 for both the global not-found document (outside RootShell) and request-time
 * notFound(). The proxy rewrites unknown locale-less paths to /{locale}{path}, so
 * usePathname() carries the locale and the original path during server render.
 * Own LanguageProvider: CTAButton reads the locale from context.
 */
export function NotFoundView() {
  const pathname = usePathname() ?? "/";
  const locale: Locale = /^\/en(?=\/|$)/.test(pathname) ? "en" : "vi";
  const vi = locale === "vi";
  const suggestions = suggestRoutes(stripLocale(pathname).toLowerCase(), 3);

  // The global 404 document cannot know the locale on the server; keep html[lang] right.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageProvider locale={locale} messages={{}}>
      <StatusBoard
        code="404"
        signal={vi ? "Tín hiệu mất — route không có trên sân" : "Signal lost — route off the field"}
        title={vi ? "Không tìm thấy trang" : "Page not found"}
        description={
          vi
            ? courseSurfacesEnabled
              ? "Đường dẫn không tồn tại hoặc đã được chuyển đi. Quay lại trang chủ hoặc mở khóa học STEM."
              : "Đường dẫn không tồn tại hoặc đã được chuyển đi. Quay lại trang chủ để tiếp tục."
            : courseSurfacesEnabled
              ? "This path does not exist or has moved. Head home, or open the STEM course."
              : "This path does not exist or has moved. Head home to continue."
        }
        actions={[
          { label: vi ? "Về trang chủ" : "Back home", href: "/", variant: "primary" },
          ...(courseSurfacesEnabled
            ? [{ label: vi ? "Xem khóa học" : "View course", href: "/course", variant: "secondary" as const }]
            : []),
        ]}
      >
        {suggestions.length > 0 ? (
          <nav aria-label={vi ? "Trang gợi ý" : "Suggested pages"} className="mt-8 w-full max-w-md">
            <p className="text-sm font-semibold text-foreground">
              {vi ? "Có phải bạn muốn tìm:" : "Did you mean:"}
            </p>
            <ul className="mt-2">
              {suggestions.map((suggestion) => (
                <li key={suggestion.path}>
                  <a
                    href={localizedHref(suggestion.path, locale)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md text-base font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {suggestion.label[locale]}
                    <ArrowRight aria-hidden className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </StatusBoard>
    </LanguageProvider>
  );
}
```

- [ ] **Step 6: Create the global 404 document**

Create `src/app/global-not-found.tsx`:

```tsx
import "./globals.css";
import type { Metadata } from "next";
import { NotFoundView } from "@/components/shared/NotFoundView";

export const metadata: Metadata = {
  title: "404 | Robotics Sóc Sơn",
  robots: { index: false, follow: true },
};

/** Unmatched URLs. The root layout sits behind [locale], so this renders its own document. */
export default function GlobalNotFound() {
  return (
    <html lang="vi">
      <body className="antialiased overflow-x-clip">
        <NotFoundView />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Reuse the view for request-time `notFound()`**

Replace the whole content of `src/app/(site)/[locale]/not-found.tsx` with:

```tsx
import { NotFoundView } from "@/components/shared/NotFoundView";

export default function NotFound() {
  return <NotFoundView />;
}
```

- [ ] **Step 8: Build, start, and confirm the smoke passes**

```bash
npx tsc --noEmit && npm run lint && npm run build
npx next start -p 4010
```

In another terminal: `npm run smoke:routes`
Expected: `all route smoke checks passed`.

If only `/fundrasing` (locale-less) fails its suggestion needles while `/vi/fundrasing` passes, `usePathname()` reports the browser path instead of the rewritten one (spec §10 risk). Stop and report; do not work around it silently.

- [ ] **Step 9: Visual check**

With `next start` still on `:4010`, open `http://127.0.0.1:4010/vi/fundrasing` at 390×844 and at 1280×800.
Expected: branded board, "Có phải bạn muốn tìm:" with a "Gây quỹ" link to `/vi/fundraising`, no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`), visible focus ring when tabbing to the link. Then open `/en/profle`: English copy, "Club profile" link, `document.documentElement.lang === "en"`. Stop the server.

- [ ] **Step 10: Commit**

```bash
git add next.config.js src/components/shared/StatusBoard.tsx src/components/shared/NotFoundView.tsx src/app/global-not-found.tsx "src/app/(site)/[locale]/not-found.tsx" scripts/smoke-routes.mjs
git commit -m "feat(site): bilingual 404 that suggests close pages" -m "Uses Next's experimental global-not-found because the root layout sits behind [locale]."
```

---

### Task 8: Full verification and docs

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/superpowers/specs/2026-11-03-locale-prefixed-public-routes-design.md` (top)

- [ ] **Step 1: Update `AGENTS.md`**

In "Application Entry Points", replace the `src/proxy.ts` bullet with:

```markdown
- `src/proxy.ts`: thin adapter over `resolveRequest` (`src/lib/routes/resolve-request.ts`). Every public URL is `/vi/...` or `/en/...`. A locale-less path redirects (307, `Vary: Cookie, Accept-Language`) to the `NEXT_LOCALE` cookie or browser language, default `vi`. Legacy slugs (`/ho-so`, `/luat-ftc`, `/resources/rules`, `/sponsor`) and typos (case, trailing slash, `//`, `/vn`) redirect (308). Unknown paths 404 in place, no redirect.
- `src/lib/routes/public-routes.ts`: the public route table (proxy, sitemap, 404 suggestions). Add every new page here; `npm run check:routes` fails otherwise.
- `src/app/global-not-found.tsx`: 404 for unmatched URLs (experimental `globalNotFound`), rendering `NotFoundView` with suggestions.
```

In "Scripts", add after the `check:i18n` line:

```markdown
- `npm run check:routes`: route table, legacy aliases, suggestions and request resolution checks, plus page/table sync.
- `npm run smoke:routes [baseUrl]`: HTTP smoke of redirects, 404s and sitemap against a running server (default `http://127.0.0.1:4010`).
```

In "Localization Conventions", replace `- Default locale is Vietnamese (unprefixed).` with:

```markdown
- Default locale is Vietnamese. Every public URL carries its locale prefix; the VI/EN toggle stores the choice in the `NEXT_LOCALE` cookie.
```

- [ ] **Step 2: Mark the old spec as amended**

Insert directly under the first heading of `docs/superpowers/specs/2026-11-03-locale-prefixed-public-routes-design.md`:

```markdown
> **Amended by** `2026-11-03-smart-url-routing-design.md`: §2.2 (404 without redirect), §3.2 rule 3, and the out-of-scope "Redirect compatibility" item no longer apply. Locale-less paths and legacy slugs now redirect; unknown paths still 404.
```

- [ ] **Step 3: Run every check**

```bash
npx tsc --noEmit
npm run lint
npm run check:i18n
npm run check:assets
npm run check:routes
node --experimental-strip-types src/lib/resources/search.check.mts
npm run build
```

Expected: every command exits 0; lint reports `0 errors`; the two `[i18n] Warning: dynamic key` lines are known false positives.

- [ ] **Step 4: Final smoke on the production build**

```bash
npx next start -p 4010
```

In another terminal: `npm run smoke:routes`
Expected: `all route smoke checks passed`. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md docs/superpowers/specs/2026-11-03-locale-prefixed-public-routes-design.md
git commit -m "docs: document smart URL routing"
```
