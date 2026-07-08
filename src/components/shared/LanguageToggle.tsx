"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className,
}) => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        onClick={() => setLocale("vi")}
        variant="ghost"
        size="sm"
        type="button"
        aria-pressed={locale === "vi"}
        aria-label="Tiếng Việt"
        className={cn(
          "rounded-lg transition-all min-h-[44px] min-w-[44px]",
          locale === "vi" && "bg-primary/10 text-primary"
        )}
      >
        VI
      </Button>
      <Button
        onClick={() => setLocale("en")}
        variant="ghost"
        size="sm"
        type="button"
        aria-pressed={locale === "en"}
        aria-label="English"
        className={cn(
          "rounded-lg transition-all min-h-[44px] min-w-[44px]",
          locale === "en" && "bg-primary/10 text-primary"
        )}
      >
        EN
      </Button>
    </div>
  );
};

