"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  NAV_SCROLL_OFFSET,
  useCourseScrollSpy,
} from "@/hooks/useCourseScrollSpy";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";

const COURSE_SECTION_IDS = [
  "course-curriculum",
  "course-projects",
  "course-faq",
  "course-register",
] as const;

const HOME_SECTION_IDS = [
  "about-first",
  "achievements",
  "course-teaser",
] as const;

interface NavLink {
  label: string;
  href: string;
  sectionId?: string;
  isAnchor: boolean;
}

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isCoursePage = pathname === "/course";
  const isHomePage = pathname === "/";
  const showSponsorshipNav = !isHomePage;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCourseSection = useCourseScrollSpy(
    COURSE_SECTION_IDS,
    isCoursePage
  );
  const activeHomeSection = useCourseScrollSpy(HOME_SECTION_IDS, isHomePage);
  const activeSectionId = isCoursePage
    ? activeCourseSection
    : isHomePage
      ? activeHomeSection
      : null;

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
    if (isCoursePage) {
      return [
        {
          label: t("nav.curriculum"),
          href: "#course-curriculum",
          sectionId: "course-curriculum",
          isAnchor: true,
        },
        {
          label: t("nav.projects"),
          href: "#course-projects",
          sectionId: "course-projects",
          isAnchor: true,
        },
        {
          label: t("nav.faq"),
          href: "#course-faq",
          sectionId: "course-faq",
          isAnchor: true,
        },
        {
          label: t("nav.registerConsultation"),
          href: "#course-register",
          sectionId: "course-register",
          isAnchor: true,
        },
      ];
    }

    const links: NavLink[] = [
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
        label: t("nav.course"),
        href: "#course-teaser",
        sectionId: "course-teaser",
        isAnchor: true,
      },
    ];

    if (showSponsorshipNav) {
      links.push({
        label: t("nav.sponsorship"),
        href: "/sponsorship",
        isAnchor: false,
      });
    }

    return links;
  }, [isCoursePage, showSponsorshipNav, t]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - NAV_SCROLL_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLinkClick = (
    link: NavLink,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (link.isAnchor && link.sectionId) {
      e.preventDefault();
      setMobileMenuOpen(false);
      scrollToSection(link.sectionId);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const isLinkActive = (link: NavLink) =>
    Boolean(
      link.sectionId &&
        activeSectionId &&
        activeSectionId === link.sectionId
    );

  const linkClassName = (link: NavLink) =>
    cn(
      "text-sm font-medium transition-colors cursor-pointer",
      isLinkActive(link)
        ? "text-primary"
        : "text-muted-foreground hover:text-primary"
    );

  const mobileLinkClassName = (link: NavLink) =>
    cn(
      "flex items-center px-4 py-3 text-sm font-medium transition-colors hover:bg-muted rounded-lg min-h-[44px] cursor-pointer",
      isLinkActive(link)
        ? "text-primary bg-primary/5"
        : "text-muted-foreground hover:text-primary"
    );

  const renderNavCtas = (fullWidth: boolean) => {
    const widthClass = fullWidth ? "w-full justify-center min-h-[44px]" : "min-h-[30px] py-1 text-sm";

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
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/Logo/RBS Logo.svg"
            alt="Robotics Sóc Sơn Logo"
            width={637}
            height={483}
            className="h-5 w-auto object-contain sm:h-6"
            priority
            sizes="24px"
          />
          <span className="text-base sm:text-lg font-bold text-foreground">
            Robotics Sóc Sơn
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(link, e)}
              className={linkClassName(link)}
              aria-current={isLinkActive(link) ? "location" : undefined}
            >
              {link.label}
            </a>
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
              <a
                key={link.href + link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(link, e)}
                className={mobileLinkClassName(link)}
                aria-current={isLinkActive(link) ? "location" : undefined}
              >
                {link.label}
              </a>
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
