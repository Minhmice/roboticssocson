"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { LOCALE_COOKIE, LOCALES, type Locale } from "@/lib/i18n/locales";
import { switchLocalePath } from "@/lib/i18n/routes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

const LABELS: Record<Locale, { short: string; name: string }> = {
  vi: { short: "VI", name: "Tiếng Việt" },
  en: { short: "EN", name: "English" },
};

/**
 * Plain anchors, on purpose: switching language is a real navigation to the other
 * locale's URL, so the server renders the right language and `html[lang]`.
 * `data-no-boot` keeps the boot transition from intercepting it.
 */
export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className,
}) => {
  const { locale } = useLanguage();
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <Button
            key={code}
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-lg transition-all min-h-[44px] min-w-[44px]",
              active && "bg-primary/10 text-primary",
            )}
          >
            <a
              href={switchLocalePath(pathname, code)}
              hrefLang={code}
              lang={code}
              aria-current={active ? "true" : undefined}
              aria-label={LABELS[code].name}
              data-no-boot="true"
              onClick={(event) => {
                // Remember an explicit choice so locale-less URLs open in this language.
                document.cookie = `${LOCALE_COOKIE}=${code}; Path=/; Max-Age=31536000; SameSite=Lax`;
                // Carry query and hash over at click time; reading them during render
                // would differ between server and client and break hydration.
                event.currentTarget.search = window.location.search;
                event.currentTarget.hash = window.location.hash;
              }}
            >
              {LABELS[code].short}
            </a>
          </Button>
        );
      })}
    </div>
  );
};
