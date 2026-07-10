"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { isBootLoaderDisabled } from "@/lib/boot-loader";
import { setBootNavigationHandler } from "@/lib/boot-navigation";
import {
  useBootAnimationReady,
  useBootRevealActions,
} from "@/contexts/BootRevealContext";
import { captureEvent } from "@/lib/posthog/client";
import { AnalyticsEvents } from "@/lib/posthog/events";
import { cn } from "@/lib/utils";

/** Tune durations, copy, and labels here. */
export const BOOT_LOADER_CONFIG = {
  /** Hard page-load choreography length before exit (ms). */
  initialDurationMs: 2200,
  /** Route transition hold while destination loads (ms). */
  routeDurationMs: 1100,
  /** Cover wipe / overlay enter (ms) — page OUT. */
  enterMs: 380,
  /** Exit wipe / scale tail (ms) — page IN. */
  exitMs: 420,
  /** Reduced-motion total hold. */
  reducedMs: 400,
  wordmark: "Robotics Sóc Sơn",
  initial: {
    statusText: "INITIALIZING ROBOTICS COURSE SYSTEM",
    progressLabels: [
      "Loading curriculum",
      "Preparing robotics modules",
      "Calibrating learning path",
    ] as const,
  },
  route: {
    statusText: "ROUTING ROBOTICS SURFACE",
    progressLabels: [
      "Leaving current page",
      "Loading destination",
      "Calibrating view",
    ] as const,
  },
} as const;

type BootMode = "initial" | "route";

const LOGO_PATH =
  "M439.913 0.893296C486.709 6.74021 526.318 35.2439 547.001 77.8777C557.622 99.8037 562.653 126.44 560.577 149.746C557.782 180.93 547.001 207.322 527.356 230.628C510.746 250.443 485.99 266.278 460.995 273.262C446.689 277.276 412.294 277.178 404.354 277.155H404.348C403.295 277.152 402.709 277.151 402.7 277.16C402.62 277.241 420.508 300.71 442.548 329.376C450.094 339.163 457.687 349.016 464.628 358.024L464.711 358.131L464.765 358.202C478.035 375.423 488.9 389.522 492.459 394.098L502.281 406.848H540.772L579.263 406.929L608.012 444.284C623.823 464.911 636.92 482.046 637 482.452C637.16 482.939 533.984 483.102 379.461 482.939L121.683 482.695L112.819 480.99C51.968 468.89 7.48769 420.085 0.77972 357.961C-3.53255 317.926 10.2029 277.16 37.9931 247.682C59.6343 224.7 86.3863 210.57 116.892 205.86C123.68 204.805 141.088 204.642 235.319 204.642C303.757 204.642 345.682 204.317 345.522 203.911C345.442 203.424 326.756 179.062 304.156 149.746C293.394 135.748 282.742 121.915 274.06 110.642L274.051 110.631L274.044 110.621C264.502 98.2308 257.344 88.9358 255.044 85.9172L247.058 75.5227H160.414L73.769 75.4415L48.3744 42.3901C36.8866 27.3512 25.9447 13.1449 21.37 7.20537C20.4113 5.96075 19.7323 5.07911 19.3864 4.62891L15.713 -6.19888e-06H224.459C365.726 -6.19888e-06 435.361 0.243598 439.913 0.893296ZM324.919 76.0912C324.919 76.4161 338.415 94.2816 354.945 115.72C371.476 137.159 393.596 165.906 404.217 179.712L423.462 204.642L428.653 204.155C450.135 201.962 468.901 189.862 479.123 171.51C488.226 155.025 489.504 133.261 482.317 115.477C474.81 96.8802 459.238 83.2375 439.114 77.4718C434.403 76.1724 429.212 76.01 379.461 75.6851C349.435 75.604 324.919 75.7664 324.919 76.0912ZM76.4841 328.889C82.5532 304.283 101 286.337 125.277 281.383C129.349 280.571 149.793 280.327 220.865 280.246L311.263 280.165L325.558 298.599C330.483 305.039 340.818 318.459 352.381 333.474C359.19 342.316 366.425 351.711 373.232 360.56C391.599 384.435 407.172 404.655 407.81 405.467C409.008 406.848 402.7 406.848 266.943 406.686L124.877 406.442L119.287 404.574C108.187 400.757 101.479 396.535 93.3338 388.17C87.2647 382.08 84.9489 378.994 82.2337 373.634C76.8833 363.159 75.6855 358.449 75.2064 346.349C74.8071 337.254 75.0466 334.736 76.4841 328.889Z";

