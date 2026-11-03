"use client";

import { useEffect, useRef, useState } from "react";
import type { ProfileSection } from "@/data/profile";
import type { Locale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";

type ProfileNavigationProps = {
  sections: ProfileSection[];
  locale: Locale;
  label: string;
};

export default function ProfileNavigation({ sections, locale, label }: ProfileNavigationProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68%", threshold: [0, 1] },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sections]);

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
  };

  return (
    <>
      <details
        ref={mobileMenuRef}
        className="sticky top-16 z-20 mb-8 border-y border-border bg-background/95 backdrop-blur lg:hidden print:hidden"
      >
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-1 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
          <span>{label}</span>
          <span className="min-w-0 truncate text-right text-primary">
            {localize(sections.find((section) => section.id === activeId)?.title ?? sections[0].title, locale)}
          </span>
        </summary>
        <nav aria-label={label} className="space-y-1 border-t border-border py-2">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={closeMobileMenu}
                className={`flex min-h-11 items-center px-2 text-sm transition-colors ${
                  isActive ? "font-semibold text-primary" : "text-foreground/75 hover:text-primary"
                }`}
              >
                {localize(section.title, locale)}
              </a>
            );
          })}
        </nav>
      </details>

      <aside className="hidden lg:block print:hidden">
        <div className="sticky top-24 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</h2>
          <nav aria-label={label} className="space-y-1.5 border-l border-border pl-3">
            {sections.map((section) => {
              const isActive = section.id === activeId;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`block py-1 text-sm leading-snug transition-colors ${
                    isActive ? "font-semibold text-primary" : "text-foreground/75 hover:text-primary"
                  }`}
                >
                  {localize(section.title, locale)}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
