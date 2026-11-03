"use client";

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";
import type { ChunkMeta, SectionMeta } from "@/types/manual";
import { BLUR, CSS_EASE, REDUCED_QUERY } from "@/lib/manual/motion";
import { cn } from "@/lib/utils";
import type { Lang } from "./useManualReader";

export function titleOf(item: { title: string; title_vi?: string }, lang: Lang) {
  return lang === "vi" && item.title_vi ? item.title_vi : item.title;
}

const subscribeNoop = () => () => {};
function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;

function getNavOffsets(el: HTMLElement, nav: HTMLElement) {
  let top = 0;
  let left = 0;
  let curr: HTMLElement | null = el;
  while (curr && curr !== nav) {
    top += curr.offsetTop;
    left += curr.offsetLeft;
    curr = curr.offsetParent as HTMLElement | null;
  }
  return { top, left };
}

interface TocSectionItemProps {
  sec: SectionMeta;
  lang: Lang;
  activeChunkId: string;
  open: boolean;
  reducedMotion: boolean;
  onToggle: (id: string) => void;
  onGo: (chunk: ChunkMeta) => void;
}

function TocSectionItem({
  sec,
  lang,
  activeChunkId,
  open,
  reducedMotion,
  onToggle,
  onGo,
}: TocSectionItemProps) {
  const panelId = `toc-${sec.id}`;
  const multi = sec.chunks.length > 1;
  const sectionActive = sec.chunks.some((c) => c.id === activeChunkId);
  // false during SSR/hydration, true after: first paint must not play the open stagger
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={multi ? open : undefined}
        aria-controls={multi ? panelId : undefined}
        onClick={() => (multi ? onToggle(sec.id) : onGo(sec.chunks[0]))}
        className={cn(
          "flex min-h-11 w-full items-center justify-between gap-2 rounded-md px-2 text-left font-semibold",
          "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-muted",
          "motion-safe:active:scale-[0.98] motion-reduce:transform-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          sectionActive ? "text-primary" : "text-foreground",
        )}
        style={{
          transitionProperty: "background-color, color, transform",
          transitionDuration: "160ms, 160ms, 140ms",
          transitionTimingFunction: CSS_EASE.out,
        }}
      >
        <span className="flex min-w-0 items-baseline gap-2">
          <span className="font-mono text-xs text-primary">{sec.num}</span>
          <span className="truncate">{titleOf(sec, lang)}</span>
        </span>
        {multi ? (
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 shrink-0 text-muted-foreground motion-reduce:transition-none",
              open && "rotate-180",
            )}
            style={{
              transitionProperty: "transform",
              transitionDuration: "240ms",
              transitionTimingFunction: CSS_EASE.out,
            }}
          />
        ) : null}
      </button>

      {multi ? (
        <div
          className="grid transition-[grid-template-rows] motion-reduce:transition-none"
          style={{
            gridTemplateRows: open ? "1fr" : "0fr",
            transitionDuration: open ? "240ms" : "140ms",
            transitionTimingFunction: CSS_EASE.out,
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <ul
              id={panelId}
              inert={open ? undefined : true}
              className="my-0.5 ml-3 space-y-0.5 border-l border-border pl-2"
            >
              {sec.chunks.map((c, i) => {
                const active = c.id === activeChunkId;
                const staggerDelay = Math.min(i, 12) * 40;
                const childStyle: React.CSSProperties = reducedMotion
                  ? {
                      opacity: open ? 1 : 0,
                      transitionProperty: mounted ? "opacity" : "none",
                      transitionDuration: open ? "180ms" : "120ms",
                      transitionTimingFunction: CSS_EASE.out,
                      transitionDelay: "0ms",
                    }
                  : {
                      opacity: open ? 1 : 0,
                      transform: open ? "translateY(0)" : "translateY(-4px)",
                      filter: open ? "blur(0px)" : `blur(${BLUR.soft}px)`,
                      transitionProperty: mounted ? "opacity, transform, filter" : "none",
                      transitionDuration: open ? "180ms" : "120ms",
                      transitionTimingFunction: CSS_EASE.out,
                      transitionDelay: mounted && open ? `${staggerDelay}ms` : "0ms",
                    };

                return (
                  <li key={c.id} style={childStyle}>
                    <a
                      href={`#${c.id}`}
                      aria-current={active ? "location" : undefined}
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                        e.preventDefault();
                        onGo(c);
                      }}
                      className={cn(
                        "relative flex min-h-11 items-center justify-between gap-2 rounded-md px-2",
                        "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-muted/60 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                        "motion-safe:active:scale-[0.98] motion-reduce:transform-none",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                        active ? "font-semibold text-primary" : "text-foreground/80",
                      )}
                      style={{
                        transitionProperty: "background-color, color, transform",
                        transitionDuration: "160ms, 160ms, 140ms",
                        transitionTimingFunction: CSS_EASE.out,
                      }}
                    >
                      <span className="flex min-w-0 items-baseline gap-2">
                        <span className="font-mono text-[0.6875rem]">{c.num}</span>
                        <span className="truncate">{titleOf(c, lang)}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[0.6875rem] text-muted-foreground">
                        {lang === "vi" ? `tr.${c.p0}` : `p.${c.p0}`}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Toc({
  sections,
  lang,
  activeChunkId,
  openSections,
  onToggle,
  onGo,
}: {
  sections: SectionMeta[];
  lang: Lang;
  activeChunkId: string;
  openSections: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onGo: (chunk: ChunkMeta) => void;
}) {
  const navRef = useRef<HTMLElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeReduced, getReduced, () => false);
  const [indicator, setIndicator] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 44,
    visible: false,
    measured: false,
    animate: false,
  });
  const hasMeasured = useRef(false);
  const prevChunkId = useRef(activeChunkId);

  const updateIndicator = useCallback(
    (animate: boolean) => {
      if (!navRef.current) return;
      const activeSection = sections.find((s) =>
        s.chunks.some((c) => c.id === activeChunkId),
      );
      const isSectionOpen = activeSection ? openSections.has(activeSection.id) : false;

      if (!isSectionOpen) {
        setIndicator((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        return;
      }

      const activeEl = navRef.current.querySelector<HTMLAnchorElement>(
        'a[aria-current="location"]',
      );
      if (!activeEl) {
        setIndicator((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        return;
      }

      const { top, left } = getNavOffsets(activeEl, navRef.current);
      hasMeasured.current = true;
      setIndicator({
        top,
        left,
        width: activeEl.offsetWidth,
        height: activeEl.offsetHeight,
        visible: true,
        measured: true,
        animate,
      });
    },
    [activeChunkId, openSections, sections],
  );

  useEffect(() => {
    const isNewChunk = prevChunkId.current !== activeChunkId;
    prevChunkId.current = activeChunkId;
    updateIndicator(isNewChunk && hasMeasured.current);
  }, [activeChunkId, openSections, updateIndicator]);

  useEffect(() => {
    if (!navRef.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      updateIndicator(false);
    });
    ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [updateIndicator]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === "grid-template-rows") {
        updateIndicator(false);
      }
    };
    nav.addEventListener("transitionend", onTransitionEnd);
    return () => nav.removeEventListener("transitionend", onTransitionEnd);
  }, [updateIndicator]);

  const transitionProp = !indicator.measured
    ? "none"
    : reducedMotion
      ? "opacity"
      : indicator.animate
        ? "transform, opacity"
        : "opacity";

  const scaleY = indicator.height > 0 ? indicator.height / 44 : 1;

  return (
    <nav
      ref={navRef}
      aria-label={lang === "vi" ? "Mục lục" : "Table of contents"}
      className="relative space-y-0.5 text-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-md bg-primary/10"
        style={{
          top: 0,
          left: indicator.left,
          width: indicator.width,
          height: 44,
          transformOrigin: "top left",
          transform: `translateY(${indicator.top}px) scaleY(${scaleY})`,
          opacity: indicator.visible ? 1 : 0,
          transitionProperty: transitionProp,
          transitionDuration: "220ms",
          transitionTimingFunction: CSS_EASE.inOut,
        }}
      />
      {sections.map((sec) => (
        <TocSectionItem
          key={sec.id}
          sec={sec}
          lang={lang}
          activeChunkId={activeChunkId}
          open={openSections.has(sec.id)}
          reducedMotion={reducedMotion}
          onToggle={onToggle}
          onGo={onGo}
        />
      ))}
    </nav>
  );
}
