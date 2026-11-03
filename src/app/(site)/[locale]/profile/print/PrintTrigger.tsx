"use client";

import { useEffect } from "react";
import { LocaleLink } from "@/components/shared/LocaleLink";
import type { Locale } from "@/lib/i18n/locales";

/** Opens the print dialog once fonts and images are ready. The toolbar hides itself when printing. */
export default function PrintTrigger({ locale }: { locale: Locale }) {
  useEffect(() => {
    let cancelled = false;
    // Next renders profile images with loading="lazy"; offscreen ones would print blank.
    const images = Array.from(document.images);
    images.forEach((img) => {
      img.loading = "eager";
    });
    const ready = Promise.all([
      document.fonts.ready,
      ...images.map((img) => (img.complete ? null : img.decode().catch(() => undefined))),
    ]);
    // ponytail: 4s cap so one stalled image cannot block printing forever; raise if the dossier gains big images.
    const cap = Promise.withResolvers<void>();
    const capTimer = window.setTimeout(cap.resolve, 4000);
    Promise.race([ready, cap.promise]).then(() => {
      window.clearTimeout(capTimer);
      if (!cancelled) window.print();
    });
    return () => {
      cancelled = true;
      window.clearTimeout(capTimer);
    };
  }, []);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm print:hidden">
      <p className="flex-1 text-foreground/80">
        {locale === "vi"
          ? "Trong hộp thoại in, chọn “Lưu dưới dạng PDF”."
          : "In the print dialog, choose “Save as PDF”."}
      </p>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex min-h-11 items-center rounded-md bg-primary px-4 font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {locale === "vi" ? "In / lưu PDF" : "Print / save PDF"}
      </button>
      <LocaleLink
        href="/profile"
        className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline"
      >
        {locale === "vi" ? "Quay lại hồ sơ" : "Back to profile"}
      </LocaleLink>
    </div>
  );
}
