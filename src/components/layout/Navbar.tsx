"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on a link
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

  const navLinks = [
    {
      label: t("nav.about"),
      href: "#about-first",
      sectionId: "about-first",
      isAnchor: true,
    },
    {
      label: t("nav.achievements"),
      href: "#achievements",
      sectionId: "achievements",
      isAnchor: true,
    },
    {
      label: t("nav.budget"),
      href: "#budget-section",
      sectionId: "budget-section",
      isAnchor: true,
    },
    {
      label: t("nav.sponsorship"),
      href: "#why-sponsor",
      sectionId: "why-sponsor",
      isAnchor: true,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLinkClick = (
    link: (typeof navLinks)[0],
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (link.isAnchor) {
      e.preventDefault();
      setMobileMenuOpen(false);
      scrollToSection(link.sectionId!);
    } else {
      // Regular link, just close mobile menu
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/40 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_0_20px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/Logo/RBS Logo.svg"
            alt="Robotics Sóc Sơn Logo"
            width={20}
            height={20}
            className="object-contain sm:w-6 sm:h-6"
            priority
          />
          <span className="text-base sm:text-lg font-bold text-foreground">
            Robotics Sóc Sơn
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(link, e)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: Language + CTA (Desktop, smaller button size) */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <CTAButton
            label={t("nav.sponsorButton")}
            variant="primary"
            href="/sponsor"
            className="min-h-[30px]  py-1 text-sm"
          />
          <CTAButton
            label={t("nav.contact")}
            variant="secondary"
            href="https://m.me/roboticssocson"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[30px] py-1 text-sm"
          />
          <LanguageToggle />
        </div>

        {/* Right side: Language (Mobile) */}
        <div className="flex md:hidden items-center gap-3 ml-auto">
          <LanguageToggle />
        </div>

        {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(link, e)}
                className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-muted rounded-lg min-h-[44px] cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-border space-y-2">
              <CTAButton
                label={t("nav.sponsorButton")}
                variant="primary"
                href="/sponsor"
                className="w-full justify-center min-h-[44px]"
              />
              <CTAButton
                label={t("nav.contact")}
                variant="secondary"
                href="https://m.me/roboticssocson"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center min-h-[44px]"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
