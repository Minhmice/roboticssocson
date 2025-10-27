"use client";

import { Globe } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.achievements"), href: "/achievements" },
    { label: t("nav.community"), href: "/community" },
    { label: t("nav.sponsorship"), href: "/sponsorship" },
    { label: t("nav.budget"), href: "/budget" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-slate-800/50 bg-black/40 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_0_20px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-cyan-500" />
          <span className="text-lg font-bold text-slate-100">
            Robotics Sóc Sơn
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: Language + CTA */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <CTAButton
            label={t("nav.sponsorButton")}
            variant="primary"
            href="/sponsorship"
            className="hidden md:inline-flex"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-cyan-400"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

/**
 * Usage example:
 * 
 * <Navbar />
 */

