"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { capturePageview } from "@/lib/posthog/client";

/** Manual pageview capture — instrumentation-client disables auto pageviews. */
export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const search = searchParams?.toString();
    capturePageview(pathname, search ? `?${search}` : "");
  }, [pathname, searchParams]);

  return null;
}
