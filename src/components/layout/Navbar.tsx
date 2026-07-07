"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isCoursePage = pathname === "/course";
  const isHomePage = pathname === "/";
  const isSponsorshipPage = pathname === "/sponsorship";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks: NavLink[] = useMemo(() => {
    const links: NavLink[] = [
      { label: t("nav.home"), href: "/" },
      { label: t("nav.course"), href: "/course" },
    ];

    if (isSponsorshipPage) {
      links.push({ label: t("nav.sponsorship"), href: "/sponsorship" });
    }

    return links;
  }, [isSponsorshipPage, t]);

  const isLinkActive = (link: NavLink) => pathname === link.href;

  const linkClassName = (link: NavLink) =>
    cn(
      "text-sm font-medium transition-colors",
      isLinkActive(link)
        ? "text-primary"
        : "text-muted-foreground hover:text-primary"
    );

  const mobileLinkClassName = (link: NavLink) =>
    cn(
      "flex items-center px-4 py-3 text-sm font-medium transition-colors hover:bg-muted rounded-lg min-h-[44px]",
      isLinkActive(link)
        ? "text-primary bg-primary/5"
        : "text-muted-foreground hover:text-primary"
    );

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const renderNavCtas = (fullWidth: boolean) => {
    const widthClass = fullWidth
      ? "w-full justify-center min-h-[44px]"
      : "min-h-[30px] py-1 text-sm";

    if (isCoursePage) {
      return (
        <CTAButton
          label={t("nav.registerConsultation")}
          variant="primary"
          href="#course-register"
          className={widthClass}
        />
      );
    }

    if (isHomePage) {
      return (
        <>
          <CTAButton
            label={t("nav.course")}
            variant="primary"
            href="/course"
            className={cn(widthClass, fullWidth && "w-full")}
          />
          <CTAButton
            label={t("nav.contact")}
            variant="secondary"
            href="https://m.me/roboticssocson"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(widthClass, fullWidth && "w-full")}
          />
        </>
      );
    }

    return (
      <>
        <CTAButton
          label={t("nav.sponsorButton")}
          variant="primary"
          href="/sponsorship"
          className={cn(widthClass, fullWidth && "w-full")}
        />
        <CTAButton
          label={t("nav.contact")}
          variant="secondary"
          href="https://m.me/roboticssocson"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(widthClass, fullWidth && "w-full")}
        />
      </>
    );
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-border/80",
        className
      )}
    >
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2"
          onClick={closeMobileMenu}
        >
          <BrandLogo className="h-5 w-auto sm:h-6" />
          <span className="text-base sm:text-lg font-bold text-foreground">
            Robotics Sóc Sơn
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClassName(link)}
              aria-current={isLinkActive(link) ? "page" : undefined}
            >
              {link.label}
            </Link>
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
          className="md:hidden text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
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
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={mobileLinkClassName(link)}
                aria-current={isLinkActive(link) ? "page" : undefined}
              >
                {link.label}
              </Link>
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
