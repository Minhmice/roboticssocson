"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { LogoStrip } from "@/components/shared/LogoStrip";
import { useLanguage } from "@/contexts/LanguageContext";
import { partnerLogos } from "@/data/logos";

/**
 * Partners Section
 * Displays competition and partner logos in a horizontal strip
 */
export default function PartnersSection() {
  const { t } = useLanguage();
  
  return (
    <section id="partners" className="relative py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge={t("partners.badge")}
          title={t("partners.title")}
          subtitle={t("partners.subtitle")}
          align="center"
        />

        <div className="mt-10">
          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 md:p-12">
            <LogoStrip 
              logos={partnerLogos as any} 
            />
          </div>
          
          <p className="text-center text-xs text-slate-500 mt-4">
            {t("partners.disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}

