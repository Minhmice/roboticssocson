"use client";

import { useEffect, useState } from "react";
import { AnalyticsDashboardClient } from "@/app/analytics/AnalyticsDashboardClient";
import { AnalyticsLogin } from "@/app/analytics/AnalyticsLogin";

export function AnalyticsGate() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/analytics/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { authenticated: boolean }) => {
        if (cancelled) return;
        queueMicrotask(() => {
          setAuthenticated(Boolean(data.authenticated));
        });
      })
      .catch(() => {
        if (cancelled) return;
        queueMicrotask(() => setAuthenticated(false));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (authenticated === null) {
    return (
      <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">Đang kiểm tra phiên…</p>
      </div>
    );
  }

  if (!authenticated) {
    return <AnalyticsLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return <AnalyticsDashboardClient />;
}
