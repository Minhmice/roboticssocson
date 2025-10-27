"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { achievements } from "@/data/achievements";
import { Trophy, Award } from "lucide-react";

export default function TrackRecordSection() {
  const { locale } = useLanguage();
  const { getField } = useTranslatedData();

  return (
    <section id="track-record" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Achievements"
          title={
            locale === "vi"
              ? "Thành tích đã chứng minh tiềm năng"
              : "Achievements that prove our potential"
          }
          subtitle={
            locale === "vi"
              ? "Mỗi giải đấu là một bước tiến. Với FIRST Tech Challenge, chúng em muốn vươn cao hơn."
              : "Each competition is a milestone. With FIRST Tech Challenge, we aim even higher."
          }
          align="center"
        />

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, idx) => (
            <GlowCard key={idx} className="p-6 hover:scale-[1.02] transition-transform">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="outline" className="bg-cyan-950/50 text-cyan-400 border-cyan-800">
                  {achievement.year}
                </Badge>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-cyan-400" />
                  <span className="text-lg font-bold text-cyan-400">
                    {achievement.rank}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-3">
                {getField(achievement, "title")}
              </h3>

              <p className="text-slate-400 leading-relaxed mb-4">
                {getField(achievement, "description")}
              </p>

              {achievement.participants && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Trophy className="h-4 w-4" />
                  <span>{achievement.participants}</span>
                </div>
              )}
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

