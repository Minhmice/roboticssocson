"use client";

import { useEffect, useRef, useState } from "react";

export interface UseAssetPreloaderOptions {
  active: boolean;
  timeoutMs?: number;
  criticalImageUrls?: string[];
}

export interface UseAssetPreloaderResult {
  progress: number;
  isReady: boolean;
}

const DEFAULT_TIMEOUT_MS = 2200;

const DEFAULT_CRITICAL_IMAGES = [
  "/Logo/RBS Logo.svg",
];

export function useAssetPreloader({
  active,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  criticalImageUrls = DEFAULT_CRITICAL_IMAGES,
}: UseAssetPreloaderOptions): UseAssetPreloaderResult {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    let isMounted = true;
    completedRef.current = false;

    // Safety timeout
    const timer = setTimeout(() => {
      if (!isMounted || completedRef.current) return;
      completedRef.current = true;
      setProgress(1);
      setIsReady(true);
    }, timeoutMs);

    async function measureAssets() {
      // 1. Collect critical targets: Fonts + Critical URLs + visible viewport <img> elements
      const targets: Promise<unknown>[] = [];

      // Fonts
      if (typeof document !== "undefined" && "fonts" in document) {
        targets.push(
          document.fonts.ready.catch(() => {
            // Ignore font load errors
          }),
        );
      }

      // Explicit image URLs
      for (const url of criticalImageUrls) {
        targets.push(
          new Promise<void>((resolve) => {
            if (typeof window === "undefined") {
              resolve();
              return;
            }
            const img = new Image();
            img.src = url;
            if (img.complete) {
              resolve();
              return;
            }
            img.onload = () => {
              if ("decode" in img) {
                img.decode().then(resolve).catch(resolve);
              } else {
                resolve();
              }
            };
            img.onerror = () => resolve();
          }),
        );
      }

      // Check existing <img> tags currently in DOM
      if (typeof document !== "undefined") {
        const domImgs = Array.from(document.querySelectorAll("img")).slice(0, 8);
        for (const domImg of domImgs) {
          if (domImg.complete) continue;
          targets.push(
            new Promise<void>((resolve) => {
              if (domImg.complete) {
                resolve();
                return;
              }
              const onDone = () => {
                domImg.removeEventListener("load", onDone);
                domImg.removeEventListener("error", onDone);
                resolve();
              };
              domImg.addEventListener("load", onDone);
              domImg.addEventListener("error", onDone);
            }),
          );
        }
      }

      const total = targets.length;
      if (total === 0) {
        if (isMounted) {
          completedRef.current = true;
          setProgress(1);
          setIsReady(true);
        }
        return;
      }

      let completed = 0;
      for (const target of targets) {
        target.then(() => {
          if (!isMounted || completedRef.current) return;
          completed++;
          const currentProgress = Math.min(1, completed / total);
          setProgress((prev) => Math.max(prev, currentProgress));
        });
      }

      await Promise.allSettled(targets);

      if (isMounted && !completedRef.current) {
        completedRef.current = true;
        setProgress(1);
        setIsReady(true);
      }
    }

    measureAssets();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [active, timeoutMs, criticalImageUrls]);
  return {
    progress: active ? progress : 0,
    isReady: active ? isReady : false,
  };
}
