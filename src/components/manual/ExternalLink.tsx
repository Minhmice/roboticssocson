"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink as ExternalLinkIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CSS_EASE } from "@/lib/manual/motion";
interface ExternalLinkProps {
  href: string;
  display?: string;
  lang?: "vi" | "en";
}

const buttonBaseClass =
  "relative inline-flex size-9 items-center justify-center rounded-md border border-border bg-background [transition-property:background-color,border-color,color,transform] duration-140 [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/40 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-primary/5 [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none after:absolute after:-inset-1.5 after:content-['']";

export function ExternalLink({ href, display, lang = "vi" }: ExternalLinkProps) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  const linkHref = href.startsWith("www.") ? `https://${href}` : href;
  const displayText = display ?? href;

  let hostname = href;
  try {
    hostname = new URL(linkHref).hostname || href;
  } catch {
    // Keep fallback for non-standard inputs
  }

  useEffect(() => {
    return () => {
      window.clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(href);
      setState("done");
    } catch {
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  }, [href]);

  const isDone = state === "done";
  const isFailed = state === "failed";

  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 align-middle">
      <a
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-primary underline underline-offset-2 [@media(hover:hover)_and_(pointer:fine)]:hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none"
      >
        {displayText}
      </a>
      <span className="inline-flex items-center gap-1">
        <span className="relative inline-flex">
          <button
            type="button"
            onClick={copy}
            aria-label={lang === "vi" ? `Sao chép đường dẫn ${hostname}` : `Copy link to ${hostname}`}
            title={lang === "vi" ? `Sao chép đường dẫn ${hostname}` : `Copy link to ${hostname}`}
            className={cn(
              buttonBaseClass,
              isDone
                ? "text-primary"
                : isFailed
                  ? "text-red-600"
                  : "text-slate-600",
            )}
            style={{ transitionTimingFunction: CSS_EASE.out }}
          >
            <span className="relative inline-flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
              <Copy
                className={cn(
                  "absolute inset-0 size-4 [transition-property:opacity,transform,filter]",
                  isDone || isFailed
                    ? "pointer-events-none opacity-0 motion-safe:scale-[0.9] motion-safe:blur-[3px]"
                    : "opacity-100 motion-safe:scale-100 motion-safe:blur-none",
                )}
                style={{
                  transitionDuration: isDone || isFailed ? "180ms" : "140ms",
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
              {isFailed && (
                <X
                  className="absolute inset-0 size-4 [transition-property:opacity,transform,filter] opacity-100 motion-safe:scale-100 motion-safe:blur-none"
                  style={{
                    transitionDuration: "180ms",
                    transitionTimingFunction: CSS_EASE.out,
                  }}
                />
              )}
            </span>
            <span role="status" aria-live="polite" className="sr-only">
              {state === "done"
                ? lang === "vi" ? "Đã sao chép đường dẫn" : "Link copied"
                : state === "failed"
                  ? lang === "vi" ? "Không sao chép được đường dẫn" : "Failed to copy link"
                  : ""}
            </span>
          </button>
        </span>
        <span className="relative inline-flex">
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={lang === "vi" ? `Mở ${hostname} trong thẻ mới` : `Open ${hostname} in new tab`}
            title={lang === "vi" ? `Mở ${hostname} trong thẻ mới` : `Open ${hostname} in new tab`}
            className={cn(buttonBaseClass, "group/open text-slate-600")}
            style={{ transitionTimingFunction: CSS_EASE.out }}
          >
            <ExternalLinkIcon
              className="size-4 [transition-property:transform] duration-160 motion-reduce:transition-none motion-reduce:transform-none [@media(hover:hover)_and_(pointer:fine)]:group-hover/open:translate-x-px [@media(hover:hover)_and_(pointer:fine)]:group-hover/open:-translate-y-px"
              style={{ transitionTimingFunction: CSS_EASE.out }}
              aria-hidden
            />
          </a>
        </span>
      </span>
    </span>
  );
}