"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowRight, CalendarX2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "rss_home_recruitment_dialog_last_shown";
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

function shouldAutoOpen(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;

    const lastShown = Number(raw);
    if (Number.isNaN(lastShown)) return true;

    return Date.now() - lastShown >= COOLDOWN_MS;
  } catch {
    return true;
  }
}

function markDialogShown(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Storage is optional. The dialog remains usable when it is unavailable.
  }
}

export function RecruitmentDialog() {
  const { t } = useLanguage();
  const clientReady = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!clientReady || !shouldAutoOpen()) return;

    const frame = window.requestAnimationFrame(() => {
      setOpen(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [clientReady]);

  useEffect(() => {
    if (!open) return;
    markDialogShown();
  }, [open]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
  };

  if (!clientReady) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showClose
        closeLabel={t("recruitmentDialog.dismiss")}
        className="max-h-[min(90dvh,42rem)] w-[min(calc(100vw-2rem),52rem)] max-w-none overflow-y-auto rounded-2xl border-border bg-background p-0 text-foreground shadow-xl [&>button]:right-3 [&>button]:top-3 [&>button]:z-20 [&>button]:bg-background/90 sm:[&>button]:right-4 sm:[&>button]:top-4"
        aria-describedby="recruitment-dialog-description"
      >
        <div className="grid min-h-0 sm:grid-cols-[minmax(15rem,0.88fr)_minmax(0,1.12fr)]">
          <div className="relative min-h-52 overflow-hidden border-b border-border bg-slate-950 sm:min-h-112 sm:border-b-0 sm:border-r">
            <Image
              src="/Images/Achievements/FTC 2024-2025/Image  (2).webp"
              alt=""
              fill
              sizes="(min-width: 640px) 42vw, 100vw"
              className="object-cover object-center saturate-[0.88]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_20%,rgba(15,23,42,0.82)_100%)]"
            />
            <p className="absolute inset-x-5 bottom-5 text-xs font-semibold tracking-[0.08em] text-white">
              {t("recruitmentDialog.tagline")}
            </p>
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="flex-1 px-5 pb-7 pt-14 sm:px-8 sm:pb-9 sm:pt-10">
              <DialogHeader className="space-y-5 text-left">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                  <CalendarX2 className="h-5 w-5" aria-hidden />
                </div>
                <div className="space-y-3 pr-8">
                  <p className="text-sm font-semibold text-primary">
                    {t("recruitmentDialog.badge")}
                  </p>
                  <DialogTitle className="max-w-[14ch] text-[clamp(2rem,5vw,3.25rem)] font-black leading-[1.04] tracking-[-0.03em]">
                    {t("recruitmentDialog.headline")}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <DialogDescription
                id="recruitment-dialog-description"
                className="mt-6 max-w-[38ch] text-base leading-7 text-foreground/75"
              >
                {t("recruitmentDialog.message")}
              </DialogDescription>
            </div>

            <DialogFooter className="border-t border-border bg-muted/60 px-5 py-4 sm:px-8 sm:py-5">
              <Button
                variant="ghost"
                className="min-h-11 w-full transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] motion-reduce:transition-none sm:w-auto"
                onClick={() => handleOpenChange(false)}
              >
                {t("recruitmentDialog.dismiss")}
              </Button>
              <Button asChild className="min-h-11 w-full transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] motion-reduce:transition-none sm:w-auto">
                <Link href="/recruitment" onClick={() => handleOpenChange(false)}>
                  {t("recruitmentDialog.cta")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
