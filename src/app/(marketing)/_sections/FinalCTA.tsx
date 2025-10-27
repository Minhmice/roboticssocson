"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { sponsorEmail } from "@/data/settings";
import { Mail, Send, Download } from "lucide-react";

export default function FinalCTASection() {
  const { locale } = useLanguage();

  return (
    <section id="final-cta" className="relative py-16 md:py-24 border-t border-cyan-800/40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05),transparent)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            {locale === "vi" 
              ? "Hãy đồng hành cùng chúng em!" 
              : "Join us on this journey!"}
          </h3>
          <p className="text-lg text-slate-400 mt-3 mb-8">
            {locale === "vi"
              ? "Đầu tư vào giáo dục STEM. Xây dựng tương lai công nghệ Việt Nam. Tạo impact bền vững."
              : "Invest in STEM education. Build Vietnam's tech future. Create lasting impact."}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 flex-wrap justify-center mb-8">
            <CTAButton
              label={locale === "vi" ? "Tài trợ ngay" : "Become a Sponsor"}
              variant="primary"
              href="/contact"
              className="text-lg px-8 py-4"
              aria-label="Contact for sponsorship"
            />
            <CTAButton
              label={
                locale === "vi" 
                  ? "Download sponsorship package" 
                  : "Download sponsorship PDF"
              }
              variant="secondary"
              href="#"
              icon={Download}
              className="text-lg px-8 py-4"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <a
              href={`mailto:${sponsorEmail}`}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>{sponsorEmail}</span>
            </a>
            <p className="text-sm">
              {locale === "vi" 
                ? "Hoặc liên hệ qua Telegram" 
                : "Or contact via Telegram"}
              : <span className="text-cyan-400 ml-1">@roboticssocson</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

