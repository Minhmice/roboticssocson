"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard, AnimatedGrid } from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { benefits } from "@/data/sponsorship";
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
  const { locale } = useLanguage();

  return (
    <section id="sponsorship" className="relative py-16 md:py-24 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <SectionHeader
          badge={locale === "vi" ? "Tài Trợ" : "Sponsorship"}
          title={
            locale === "vi"
              ? "Tài Trợ / Sponsorship"
              : "Sponsorship / Tài Trợ"
          }
          subtitle={
            locale === "vi"
              ? "Đồng hành cùng chúng tôi và nhận được quyền lợi"
              : "Join us and receive exclusive benefits"
          }
          align="center"
        />

        {/* Benefits grid */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            {locale === "vi" ? "Quyền Lợi / Benefits" : "Benefits / Quyền Lợi"}
          </h3>
          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {benefits.map((benefit, idx) => {
              const IconComponent = iconMap[benefit.icon];
              return (
                <AnimatedCard key={idx} className="p-6 text-center">
                  {IconComponent && (
                    <IconComponent className="h-10 w-10 text-primary mx-auto mb-4" />
                  )}
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {locale === "vi" ? benefit.title_vi : benefit.title_en}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {locale === "vi"
                      ? benefit.description_vi
                      : benefit.description_en}
                  </p>
                </AnimatedCard>
              );
            })}
          </AnimatedGrid>
        </div>


        {/* Mini CTA */}
        <div className="mt-12 text-center">
          <CTAButton
            label={
              locale === "vi"
                ? "Liên hệ với chúng tôi"
                : "Contact us"
            }
            variant="primary"
            href="/contact"
            className="text-lg px-8 py-4"
          />
        </div>
      </div>
    </section>
  );
}

