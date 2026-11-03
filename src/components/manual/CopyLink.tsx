"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CSS_EASE } from "@/lib/manual/motion";

/** Real clipboard copy with visible + announced confirmation (the old "copy link" only changed the hash). */
export function CopyLink({ id, label, lang = "vi", className }: { id: string; label: string; lang?: "vi" | "en"; className?: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);
  const copy = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setState("done");
    } catch {
      window.history.replaceState(null, "", `#${id}`); // clipboard blocked: at least put it in the address bar
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  }, [id]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timer.current);
    };
  }, []);

  const isDone = state === "done";
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={lang === "vi" ? `Sao chép liên kết tới ${label}` : `Copy link to ${label}`}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-md px-2 text-xs font-medium text-muted-foreground",
        "[transition-property:background-color,color,transform] duration-140",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-primary/10 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary",
        "motion-safe:active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        isDone && "text-primary",
        className,
      )}
      style={{ transitionTimingFunction: CSS_EASE.out }}
    >
      <span className="relative inline-flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
        <LinkIcon
          className={cn(
            "absolute inset-0 size-4 [transition-property:opacity,transform,filter]",
            isDone
              ? "pointer-events-none opacity-0 motion-safe:scale-[0.9] motion-safe:blur-[3px]"
              : "opacity-100 motion-safe:scale-100 motion-safe:blur-none",
          )}
          style={{
            transitionDuration: isDone ? "180ms" : "140ms",
            transitionTimingFunction: CSS_EASE.out,
          }}
        />
        <Check
          className={cn(
            "absolute inset-0 size-4 [transition-property:opacity,transform,filter]",
            isDone
              ? "opacity-100 motion-safe:scale-100 motion-safe:blur-none"
              : "pointer-events-none opacity-0 motion-safe:scale-[0.9] motion-safe:blur-[3px]",
          )}
          style={{
            transitionDuration: isDone ? "180ms" : "140ms",
            transitionTimingFunction: CSS_EASE.out,
          }}
        />
      </span>
      <span className="hidden sm:inline">
        {state === "done" ? (lang === "vi" ? "Đã sao chép" : "Copied") : state === "failed" ? (lang === "vi" ? "Đã gắn vào thanh địa chỉ" : "Added to address bar") : (lang === "vi" ? "Sao chép liên kết" : "Copy link")}
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "done" ? (lang === "vi" ? "Đã sao chép liên kết" : "Link copied to clipboard") : state === "failed" ? (lang === "vi" ? "Không thể sao chép tự động; liên kết đã được gắn vào thanh địa chỉ" : "Unable to copy automatically; link set in address bar") : ""}
      </span>
    </button>
  );
}
