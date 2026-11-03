import assert from "node:assert/strict";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { courseSurfacesEnabled } from "../../data/courseRegistration.ts";
import { recruitmentSurfacesEnabled } from "../../data/recruitment.ts";
import { RESOURCE_CATEGORIES } from "../../data/resources.ts";
import { isPublicRoute, resolveLegacy, sitemapRoutes, suggestRoutes } from "./public-routes.ts";

const CATEGORY_IDS = new Set(RESOURCE_CATEGORIES.map((category) => category.id));

/** Category and article URLs are served by the dynamic [category]/[slug] pages. */
function servedByResourcePages(path: string): boolean {
  const match = /^\/resources\/([^/]+)(?:\/[^/]+)?$/.exec(path);
  return match !== null && CATEGORY_IDS.has(match[1]);
}

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
assert.equal(
  isPublicRoute("/recruitment"),
  recruitmentSurfacesEnabled,
  "/recruitment follows the recruitment flag",
);

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
const RECRUITMENT_PATHS = new Set(["/recruitment"]);

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
    isPublicRoute(suffix) || COURSE_PATHS.has(suffix) || RECRUITMENT_PATHS.has(suffix),
    `page ${suffix} exists but is missing from src/lib/routes/public-routes.ts`,
  );
}
const pageSet = new Set(pageSuffixes);
for (const path of sitemapPaths) {
  assert.ok(
    pageSet.has(path) || servedByResourcePages(path),
    `sitemap path ${path} has no page`,
  );
}

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
console.log("[public-routes.check] all checks passed");
