"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, GraduationCap, Rocket, Globe } from "lucide-react";

export default function AboutFIRSTSection() {
  const { locale } = useLanguage();

  return (
    <section id="about-first" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="About FIRST"
          title={
            locale === "vi"
              ? "FIRST Tech Challenge là gì?"
              : "What is FIRST Tech Challenge?"
          }
          subtitle={
            locale === "vi"
              ? "Đây không chỉ là cuộc thi robot, mà là nơi rèn luyện thế hệ đổi mới sáng tạo."
              : "This is not just a robot competition, but a training ground for innovators."
          }
          align="center"
        />

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Left: FIRST Info */}
          <GlowCard className="p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">
                  {locale === "vi" ? "Về FIRST®" : "About FIRST®"}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {locale === "vi"
                    ? "FIRST® (For Inspiration and Recognition of Science and Technology) là tổ chức phi lợi nhuận quốc tế được thành lập năm 1989 tại Hoa Kỳ bởi nhà phát minh Dean Kamen, với sứ mệnh truyền cảm hứng cho thế hệ trẻ theo đuổi khoa học, công nghệ, kỹ thuật và toán học (STEM)."
                    : "FIRST® is an international nonprofit founded in 1989 by inventor Dean Kamen, with the mission to inspire young people to pursue interests in science, technology, engineering, and mathematics (STEM)."}
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  {locale === "vi"
                    ? "FIRST tổ chức nhiều chương trình và cuộc thi robotics ở các cấp độ khác nhau: FIRST LEGO League (FLL), FIRST Tech Challenge (FTC) và FIRST Robotics Competition (FRC)."
                    : "FIRST organizes robotics programs at different levels: FIRST LEGO League (FLL), FIRST Tech Challenge (FTC) and FIRST Robotics Competition (FRC)."}
                </p>
              </div>

              <Separator className="bg-slate-800" />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Globe className="h-5 w-5" />
                  <span className="font-semibold">
                    {locale === "vi" ? "Vietnam" : "Việt Nam"}: Hosted by FPT University
                  </span>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* Right: Impact Stats */}
          <GlowCard className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-slate-100 mb-6">
              {locale === "vi" ? "Tác động toàn cầu" : "Global Impact"}
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-cyan-900/30 flex items-center justify-center">
                  <Users className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan-400">1M+</p>
                  <p className="text-sm text-slate-400">
                    {locale === "vi" ? "học sinh toàn cầu" : "students worldwide"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-cyan-900/30 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan-400">$80M+</p>
                  <p className="text-sm text-slate-400">
                    {locale === "vi" ? "học bổng đại học" : "university scholarships"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-cyan-900/30 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan-400">Thousands</p>
                  <p className="text-sm text-slate-400">
                    {locale === "vi" ? "đội thi toàn cầu" : "teams globally"}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-800 my-6" />

            <p className="text-slate-400 text-sm italic">
              {locale === "vi"
                ? "Mỗi học sinh phát triển kỹ năng lãnh đạo, tư duy phản biện và tinh thần đồng đội — những giá trị thiết yếu cho tương lai."
                : "Each student develops leadership, critical thinking, and teamwork — essential values for the future."}
            </p>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

