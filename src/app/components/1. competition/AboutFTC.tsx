"use client";

import { useState, useRef, useEffect } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import {
  ImageGallery,
  type ImageGalleryLayout,
} from "@/components/shared/ImageGallery";
import { GlassButton } from "@/components/ui/glass-button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ftcFeatures, ftcStats, ftcHeader } from "@/data/aboutFTC";
import { Users, Box, Target, Clock } from "lucide-react";

export default function AboutFTCSection() {
  const { locale } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideshowTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slideshow với delay 2s
  useEffect(() => {
    if (isPaused) return;

    slideshowTimeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % ftcFeatures.length);
    }, 2000);

    return () => {
      if (slideshowTimeoutRef.current) {
        clearTimeout(slideshowTimeoutRef.current);
      }
    };
  }, [activeIndex, isPaused]);

  return (
    <section id="about-ftc" className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          badge={ftcHeader.badge}
          title={locale === "vi" ? ftcHeader.title_vi : ftcHeader.title_en}
          subtitle={
            locale === "vi" ? ftcHeader.subtitle_vi : ftcHeader.subtitle_en
          }
          align="center"
        />

        {/* Feature Slideshow */}
        <div className="mt-6">
          <AnimatedCard>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {/* Left: Feature List */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-200px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {ftcFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "w-full transition-transform duration-200",
                        "hover:scale-[1.01]",
                        isActive &&
                          "ring-2 ring-primary/50 ring-offset-2 ring-offset-background rounded-xl"
                      )}
                    >
                      <GlassButton
                        type="button"
                        onClick={() => {
                          setActiveIndex(idx);
                          setIsPaused(true);
                          setTimeout(() => setIsPaused(false), 3000);
                        }}
                        className="w-full rounded-xl"
                        contentClassName="flex items-center gap-3 justify-start text-left"
                      >
                        <motion.div
                          className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                            feature.bgColor
                          )}
                          animate={
                            isActive
                              ? { scale: 1.1, rotate: 360 }
                              : { scale: 1, rotate: 0 }
                          }
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <Icon className={cn("h-5 w-5", feature.iconColor)} />
                        </motion.div>
                        <span
                          className={cn(
                            "font-semibold",
                            isActive ? "text-primary" : "text-foreground"
                          )}
                        >
                          {locale === "vi"
                            ? feature.title_vi
                            : feature.title_en}
                        </span>
                      </GlassButton>
                    </div>
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
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait">
                  {ftcFeatures.map((feature, idx) => {
                    const Icon = feature.icon;
                    if (idx !== activeIndex) return null;

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="space-y-4"
                      >
                        {/* Icon + Title */}
                        <motion.div
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                        >
                          <motion.div
                            className={cn(
                              "h-16 w-16 rounded-xl flex items-center justify-center",
                              feature.bgColor
                            )}
                            initial={{ scale: 0.8, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.2,
                              duration: 0.6,
                              type: "spring",
                            }}
                          >
                            <Icon
                              className={cn("h-8 w-8", feature.iconColor)}
                            />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-foreground">
                              {locale === "vi"
                                ? feature.title_vi
                                : feature.title_en}
                            </h3>
                          </div>
                        </motion.div>

                        {/* Image Gallery - Middle */}
                        <motion.div
                          className="hidden sm:block"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <ImageGallery
                            layout={feature.imageLayout || "1"}
                            images={feature.images.map((img) => ({
                              caption: img.caption,
                            }))}
                          />
                          {/* Image Count */}
                          <div className="mt-2 text-xs text-muted-foreground">
                            {locale === "vi"
                              ? `${feature.images.length} ảnh`
                              : `${feature.images.length} images`}
                          </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                          className="text-muted-foreground leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          {locale === "vi"
                            ? feature.description_vi
                            : feature.description_en}
                        </motion.p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </AnimatedCard>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {ftcStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-200px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
              >
                <GlowCard className="p-4 text-center">
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
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
