"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { AnimatedSection } from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { sponsorEmail, socials } from "@/data/settings";
import { Mail, Facebook, Download } from "lucide-react";

export default function FinalCTASection() {
  const { locale } = useLanguage();

  return (
    <section
      id="final-cta"
      className="relative py-12 sm:py-16 md:py-24 border-t border-cyan-800/40 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05),transparent)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative">
        <AnimatedSection className="text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-3 sm:mb-4 px-2 sm:px-0">
            {locale === "vi"
              ? "Hãy đồng hành cùng chúng em!"
              : "Join us on this journey!"}
          </h3>
          <p className="text-base sm:text-lg text-slate-400 mt-2 sm:mt-3 mb-6 sm:mb-8 px-2 sm:px-0">
            {locale === "vi"
              ? "Đầu tư vào giáo dục STEM - Xây dựng tương lai cho nền công nghệ Việt Nam - Tạo giá trị bền vững"
              : "Invest in STEM education - Build Vietnam's tech future - Create lasting impact"}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-6 sm:mb-8 px-2 sm:px-0">
            <CTAButton
              label={locale === "vi" ? "Tài trợ ngay" : "Become a Sponsor"}
              variant="primary"
              href="/sponsor"
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]"
              aria-label="Contact for sponsorship"
            />
            <CTAButton
              label={
                locale === "vi"
                  ? "Tải gói tài trợ (PDF)"
                  : "Download sponsorship package (PDF)"
              }
              variant="secondary"
              href="#"
              icon={Download}
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 text-slate-400 px-2 sm:px-0">
            <a
              href={`mailto:${sponsorEmail}`}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors min-h-[44px] text-sm sm:text-base"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="break-all">{sponsorEmail}</span>
            </a>
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors min-h-[44px] text-sm sm:text-base"
            >
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span>
                {locale === "vi"
                  ? "Theo dõi chúng em trên Facebook"
                  : "Follow us on Facebook"}
              </span>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
