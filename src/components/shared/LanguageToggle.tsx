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
        className={cn(
          "rounded-lg transition-all",
          locale === "vi" && "bg-primary/10 text-primary"
        )}
      >
        VI
      </Button>
      <Button
        onClick={() => setLocale("en")}
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-lg transition-all",
          locale === "en" && "bg-primary/10 text-primary"
        )}
      >
        EN
      </Button>
    </div>
  );
};

