# Locale-Prefixed Public Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate every public page to English slugs with mandatory `/vi` or `/en` prefixes, while returning `404` for unprefixed and obsolete public URLs.

**Architecture:** Keep Next.js App Router's `[locale]` segment as the public boundary. Make `src/proxy.ts` pass only `/vi` and `/en` public requests through, make `localizedHref` construct locale-prefixed paths, rename the profile and FTC rules route directories to English slugs, and migrate all callers plus SEO/sitemap data to the shared suffix model. Keep API, analytics, internal deck and assets outside this contract.

**Tech Stack:** Next.js App Router 16, React 19, TypeScript strict mode, Next middleware proxy, static `generateStaticParams`, existing `localizedHref`/`switchLocalePath`, `MetadataRoute.Sitemap`, existing npm lint/build/i18n/assets scripts, Playwright/browser smoke checks.

**Spec:** `docs/superpowers/specs/2026-11-03-locale-prefixed-public-routes-design.md`

## Global Constraints

- Public URL contract uses `/vi/...` and `/en/...` only.
- Vietnamese and English use identical English suffixes: `/vi/profile` ↔ `/en/profile`, `/vi/ftc-rules` ↔ `/en/ftc-rules`.
- Old or unprefixed public URLs return `404`; do not add redirect compatibility.
- `/vi` and `/en` are the only locale home URLs without a trailing segment.
- Move `ho-so/` to `profile/` and `resources/rules/` to `ftc-rules/`.
- Preserve public content, translations, layout, APIs, analytics, internal deck and assets.
- No new dependency, CMS, database, bank integration or public content rewrite.
- `localizedHref`, `stripLocale` and `switchLocalePath` remain the single route construction/comparison convention.
- Every changed behavior must be tested with the full relevant command/module, not only a targeted expected-to-flip assertion.

---

## File Map

- `src/proxy.ts`: locale boundary; allow only `/vi` and `/en` public requests through and stop unprefixed rewrites/legacy redirects.
- `src/lib/i18n/routes.ts`: locale prefix constants, suffix normalization, query/hash preservation and locale switching.
- `src/app/(site)/[locale]/ho-so/`: rename to `profile/`; keep the profile renderer/navigation with one page entry.
- `src/app/(site)/[locale]/resources/rules/`: rename to `ftc-rules/`; update relative imports and page metadata path.
- `src/app/(site)/[locale]/sitemap.ts`: no route file; `src/app/sitemap.ts` owns route suffixes and both locale outputs.
- `src/app/sitemap.ts`: generate locale-prefixed URLs from one suffix per route; remove `enPath` exception.
- `src/data/profile.ts`: profile `canonicalPath` remains `/profile` for both locales.
- `src/app/(site)/[locale]/resources/rules/page.tsx` and related route references: change canonical suffix and links to `/ftc-rules` after directory move.
- `src/components/manual/ManualViewer.tsx`, resource components, layout/navigation components, page files and data modules found by consistency search: replace hard-coded old/unprefixed public paths with locale-aware suffixes.
- `src/app/sitemap.ts`, SEO modules and route metadata: emit only `/vi/...` and `/en/...` URLs.

---

### Task 1: Lock route helper and proxy contract

**Files:**
- Modify: `src/lib/i18n/routes.ts`
- Modify: `src/proxy.ts`
- Test: throwaway Node/HTTP smoke script during this task; no permanent test file unless the repository already has a route-helper test convention.

**Interfaces:**
- `localizedHref(href: string, locale: Locale): string` returns locale-prefixed paths.
- `stripLocale(pathname: string | null | undefined): string` strips only a leading `/vi` or `/en` for comparisons.
- `switchLocalePath(pathname: string | null | undefined, target: Locale): string` preserves suffix/query/hash while switching locale.
- `proxy(request: NextRequest)` passes `/vi` and `/en` route requests through and does not rewrite unprefixed public requests.

- [ ] **Step 1: Capture current helper/proxy behavior and all callsites**

Run:
```bash
git grep -n "localizedHref\|stripLocale\|switchLocalePath" -- src
```

