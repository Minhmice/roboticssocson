"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, BookOpen, BookmarkCheck, ChevronDown, Info, ListTree, X } from "lucide-react";
import type { ManualChunkData, ManualIndex } from "@/types/manual";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { switchLocalePath } from "@/lib/i18n/routes";
import { readLine } from "@/lib/manual/anchors";
import { cn } from "@/lib/utils";
import { BLUR, CSS_EASE, DUR, EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/manual/motion";
import { ManualSearch } from "./ManualSearch";
import { Toc, titleOf } from "./ManualToc";
import { ManualSection } from "./ManualSection";
import { useManualReader, type Lang } from "./useManualReader";

function useMountTransition(isMounted: boolean, exitDurationMs = 160) {
  const [shouldRender, setShouldRender] = useState(isMounted);

  if (isMounted && !shouldRender) {
    setShouldRender(true);
  }

  useEffect(() => {
    if (!isMounted && shouldRender) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, exitDurationMs);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isMounted, shouldRender, exitDurationMs]);

  return isMounted || shouldRender;
}
interface ManualViewerProps {
  index: ManualIndex;
  firstChunk?: ManualChunkData | null;
  locale?: Lang;
}
const LANGS: { id: Lang; label: string }[] = [
  { id: "vi", label: "Tiếng Việt" },
  { id: "en", label: "English" },
];

