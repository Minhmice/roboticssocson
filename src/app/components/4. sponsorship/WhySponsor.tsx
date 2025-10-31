"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard } from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  GraduationCap,
  Megaphone,
  Users,
  Shield,
  Award,
} from "lucide-react";
import { whySponsorCards, whySponsorHeader } from "@/data/sponsorship";

const iconMap: Record<string, React.ComponentType<any>> = {
  GraduationCap,
  Megaphone,
  Users,
  Shield,
  Award,
};

export default function WhySponsorSection() {
  const { locale } = useLanguage();

  // Group cards by layout type
  const fullCards = whySponsorCards.filter((card) => card.type === "full");
  const twoColCards = whySponsorCards.filter((card) => card.type === "two-col");
  const benefitsCard = whySponsorCards.find((card) => card.type === "benefits-list");

  return (
    <section id="why-sponsor" className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          badge={
            locale === "vi"
              ? whySponsorHeader.badge_vi
              : whySponsorHeader.badge_en
          }
          title={
            locale === "vi"
              ? whySponsorHeader.title_vi
              : whySponsorHeader.title_en
          }
          subtitle={
            locale === "vi"
              ? whySponsorHeader.subtitle_vi
              : whySponsorHeader.subtitle_en
          }
          align="center"
        />

        <div className="mt-6 space-y-6">
          {/* Full width cards */}
          {fullCards.map((card) => {
            const Icon = iconMap[card.icon] || GraduationCap;
            return (
              <AnimatedCard key={card.id}>
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {locale === "vi" ? card.title_vi : card.title_en}
                    </h3>
                    {card.paragraph1_vi && card.paragraph1_en && (
                      <>
                        <p className="text-muted-foreground text-base leading-relaxed mb-4">
                          {locale === "vi" ? card.paragraph1_vi : card.paragraph1_en}
                        </p>
                        {card.paragraph2_vi && card.paragraph2_en && (
                          <p className="text-muted-foreground text-base leading-relaxed">
                            {locale === "vi" ? card.paragraph2_vi : card.paragraph2_en}
                          </p>
                        )}
                      </>
                    )}
                    {card.content_vi && card.content_en && (
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {locale === "vi" ? card.content_vi : card.content_en}
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedCard>
            );
          })}

          {/* Two column cards */}
          {twoColCards.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {twoColCards.map((card) => {
                const Icon = iconMap[card.icon] || Users;
                return (
                  <AnimatedCard key={card.id}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-6 w-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {locale === "vi" ? card.title_vi : card.title_en}
                        </h3>
                        {card.intro_vi && card.intro_en && (
                          <p className="text-muted-foreground text-base">
                            {locale === "vi" ? card.intro_vi : card.intro_en}
                          </p>
                        )}
                        {card.content_vi && card.content_en && (
                          <p className="text-muted-foreground text-base leading-relaxed">
                            {locale === "vi" ? card.content_vi : card.content_en}
                          </p>
                        )}
                      </div>
                    </div>
                  </AnimatedCard>
                );
              })}
            </div>
          )}

          {/* Benefits list card */}
          {benefitsCard && (
            <AnimatedCard>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {locale === "vi" ? benefitsCard.title_vi : benefitsCard.title_en}
              </h3>
              <div className="grid sm:grid-cols-2 gap-2 mb-4">
                {benefitsCard.benefits?.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Award className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {locale === "vi" ? benefit.text_vi : benefit.text_en}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          )}
        </div>
      </div>
    </section>
  );
}
