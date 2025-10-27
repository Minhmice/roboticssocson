"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, Megaphone, Users, Shield } from "lucide-react";

export default function WhySponsorSection() {
  const { locale } = useLanguage();

  const benefits = [
    {
      icon: GraduationCap,
      title_vi: "Tác động giáo dục & xã hội",
      title_en: "Educational & Social Impact",
      content_vi: "Empower 15 students with STEM skills, critical thinking, teamwork",
      content_en: "Empower 15 students with STEM skills, critical thinking, teamwork",
      stat_vi: "1000+ học sinh tiếp cận qua events cộng đồng",
      stat_en: "1000+ students reached through community events",
    },
    {
      icon: Megaphone,
      title_vi: "Nhận diện thương hiệu",
      title_en: "Brand Visibility",
      content_vi: "Logo on robot, banners, social media, event videos",
      content_en: "Logo on robot, banners, social media, event videos",
      reach_vi: "Students, teachers, international FIRST community",
      reach_en: "Students, teachers, international FIRST community",
    },
    {
      icon: Users,
      title_vi: "Tiếp cận cộng đồng địa phương",
      title_en: "Community Engagement",
      content_vi: "Direct engagement with local educators, students, families",
      content_en: "Direct engagement with local educators, students, families",
      area_vi: "Soc Son, Hanoi, and nationwide competitions",
      area_en: "Soc Son, Hanoi, and nationwide competitions",
    },
    {
      icon: Shield,
      title_vi: "Minh bạch & Chuyên nghiệp",
      title_en: "Transparency & Trust",
      content_vi: "Quarterly reports, progress updates, financial statements",
      content_en: "Quarterly reports, progress updates, financial statements",
      commitment_vi: "Maximize impact, build long-term trust",
      commitment_en: "Maximize impact, build long-term trust",
    },
  ];

  return (
    <section id="why-sponsor" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Benefits"
          title={locale === "vi" ? "Lý do tài trợ chúng em" : "Why sponsor us?"}
          subtitle={
            locale === "vi"
              ? "Đầu tư vào giáo dục STEM, tạo impact bền vững cho thế hệ trẻ Việt Nam"
              : "Invest in STEM education, create lasting impact for Vietnam's youth"
          }
          align="center"
        />

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <GlowCard key={idx} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-100 mb-2">
                      {locale === "vi" ? benefit.title_vi : benefit.title_en}
                    </h3>
                    <p className="text-slate-400 text-sm mb-3">
                      {locale === "vi" ? benefit.content_vi : benefit.content_en}
                    </p>
                    <p className="text-xs text-cyan-400">
                      {idx === 0 && (locale === "vi" ? benefit.stat_vi : benefit.stat_en)}
                      {idx === 1 && (locale === "vi" ? benefit.reach_vi : benefit.reach_en)}
                      {idx === 2 && (locale === "vi" ? benefit.area_vi : benefit.area_en)}
                      {idx === 3 && (locale === "vi" ? benefit.commitment_vi : benefit.commitment_en)}
                    </p>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

