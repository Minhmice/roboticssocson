"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CourseFunnelTrendChart } from "@/app/analytics/CourseFunnelTrendChart";
import type { AnalyticsSummary } from "@/lib/posthog/query";
import { cn } from "@/lib/utils";

const REFRESH_MS = 15_000;

async function fetchSummary(): Promise<AnalyticsSummary | null> {
  const response = await fetch("/api/analytics/summary", {
    cache: "no-store",
  });
  if (!response.ok) return null;
  return (await response.json()) as AnalyticsSummary;
}

function AnalyticsChartSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3" aria-hidden>
      <div className="grid shrink-0 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-[4.5rem] animate-pulse rounded-2xl border border-border bg-card motion-reduce:animate-none"
          />
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="h-14 shrink-0 animate-pulse border-b border-border bg-muted/40 motion-reduce:animate-none" />
        <div className="min-h-0 flex-1 animate-pulse bg-muted/25 motion-reduce:animate-none" />
      </div>
    </div>
  );
}

export function AnalyticsDashboardClient() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async (isRefresh: boolean) => {
      if (isRefresh) setRefreshing(true);

      try {
        const data = await fetchSummary();
        if (cancelled) return;
        setSummary(data);
        setLastUpdated(new Date());
      } catch {
        if (!cancelled) setSummary(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    void load(false);

    const interval = window.setInterval(() => {
      void load(true);
    }, REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-muted/40 pt-16">
      <div
        className={cn(
          "mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col",
          "px-4 py-3 sm:px-6 lg:px-8",
        )}
      >
        {summary?.error ? (
          <div className="mb-3 shrink-0 rounded-2xl border border-primary/20 bg-accent px-4 py-3 text-sm leading-relaxed text-foreground text-pretty">
            <p>{summary.error}</p>
            <a
              href={summary.posthogApiKeysUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center gap-1 font-medium text-primary underline-offset-2 hover:underline"
            >
              Tạo Personal API key trên PostHog
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        ) : null}

        {loading && !summary ? (
          <AnalyticsChartSkeleton />
        ) : summary ? (
          <CourseFunnelTrendChart
            weekly={summary.trends.weekly}
            monthly={summary.trends.monthly}
            lastUpdated={lastUpdated}
            refreshing={refreshing}
          />
        ) : null}
      </div>
    </div>
  );
}
