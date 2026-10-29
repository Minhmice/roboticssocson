"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { localize } from "@/lib/i18n/localized";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={localize(firstHeader.title, locale)}
          subtitle={
            localize(firstHeader.subtitle, locale)
          }
          align="center"
        />
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Row 1: FIRST Info (2 cols) / Image (1 col) */}
          <BentoCard animated={animated} className="md:col-span-2">
            <div className="space-y-6 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <div className="h-16 w-28 rounded-xl border border-border bg-accent/60 flex items-center justify-center p-2 shadow-sm">
                  <Image
                    src="/Logo/FIRST Logo.svg"
                    alt="FIRST Logo"
                    width={165}
                    height={99}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {localize(firstInfoCard.title, locale)}
                </h3>
              </div>
              <p className="text-foreground/85 leading-relaxed text-pretty max-w-[65ch]">
                {localize(firstInfoCard.paragraph1, locale)}
              </p>
              <details className="group rounded-xl border border-border bg-muted/40 px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-primary marker:content-none [&::-webkit-details-marker]:hidden min-h-11 flex items-center">
                  {locale === "vi"
                    ? "Thêm về các chương trình FIRST"
                    : "More about FIRST programs"}
                </summary>
                <p className="mt-3 text-foreground/85 leading-relaxed text-pretty text-sm sm:text-base max-w-[65ch]">
                  {localize(firstInfoCard.paragraph2, locale)}
                </p>
              </details>
              <Separator className="bg-border" />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Globe className="h-5 w-5" />
                  <span className="font-semibold">
                    {localize(firstInfoCard.host, locale)}
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
                localize(firstImages[0].caption, locale)
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
                localize(firstImages[1].caption, locale)
              }
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
            />
          </AnimatedImageCard>

          <BentoCard animated={animated} className="md:col-span-2">
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {localize(firstImpactCard.title, locale)}
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
                          {localize(item.label, locale)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-6">
                <Separator className="bg-border my-4" />
                <p className="text-foreground/75 text-sm italic text-pretty max-w-[65ch]">
                  {localize(firstImpactCard.footer, locale)}
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Extra FIRST moments — progressive disclosure to keep the proof path lighter */}
          <div className="md:col-span-3">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="first-moments" className="border-border">
                <AccordionTrigger className="min-h-11 text-base font-semibold text-foreground hover:no-underline">
                  {locale === "vi"
                    ? "Xem thêm khoảnh khắc FIRST"
                    : "See more FIRST moments"}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3 md:h-[350px]">
                    <AnimatedImageCard
                      animated={animated}
                      className="h-[220px] md:h-full"
                    >
                      <MediaPlaceholder
                        type="image"
                        src="/Images/About First/3.webp"
                        caption={
                          localize(firstImages[2].caption, locale)
                        }
                        className="h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                      />
                    </AnimatedImageCard>
                    <AnimatedImageCard
                      animated={animated}
                      className="h-[220px] md:h-full"
                    >
                      <MediaPlaceholder
                        type="image"
                        src="/Images/About First/4.webp"
                        caption={
                          localize(firstImages[3].caption, locale)
                        }
                        className="h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                      />
                    </AnimatedImageCard>
                    <AnimatedImageCard
                      animated={animated}
                      className="h-[220px] md:h-full"
                    >
                      <MediaPlaceholder
                        type="image"
                        src="/Images/About First/5.webp"
                        caption={
                          localize(firstImages[4].caption, locale)
                        }
                        className="h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                      />
                    </AnimatedImageCard>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
