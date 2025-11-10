"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { AnimatedSection } from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { sponsorEmail } from "@/data/settings";

/**
 * Bottom CTA Section
 * Final call-to-action banner encouraging sponsorship
 */
export default function BottomCTA() {
  const { t } = useLanguage();
  
  return (
    <section
      id="cta-bottom"
      className="relative py-16 md:py-24 border-t border-cyan-800/40 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05),transparent)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative">
        <AnimatedSection className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
            {t("cta.title")}
          </h3>
          <p className="text-lg text-slate-400 mt-3">
            {t("cta.subtitle")}
          </p>

          <div className="mt-8">
            <CTAButton
              variant="primary"
              label={t("cta.button")}
              href="/contact"
              className="text-lg px-8 py-4"
              aria-label="Contact for sponsorship"
            />
          </div>

          <p className="text-sm text-slate-500 mt-6">
            {t("cta.contact")}: <span className="text-cyan-400">{sponsorEmail}</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

