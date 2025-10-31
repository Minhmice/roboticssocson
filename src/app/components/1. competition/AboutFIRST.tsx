"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe } from "lucide-react";
import {
  firstHeader,
  firstInfoCard,
  firstImpactCard,
  firstImages,
} from "@/data/aboutFIRST";

export default function AboutFIRSTSection() {
  const { locale } = useLanguage();

  return (
    <section id="about-first" className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          badge={firstHeader.badge}
          title={
            locale === "vi" ? firstHeader.title_vi : firstHeader.title_en
          }
          subtitle={
            locale === "vi"
              ? firstHeader.subtitle_vi
              : firstHeader.subtitle_en
          }
          align="center"
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Row 1: FIRST Info (2 cols) / Image (1 col) */}
          <BentoCard className="md:col-span-2 md:h-[400px]">
            <div className="space-y-6 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {locale === "vi"
                    ? firstInfoCard.title_vi
                    : firstInfoCard.title_en}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "vi"
                  ? firstInfoCard.paragraph1_vi
                  : firstInfoCard.paragraph1_en}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "vi"
                  ? firstInfoCard.paragraph2_vi
                  : firstInfoCard.paragraph2_en}
              </p>
              <Separator className="bg-border" />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Globe className="h-5 w-5" />
                  <span className="font-semibold">
                    {locale === "vi"
                      ? firstInfoCard.host_vi
                      : firstInfoCard.host_en}
                    : Hosted by {firstInfoCard.hostOrganization}
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          <AnimatedImageCard className="md:col-span-1 md:h-[400px]">
            <MediaPlaceholder
              type="image"
              caption={
                locale === "vi"
                  ? firstImages[0].caption_vi
                  : firstImages[0].caption_en
              }
              className="h-full w-full object-cover"
            />
          </AnimatedImageCard>

          <AnimatedImageCard className="md:col-span-1 md:h-[450px]">
            <MediaPlaceholder
              type="image"
              caption={
                locale === "vi"
                  ? firstImages[1].caption_vi
                  : firstImages[1].caption_en
              }
              className="h-full w-full object-cover"
            />
          </AnimatedImageCard>

          <BentoCard className="md:col-span-2 md:h-[450px]">
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {locale === "vi"
                  ? firstImpactCard.title_vi
                  : firstImpactCard.title_en}
              </h3>
              <div className="space-y-6 flex-1">
                {firstImpactCard.impactItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-primary">
                          {item.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {locale === "vi" ? item.label_vi : item.label_en}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-6">
                <Separator className="bg-border my-4" />
                <p className="text-muted-foreground text-sm italic">
                  {locale === "vi"
                    ? firstImpactCard.footer_vi
                    : firstImpactCard.footer_en}
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Row 3: 3 hình ảnh ngang hàng */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[350px]">
            <AnimatedImageCard className="h-[220px] md:h-full">
              <MediaPlaceholder
                type="image"
                caption={
                  locale === "vi"
                    ? firstImages[2].caption_vi
                    : firstImages[2].caption_en
                }
                className="h-full w-full object-cover"
              />
            </AnimatedImageCard>
            <AnimatedImageCard className="h-[220px] md:h-full">
              <MediaPlaceholder
                type="image"
                caption={
                  locale === "vi"
                    ? firstImages[3].caption_vi
                    : firstImages[3].caption_en
                }
                className="h-full w-full object-cover"
              />
            </AnimatedImageCard>
            <AnimatedImageCard className="h-[220px] md:h-full">
              <MediaPlaceholder
                type="image"
                caption={
                  locale === "vi"
                    ? firstImages[4].caption_vi
                    : firstImages[4].caption_en
                }
                className="h-full w-full object-cover"
              />
            </AnimatedImageCard>
          </div>
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
    amount: 0.3,
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
      <GlowCard className="h-full">{children}</GlowCard>
    </motion.div>
  );
}

// Animated Image Card component
function AnimatedImageCard({ children, className, ...props }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-200px 0px -200px 0px",
    amount: 0.3,
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
      <GlowCard className="h-full p-0 overflow-hidden">{children}</GlowCard>
    </motion.div>
  );
}
