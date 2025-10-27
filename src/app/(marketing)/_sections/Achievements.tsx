"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { achievements } from "@/data/achievements";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy } from "lucide-react";

export default function AchievementsSection() {
  const { t } = useLanguage();
  const { getField } = useTranslatedData();

  return (
    <section id="achievements" className="relative py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge={t("achievements.badge")}
          title={t("achievements.title")}
          subtitle={t("achievements.subtitle")}
          align="center"
        />

        {/* Timeline horizontal scroll */}
        <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
          {achievements.map((achievement, idx) => (
            <GlowCard
              key={idx}
              className="min-w-[320px] snap-start relative"
            >
              {/* Badge with year */}
              <Badge className="mb-4" variant="outline">
                {achievement.year}
              </Badge>

              {/* Rank */}
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="h-5 w-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-cyan-400">
                  {achievement.rank}
                </h3>
              </div>

              {/* Competition name */}
              <h4 className="text-lg font-semibold text-slate-100 mb-2">
                {getField(achievement, "title")}
              </h4>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed">
                {getField(achievement, "description")}
              </p>

              {/* Participants if available */}
              {achievement.participants && (
                <Badge className="mt-4" variant="secondary">
                  {achievement.participants}
                </Badge>
              )}
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

