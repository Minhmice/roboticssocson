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
