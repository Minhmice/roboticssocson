"use client";

import { metrics } from "@/data/metrics";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Metric } from "@/components/shared/Metric";
import { GlowCard } from "@/components/shared/GlowCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { Calendar, Trophy, Users, Sparkles } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Trophy,
  Users,
  Sparkles,
};

/**
 * Metrics Section
 * Displays key team achievements and impact numbers in a responsive grid
 */
export default function MetricsSection() {
  const { t } = useLanguage();
  const { getField } = useTranslatedData();
  return (
    <section id="metrics" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge={t("metrics.badge")}
          title={t("metrics.title")}
          subtitle={t("metrics.subtitle")}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const IconComponent = m.icon ? iconMap[m.icon] : undefined;
            
            return (
              <GlowCard key={idx} className="text-center">
                {IconComponent && (
                  <div className="mb-4 flex justify-center">
                    <IconComponent className="h-8 w-8 text-cyan-400" aria-hidden="true" />
                  </div>
                )}
                <Metric 
                  value={m.value} 
                  label={getField(m, "label")}
                  icon={IconComponent}
                />
                <p className="mt-2 text-sm text-slate-400 italic">
                  {getField(m, "label") === m.label_vi ? m.label_en : m.label_vi}
                </p>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