const EASE_OUT_EXPO: Transition["ease"] = [0.16, 1, 0.3, 1];
const EASE_OUT_QUART: Transition["ease"] = [0.25, 1, 0.5, 1];
const SEGMENT_COUNT = 6;
const ORBIT_NODES = [
  { angle: -28, radius: 58, size: 5 },
  { angle: 48, radius: 64, size: 4 },
  { angle: 138, radius: 56, size: 5 },
  { angle: 210, radius: 62, size: 3.5 },
] as const;

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function resolveInternalHref(
  rawHref: string,
  currentPath: string,
): string | null {
  if (!rawHref || rawHref.startsWith("#")) return null;
  if (
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("tel:") ||
    rawHref.startsWith("sms:")
  ) {
    return null;
  }

  try {
    const url = new URL(rawHref, window.location.origin);
    if (url.origin !== window.location.origin) return null;

    const nextPath = normalizePath(url.pathname);
    const current = normalizePath(currentPath);
    if (nextPath === current && !url.search) {
      // Same page; allow hash-only / same-path scroll without boot.
      return null;
    }

    return `${nextPath}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function BootLogoMark({
  reduced,
  compact,
}: {
  reduced: boolean;
  compact?: boolean;
}) {
  const size = compact
    ? "h-[56px] w-[74px] sm:h-[64px] sm:w-[84px]"
    : "h-[72px] w-[96px] sm:h-[88px] sm:w-[116px]";

  return (
    <div
      className={cn(
        "boot-loader__mark relative flex items-center justify-center",
        size,
      )}
    >
      {!reduced && (
        <div
          className="boot-loader__glow pointer-events-none absolute inset-[-18%] rounded-full"
          aria-hidden
        />
      )}

      {!reduced &&
        !compact &&
        ORBIT_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * node.radius;
          const y = Math.sin(rad) * node.radius;
          return (
            <motion.span
              key={node.angle}
              className="boot-loader__orbit-node pointer-events-none absolute left-1/2 top-1/2 hidden rounded-full bg-[#0f172a]/70 sm:block"
              style={{
                width: node.size,
                height: node.size,
                marginLeft: -node.size / 2,
                marginTop: -node.size / 2,
              }}
              aria-hidden
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
              animate={{
                opacity: [0, 0.85, 0.55],
                x: [0, x * 0.2, x],
                y: [0, y * 0.2, y],
                scale: [0.4, 1.05, 1],
              }}
              transition={{
                duration: 0.7,
                delay: 0.45 + i * 0.06,
                ease: EASE_OUT_QUART,
              }}
            />
          );
        })}

      {!reduced && (
        <motion.span
          className="boot-loader__scan pointer-events-none absolute inset-x-[-8%] top-0 h-px sm:h-[2px]"
          aria-hidden
          initial={{ y: "0%", opacity: 0 }}
          animate={{ y: ["0%", "100%"], opacity: [0, 0.9, 0] }}
          transition={{
            duration: compact ? 0.55 : 0.85,
            delay: compact ? 0.12 : 0.35,
            ease: EASE_OUT_QUART,
          }}
        />
      )}

      <svg
        viewBox="0 0 637 483"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-1 h-full w-full text-[#0f172a]"
        aria-hidden
      >
        <motion.path
          d={LOGO_PATH}
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={reduced ? 0 : 3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={
            reduced
              ? { opacity: 1, fillOpacity: 1, strokeOpacity: 0 }
              : {
                  opacity: 1,
                  fillOpacity: compact ? 0.15 : 0,
                  strokeOpacity: 1,
                  pathLength: 0,
                }
          }
          animate={
            reduced
              ? { opacity: 1, fillOpacity: 1, strokeOpacity: 0 }
              : {
                  fillOpacity: 1,
                  strokeOpacity: 0,
                  pathLength: 1,
                }
          }
          transition={
            reduced
              ? { duration: 0.2 }
              : {
                  pathLength: {
                    duration: compact ? 0.55 : 0.9,
                    ease: EASE_OUT_EXPO,
                    delay: compact ? 0.04 : 0.08,
                  },
                  fillOpacity: {
                    duration: 0.28,
                    delay: compact ? 0.4 : 0.78,
                    ease: EASE_OUT_QUART,
                  },
                  strokeOpacity: {
                    duration: 0.22,
                    delay: compact ? 0.5 : 0.9,
                    ease: EASE_OUT_QUART,
                  },
                }
          }
        />
      </svg>
    </div>
  );
}

function SegmentedProgress({
  progress,
  label,
}: {
  progress: number;
  label: string;
}) {
  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px]">
      <div
        className="mb-2.5 flex items-center justify-between gap-3"
        aria-hidden
      >
        <span className="text-[11px] font-medium tracking-[0.04em] text-[#64748b]">
          {label}
        </span>
        <span className="tabular-nums text-[11px] font-semibold text-[#0f172a]/80">
          {Math.round(progress * 100)}%
        </span>
      </div>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${SEGMENT_COUNT}, minmax(0, 1fr))`,
        }}
        aria-hidden
      >
        {Array.from({ length: SEGMENT_COUNT }, (_, i) => {
          const fill = Math.min(1, Math.max(0, progress * SEGMENT_COUNT - i));
          return (
            <div
              key={i}
              className="h-1 overflow-hidden rounded-[2px] bg-[#e2e8f0]"
            >
              <div
                className="h-full rounded-[2px] bg-[#0f172a] transition-[transform] duration-100 ease-out"
                style={{
                  transform: `scaleX(${fill})`,
                  transformOrigin: "left center",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BootLoaderOverlay({
  mode,
  reduced,
  onCovered,
  onComplete,
}: {
  mode: BootMode;
  reduced: boolean;
  /** Fires once when overlay fully covers the viewport (safe to navigate). */
  onCovered?: () => void;
  onComplete: () => void;
}) {
  const isRoute = mode === "route";
  const copy = isRoute
    ? BOOT_LOADER_CONFIG.route
    : BOOT_LOADER_CONFIG.initial;
  const holdMs = reduced
    ? BOOT_LOADER_CONFIG.reducedMs
    : isRoute
      ? BOOT_LOADER_CONFIG.routeDurationMs
      : BOOT_LOADER_CONFIG.initialDurationMs;

  const [phase, setPhase] = useState<"entering" | "holding" | "exiting">(
    isRoute && !reduced ? "entering" : "holding",
  );
  const [progress, setProgress] = useState(reduced ? 1 : 0);
  const [labelIndex, setLabelIndex] = useState(0);
  const completedRef = useRef(false);
  const coveredRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  const signalCovered = useCallback(() => {
    if (coveredRef.current) return;
    coveredRef.current = true;
    onCovered?.();
  }, [onCovered]);

  // When already covered (initial, or reduced-motion route), signal immediately.
  useEffect(() => {
    if (phase !== "holding") return;
    signalCovered();
  }, [phase, signalCovered]);

  // Entering → holding for route wipe-in cover.
  useEffect(() => {
    if (phase !== "entering") return;

    const t = window.setTimeout(() => {
      setPhase("holding");
    }, BOOT_LOADER_CONFIG.enterMs);
    return () => window.clearTimeout(t);
  }, [phase]);

  // Hold + progress, then exit.
  useEffect(() => {
    if (phase !== "holding") return;

    if (reduced) {
      const t = window.setTimeout(
        () => setPhase("exiting"),
        BOOT_LOADER_CONFIG.reducedMs,
      );
      return () => window.clearTimeout(t);
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / holdMs);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setProgress(eased);

      const labelSpan = 1 / copy.progressLabels.length;
      setLabelIndex(
        Math.min(
          copy.progressLabels.length - 1,
          Math.floor(t / labelSpan),
        ),
      );

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("exiting");
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, reduced, holdMs, copy.progressLabels.length]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const t = window.setTimeout(finish, BOOT_LOADER_CONFIG.exitMs);
    return () => window.clearTimeout(t);
  }, [phase, finish]);

  const label =
    copy.progressLabels[
      Math.min(labelIndex, copy.progressLabels.length - 1)
    ];

  const clipPath =
    phase === "entering"
      ? "inset(0% 0% 0% 0%)"
      : phase === "exiting"
        ? "inset(0% 0% 100% 0%)"
        : "inset(0% 0% 0% 0%)";

  return (
    <motion.div
      className="boot-loader fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-[#f8fafc]"
      role="status"
      aria-live="polite"
      aria-busy={phase !== "exiting"}
      initial={
        isRoute && !reduced
          ? { clipPath: "inset(100% 0% 0% 0%)" }
          : { clipPath: "inset(0% 0% 0% 0%)" }
      }
      animate={{ clipPath }}
      transition={{
        clipPath: {
          duration:
            phase === "entering"
              ? BOOT_LOADER_CONFIG.enterMs / 1000
              : phase === "exiting"
                ? BOOT_LOADER_CONFIG.exitMs / 1000
                : 0,
          ease: EASE_OUT_EXPO,
        },
      }}
    >
      <div
        className="boot-loader__hairline pointer-events-none absolute inset-x-0 top-0 h-px bg-[#0f172a]/90"
        aria-hidden
      />

      <div
        className="boot-loader__grid pointer-events-none absolute inset-0"
        aria-hidden
      />

      <motion.div
        className="relative z-1 flex w-full max-w-md flex-col items-center px-6"
        initial={false}
        animate={
          phase === "exiting"
            ? { scale: [1, 0.96, 1.02, 1], opacity: [1, 1, 0.85, 0] }
            : phase === "entering"
              ? { scale: 0.98, opacity: 0.85 }
              : { scale: 1, opacity: 1 }
        }
        transition={
          phase === "exiting"
            ? {
                duration: BOOT_LOADER_CONFIG.exitMs / 1000,
                ease: EASE_OUT_EXPO,
                times: [0, 0.35, 0.7, 1],
              }
            : {
                duration: BOOT_LOADER_CONFIG.enterMs / 1000,
                ease: EASE_OUT_QUART,
              }
        }
      >
        <BootLogoMark reduced={reduced} compact={isRoute} />

        <p className="sr-only">
          {copy.statusText}. {label}.
        </p>

        <motion.p
          className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0f172a]/70 sm:tracking-[0.28em]"
          aria-hidden
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: phase === "exiting" ? 0 : 1, y: 0 }}
          transition={{
            duration: reduced ? 0.2 : 0.35,
            delay: reduced ? 0 : isRoute ? 0.2 : 0.55,
            ease: EASE_OUT_QUART,
          }}
        >
          {copy.statusText}
        </motion.p>

        <motion.h1
          className="mt-3 text-center text-[1.35rem] font-bold tracking-[-0.04em] text-[#0f172a] text-balance sm:text-[1.65rem]"
          initial={
            reduced
              ? false
              : { opacity: 0, x: 28, letterSpacing: "0.08em" }
          }
          animate={{
            opacity: phase === "exiting" ? 0 : 1,
            x: 0,
            letterSpacing: "-0.04em",
          }}
          transition={{
            duration: reduced ? 0.25 : isRoute ? 0.4 : 0.55,
            delay: reduced ? 0.05 : isRoute ? 0.28 : 0.85,
            ease: EASE_OUT_EXPO,
          }}
        >
          {BOOT_LOADER_CONFIG.wordmark}
        </motion.h1>

        <motion.div
          className="mt-8 flex w-full justify-center"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: phase === "exiting" ? 0 : 1, y: 0 }}
          transition={{
            duration: reduced ? 0.2 : 0.35,
            delay: reduced ? 0.1 : isRoute ? 0.35 : 1.05,
            ease: EASE_OUT_QUART,
          }}
        >
          <SegmentedProgress progress={progress} label={label} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Site-wide boot + route transition overlay.
 * - Every hard page load: full calibration sequence.
 * - Internal navigations (/, /course, /contact-us, /course-register-form…):
 *   wipe OUT → load → wipe IN.
 * Disable with `NEXT_PUBLIC_DISABLE_BOOT_LOADER=true`.
 */
export function BootLoader() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const router = useRouter();
  const pathname = usePathname();
  const { beginBoot, endBoot } = useBootRevealActions();
  const pathnameRef = useRef(pathname);
  const pendingHrefRef = useRef<string | null>(null);
  const busyRef = useRef(false);

  const [mode, setMode] = useState<BootMode | null>(null);
  const [session, setSession] = useState(0);
  const [pageLoadDone, setPageLoadDone] = useState(false);

  // Every hard page open: run boot once this mount.
  useEffect(() => {
    if (isBootLoaderDisabled()) return;
    if (pageLoadDone || mode !== null) return;
    const t = window.setTimeout(() => {
      busyRef.current = true;
      beginBoot();
      setMode("initial");
    }, 0);
    return () => window.clearTimeout(t);
  }, [beginBoot, pageLoadDone, mode]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const startRouteTransition = useCallback(
    (href: string) => {
      if (isBootLoaderDisabled()) return false;

      // Recover if a previous transition left the lock stuck.
      if (busyRef.current && mode === null) {
        busyRef.current = false;
      }
      if (busyRef.current) return false;

      const resolved = resolveInternalHref(href, pathnameRef.current);
      if (!resolved) return false;

      pendingHrefRef.current = resolved;
      busyRef.current = true;
      beginBoot();
      flushSync(() => {
        setSession((s) => s + 1);
        setMode("route");
      });
      return true;
    },
    [beginBoot, mode],
  );

  // Keep lock aligned with overlay visibility.
  useEffect(() => {
    if (mode === null) {
      busyRef.current = false;
      pendingHrefRef.current = null;
    }
  }, [mode]);

  // Explicit API for BootLink / CTAButton.
  useEffect(() => {
    setBootNavigationHandler(startRouteTransition);
    return () => setBootNavigationHandler(null);
  }, [startRouteTransition]);

  // Capture-phase fallback for plain <a href="/…"> not using BootLink.
  useEffect(() => {
    if (isBootLoaderDisabled()) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.dataset.noBoot === "true") return;
      if (anchor.dataset.bootLink === "true") return;

      const href = resolveInternalHref(
        anchor.getAttribute("href") || "",
        pathnameRef.current,
      );
      if (!href) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      startRouteTransition(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [startRouteTransition]);

  const handleCovered = useCallback(() => {
    const href = pendingHrefRef.current;
    if (!href) return;
    pendingHrefRef.current = null;
    router.push(href);
  }, [router]);

  const handleComplete = useCallback(() => {
    if (mode === "initial") {
      setPageLoadDone(true);
      captureEvent(AnalyticsEvents.BOOT_LOADER_COMPLETED, {
        surface: pathnameRef.current ?? "/",
      });
    }
    busyRef.current = false;
    pendingHrefRef.current = null;
    setMode(null);
    endBoot();
  }, [endBoot, mode]);

  useEffect(() => {
    if (!mode) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mode]);

  return (
    <AnimatePresence>
      {mode ? (
        <BootLoaderOverlay
          key={`rbs-boot-${mode}-${session}`}
          mode={mode}
          reduced={reduced}
          onCovered={mode === "route" ? handleCovered : undefined}
          onComplete={handleComplete}
        />
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Site shell under the boot overlay. Hidden until `animationReady`, then fades in.
 */
export function BootAwareMain({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ready = useBootAnimationReady();
  const disabled = isBootLoaderDisabled();

  return (
    <div
      data-boot-ready={disabled || ready ? "" : undefined}
      className={cn("boot-aware-shell", className)}
      aria-hidden={!disabled && !ready}
    >
      {children}
    </div>
  );
}
