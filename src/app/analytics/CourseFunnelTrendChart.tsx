"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Eye, FileText, MousePointerClick, type LucideIcon } from "lucide-react";
import type {
  CourseFunnelEventId,
  TrendBucket,
  TrendRange,
} from "@/lib/posthog/query";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.25, 1, 0.5, 1] as const;

const SERIES: Array<{
  id: CourseFunnelEventId;
  label: string;
  color: string;
  icon: LucideIcon;
}> = [
  {
    id: "course_page_viewed",
    label: "Trang khóa học",
    color: "var(--chart-1)",
    icon: Eye,
  },
  {
    id: "course_register_page_viewed",
    label: "Form đăng ký",
    color: "var(--chart-3)",
    icon: FileText,
  },
  {
    id: "course_register_submit_clicked",
    label: "Submit",
    color: "var(--chart-4)",
    icon: MousePointerClick,
  },
];

const CHART = {
  width: 920,
  height: 280,
  pad: { top: 20, right: 12, bottom: 36, left: 48 },
} as const;

const PLOT_WIDTH = CHART.width - CHART.pad.left - CHART.pad.right;
const PLOT_HEIGHT = CHART.height - CHART.pad.top - CHART.pad.bottom;

type CourseFunnelTrendChartProps = {
  weekly: TrendBucket[];
  monthly: TrendBucket[];
  lastUpdated?: Date | null;
  refreshing?: boolean;
};