Record every caller that assumes the Vietnamese URL is unprefixed. Do not edit those callers in this task; Task 4 migrates them after the helper contract is changed.

- [ ] **Step 2: Implement the prefix contract**

In `routes.ts`, use:
```ts
const PREFIX: Record<Locale, string> = { vi: "/vi", en: "/en" };
```

Make `localizedHref` split path from query/hash, remove any leading `/vi` or `/en` from the input suffix, then return exactly one target prefix. Required examples:
```ts
localizedHref("/profile", "vi") === "/vi/profile";
localizedHref("/profile", "en") === "/en/profile";
localizedHref("/vi/profile", "en") === "/en/profile";
localizedHref("/en/profile?tab=team#people", "vi") === "/vi/profile?tab=team#people";
localizedHref("/", "vi") === "/vi";
localizedHref("/", "en") === "/en";
```

Keep external URLs, `mailto:`, `tel:`, `#hash`, protocol-relative URLs and non-path values unchanged. Do not accept `/ho-so` or `/luat-ftc` as aliases.

- [ ] **Step 3: Remove proxy rewrite/redirect compatibility**

Change `src/proxy.ts` so the public branch is:
```ts
if (pathname === "/vi" || pathname.startsWith("/vi/") || pathname === "/en" || pathname.startsWith("/en/")) {
  return NextResponse.next();
}
```

Remove the unprefixed-to-`/vi` rewrite and `/vi`-to-unprefixed redirect. Keep matcher exclusions unchanged. Requests outside locale prefixes must fall through to normal Next routing and return `404`.

- [ ] **Step 4: Run helper typecheck and proxy-focused smoke**

Run the full available checks for the modified module:
```bash
npx tsc --noEmit
npm run lint
```

Use a throwaway request check against a production server after Task 5; expected route statuses are recorded in Task 6. If helper tests exist, run the complete helper test file, not one test case.

- [ ] **Step 5: Commit**

```bash
git add src/lib/i18n/routes.ts src/proxy.ts
git commit -m "refactor: require locale prefixes in public routes"
```

---

### Task 2: Move profile and FTC rules route directories

**Files:**
- Move: `src/app/(site)/[locale]/ho-so/` → `src/app/(site)/[locale]/profile/`
- Move: `src/app/(site)/[locale]/resources/rules/` → `src/app/(site)/[locale]/ftc-rules/`
- Modify: moved page files, relative imports and route-local metadata.

**Interfaces:**
- `src/app/(site)/[locale]/profile/page.tsx` exports the profile page and metadata for `/[locale]/profile`.
- `src/app/(site)/[locale]/ftc-rules/page.tsx` exports the FTC rules page and metadata for `/[locale]/ftc-rules`.
- No `ho-so/` or `resources/rules/` public route directory remains.

- [ ] **Step 1: Inventory route-local imports and metadata**

Run:
```bash
git grep -n "ho-so\|resources/rules\|luat-ftc" -- "src/app/(site)/[locale]" src/components src/lib src/data
```

Read the moved page files and note relative imports that will change when their directory depth/path changes. Keep route-local components together with their route unless an import would cross a boundary unnecessarily.

- [ ] **Step 2: Move profile route**

Move the complete profile route directory:
```text
src/app/(site)/[locale]/ho-so/ → src/app/(site)/[locale]/profile/
```

Keep `ProfileNavigation.tsx` and the profile renderer in the same route folder. Ensure the page rejects unsupported locale values through the existing layout/page validation and emits `profileSeo` metadata.

- [ ] **Step 3: Move rules route**

Move:
```text
src/app/(site)/[locale]/resources/rules/ → src/app/(site)/[locale]/ftc-rules/
```

Update its `canonicalPath` to `/ftc-rules`, route-local links and any relative imports. Preserve the manual content and existing search/anchor behavior.

- [ ] **Step 4: Run TypeScript after moves**

```bash
npx tsc --noEmit
```

