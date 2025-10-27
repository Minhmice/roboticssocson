"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { Person } from "@/types/person";
import { team } from "@/data/team";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TeamGridSection() {
  const { locale } = useLanguage();

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "");
  };

  return (
    <section id="team" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Team"
          title={
            locale === "vi"
              ? "Gặp đội Robotics Sóc Sơn"
              : "Meet Robotics Soc Son Team"
          }
          subtitle={
            locale === "vi"
              ? "15 thành viên tài năng với niềm đam mê robotics và STEM"
              : "15 talented members passionate about robotics and STEM"
          }
          align="center"
        />

        {/* Team Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member, idx) => (
            <GlowCard key={idx} className="p-5 flex items-center gap-4 hover:scale-105 transition-transform">
              {/* Avatar circle */}
              <div 
                className="h-12 w-12 rounded-full bg-cyan-900/30 ring-1 ring-cyan-800/40 flex items-center justify-center text-cyan-300 font-semibold flex-shrink-0"
                aria-label="avatar"
              >
                {getInitials(member.name)}
              </div>
              {/* Name & role */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-100 truncate text-sm">
                  {member.name}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {member.role}
                </p>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Team Stats Banner */}
        <GlowCard className="mt-12 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-cyan-400">15</p>
              <p className="text-sm text-slate-400">
                {locale === "vi" ? "Thành viên" : "Members"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">2023</p>
              <p className="text-sm text-slate-400">
                {locale === "vi" ? "Thành lập" : "Founded"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">Hanoi</p>
              <p className="text-sm text-slate-400">
                {locale === "vi" ? "Sóc Sơn" : "Soc Son"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">3</p>
              <p className="text-sm text-slate-400">
                {locale === "vi" ? "Vai trò chính" : "Main Roles"}
              </p>
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}

