"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Language = "vi" | "en";

interface LanguageToggleProps {
  onLanguageChange?: (lang: Language) => void;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  onLanguageChange,
  className,
}) => {
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    // Load saved preference
    const saved = localStorage.getItem("lang") as Language;
    if (saved && (saved === "vi" || saved === "en")) {
      setLang(saved);
    }
  }, []);

  const handleToggle = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    onLanguageChange?.(newLang);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        onClick={() => handleToggle("vi")}
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-lg",
          lang === "vi" && "bg-cyan-500/10 text-cyan-400"
        )}
      >
        VI
      </Button>
      <Button
        onClick={() => handleToggle("en")}
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-lg",
          lang === "en" && "bg-cyan-500/10 text-cyan-400"
        )}
      >
        EN
      </Button>
    </div>
  );
};

/**
 * Usage example:
 * 
 * <LanguageToggle onLanguageChange={(lang) => console.log(lang)} />
 */

