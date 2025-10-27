"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { PillBadge } from "@/components/shared/PillBadge";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { missionData, sponsorshipLetter, aboutMeta, missionBadges } from "@/data/about";
import { team } from "@/data/team";

export default function AboutPage() {
  const { locale } = useLanguage();
  const { getField } = useTranslatedData();

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "");
  };

  return (
    <main className="relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Page Header */}
        <SectionHeader
          badge="About"
          title="Sứ mệnh & Đội ngũ / Our Mission & Team"
          subtitle="Nuôi dưỡng tinh thần sáng tạo và STEM tại Sóc Sơn. / Fostering creativity and STEM in Soc Son."
          align="center"
        />

        {/* Block B: Mission (2-column) */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Left: Mission text */}
          <GlowCard className="p-6 md:p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">
              {locale === "vi" ? "Sứ mệnh" : "Our Mission"}
            </h3>
            <p className="text-slate-300 leading-relaxed mb-2">
              {getField(missionData, "mission")}
            </p>
            <p className="text-slate-400 text-sm italic mb-4">
              {locale === "vi" ? missionData.mission_en : missionData.mission_vi}
            </p>
            <p className="text-sm text-slate-400 mb-4">
              {locale === "vi" 
                ? `Thành lập năm ${aboutMeta.foundedYear}, trực thuộc ${aboutMeta.school}.`
                : `Founded in ${aboutMeta.foundedYear}, under ${aboutMeta.school}.`
              }
            </p>
            {/* Mission badges */}
            <div className="flex flex-wrap gap-2">
              {missionBadges.map((badge) => (
                <PillBadge key={badge} text={badge} />
              ))}
            </div>
          </GlowCard>

          {/* Right: Media placeholder */}
          <GlowCard className="p-6 md:p-8 rounded-2xl">
            <MediaPlaceholder
              type="image"
              caption="Team Photo Placeholder / Ảnh đội (placeholder)"
              className="h-full min-h-[300px]"
            />
          </GlowCard>
        </div>

        {/* Block C: Sponsorship Letter */}
        <div className="mt-16">
          <GlowCard className="p-8 md:p-12 rounded-2xl">
            <div className="max-w-prose mx-auto space-y-6">
              <h3 className="text-xl font-bold text-slate-100 mb-6 text-center">
                Thư ngỏ tài trợ / Sponsorship Letter
              </h3>
              
              {/* Vietnamese letter */}
              <div className="space-y-4 text-slate-300 leading-relaxed whitespace-pre-line">
                {sponsorshipLetter.vi}
              </div>

              {/* English letter */}
              <div className="space-y-4 text-slate-400 leading-relaxed whitespace-pre-line mt-8 pt-8 border-t border-slate-800">
                {sponsorshipLetter.en}
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Block D: Team grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-slate-100 mb-8">
            {locale === "vi" ? "Đội ngũ / Our Team" : "Our Team / Đội ngũ"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <GlowCard key={idx} className="p-5 flex items-center gap-4">
                {/* Avatar circle */}
                <div 
                  className="h-12 w-12 rounded-full bg-cyan-900/30 ring-1 ring-cyan-800/40 flex items-center justify-center text-cyan-300 font-semibold flex-shrink-0"
                  aria-label="avatar"
                >
                  {getInitials(member.name)}
                </div>
                {/* Name & role */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-100 truncate">
                    {member.name}
                  </p>
                  <p className="text-sm text-slate-400 truncate">
                    {member.role}
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

