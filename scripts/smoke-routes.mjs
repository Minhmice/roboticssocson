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
  ["/xyz", ["Không tìm thấy trang"]],
  ["/vi/xyz", ["Không tìm thấy trang"]],
  ["/vi/fundrasing", ["Không tìm thấy trang", "Có phải bạn muốn tìm", 'href="/vi/fundraising"']],
  ["/fundrasing", ["Có phải bạn muốn tìm", 'href="/vi/fundraising"']],
  ["/en/profle", ["Page not found", "Did you mean", 'href="/en/profile"']],
  ["/vi/resources/ftc-components/khong-co", ["Không tìm thấy trang"]],
  ["/vi/resources/community/abc", ["Không tìm thấy trang"]],
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
