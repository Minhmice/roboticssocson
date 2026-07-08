const routes = ["/", "/course", "/sponsor", "/sponsorship"];

function pick(html, ...res) {
  for (const re of res) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

for (const p of routes) {
  const res = await fetch("http://127.0.0.1:4000" + p);
  const html = await res.text();
  const title = pick(html, /<title>([^<]*)<\/title>/);
  console.log("\n===", p, "status", res.status, "===");
  console.log("title:", title);
  console.log(
    "desc:",
    pick(
      html,
      /name="description" content="([^"]*)"/,
      /content="([^"]*)" name="description"/,
    ),
  );
  console.log(
    "canonical:",
    pick(
      html,
      /rel="canonical" href="([^"]*)"/,
      /href="([^"]*)" rel="canonical"/,
    ),
  );
  console.log(
    "og:url:",
    pick(
      html,
      /property="og:url" content="([^"]*)"/,
      /content="([^"]*)" property="og:url"/,
    ),
  );
  console.log(
    "og:image:",
    pick(
      html,
      /property="og:image" content="([^"]*)"/,
      /content="([^"]*)" property="og:image"/,
    ),
  );
  console.log(
    "twitter:image:",
    pick(
      html,
      /name="twitter:image" content="([^"]*)"/,
      /content="([^"]*)" name="twitter:image"/,
    ),
  );
  if (p === "/course") {
    const bad = /Sponsorship packages|Gói tài trợ|Sponsor Robotics/i.test(
      title || "",
    );
    console.log(bad ? "FAIL: course title overwritten" : "PASS: course title distinct");
  }
}
