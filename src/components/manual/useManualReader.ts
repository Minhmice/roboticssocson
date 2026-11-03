"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { ManualIndex } from "@/types/manual";
import { buildLookup, describeAnchor, readLine, resolveAnchor } from "@/lib/manual/anchors";
import { requestChunk } from "@/lib/manual/chunks";
import { clearResume, readResume, writeResume, type ResumeRecord } from "@/lib/manual/resume";
import { isScrollLocked, scrollToAnchor, waitForElement } from "@/lib/manual/scroll";

export type Lang = "vi" | "en";

const SAVE_DELAY_MS = 800;
/** Don't offer "continue reading" for a position within the first screens: nothing to continue. */
const MIN_RESUME_PX = 600;
const noop = () => () => {};

/** Reads a client-only value without a hydration mismatch (server snapshot first, real value after hydration). */
function useClientValue<T>(read: () => T, server: T): T {
  return useSyncExternalStore(noop, read, () => server);
}

export interface ResumeOffer {
  ref: string;
  title: string;
  page: number;
  anchor: string;
}

export function useManualReader(index: ManualIndex, initialLang: Lang = "vi") {
  const lookup = useMemo(() => buildLookup(index), [index]);
  const lang: Lang = initialLang;

  const [activeChunkId, setActiveChunkId] = useState(index.sections[0]?.chunks[0]?.id ?? "");
  const [page, setPage] = useState(index.pages[0]);
  const [dismissed, setDismissed] = useState(false);
  const restoring = useRef(false);

  /** One entry point for every jump: TOC, search, in-text rule links, hash, resume. Always loads the target chunk first. */
  const goTo = useCallback(
    async (rawId: string, opts: { push?: boolean } = {}) => {
      const target = resolveAnchor(rawId, lookup);
      if (!target) return false;
      restoring.current = true;
      setDismissed(true);
      const chunkEl = document.getElementById(target.chunkId);
      // bring the chunk placeholder near, so the fetch result lands under the reader instead of far away
      chunkEl?.scrollIntoView({ block: "start", behavior: "instant" });
      await requestChunk(target.chunkId, true);
      const el = await waitForElement(target.id);
      if (opts.push !== false && window.location.hash !== `#${target.id}`) {
        window.history.pushState(null, "", `#${target.id}`);
      }
      if (el) scrollToAnchor(el);
      restoring.current = false;
      return Boolean(el);
    },
    [lookup],
  );

  // Hash is the user's explicit intent: initial load, back/forward, and in-page links all land here.
  useEffect(() => {
    window.history.scrollRestoration = "manual"; // we restore by anchor; the browser would restore by (unstable) pixel offset
    const onHash = () => {
      if (window.location.hash) void goTo(window.location.hash, { push: false });
    };
    onHash();
    window.addEventListener("popstate", onHash);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("popstate", onHash);
      window.removeEventListener("hashchange", onHash);
      window.history.scrollRestoration = "auto";
    };
  }, [goTo]);

  // Reading position: the anchor at the reading line, found from the DOM that exists (never from scrollY).
  const lastSaved = useRef<ResumeRecord | null>(null);
  useEffect(() => {
    let raf = 0;
    let timer: number | undefined;

    const locate = (): { el: HTMLElement; chunkId: string } | null => {
      const line = readLine();
      const chunks = document.querySelectorAll<HTMLElement>("[data-chunk]");
      let current: HTMLElement | null = null;
      for (const c of chunks) {
        if (c.getBoundingClientRect().top <= line) current = c;
        else break;
      }
      if (!current) return null;
      const anchors = current.querySelectorAll<HTMLElement>("[data-a]");
      let at: HTMLElement | null = null;
      for (const a of anchors) {
        if (a.getBoundingClientRect().top <= line) at = a;
        else break;
      }
      return { el: at ?? current, chunkId: current.dataset.chunk ?? "" };
    };

    const persist = () => {
      if (restoring.current || isScrollLocked() || window.scrollY < MIN_RESUME_PX) return;
      const found = locate();
      if (!found) return;
      const record: ResumeRecord = {
        v: index.version,
        a: found.el.id,
        c: found.chunkId,
        p: Number(found.el.dataset.p ?? found.el.querySelector<HTMLElement>("[data-p]")?.dataset.p) || index.pages[0],
        t: Date.now(),
      };
      if (lastSaved.current?.a === record.a) return;
      lastSaved.current = record;
      writeResume(record);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const found = locate();
        if (found) {
          setActiveChunkId(found.chunkId);
          const p = Number(found.el.dataset.p);
          if (p) setPage(p);
        }
        window.clearTimeout(timer);
        timer = window.setTimeout(persist, SAVE_DELAY_MS);
      });
    };
    const flush = () => {
      window.clearTimeout(timer);
      persist();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [index]);

  // Offer only when the URL has no hash (a shared link always wins) and the saved anchor still exists in this manual.
  // Snapshot is a primitive (stable between calls); parsing happens once in useMemo.
  const savedRaw = useClientValue<string | null>(() => (window.location.hash ? null : JSON.stringify(readResume(index.version))), null);
  const offer = useMemo<ResumeOffer | null>(() => {
    const saved: ResumeRecord | null = savedRaw ? JSON.parse(savedRaw) : null;
    const target = saved && resolveAnchor(saved.a, lookup);
    if (!saved || !target) return null;
    return { ...describeAnchor(target.id, target.chunkId, lang, lookup), page: saved.p, anchor: target.id };
  }, [savedRaw, lookup, lang]);

  const resume = useCallback(() => {
    // reading position is not a navigation: no hash pushed, so reload/back keep behaving
    if (offer) void goTo(offer.anchor, { push: false });
  }, [offer, goTo]);
  const resumeOffer = dismissed ? null : offer;

  const dismissResume = useCallback(() => {
    setDismissed(true);
    clearResume();
  }, []);

  return { lookup, lang, activeChunkId, page, goTo, resumeOffer, resume, dismissResume };
}
