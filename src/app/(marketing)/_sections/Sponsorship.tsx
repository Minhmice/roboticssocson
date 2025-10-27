"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { benefits, sponsorshipTiers } from "@/data/sponsorship";
import { CTAButton } from "@/components/shared/CTAButton";
import { Building2, Megaphone, Users, Star, BarChart } from "lucide-react";
import { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Megaphone,
  Users,
  Star,
  BarChart,
};

export default function SponsorshipSection() {
  const { t } = useLanguage();
  const { getField } = useTranslatedData();

  return (
    <section id="sponsorship" className="relative py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge={t("sponsorship.badge")}
          title={t("sponsorship.title")}
          subtitle={t("sponsorship.subtitle")}
          align="center"
        />

        {/* Benefits grid */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center text-slate-100 mb-8">
            {t("sponsorship.benefitsTitle")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const IconComponent = iconMap[benefit.icon];
              return (
                <GlowCard key={idx} className="p-6 text-center">
                  {IconComponent && (
                    <IconComponent className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
                  )}
                  <h4 className="text-lg font-semibold text-slate-100 mb-2">
                    {getField(benefit, "title")}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {getField(benefit, "description")}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>

        {/* Tiers */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-slate-100 mb-8">
            {t("sponsorship.tiersTitle")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier, idx) => (
              <GlowCard
                key={idx}
                className={`p-8 text-center relative ${
                  tier.popular ? "border-2 border-cyan-500 scale-105" : ""
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-900">
                    Popular
                  </Badge>
                )}
                <h4 className="text-2xl font-bold text-cyan-400 mb-2">
                  {tier.tier}
                </h4>
                <p className="text-2xl font-bold text-slate-100 mb-6">
                  {getField(tier, "price")}
                </p>
                <ul className="space-y-3 text-left mb-6">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="text-cyan-400 mt-1">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Choose {tier.tier}
                </Button>
              </GlowCard>
            ))}
          </div>
        </div>

        {/* Mini CTA */}
        <div className="mt-12 text-center">
          <CTAButton
            label={t("cta.button")}
            variant="primary"
            href="/contact"
            className="text-lg px-8 py-4"
          />
        </div>
      </div>
    </section>
  );
}

