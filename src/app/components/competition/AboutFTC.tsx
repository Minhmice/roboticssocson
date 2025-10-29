"use client";

import { useState, useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Box, Users, Code, Award, Target, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: Target,
    title_vi: "Cuộc thi Robotics Khối 7-12",
    title_en: "Robotics Competition for Grades 7-12",
    description_vi: "Giải robotics cho học sinh từ lớp 7 đến lớp 12, nơi các đội (tối đa 15 thành viên) thiết kế, chế tạo, lập trình và vận hành robot.",
    description_en: "Robotics competition for students from grade 7 to 12, where teams (max 15 members) design, build, program and operate robots.",
    iconColor: "text-cyan-400",
    bgColor: "bg-cyan-900/20",
  },
  {
    icon: Box,
    title_vi: "Robot 18x18x18 inch",
    title_en: "18x18x18 inch Robot",
    description_vi: "Robot phải lọt trong khối 18”×18”×18” khi xuất phát, sau đó có thể mở rộng theo giới hạn trong Competition Manual.",
    description_en: "Robot must fit in an 18x18x18 inch cube at match start, then can expand within Competition Manual limits.",
    iconColor: "text-blue-400",
    bgColor: "bg-blue-900/20",
  },
  {
    icon: Users,
    title_vi: "Mô hình Liên minh",
    title_en: "Alliance Model",
    description_vi: "Các đội thi đấu theo mô hình liên minh, tăng cường kỹ năng hợp tác và làm việc nhóm.",
    description_en: "Teams compete in alliance model, fostering collaboration and teamwork skills.",
    iconColor: "text-purple-400",
    bgColor: "bg-purple-900/20",
  },
  {
    icon: Award,
    title_vi: "Kỹ năng Kỹ thuật & Thiết kế",
    title_en: "Technical & Design Skills",
    description_vi: "Chương trình nhấn mạnh kỹ năng kỹ thuật, tư duy thiết kế, làm việc nhóm và tinh thần thi đấu công bằng.",
    description_en: "Program emphasizes technical skills, design thinking, teamwork and sportsmanship.",
    iconColor: "text-green-400",
    bgColor: "bg-green-900/20",
  },
  {
    icon: Clock,
    title_vi: "Mùa giải DECODE™ 2025-2026",
    title_en: "DECODE™ 2025-2026 Season",
    description_vi: "Mùa giải bắt đầu kickoff 06/09/2025. Robot cần đáp ứng tiêu chuẩn kỹ thuật cao để thi đấu.",
    description_en: "Season starts with kickoff on September 6, 2025. Robots must meet high technical standards to compete.",
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-900/20",
  },
];

export default function AboutFTCSection() {
  const { locale } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="about-ftc" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="FIRST Tech Challenge"
          title={locale === "vi" ? "FIRST Tech Challenge là gì?" : "What is FTC?"}
          subtitle={
            locale === "vi"
              ? "Cuộc thi robotics yêu cầu kỹ thuật cao, tập trung vào STEM và kỹ năng thế kỷ 21"
              : "High-tech robotics competition focused on STEM and 21st century skills"
          }
          align="center"
        />

        {/* Feature Slideshow */}
        <div className="mt-12">
          <AnimatedCard className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left: Feature List */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-200px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl transition-all duration-300",
                        isActive
                          ? "bg-primary/20 border-2 border-primary shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                          : "bg-card/50 border-2 border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", feature.bgColor)}>
                          <Icon className={cn("h-5 w-5", feature.iconColor)} />
                        </div>
                        <span className={cn("font-semibold", isActive ? "text-primary" : "text-muted-foreground")}>
                          {locale === "vi" ? feature.title_vi : feature.title_en}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </motion.div>

              {/* Right: Active Feature Content */}
              <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-200px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  if (idx !== activeIndex) return null;
                  
                  return (
                    <div key={idx} className="space-y-4 animate-in fade-in slide-in-from-left duration-300">
                      <div className="flex items-center gap-4">
                        <div className={cn("h-16 w-16 rounded-xl flex items-center justify-center", feature.bgColor)}>
                          <Icon className={cn("h-8 w-8", feature.iconColor)} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {locale === "vi" ? feature.title_vi : feature.title_en}
                          </h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {locale === "vi" ? feature.description_vi : feature.description_en}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </AnimatedCard>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label_vi: "Đội tối đa", label_en: "Max Teams", value: "15", icon: Users },
            { label_vi: "Khối", label_en: "Grades", value: "7-12", icon: Box },
            { label_vi: "Kích thước robot", label_en: "Robot Size", value: "18\"", icon: Target },
            { label_vi: "Mùa giải", label_en: "Season", value: "2025", icon: Clock },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-200px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
              >
                <GlowCard className="p-4 text-center">
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {locale === "vi" ? stat.label_vi : stat.label_en}
                  </p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Animated Card component
function AnimatedCard({ children, className, ...props }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-200px 0px -200px 0px",
    amount: 0.3 
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      {...props}
    >
      <GlowCard className="h-full">
        {children}
      </GlowCard>
    </motion.div>
  );
}

