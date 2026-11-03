"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { coursePricingCopy } from "@/data/coursePricing";
import { localize } from "@/lib/i18n/localized";
import { cn } from "@/lib/utils";

/** Mobile-only sticky bar — price + register, hidden on lg+ where footer CTAs suffice. */
export default function CoursePricingStickyCta() {
  const { locale } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const label = localize(coursePricingCopy.stickyLabel, locale);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden",
        "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto border-t border-border/80 bg-background/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <CTAButton
          label={label}
          variant="primary"
          href="/course-register-form"
          className="w-full min-h-[48px] text-base font-bold"
        />
      </div>
    </div>
  );
}
