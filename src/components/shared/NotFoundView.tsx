"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { StatusBoard } from "@/components/shared/StatusBoard";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref, stripLocale } from "@/lib/i18n/routes";
import { suggestRoutes } from "@/lib/routes/public-routes";

/**
 * 404 for both the global not-found document (outside RootShell) and request-time
 * notFound(). The proxy rewrites unknown locale-less paths to /{locale}{path}, so
 * usePathname() carries the locale and the original path during server render.
 * Own LanguageProvider: CTAButton reads the locale from context.
 */
export function NotFoundView({ pathname: requestPathname }: { pathname?: string } = {}) {
  const clientPathname = usePathname();
  const pathname = requestPathname || clientPathname || "/";
  const locale: Locale = /^\/en(?=\/|$)/.test(pathname) ? "en" : "vi";
  const vi = locale === "vi";
  const suggestions = suggestRoutes(stripLocale(pathname).toLowerCase(), 3);

  // The global 404 document cannot know the locale on the server; keep html[lang] right.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageProvider locale={locale} messages={{}}>
      <StatusBoard
        code="404"
        signal={vi ? "Tín hiệu mất — route không có trên sân" : "Signal lost — route off the field"}
        title={vi ? "Không tìm thấy trang" : "Page not found"}
        description={
          vi
            ? courseSurfacesEnabled
              ? "Đường dẫn không tồn tại hoặc đã được chuyển đi. Quay lại trang chủ hoặc mở khóa học STEM."
              : "Đường dẫn không tồn tại hoặc đã được chuyển đi. Quay lại trang chủ để tiếp tục."
            : courseSurfacesEnabled
              ? "This path does not exist or has moved. Head home, or open the STEM course."
              : "This path does not exist or has moved. Head home to continue."
        }
        actions={[
          { label: vi ? "Về trang chủ" : "Back home", href: "/", variant: "primary" },
          ...(courseSurfacesEnabled
            ? [{ label: vi ? "Xem khóa học" : "View course", href: "/course", variant: "secondary" as const }]
            : []),
        ]}
      >
        {suggestions.length > 0 ? (
          <nav aria-label={vi ? "Trang gợi ý" : "Suggested pages"} className="mt-8 w-full max-w-md">
            <p className="text-sm font-semibold text-foreground">
              {vi ? "Có phải bạn muốn tìm:" : "Did you mean:"}
            </p>
            <ul className="mt-2">
              {suggestions.map((suggestion) => (
                <li key={suggestion.path}>
                  <a
                    href={localizedHref(suggestion.path, locale)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md text-base font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {suggestion.label[locale]}
                    <ArrowRight aria-hidden className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </StatusBoard>
    </LanguageProvider>
  );
}