function getCurrentAnchor(): string | null {
  if (typeof document === "undefined") return null;
  const at = document.querySelectorAll<HTMLElement>("[data-a]");
  let keep: HTMLElement | null = null;
  const threshold = readLine();
  for (const el of at) {
    const top = el.getBoundingClientRect().top;
    if (top > threshold) break;
    if (el.getBoundingClientRect().bottom > 0) keep = el;
  }
  return keep?.id ?? (window.location.hash ? window.location.hash.replace(/^#/, "") : null);
}

export function ManualViewer({ index, firstChunk, locale = "vi" }: ManualViewerProps) {
  const reader = useManualReader(index, locale);
  const { lookup, lang, activeChunkId, page, goTo, resumeOffer, resume, dismissResume } = reader;
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openChoice, setOpenChoice] = useState<Record<string, boolean>>({});
  const [showTop, setShowTop] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const drawerTrigger = useRef<HTMLButtonElement>(null);
  const stickyBarRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const quickScaleX = useRef<((val: number) => void) | null>(null);

  const [debouncedPage, setDebouncedPage] = useState(page);
  const lastPageUpdate = useRef(0);
  const pageDebounceTimer = useRef<number | NodeJS.Timeout | null>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterFirstMount = useRef(true);

  const langContainerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const viBtnRef = useRef<HTMLAnchorElement>(null);
  const enBtnRef = useRef<HTMLAnchorElement>(null);
  const buttonMetrics = useRef<{ [k in Lang]?: { x: number; width: number } }>({});
  const pillMountedRef = useRef(false);
  const langFirstMount = useRef(true);

  const isResumeOpen = Boolean(resumeOffer);
  const shouldRenderResume = useMountTransition(isResumeOpen, 160);
  const resumeBannerRef = useRef<HTMLDivElement>(null);
  const [cachedResumeOffer, setCachedResumeOffer] = useState(resumeOffer);
  if (resumeOffer && resumeOffer !== cachedResumeOffer) {
    setCachedResumeOffer(resumeOffer);
  }
  const displayedResumeOffer = resumeOffer ?? cachedResumeOffer;
  const shouldRenderTop = useMountTransition(showTop, 160);
  const toTopRef = useRef<HTMLButtonElement>(null);

  const active = lookup.chunks.get(activeChunkId);
  const activeSection = lookup.sectionOf.get(activeChunkId);
  // the section being read is open unless the reader closed it; others stay closed unless opened
  const openSections = useMemo(() => {
    const s = new Set<string>();
    for (const sec of index.sections) {
      const choice = openChoice[sec.id];
      if (choice ?? sec.id === activeSection?.id) s.add(sec.id);
    }
    return s;
  }, [index.sections, openChoice, activeSection?.id]);

  const [first, last] = index.pages;
  const progress = Math.round(((Math.min(Math.max(page, first), last) - first) / Math.max(1, last - first)) * 100);

  // Sticky bar entrance on mount (skipped if restored mid-scroll)
  useGSAP(() => {
    if (!stickyBarRef.current) return;
    if (typeof window !== "undefined" && window.scrollY > 200) return;
    if (prefersReducedMotion()) {
      gsap.fromTo(
        stickyBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: DUR.panel, ease: EASE.out },
      );
      return;
    }
    gsap.fromTo(
      stickyBarRef.current,
      { y: -8, opacity: 0, filter: `blur(${BLUR.soft}px)` },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: DUR.panel,
        ease: EASE.out,
        clearProps: "transform,filter",
      },
    );
  }, { scope: stickyBarRef, dependencies: [] });

  // Progress bar scaleX via gsap.quickTo (no layout repaint)
  useGSAP(() => {
    if (!progressBarRef.current) return;
    gsap.set(progressBarRef.current, { scaleX: progress / 100, transformOrigin: "left center" });
    if (prefersReducedMotion()) {
      quickScaleX.current = (val: number) => {
        if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: val });
      };
    } else {
      quickScaleX.current = gsap.quickTo(progressBarRef.current, "scaleX", {
        duration: DUR.panel,
        ease: EASE.out,
      });
    }
  }, { scope: progressBarRef, dependencies: [] });

  useEffect(() => {
    quickScaleX.current?.(progress / 100);
  }, [progress]);

  // Page counter: debounce at most every 120ms so fast scroll doesn't strobe
  useEffect(() => {
    const now = performance.now();
    const elapsed = now - lastPageUpdate.current;
    if (elapsed >= 120) {
      clearTimeout(pageDebounceTimer.current as number);
      lastPageUpdate.current = now;
      setDebouncedPage(page);
    } else {
      clearTimeout(pageDebounceTimer.current as number);
      pageDebounceTimer.current = setTimeout(() => {
        lastPageUpdate.current = performance.now();
        setDebouncedPage(page);
      }, 120 - elapsed);
    }
    return () => {
      clearTimeout(pageDebounceTimer.current as number);
    };
  }, [page]);

  // Page counter digits crossfade with blur on page change
  useEffect(() => {
    if (counterFirstMount.current) {
      counterFirstMount.current = false;
      return;
    }
    if (!counterRef.current) return;
    if (prefersReducedMotion()) {
      gsap.fromTo(counterRef.current, { opacity: 0.5 }, { opacity: 1, duration: DUR.micro, ease: EASE.out });
      return;
    }
    gsap.fromTo(
      counterRef.current,
      { opacity: 0.4, filter: `blur(${BLUR.soft}px)` },
      { opacity: 1, filter: "blur(0px)", duration: DUR.micro, ease: EASE.out, clearProps: "filter" },
    );
  }, [debouncedPage]);

  // Language toggle sliding active pill
  useGSAP(() => {
    const vi = viBtnRef.current;
    const en = enBtnRef.current;
    const pill = pillRef.current;
    if (!vi || !en || !pill) return;

buttonMetrics.current = {
      vi: { x: vi.offsetLeft, width: vi.offsetWidth },
      en: { x: en.offsetLeft, width: en.offsetWidth },
    };

    const metric = buttonMetrics.current[lang];
    if (!metric) return;

    if (!pillMountedRef.current) {
      pillMountedRef.current = true;
      gsap.set(pill, {
        x: metric.x,
        width: metric.width,
        opacity: 1,
      });
    } else {
      if (prefersReducedMotion()) {
        gsap.set(pill, { x: metric.x, width: metric.width });
      } else {
        gsap.to(pill, {
          x: metric.x,
          width: metric.width,
          duration: 0.22,
          ease: EASE.inOut,
        });
      }
    }
  }, { scope: langContainerRef, dependencies: [lang] });

  // Switching language triggers <main> content short opacity dip
  useEffect(() => {
    if (langFirstMount.current) {
      langFirstMount.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const mainEl = document.querySelector("main");
    if (!mainEl) return;
    gsap.fromTo(
      mainEl,
      { opacity: 1, filter: "blur(0px)" },
      {
        opacity: 0.6,
        filter: `blur(${BLUR.soft}px)`,
        duration: 0.12,
        ease: EASE.inOut,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.set(mainEl, { clearProps: "opacity,filter" });
        },
      },
    );
  }, [lang]);

  // Resume banner entrance / exit animation
  useEffect(() => {
    const el = resumeBannerRef.current;
    if (!el) return;
    if (isResumeOpen) {
      if (prefersReducedMotion()) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: DUR.panel, ease: EASE.out });
      } else {
        gsap.fromTo(
          el,
          { y: 12, scale: 0.97, opacity: 0, filter: `blur(${BLUR.enter}px)` },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: DUR.panel,
            ease: EASE.out,
            clearProps: "filter,transform",
          },
        );
      }
    } else {
      if (prefersReducedMotion()) {
        gsap.to(el, { opacity: 0, duration: 0.16, ease: EASE.out });
      } else {
        gsap.to(el, {
          y: 12,
          scale: 0.97,
          opacity: 0,
          filter: `blur(${BLUR.enter}px)`,
          duration: 0.16,
          ease: EASE.out,
        });
      }
    }
  }, [isResumeOpen]);

  // Back to top entrance / exit animation
  useEffect(() => {
    const el = toTopRef.current;
    if (!el) return;
    if (showTop) {
      if (prefersReducedMotion()) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: DUR.panel, ease: EASE.out });
      } else {
        gsap.fromTo(
          el,
          { y: 12, scale: 0.97, opacity: 0, filter: `blur(${BLUR.enter}px)` },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: DUR.panel,
            ease: EASE.out,
            clearProps: "filter,transform",
          },
        );
      }
    } else {
      if (prefersReducedMotion()) {
        gsap.to(el, { opacity: 0, duration: 0.16, ease: EASE.out });
      } else {
        gsap.to(el, {
          y: 12,
          scale: 0.97,
          opacity: 0,
          filter: `blur(${BLUR.enter}px)`,
          duration: 0.16,
          ease: EASE.out,
        });
      }
    }
  }, [showTop]);

  const debouncedProgress = Math.round(
    ((Math.min(Math.max(debouncedPage, first), last) - first) / Math.max(1, last - first)) * 100,
  );
  const go = useCallback(
    (id: string) => {
      setDrawerOpen(false);
      void goTo(id);
    },
    [goTo],
  );
  const toggleSection = useCallback(
    (id: string) => setOpenChoice((prev) => ({ ...prev, [id]: !(prev[id] ?? id === activeSection?.id) })),
    [activeSection?.id],
  );

  // "/" or Ctrl/Cmd+K focuses search, unless the reader is already typing somewhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing = el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        if (window.matchMedia("(min-width: 1024px)").matches) searchRef.current?.focus();
        else setDrawerOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 1200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const chunkTitle = active ? `${active.num} ${titleOf(active, lang)}` : "";
  const sectionTitle = activeSection && activeSection.id !== active?.id ? `${activeSection.num} ${titleOf(activeSection, lang)}` : "";
  const rules = lookup.rules;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* One compact sticky bar under the global navbar (was two stacked bars + a scroll-%) */}
      <div ref={stickyBarRef} className="sticky top-14 z-30 border-b border-primary/15 bg-accent/95 shadow-[0_1px_0_rgba(37,99,235,0.06)] backdrop-blur sm:top-16">
        <div className="container mx-auto flex items-center gap-3 px-4 py-2 md:px-6">
          <button
            type="button"
            ref={drawerTrigger}
            onClick={() => setDrawerOpen(true)}
            aria-label={lang === "vi" ? "Mở mục lục và tìm kiếm" : "Open table of contents and search"}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-background transition-transform duration-150 active:scale-[0.97] hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:hidden"
          >
            <ListTree className="size-5 text-primary" aria-hidden />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="flex items-center gap-2 truncate text-sm font-bold leading-tight">
              <BookOpen className="hidden size-4 shrink-0 text-primary sm:block" aria-hidden />
              <span className="truncate">{lang === "vi" ? "Luật thi đấu FTC" : "FTC Competition Manual"}</span>
              <span className="hidden shrink-0 rounded-md bg-primary px-1.5 py-0.5 font-mono text-xs font-semibold leading-none text-primary-foreground sm:inline">{index.version}</span>
            </h1>
            <p className="truncate text-xs text-slate-600" aria-live="off">
              {sectionTitle ? `${sectionTitle} › ` : ""}
              {chunkTitle}
            </p>
          </div>
          <span
            ref={counterRef}
            className="hidden shrink-0 font-mono text-xs tabular-nums text-slate-600 sm:block sm:min-w-[8rem] text-right"
            aria-label={lang === "vi" ? `Đang đọc trang ${debouncedPage} trên ${last}` : `Reading page ${debouncedPage} of ${last}`}
          >
            {lang === "vi" ? `tr.${debouncedPage}/${last}` : `p.${debouncedPage}/${last}`} · {debouncedProgress}%
          </span>
          <div
            ref={langContainerRef}
            role="group"
            aria-label={lang === "vi" ? "Chọn ngôn ngữ hiển thị" : "Select display language"}
            className="relative flex shrink-0 rounded-lg border border-primary/20 bg-background p-0.5"
          >
            <span
              ref={pillRef}
              aria-hidden="true"
              className="absolute top-0.5 bottom-0.5 left-0 rounded-md bg-primary opacity-0 pointer-events-none"
            />
            {LANGS.map((l) => {
              const active = lang === l.id;
              const targetPath = switchLocalePath(pathname || "/ftc-rules", l.id);
              return (
                <a
                  key={l.id}
                  ref={l.id === "vi" ? viBtnRef : enBtnRef}
                  href={targetPath}
                  hrefLang={l.id}
                  lang={l.id}
                  aria-current={active ? "true" : undefined}
                  data-no-boot="true"
                  onClick={(event) => {
                    if (active) {
                      event.preventDefault();
                      return;
                    }
                    event.currentTarget.search = window.location.search;
                    const anchor = getCurrentAnchor();
                    if (anchor) {
                      event.currentTarget.hash = `#${anchor}`;
                    } else if (window.location.hash) {
                      event.currentTarget.hash = window.location.hash;
                    }
                  }}
                  className={cn(
                    "relative z-10 inline-flex min-h-9 items-center justify-center rounded-md px-2.5 text-xs font-semibold transition-[color,transform] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:px-3",
                    active
                      ? "text-primary-foreground"
                      : "text-slate-600 hover:text-foreground",
                  )}
                >
                  {l.label}
                </a>
              );
            })}
          </div>
        </div>
        <div
          role="progressbar"
          aria-label={lang === "vi" ? "Tiến độ đọc" : "Reading progress"}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="h-0.5 w-full bg-primary/10 overflow-hidden"
        >
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left bg-primary will-change-transform"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
      <div className="container mx-auto grid gap-x-12 px-4 py-6 md:px-6 lg:grid-cols-[clamp(17.5rem,21vw,22rem)_minmax(0,1fr)] lg:py-8">
        <aside className="sticky top-32 hidden h-[calc(100dvh-9rem)] flex-col lg:flex">
          <ManualSearch lang={lang} onPick={go} inputRef={searchRef} className="shrink-0 pb-3" />
          <div className="-mr-2 min-h-0 flex-1 overflow-y-auto pr-2">
            <Toc sections={index.sections} lang={lang} activeChunkId={activeChunkId} openSections={openSections} onToggle={toggleSection} onGo={(c) => go(c.id)} />
          </div>
        </aside>

        <div className="mx-auto w-full min-w-0 max-w-[50rem]">
          <details className="group rounded-xl border border-primary/20 bg-primary/5 text-sm">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 [&::-webkit-details-marker]:hidden">
              <Info className="size-4 shrink-0" aria-hidden />
              {lang === "vi"
                ? "Bản dịch cộng đồng phi chính thức; văn bản tiếng Anh của FIRST là căn cứ chính thức."
                : "Community translation; official FIRST English text is authoritative."}
              <ChevronDown aria-hidden className="ml-auto size-4 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <p className="max-w-[75ch] px-4 pb-4 leading-relaxed text-foreground/90">
              {lang === "vi" ? (
                <>
                  Bản dịch cộng đồng từ <strong>FIRST® Tech Challenge Competition Manual (BIOBUZZ {index.version})</strong> nhằm hỗ trợ học sinh và mentor Việt Nam tra cứu luật thuận tiện hơn. Đây là bản dịch phi chính thức do cộng đồng đóng góp; khi thi đấu chính thức, trọng tài và ban tổ chức chỉ dùng văn bản tiếng Anh do FIRST ban hành làm căn cứ duy nhất. Chọn nút “English” trên thanh phía trên để đối chiếu nguyên bản từng điều luật.
                </>
              ) : (
                <>
                  This reader references the <strong>FIRST® Tech Challenge Competition Manual (BIOBUZZ {index.version})</strong> to assist students and mentors. The official English text published by FIRST is authoritative for all official competitions and rulings. Vietnamese translations provided are community-maintained for reference and convenience. Use the “Tiếng Việt” button above to read the community translation.
                </>
              )}
            </p>
          </details>

          <div id="manual-list">
            {index.sections.flatMap((sec) =>
              sec.chunks.map((chunk, i) => (
                <ManualSection
                  key={chunk.id}
                  chunk={chunk}
                  lang={lang}
                  rules={rules}
                  initialData={sec.id === index.sections[0].id && i === 0 ? firstChunk : null}
                  onNavigate={go}
                />
              )),
            )}
          </div>
        </div>
      </div>

      {shouldRenderResume && displayedResumeOffer ? (
        <div
          ref={resumeBannerRef}
          role="region"
          aria-label={lang === "vi" ? "Tiếp tục đọc" : "Resume reading"}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-xl items-center gap-3 rounded-2xl border border-primary/30 bg-card p-3 shadow-lg md:left-auto md:right-6 md:mx-0 will-change-transform"
        >
          <BookmarkCheck className="hidden size-5 shrink-0 text-primary sm:block" aria-hidden />
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-semibold">
              {lang === "vi" ? "Tiếp tục vị trí đọc gần nhất?" : "Resume from last reading position?"}
            </p>
            <p className="truncate text-muted-foreground">
              {displayedResumeOffer.ref} {displayedResumeOffer.title} · {lang === "vi" ? "trang" : "page"} {displayedResumeOffer.page}
            </p>
          </div>
          <button
            type="button"
            onClick={resume}
            className="inline-flex min-h-11 shrink-0 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.97] transition-[transform,colors] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {lang === "vi" ? "Đọc tiếp" : "Resume"}
          </button>
          <button
            type="button"
            onClick={dismissResume}
            aria-label={lang === "vi" ? "Bỏ qua, không nhắc lại" : "Dismiss, do not ask again"}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground active:scale-[0.97] transition-[transform,colors] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      ) : null}

      {shouldRenderTop ? (
        <button
          ref={toTopRef}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          aria-label={lang === "vi" ? "Lên đầu trang" : "Back to top"}
          className={cn(
            "fixed right-4 z-40 inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-[0.97] transition-[transform,bottom,colors] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 will-change-transform",
            resumeOffer ? "bottom-24" : "bottom-6",
          )}
        >
          <ArrowUp className="size-5" aria-hidden />
        </button>
      ) : null}
      <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DialogContent
          closeLabel={lang === "vi" ? "Đóng mục lục" : "Close table of contents"}
          onCloseAutoFocus={(e) => {
            // opened from state (button / shortcut), so Radix has no trigger to return focus to
            e.preventDefault();
            drawerTrigger.current?.focus();
          }}
          style={{ transitionTimingFunction: CSS_EASE.drawer }}
          className="left-0 top-0 h-dvh max-w-sm translate-x-0 translate-y-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-3 rounded-none p-4 sm:rounded-none ease-[cubic-bezier(0.32,0.72,0,1)] data-[state=open]:duration-[320ms] data-[state=closed]:duration-200 data-[state=open]:slide-in-from-left motion-safe:data-[state=closed]:slide-out-to-top-0 data-[state=closed]:slide-out-to-left motion-safe:data-[state=open]:zoom-in-100 motion-safe:data-[state=closed]:zoom-out-100"
        >
          <DialogTitle className="flex items-center gap-2 pr-12 text-base">
            <BookOpen className="size-4 text-primary" aria-hidden />
            {lang === "vi" ? "Mục lục và tìm kiếm" : "Table of contents and search"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {lang === "vi"
              ? "Chọn mục để chuyển đến hoặc tìm theo mã luật và từ khóa."
              : "Select a section to jump to or search by rule code and keywords."}
          </DialogDescription>
          <div className="min-h-0 overflow-y-auto">
            <ManualSearch lang={lang} onPick={go} className="pb-3" />
            <Toc sections={index.sections} lang={lang} activeChunkId={activeChunkId} openSections={openSections} onToggle={toggleSection} onGo={(c) => go(c.id)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
