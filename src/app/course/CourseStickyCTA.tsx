"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 300;

const label = {
  vi: "Đăng ký tư vấn",
  en: "Book consultation",
};

export default function CourseStickyCTA() {
  const { locale } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-muted/90 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.4)] pb-[env(safe-area-inset-bottom)]"
      role="region"
      aria-label={label[locale]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <CTAButton
          label={label[locale]}
          variant="primary"
          href="#course-register"
          className="w-full min-h-[44px]"
        />
      </div>
    </div>
  );
}
