"use client";

import { BootLink } from "@/components/shared/BootLink";
import { CopyContactLink } from "@/components/shared/CopyContactLink";
import { MapPin } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { FacebookIcon } from "@/components/shared/FacebookIcon";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  contactLeadName,
  contactPhone,
  messengerUrl,
  sponsorEmail,
  socials,
} from "@/data/settings";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId?: string
  ) => {
    if (sectionId) {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <footer className="border-t border-border bg-background/40 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <BrandLogo className="h-7 w-auto sm:h-8" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                Robotics Sóc Sơn
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("footer.taglineMain")}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {t("footer.taglineSub")}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {[
                {
                  label: t("nav.about"),
                  href: "#about-first",
                  sectionId: "about-first",
                },
                {
                  label: t("nav.achievements"),
                  href: "#achievements",
                  sectionId: "achievements",
                },
                {
                  label: t("nav.course"),
                  href: "/course",
                  isRoute: true,
                },
                {
                  label: t("nav.contact"),
                  href: "/contact-us",
                  isRoute: true,
                },
                {
                  label: t("nav.registerCourse"),
                  href: "/course-register-form",
                  isRoute: true,
                },
              ].map((link) => (
                <li key={link.href}>
                  {link.isRoute ? (
                    <BootLink
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm flex items-center min-h-[44px] sm:min-h-0"
                    >
                      {link.label}
                    </BootLink>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) =>
                        link.sectionId
                          ? handleLinkClick(e, link.sectionId)
                          : undefined
                      }
                      className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm flex items-center cursor-pointer min-h-[44px] sm:min-h-0"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Contact */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footer.contact")}
            </h4>
            <div className="space-y-1.5 sm:space-y-2">
              <CopyContactLink
                kind="email"
                copyValue={sponsorEmail}
                variant="footer"
                display={<span className="break-all">{sponsorEmail}</span>}
              />
              <CopyContactLink
                kind="phone"
                copyValue={contactPhone}
                variant="footer"
                display={
                  <span>
                    {contactPhone} — {contactLeadName}
                  </span>
                }
              />
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm min-h-[44px] sm:min-h-0"
              >
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.732 8.2l3.131 3.259L19.752 8.2l-6.559 6.763z" />
                </svg>
                Messenger
              </a>
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm min-h-[44px] sm:min-h-0"
              >
                <FacebookIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                Facebook
              </a>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>THPT Sóc Sơn, Hà Nội</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 border-t border-border pt-6 sm:pt-8 text-center text-xs text-muted-foreground">
          <p>{t("footer.copyright")}</p>
          <p className="mt-1">Developed by @minhmice29</p>
        </div>
      </div>
    </footer>
  );
};
