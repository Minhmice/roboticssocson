"use client";

import posthog from "posthog-js";
import type { AnalyticsEventName } from "@/lib/posthog/events";

export function isPostHogReady(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY) && typeof window !== "undefined";
}

export function captureEvent(
  event: AnalyticsEventName | string,
  properties?: Record<string, string | number | boolean | null | undefined>,
): void {
  if (!isPostHogReady()) return;
  posthog.capture(event, properties);
}

export function capturePageview(path: string, search?: string): void {
  if (!isPostHogReady()) return;
  posthog.capture("$pageview", {
    $current_url: `${window.location.origin}${path}${search ?? ""}`,
    $pathname: path,
  });
}
