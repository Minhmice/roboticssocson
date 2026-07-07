"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { Globe } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  firstHeader,
  firstInfoCard,
  firstImpactCard,
  firstImages,
} from "@/data/aboutFIRST";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_QUART },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT_QUART },
  },
};

export default function AboutFIRSTSection() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;

  return (
    <section id="about-first" className="relative py-12 sm:py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.12),transparent)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          badge={firstHeader.badge}
          title={locale === "vi" ? firstHeader.title_vi : firstHeader.title_en}
          subtitle={
            locale === "vi" ? firstHeader.subtitle_vi : firstHeader.subtitle_en
          }
          align="center"
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Row 1: FIRST Info (2 cols) / Image (1 col) */}
          <BentoCard animated={animated} className="md:col-span-2">
            <div className="space-y-6 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <div className="h-16 w-28 rounded-xl border border-border bg-accent/60 flex items-center justify-center p-2 shadow-[0_8px_24px_rgba(37,99,235,0.08)]">
                  <Image
                    src="/Logo/FIRST Logo.svg"
                    alt="FIRST Logo"
                    width={165}
                    height={99}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {locale === "vi"
                    ? firstInfoCard.title_vi
                    : firstInfoCard.title_en}
                </h3>
              </div>
              <p className="text-foreground/80 leading-relaxed text-pretty">
                {locale === "vi"
                  ? firstInfoCard.paragraph1_vi
                  : firstInfoCard.paragraph1_en}
              </p>
              <p className="text-foreground/80 leading-relaxed text-pretty">
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
                    {locale === "vi" ? ": " : ": "}
                    <span className="text-foreground/80">
                      {locale === "vi" ? "Tổ chức bởi" : "Hosted by"}{" "}
                      {firstInfoCard.hostOrganization}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          <AnimatedImageCard
            animated={animated}
            className="h-[260px] sm:h-[320px] md:col-span-1 md:h-[400px]"
          >
            <MediaPlaceholder
              type="image"
              src="/Images/About First/1.webp"
              caption={
                locale === "vi"
                  ? firstImages[0].caption_vi
                  : firstImages[0].caption_en
              }
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
            />
          </AnimatedImageCard>

          <AnimatedImageCard
            animated={animated}
            className="h-[260px] sm:h-[320px] md:col-span-1 md:h-[450px]"
          >
            <MediaPlaceholder
              type="image"
              src="/Images/About First/2.webp"
              caption={
                locale === "vi"
                  ? firstImages[1].caption_vi
                  : firstImages[1].caption_en
              }
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
            />
          </AnimatedImageCard>

          <BentoCard animated={animated} className="md:col-span-2">
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
                      <div className="h-12 w-12 rounded-full border border-primary/20 bg-accent flex items-center justify-center shadow-[0_10px_26px_rgba(37,99,235,0.10)]">
                        <Icon className="h-6 w-6 text-primary" aria-hidden />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-primary">
                          {item.value}
                        </p>
                        <p className="text-sm text-foreground/70">
                          {locale === "vi" ? item.label_vi : item.label_en}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-6">
                <Separator className="bg-border my-4" />
                <p className="text-foreground/70 text-sm italic text-pretty">
                  {locale === "vi"
                    ? firstImpactCard.footer_vi
                    : firstImpactCard.footer_en}
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Row 3: 3 hình ảnh ngang hàng */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[350px]">
            {/* Ảnh 3 */}
            <AnimatedImageCard animated={animated} className="h-[220px] md:h-full">
              <MediaPlaceholder
                type="image"
                src="/Images/About First/3.webp"
                caption={
                  locale === "vi"
                    ? firstImages[2].caption_vi
                    : firstImages[2].caption_en
                }
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
              />
            </AnimatedImageCard>
            {/* Ảnh 4 */}
            <AnimatedImageCard animated={animated} className="h-[220px] md:h-full">
              <MediaPlaceholder
                type="image"
                src="/Images/About First/4.webp"
                caption={
                  locale === "vi"
                    ? firstImages[3].caption_vi
                    : firstImages[3].caption_en
                }
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
              />
            </AnimatedImageCard>
            {/* Ảnh 5 */}
            <AnimatedImageCard animated={animated} className="h-[220px] md:h-full">
              <MediaPlaceholder
                type="image"
                src="/Images/About First/5.webp"
                caption={
                  locale === "vi"
                    ? firstImages[4].caption_vi
                    : firstImages[4].caption_en
                }
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
              />
            </AnimatedImageCard>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Bento Card component
function BentoCard({
  children,
  className,
  animated,
}: {
  children: React.ReactNode;
  className?: string;
  animated: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-120px 0px -120px 0px",
    amount: 0.35,
  });

  if (!animated) {
    return (
      <GlowCard className={cn("h-full", className)}>
        {children}
      </GlowCard>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <GlowCard className="h-full">{children}</GlowCard>
    </motion.div>
  );
}

// Animated Image Card component
function AnimatedImageCard({
  children,
  className,
  animated,
}: {
  children: React.ReactNode;
  className?: string;
  animated: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-120px 0px -120px 0px",
    amount: 0.35,
  });

  if (!animated) {
    return (
      <GlowCard className={cn("h-full p-0 overflow-hidden", className)}>
        {children}
      </GlowCard>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={imageVariants}
    >
      <GlowCard className="h-full p-0 overflow-hidden">{children}</GlowCard>
    </motion.div>
  );
}
