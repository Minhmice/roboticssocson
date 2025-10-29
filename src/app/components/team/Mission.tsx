"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard, AnimatedGrid } from "@/components/shared/AnimatedComponents";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Rocket, Heart, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function MissionSection() {
  const { locale } = useLanguage();

  const coreValues = [
    {
      icon: Target,
      title_vi: "Năng động",
      title_en: "Dynamic",
      description_vi:
        "Luôn sẵn sàng đón nhận thách thức mới và thích ứng nhanh chóng",
      description_en:
        "Always ready to embrace new challenges and adapt quickly",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-900/20",
    },
    {
      icon: Rocket,
      title_vi: "Sáng tạo",
      title_en: "Creative",
      description_vi: "Tư duy đổi mới, giải pháp sáng tạo và ý tưởng độc đáo",
      description_en:
        "Innovative thinking, creative solutions, and unique ideas",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-900/20",
    },
    {
      icon: Heart,
      title_vi: "Khám phá",
      title_en: "Discovery",
      description_vi:
        "Không ngừng khám phá tri thức và mở rộng giới hạn của bản thân",
      description_en:
        "Continuously exploring knowledge and pushing personal boundaries",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-900/20",
    },
  ];

  return (
    <section id="mission" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Mission & Vision"
          title={
            locale === "vi"
              ? "Mục tiêu & Sứ mệnh của đội"
              : "Our Mission & Vision"
          }
          subtitle={
            locale === "vi"
              ? "Năng động — Sáng tạo — Không ngừng khám phá"
              : "Dynamic — Creative — Driven to Discover"
          }
          align="center"
        />

        <AnimatedGrid className="mt-12 grid md:grid-cols-2 gap-8" staggerDelay={0.1}>
          {/* Left: Mission & Vision */}
          <div className="space-y-6">
            {/* Mission */}
            <AnimatedCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-100 mb-3">
                    {locale === "vi" ? "Sứ mệnh" : "Our Mission"}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {locale === "vi"
                      ? "Mục tiêu của đội là phát triển năng lực khoa học – kỹ thuật qua trải nghiệm thực tiễn, đồng thời lan tỏa tinh thần STEM trong cộng đồng Sóc Sơn và khu vực lân cận."
                      : "Our mission is to develop engineering capabilities through hands-on experience while promoting STEM in the local community."}
                  </p>
                </div>
              </div>
            </AnimatedCard>

            {/* Vision */}
            <AnimatedCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <Rocket className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-100 mb-3">
                    {locale === "vi" ? "Tầm nhìn" : "Our Vision"}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {locale === "vi"
                      ? "Tạo ra một thế hệ học sinh am hiểu công nghệ, đam mê sáng tạo và có khả năng đóng góp tích cực cho xã hội."
                      : "Create a generation of tech-savvy students passionate about innovation and capable of making positive contributions to society."}
                  </p>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Right: Team Photo */}
          <AnimatedCard className="p-0 overflow-hidden">
            <div className="relative h-full min-h-[400px]">
              <MediaPlaceholder
                type="image"
                caption={
                  locale === "vi"
                    ? "Đội Robotics Sóc Sơn hoạt động và phát triển"
                    : "Robotics Sóc Sơn Team in action"
                }
                className="h-full w-full"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-800">
                    <p className="text-2xl font-bold text-cyan-400">14</p>
                    <p className="text-xs text-slate-400">
                      {locale === "vi" ? "Thành viên" : "Members"}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-800">
                    <p className="text-2xl font-bold text-cyan-400">2023</p>
                    <p className="text-xs text-slate-400">
                      {locale === "vi" ? "Thành lập" : "Founded"}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-800">
                    <p className="text-2xl font-bold text-cyan-400">4</p>
                    <p className="text-xs text-slate-400">
                      {locale === "vi" ? "Giải đấu" : "Competitions"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </AnimatedCard>
        </AnimatedGrid>

        {/* Core Values */}
        <AnimatedGrid className="mt-12 grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <AnimatedCard
                key={idx}
                className="p-6 group hover:scale-105 transition-transform relative overflow-hidden"
              >
                  {/* Gradient background on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br",
                      value.bgColor
                    )}
                  />

                  <div className="relative z-10">
                    <div
                      className={cn(
                        "inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br mb-4 shadow-lg shadow-opacity-50",
                        value.color
                      )}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h4 className="text-lg font-bold text-slate-100 mb-2">
                      {locale === "vi" ? value.title_vi : value.title_en}
                    </h4>

                    <p className="text-sm text-slate-400 leading-relaxed">
                      {locale === "vi"
                        ? value.description_vi
                        : value.description_en}
                    </p>
                  </div>
                </AnimatedCard>
              );
            })}
          </AnimatedGrid>
      </div>
    </section>
  );
}
