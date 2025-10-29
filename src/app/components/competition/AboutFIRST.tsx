"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Users,
  GraduationCap,
  Rocket,
  Globe,
  Award,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutFIRSTSection() {
  const { locale } = useLanguage();

  return (
    <section id="about-first" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="About FIRST"
          title={locale === "vi" ? "Về FIRST®" : "About FIRST®"}
          subtitle={
            locale === "vi"
              ? "Tổ chức phi lợi nhuận truyền cảm hứng STEM toàn cầu"
              : "International nonprofit inspiring STEM worldwide"
          }
          align="center"
        />

        {/* Bento Grid Layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[minmax(200px,auto)]">
          {/* Row 1: FIRST Info (2 cols) / Image (1 col) */}
          <BentoCard className="md:col-span-2 p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {locale === "vi"
                    ? "Tổ chức phi lợi nhuận quốc tế"
                    : "International Nonprofit"}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "vi"
                  ? "FIRST® (For Inspiration and Recognition of Science and Technology) được thành lập năm 1989 tại Hoa Kỳ bởi nhà phát minh Dean Kamen, với sứ mệnh truyền cảm hứng cho thế hệ trẻ theo đuổi khoa học, công nghệ, kỹ thuật và toán học (STEM)."
                  : "FIRST® is an international nonprofit founded in 1989 by inventor Dean Kamen, with the mission to inspire young people to pursue interests in science, technology, engineering, and mathematics (STEM)."}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "vi"
                  ? "FIRST tổ chức nhiều chương trình và cuộc thi robotics ở các cấp độ khác nhau: FIRST LEGO League (FLL), FIRST Tech Challenge (FTC) và FIRST Robotics Competition (FRC)."
                  : "FIRST organizes robotics programs at different levels: FIRST LEGO League (FLL), FIRST Tech Challenge (FTC) and FIRST Robotics Competition (FRC)."}
              </p>
              <Separator className="bg-border" />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Globe className="h-5 w-5" />
                  <span className="font-semibold">
                    {locale === "vi" ? "Vietnam" : "Việt Nam"}: Hosted by FPT
                    University
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          <AnimatedImageCard className="md:col-span-1">
            <MediaPlaceholder
              type="image"
              caption={
                locale === "vi"
                  ? "Cuộc thi FIRST Robotics"
                  : "FIRST Robotics Competition"
              }
              className="h-full w-full object-cover"
            />
          </AnimatedImageCard>

          {/* Row 2: Image (1 col) / Global Impact (2 cols) */}
          <AnimatedImageCard className="md:col-span-1">
            <MediaPlaceholder
              type="image"
              caption={
                locale === "vi" ? "Học sinh tham gia STEM" : "Students in STEM"
              }
              className="h-full w-full object-cover"
            />
          </AnimatedImageCard>

          <BentoCard className="md:col-span-2 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {locale === "vi" ? "Tác động toàn cầu" : "Global Impact"}
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">1M+</p>
                  <p className="text-sm text-muted-foreground">
                    {locale === "vi"
                      ? "học sinh toàn cầu"
                      : "students worldwide"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">$80M+</p>
                  <p className="text-sm text-muted-foreground">
                    {locale === "vi"
                      ? "học bổng đại học"
                      : "university scholarships"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">Thousands</p>
                  <p className="text-sm text-muted-foreground">
                    {locale === "vi" ? "đội thi toàn cầu" : "teams globally"}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-border my-6" />

            <p className="text-muted-foreground text-sm italic">
              {locale === "vi"
                ? "Mỗi học sinh phát triển kỹ năng lãnh đạo, tư duy phản biện và tinh thần đồng đội — những giá trị thiết yếu cho tương lai."
                : "Each student develops leadership, critical thinking, and teamwork — essential values for the future."}
            </p>
          </BentoCard>

          {/* Row 3: Full width image */}
          <AnimatedImageCard className="md:col-span-3">
            <MediaPlaceholder
              type="image"
              caption={locale === "vi" ? "Robot thi đấu" : "Competition Robots"}
              className="h-full w-full object-cover"
            />
          </AnimatedImageCard>
        </div>
      </div>
    </section>
  );
}

// Animated Bento Card component
function BentoCard({ children, className, ...props }: any) {
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

// Animated Image Card component
function AnimatedImageCard({ children, className, ...props }: any) {
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      {...props}
    >
      <GlowCard className="h-full p-0 overflow-hidden">
        {children}
      </GlowCard>
    </motion.div>
  );
}