Expected: no new diagnostics. Do not proceed with stale imports.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/[locale]/profile" "src/app/(site)/[locale]/ftc-rules"
git rm -r "src/app/(site)/[locale]/ho-so" "src/app/(site)/[locale]/resources/rules"
git commit -m "refactor: rename public route slugs to English"
```

If Git detects moves automatically, stage the final state and verify `git diff --cached --name-status` contains no duplicate old route.

---

### Task 3: Update suffix metadata, sitemap and route data

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/data/profile.ts`
- Modify: moved FTC rules page metadata/data modules.
- Modify: any route SEO modules found by the consistency search.

**Interfaces:**
- Each `RouteConfig` has one locale-neutral `path` suffix; no route-specific `enPath`.
- `toAbsoluteUrl("/profile", "vi")` returns the `/vi/profile` absolute URL.
- Sitemap contains only locale-prefixed URLs.

- [ ] **Step 1: Simplify sitemap route configuration**

Change the route shape to:
```ts
type RouteConfig = {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};
```

Replace the profile route's `path: "/ho-so", enPath: "/profile"` with:
```ts
{ path: "/profile", changeFrequency: "weekly", priority: 0.9 }
```

Use `localizedHref(route.path, locale)` for both languages. Do the same for `/ftc-rules` if it is listed explicitly; data-driven resource article suffixes remain English.

- [ ] **Step 2: Update profile and rules canonical paths**

Require:
```ts
profileSeo.vi.canonicalPath === "/profile";
profileSeo.en.canonicalPath === "/profile";
```

Require rules metadata canonical suffix `/ftc-rules` in both locales. Do not encode `/vi` or `/en` inside route SEO data; `buildMetadata` adds the locale.

- [ ] **Step 3: Verify sitemap and metadata source consistency**

Run:
```bash
git grep -n 'canonicalPath:.*\(ho-so\|luat-ftc\|resources/rules\)\|enPath\|path: "/ho-so"' -- src
```

Expected: no obsolete route definitions. Keep resource article slugs and category IDs unchanged unless they literally reference the moved rules route.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/data/profile.ts src/lib/seo src/app
 git commit -m "seo: publish locale-prefixed route metadata"
```

---

### Task 4: Migrate every internal link and route comparison

**Files:**
- Modify: every source file returned by the consistency searches, including navigation/layout/shared link wrappers, resource/manual components, page links, route comparisons and search-index href data.

**Interfaces:**
- All internal public links resolve through `localizedHref`, `LocaleLink`, `BootLink`, `CTAButton`, or `switchLocalePath`.
- No public component constructs an unprefixed or hard-coded locale path.
- Manual/resource links use `/ftc-rules`, never `/resources/rules`, `/luat-ftc` or `/ho-so`.

- [ ] **Step 1: Find all stale slugs and hard-coded public paths**

Run all searches, not one:
```bash
git grep -n -E 'ho-so|luat-ftc|resources/rules|href="/(fundraising|recruitment|contact-us|course|resources|profile)|href=\x27/(fundraising|recruitment|contact-us|course|resources|profile)|pathname === "|pathname\.startsWith\("/' -- src public
```

Also inspect route references generated from data:
```bash
git grep -n -E 'href: "/|path: "/|canonicalPath: "/|window\.location|router\.(push|replace)\(' -- src/data src/components src/app src/lib
```

Classify each result: public internal link, external URL, hash, API/internal route, test fixture, or stale public slug. Only migrate public internal links.

- [ ] **Step 2: Migrate navigation and shared wrappers first**

Update navbar/footer/CTA/BootLink/LocaleLink callers to pass suffixes such as `/profile`, `/fundraising`, `/ftc-rules` into the locale-aware helper. The helper must produce `/vi/...` or `/en/...`; do not append locale manually at callsites.

- [ ] **Step 3: Migrate resource/manual links and route comparisons**

Update `ManualViewer`, `ResourceSearch`, `ResourcesHub`, article placeholders/cards, breadcrumb links and any route comparison to `/ftc-rules`. For a locale comparison, use `stripLocale(pathname)` before comparing suffixes. Preserve hash anchors such as `#G205`.

- [ ] **Step 4: Migrate page-local links and generated href data**

Update all page components and data records that link to public routes. Keep API, analytics, internal deck and asset URLs unchanged. Ensure language toggle preserves suffix and query/hash.

- [ ] **Step 5: Run consistency grep and full i18n check**

