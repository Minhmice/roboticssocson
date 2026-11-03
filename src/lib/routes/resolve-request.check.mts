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
