"use client";

import { useEffect, useRef } from "react";
import { captureEvent } from "@/lib/posthog/client";
import type { AnalyticsEventName } from "@/lib/posthog/events";

type PageAnalyticsProps = {
  event: AnalyticsEventName;
  surface: string;
};

/** Fire a named page-view event once per mount (SPA-safe). */
export function PageAnalytics({ event, surface }: PageAnalyticsProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    captureEvent(event, { surface });
  }, [event, surface]);

  return null;
}