```bash
git grep -n -E 'ho-so|luat-ftc|resources/rules' -- src public
npm run check:i18n
```

Expected: no obsolete public slug references except deliberate tests/spec documentation or migration assertions. Any remaining match must be reviewed and classified, not blindly deleted.

- [ ] **Step 6: Commit**

```bash
git add src public
 git commit -m "refactor: migrate internal links to locale routes"
```

---

### Task 5: Full verification and route smoke matrix

**Files:**
- Modify: only files required by failures from the checks above.
- Test: throwaway production HTTP/browser scripts; remove them after verification.

**Interfaces:**
- Production route matrix is the acceptance contract.

- [ ] **Step 1: Run the full repository checks**

```bash
npm run lint
npm run check:i18n
npm run check:assets
npm run build
```

Record existing warnings separately from new failures. Do not claim completion while any command exits nonzero.

- [ ] **Step 2: Start a fresh production server**

Use an unused port and run `next start`, avoiding any existing server process. Test with redirects disabled.

- [ ] **Step 3: Verify route status matrix**

Expected statuses:

| URL | Expected |
|---|---:|
| `/vi` | 200 |
| `/en` | 200 |
| `/vi/profile` | 200 |
| `/en/profile` | 200 |
| `/vi/ftc-rules` | 200 |
| `/en/ftc-rules` | 200 |
| `/` | 404 |
| `/profile` | 404 |
| `/fundraising` | 404 |
| `/ho-so` | 404 |
| `/luat-ftc` | 404 |
| `/resources/rules` | 404 |
| `/vi/ho-so` | 404 |
| `/vi/luat-ftc` | 404 |
| `/vi/resources/rules` | 404 |
| `/en/ho-so` | 404 |
| `/en/luat-ftc` | 404 |
| `/en/resources/rules` | 404 |

Also verify `/api/...`, `/analytics`, `/course/arduino-mblock-deck`, `/Images/...` retain their current behavior.

- [ ] **Step 4: Verify SEO and language switching in rendered pages**

For `/vi/profile` and `/en/profile`, assert:

- canonical is the current locale-prefixed URL;
- alternate `vi` and `en` links point to `/vi/profile` and `/en/profile`;
- visible language links point to the same suffix in the other locale;
- no rendered public href is unprefixed or uses an obsolete slug.

Repeat rules assertions for `/vi/ftc-rules` and `/en/ftc-rules`.

- [ ] **Step 5: Verify responsive and keyboard behavior**

At 390px and 1440px:

- no horizontal overflow;
- profile mobile table cards and desktop tables render in their intended breakpoint;
- rules manual search and anchors still work;
- language controls have visible focus;
- direct hard load works for both locale routes.

- [ ] **Step 6: Consistency final search**

```bash
git grep -n -E 'ho-so|luat-ftc|resources/rules' -- src public
```

Expected: no obsolete runtime route references. Search route path literals and verify every public one has a locale-aware construction path.

- [ ] **Step 7: Remove throwaway scripts and commit verification fixes**

Delete any temporary smoke scripts. If checks required fixes, run the complete affected check again, then:
```bash
git add src public
 git commit -m "test: verify locale-prefixed public routes"
```

---

## Self-review

- **Spec coverage:** Proxy behavior is Task 1; filesystem slug moves are Task 2; metadata/sitemap are Task 3; every internal caller and language switch is Task 4; route 404 matrix, SEO, responsive, keyboard and full checks are Task 5.
- **Placeholder scan:** No `TBD`, `TODO`, “implement later”, or unqualified “handle edge cases” instructions. Every migration step names files, commands or exact expected behavior.
- **Type consistency:** `localizedHref`, `stripLocale`, `switchLocalePath`, `RouteConfig`, `generateMetadata` and route page exports match existing TypeScript conventions. The route matrix uses the exact suffixes from the approved spec.
- **Scope:** No task changes content, APIs, analytics, internal deck or assets. Old public URLs intentionally return `404`, as approved.
- **Consistency note:** The current repository may contain unrelated user changes. Implementers must stage only files belonging to this migration and must not revert unrelated modifications.
