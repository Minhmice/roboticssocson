"use client";

import { Globe, Mail, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-cyan-800/40 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-cyan-500" />
              <span className="text-xl font-bold text-slate-100">
                Robotics Sóc Sơn
              </span>
            </div>
            <p className="text-sm text-slate-400">
              {t("footer.taglineMain")}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {t("footer.taglineSub")}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t("nav.about"), href: "/about" },
                { label: t("nav.achievements"), href: "/achievements" },
                { label: t("nav.sponsorship"), href: "/sponsorship" },
                { label: t("nav.contact"), href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              {t("footer.contact")}
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:sponsor@roboticssocson.com"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                <Mail className="h-4 w-4" />
                sponsor@roboticssocson.com
              </a>
              <a
                href="https://t.me/roboticssocson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                <Send className="h-4 w-4" />
                @roboticssocson
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>{t("footer.copyright")}</p>
          <p className="mt-1">
            {t("footer.developed")}
          </p>
        </div>
      </div>
    </footer>
  );
};

/**
 * Usage example:
 * 
 * <Footer />
 */

