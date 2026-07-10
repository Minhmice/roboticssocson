import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "/ingest";

if (token) {
  posthog.init(token, {
    api_host: host,
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://us.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    defaults: "2026-01-30",
  });
}

export default posthog;
