"use client";

import { BootLink } from "@/components/shared/BootLink";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { stripLocale } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { useState, useEffect, useMemo, useRef } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  className?: string;
}

/** Site Navbar — light tech-blue system always (DESIGN.md). Immersive pages keep this chrome. */
export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { t } = useLanguage();
  const pathname = stripLocale(usePathname());
  const isCourseFlow =
    courseSurfacesEnabled &&
    (pathname === "/course" ||
      pathname?.startsWith("/course-register-form") === true);
  const isContactPage = pathname === "/contact-us";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const navLinks: NavLink[] = useMemo(
    () => [
      { label: t("nav.home"), href: "/" },
      { label: t("nav.fundraising"), href: "/fundraising" },
      { label: t("nav.recruitment"), href: "/recruitment" },
      { label: t("nav.resources"), href: "/resources" },
      ...(courseSurfacesEnabled
        ? [{ label: t("nav.course"), href: "/course" }]
        : []),
    ],
    [t],
  );

  const isLinkActive = (link: NavLink) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

  const linkClassName = (link: NavLink) =>
    cn(
      "inline-flex min-h-11 items-center px-1.5 text-sm font-medium transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      isLinkActive(link)
        ? "text-primary font-semibold"
        : "text-muted-foreground hover:text-primary",
    );

  const mobileLinkClassName = (link: NavLink) =>
    cn(
      "flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-muted rounded-lg min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      isLinkActive(link)
        ? "text-primary bg-primary/5 font-semibold"
        : "text-muted-foreground hover:text-primary",
    );

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const renderNavCtas = (fullWidth: boolean) => {
    const widthClass = fullWidth
      ? "w-full justify-center min-h-[44px]"
      : "min-h-[44px] py-2 text-sm";

    if (isCourseFlow) {
      const onRegister = pathname?.startsWith("/course-register-form") === true;
      return (
        <CTAButton
          label={t("nav.registerCourse")}
          variant="primary"
          href="/course-register-form"
          className={cn(widthClass, onRegister && "ring-2 ring-primary/30")}
          aria-current={onRegister ? "page" : undefined}
        />
      );
    }

    return (
      <CTAButton
        label={t("nav.contact")}
        variant="primary"
        href="/contact-us"
        className={cn(
          widthClass,
          fullWidth && "w-full",
          isContactPage && "ring-2 ring-primary/30",
        )}
        aria-current={isContactPage ? "page" : undefined}
      />
    );
  };

  return (
    <nav
      onKeyDown={(event) => {
        if (event.key === "Escape" && mobileMenuOpen) {
          setMobileMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-border/80",
        className,
      )}
    >
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 md:px-6">
        <BootLink
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 rounded-sm min-h-11 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={closeMobileMenu}
        >
          <BrandLogo className="h-5 w-auto sm:h-6" />
          <span className="text-base sm:text-lg font-bold text-foreground">
            Robotics Sóc Sơn
          </span>
        </BootLink>

        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <BootLink
              key={link.href}
              href={link.href}
              className={linkClassName(link)}
              aria-current={isLinkActive(link) ? "page" : undefined}
            >
              <span>{link.label}</span>
              {link.href === "/recruitment" && (
                <span className="ml-1.5 inline-flex items-center rounded-full bg-muted border border-border px-1.5 py-0.5 text-xs font-semibold text-muted-foreground tracking-tight">
                  {t("nav.recruitmentClosedBadge")}
                </span>
              )}
            </BootLink>
          ))}
        </div>

        <div className="hidden md:flex md:items-center md:gap-2">
          {renderNavCtas(false)}
          <LanguageToggle />
        </div>

        <div className="flex md:hidden items-center gap-3 ml-auto">
          <LanguageToggle />
        </div>

        <button
          ref={menuButton}
          type="button"
          aria-controls="mobile-navigation"
          className="md:hidden text-muted-foreground hover:text-primary transition-colors min-h-11 min-w-11 flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <BootLink
                key={link.href}
                href={link.href}
                onClick={() => closeMobileMenu()}
                className={mobileLinkClassName(link)}
                aria-current={isLinkActive(link) ? "page" : undefined}
              >
                <span>{link.label}</span>
                {link.href === "/recruitment" && (
                  <span className="inline-flex items-center rounded-full bg-muted border border-border px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                    {t("nav.recruitmentClosedBadge")}
                  </span>
                )}
              </BootLink>
            ))}
            <div className="pt-2 border-t border-border space-y-2">
              {renderNavCtas(true)}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
