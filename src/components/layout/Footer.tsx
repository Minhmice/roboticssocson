"use client";

import Image from "next/image";
import { Globe, Mail, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-background/40 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Image
                src="/Logo.svg"
                alt="Robotics Sóc Sơn Logo"
                width={28}
                height={28}
                className="object-contain sm:w-8 sm:h-8"
              />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                Robotics Sóc Sơn
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("footer.taglineMain")}
            </p>
            <p className="mt-2 text-[10px] sm:text-xs text-muted-foreground/80">
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
                { label: t("nav.about"), href: "/about" },
                { label: t("nav.achievements"), href: "/achievements" },
                { label: t("nav.sponsorship"), href: "/sponsorship" },
                { label: t("nav.contact"), href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary flex items-center"
                  >
                    {link.label}
                  </a>
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
              <a
                href="mailto:sponsor@roboticssocson.com"
                className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">sponsor@roboticssocson.com</span>
              </a>
              <a
                href="https://t.me/roboticssocson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                @roboticssocson
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 border-t border-border pt-6 sm:pt-8 text-center text-[10px] sm:text-xs text-muted-foreground/80">
          <p>{t("footer.copyright")}</p>
          <p className="mt-1">Developed by @minhmice29</p>
        </div>
      </div>
    </footer>
  );
};