function formatCount(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function parseLocalDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatBucketTitle(range: TrendRange, key: string): string {
  if (range === "monthly") {
    const date = parseLocalDateKey(key);
    return date.toLocaleDateString("vi-VN", {
      month: "long",
      year: "numeric",
    });
  }

  const date = parseLocalDateKey(key);
  return date.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function niceMax(value: number): number {
  if (value <= 0) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const step =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return step * magnitude;
}

function buildTicks(max: number): number[] {
  const top = niceMax(max);
  const step = top / 4;
  return [0, step, step * 2, step * 3, top];
}

function pointAt(
  index: number,
  value: number,
  length: number,
  max: number,
): { x: number; y: number } {
  const x =
    length <= 1
      ? CHART.pad.left + PLOT_WIDTH / 2
      : CHART.pad.left + (index / (length - 1)) * PLOT_WIDTH;
  const ratio = max <= 0 ? 0 : value / max;
  const y = CHART.pad.top + PLOT_HEIGHT - ratio * PLOT_HEIGHT;
  return { x, y };
}

function linePath(
  buckets: TrendBucket[],
  seriesId: CourseFunnelEventId,
  max: number,
): string {
  if (buckets.length === 0) return "";

  return buckets
    .map((bucket, index) => {
      const { x, y } = pointAt(index, bucket[seriesId], buckets.length, max);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function FunnelStatCard({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50"
            style={{ color }}
            aria-hidden
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
          <span className="truncate text-sm font-medium text-foreground">
            {label}
          </span>
        </div>
        <p className="shrink-0 text-xl font-bold tracking-tight text-foreground tabular-nums sm:text-2xl">
          {formatCount(value)}
        </p>
      </div>
    </div>
  );
}

function RangeToggle({
  range,
  onChange,
}: {
  range: TrendRange;
  onChange: (next: TrendRange) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative inline-flex shrink-0 rounded-full border border-border bg-muted p-0.5"
      role="tablist"
      aria-label="Chu kỳ biểu đồ"
    >
      {(["weekly", "monthly"] as const).map((option) => {
        const selected = range === option;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option)}
            className={cn(
              "relative z-10 min-h-8 min-w-[4.75rem] rounded-full px-3 text-xs font-medium transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none sm:min-h-9 sm:min-w-[5.25rem] sm:px-3.5 sm:text-sm",
              selected
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {selected ? (
              <motion.span
                layoutId="analytics-range-pill"
                className="absolute inset-0 rounded-full bg-background shadow-sm"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.22, ease: EASE_OUT }
                }
              />
            ) : null}
            <span className="relative">
              {option === "weekly" ? "Theo tuần" : "Theo tháng"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function CourseFunnelTrendChart({
  weekly,
  monthly,
  lastUpdated,
  refreshing = false,
}: CourseFunnelTrendChartProps) {
  const prefersReducedMotion = useReducedMotion();
  const [range, setRange] = useState<TrendRange>("monthly");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const buckets = range === "weekly" ? weekly : monthly;
  const periodLabel =
    range === "weekly"
      ? "Tuần này · T2–CN"
      : `Năm ${new Date().getFullYear()}`;

  const statTotals = useMemo(
    () =>
      SERIES.map((series) => ({
        ...series,
        total: buckets.reduce((sum, bucket) => sum + bucket[series.id], 0),
      })),
    [buckets],
  );

  const maxValue = useMemo(
    () =>
      Math.max(
        0,
        ...buckets.flatMap((bucket) =>
          SERIES.map((series) => bucket[series.id]),
        ),
      ),
    [buckets],
  );

  const yMax = niceMax(maxValue);
  const yTicks = buildTicks(maxValue);

  const activeIndex =
    hoverIndex !== null && hoverIndex >= 0 && hoverIndex < buckets.length
      ? hoverIndex
      : null;

  const activeBucket = activeIndex !== null ? buckets[activeIndex] : null;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg || buckets.length === 0) return;

      const rect = svg.getBoundingClientRect();
      const relativeX =
        ((event.clientX - rect.left) / rect.width) * CHART.width;
      const plotX = relativeX - CHART.pad.left;
      const index = Math.round((plotX / PLOT_WIDTH) * (buckets.length - 1));
      const clamped = Math.max(0, Math.min(buckets.length - 1, index));
      setHoverIndex(clamped);
    },
    [buckets.length],
  );

  const crosshairX =
    activeIndex === null
      ? 0
      : pointAt(activeIndex, 0, buckets.length, yMax).x;

  const tooltipPercent =
    activeIndex === null ? 0 : (crosshairX / CHART.width) * 100;

  const chartSignature = buckets.map((bucket) => bucket.key).join("|");

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="grid shrink-0 gap-3 sm:grid-cols-3">
        {statTotals.map((series) => (
          <FunnelStatCard
            key={series.id}
            label={series.label}
            value={series.total}
            color={series.color}
            icon={series.icon}
          />
        ))}
      </div>

      <article className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <header className="flex shrink-0 flex-col gap-2 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-tight text-foreground text-balance sm:text-lg">
              Phễu đăng ký khóa học
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{periodLabel}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {lastUpdated ? (
              <p
                className={cn(
                  "text-xs text-muted-foreground tabular-nums transition-opacity duration-200 motion-reduce:transition-none",
                  refreshing && "opacity-70",
                )}
              >
                {refreshing ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse"
                      aria-hidden
                    />
                    Đang cập nhật…
                  </span>
                ) : (
                  `Cập nhật ${lastUpdated.toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}`
                )}
              </p>
            ) : null}
            <RangeToggle
              range={range}
              onChange={(next) => {
                setRange(next);
                setHoverIndex(null);
              }}
            />
          </div>
        </header>

        <div
          ref={plotRef}
          className="relative min-h-0 flex-1 bg-muted/25 px-2 py-2 sm:px-3"
        >
          <motion.div
            className="h-full min-h-[10rem]"
            animate={{ opacity: refreshing && !prefersReducedMotion ? 0.72 : 1 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${CHART.width} ${CHART.height}`}
              preserveAspectRatio="xMidYMid meet"
              className="h-full w-full touch-none select-none"
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setHoverIndex(null)}
              role="img"
              aria-label="Biểu đồ xu hướng phễu đăng ký khóa học"
            >
              {yTicks.map((tick) => {
                const y = pointAt(0, tick, buckets.length, yMax).y;
                return (
                  <g key={tick}>
                    <line
                      x1={CHART.pad.left}
                      x2={CHART.width - CHART.pad.right}
                      y1={y}
                      y2={y}
                      stroke="var(--border)"
                      strokeDasharray="4 6"
                    />
                    <text
                      x={CHART.pad.left - 10}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-muted-foreground text-[10px] tabular-nums sm:text-[11px]"
                    >
                      {formatCount(tick)}
                    </text>
                  </g>
                );
              })}

              {buckets.map((bucket, index) => {
                const { x } = pointAt(index, 0, buckets.length, yMax);
                return (
                  <text
                    key={bucket.key}
                    x={x}
                    y={CHART.height - 10}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[10px] sm:text-[11px]"
                  >
                    {bucket.label}
                  </text>
                );
              })}

              {SERIES.map((series) => (
                <path
                  key={`${range}-${series.id}-${chartSignature}`}
                  d={linePath(buckets, series.id, yMax)}
                  fill="none"
                  stroke={series.color}
                  strokeWidth={2.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {activeIndex !== null ? (
                <motion.line
                  x1={crosshairX}
                  x2={crosshairX}
                  y1={CHART.pad.top}
                  y2={CHART.pad.top + PLOT_HEIGHT}
                  stroke="var(--primary)"
                  strokeOpacity={0.35}
                  strokeDasharray="4 4"
                  initial={false}
                  animate={{ x1: crosshairX, x2: crosshairX, opacity: 1 }}
                  transition={{
                    x1: {
                      duration: prefersReducedMotion ? 0 : 0.15,
                      ease: EASE_OUT,
                    },
                    x2: {
                      duration: prefersReducedMotion ? 0 : 0.15,
                      ease: EASE_OUT,
                    },
                    opacity: { duration: 0.12 },
                  }}
                />
              ) : null}

              {SERIES.map((series) =>
                buckets.map((bucket, index) => {
                  const { x, y } = pointAt(
                    index,
                    bucket[series.id],
                    buckets.length,
                    yMax,
                  );
                  const active = activeIndex === index;
                  return (
                    <circle
                      key={`${range}-${series.id}-${bucket.key}`}
                      cx={x}
                      cy={y}
                      r={active ? 4.5 : 2.75}
                      fill={series.color}
                      opacity={active ? 1 : 0.85}
                    />
                  );
                }),
              )}
            </svg>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-3 top-2 flex flex-wrap gap-2">
            {SERIES.map((series) => (
              <span
                key={series.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/90 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm motion-reduce:backdrop-blur-none sm:text-xs"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: series.color }}
                  aria-hidden
                />
                {series.label}
              </span>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {activeBucket ? (
              <motion.div
                key={`${range}-${activeBucket.key}`}
                className="pointer-events-none absolute bottom-2 z-10 w-[min(100%,12.5rem)] rounded-lg border border-border bg-card/95 px-3 py-2 shadow-md backdrop-blur-sm motion-reduce:backdrop-blur-none"
                style={{
                  left: `clamp(0.25rem, ${tooltipPercent.toFixed(1)}%, calc(100% - 13rem))`,
                }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 2 }}
                transition={{ duration: 0.14, ease: EASE_OUT }}
              >
                <p className="text-xs font-semibold text-foreground text-balance sm:text-sm">
                  {formatBucketTitle(range, activeBucket.key)}
                </p>
                <ul className="mt-1.5 space-y-1">
                  {SERIES.map((series) => (
                    <li
                      key={series.id}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <span className="inline-flex min-w-0 items-center gap-1.5 text-muted-foreground">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: series.color }}
                          aria-hidden
                        />
                        <span className="truncate">{series.label}</span>
                      </span>
                      <span className="shrink-0 font-semibold tabular-nums text-foreground">
                        {formatCount(activeBucket[series.id])}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </article>
    </div>
  );
}
