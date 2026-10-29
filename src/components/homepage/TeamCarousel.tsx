"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { MemberCard } from "@/components/ui/member-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { localize } from "@/lib/i18n/localized";
import { teamCarouselData } from "@/data/team";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

export default function TeamCarouselSection() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(2); // Mobile: 2, Desktop: 3
  const resumeTimeoutRef = useRef<number | null>(null);

  // Responsive items per view: mobile 1, tablet 2, desktop 3
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
      setCurrentIndex(0);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView, { passive: true });
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const memberCount = teamCarouselData.length;
  const totalSlides = useMemo(() => {
    if (memberCount === 0) return 0;
    return Math.ceil(memberCount / itemsPerView);
  }, [itemsPerView, memberCount]);

  const safeIndex = useMemo(() => {
    if (totalSlides === 0) return 0;
    return Math.min(currentIndex, totalSlides - 1);
  }, [currentIndex, totalSlides]);

  const autoplayEnabled = !prefersReducedMotion && isAutoPlaying;

  useEffect(() => {
    if (!autoplayEnabled) return;
    if (totalSlides <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [autoplayEnabled, totalSlides]);

  const stopAuto = useCallback(() => {
    setIsAutoPlaying(false);
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const pauseAutoFor = useCallback(
    (ms: number) => {
      if (prefersReducedMotion) return;
      stopAuto();
      resumeTimeoutRef.current = window.setTimeout(() => {
        setIsAutoPlaying(true);
      }, ms);
    },
    [prefersReducedMotion, stopAuto],
  );

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const handlePrev = useCallback(() => {
    if (totalSlides <= 1) return;
    pauseAutoFor(7000);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [pauseAutoFor, totalSlides]);

  const handleNext = useCallback(() => {
    if (totalSlides <= 1) return;
    pauseAutoFor(7000);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [pauseAutoFor, totalSlides]);

  const i18n = useMemo(() => {
    const isVi = locale === "vi";
    return {
      badge: isVi ? "Team" : "Team",
      title: isVi ? "Gặp đội Robotics Sóc Sơn" : "Meet Robotics Soc Son Team",
      subtitle: isVi
        ? `${memberCount} thành viên tài năng với niềm đam mê robotics và STEM`
        : `${memberCount} talented members passionate about robotics and STEM`,
      members: isVi ? "Thành viên" : "Members",
      founded: isVi ? "Thành lập" : "Founded",
      locationLabel: isVi ? "Sóc Sơn" : "Soc Son",
      locationValue: isVi ? "Hà Nội" : "Hanoi",
      mainRoles: isVi ? "Vai trò chính" : "Main Roles",
      prev: isVi ? "Trước" : "Previous",
      next: isVi ? "Tiếp theo" : "Next",
      slide: (idx: number) => (isVi ? `Slide ${idx}` : `Slide ${idx}`),
      empty: isVi
        ? "Chưa có dữ liệu thành viên để hiển thị."
        : "No team members to display yet.",
    };
  }, [locale, memberCount]);

  const slides = useMemo(() => {
    if (totalSlides === 0) return [];
    return Array.from({ length: totalSlides }).map((_, slideIndex) =>
      teamCarouselData.slice(
        slideIndex * itemsPerView,
        (slideIndex + 1) * itemsPerView,
      ),
    );
  }, [itemsPerView, totalSlides]);

  const onCarouselKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (totalSlides <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handleNext, handlePrev, totalSlides],
  );

  return (
    <section id="team-carousel" className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={i18n.title}
          subtitle={i18n.subtitle}
          align="center"
        />
        {/* Team Stats Banner */}
        {prefersReducedMotion ? (
          <GlowCard hover={false}>
            <StatsBanner locale={locale} memberCount={memberCount} />
          </GlowCard>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <GlowCard hover={false}>
              <StatsBanner locale={locale} memberCount={memberCount} />
            </GlowCard>
          </motion.div>
        )}
        <div className="mt-5 sm:mt-6 pb-2 sm:pb-4 relative">
          {/* Carousel Container */}
          <div
            className={cn(
              "overflow-hidden py-6 rounded-2xl bg-muted/30 border border-border",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            onMouseEnter={() => pauseAutoFor(12000)}
            onMouseLeave={() => {
              if (!prefersReducedMotion) setIsAutoPlaying(true);
            }}
            onFocus={() => pauseAutoFor(12000)}
            onBlur={() => {
              if (!prefersReducedMotion) setIsAutoPlaying(true);
            }}
            onKeyDown={onCarouselKeyDown}
            role="region"
            aria-label={i18n.title}
            tabIndex={0}
          >
            <div
              className={cn(
                "flex transition-transform duration-500 ease-in-out",
                prefersReducedMotion && "transition-none",
              )}
              style={{ transform: `translateX(-${safeIndex * 100}%)` }}
            >
              {slides.length === 0 ? (
                <div className="min-w-full px-4 sm:px-6">
                  <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                    {i18n.empty}
                  </div>
                </div>
              ) : (
                slides.map((members, slideIndex) => {
                  return (
                  <div key={slideIndex} className="min-w-full px-2 sm:px-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {members.map((member, memberIndex) => {
                          const globalIndex = slideIndex * itemsPerView + memberIndex;
                          const roleText = localize(member.role, locale);
                          const sloganText = member.slogan ? localize(member.slogan, locale) : undefined;
                          const classText = member.classInfo ? localize(member.classInfo, locale) : undefined;

                          return (
                            <div key={globalIndex} className="group min-w-0">
                              <MemberCard
                                name={member.name}
                                role={roleText}
                                image={member.image}
                                src={member.src}
                                classInfo={classText}
                                tags={member.tags}
                                slogan={sloganText}
                                href={member.href}
                                showButton={false}
                                imagePriority={false}
                                className="h-full w-full"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Control Bar: Autoplay Toggle, Slide Count, Prev / Next */}
          <div className="mt-6 flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground/80 hover:text-primary hover:border-primary/40 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                aria-label={isAutoPlaying ? (locale === "vi" ? "Tạm dừng tự trượt" : "Pause autoplay") : (locale === "vi" ? "Bật tự trượt" : "Resume autoplay")}
                aria-pressed={isAutoPlaying}
              >
                {isAutoPlaying ? (
                  <Pause className="h-3.5 w-3.5 text-primary" aria-hidden />
                ) : (
                  <Play className="h-3.5 w-3.5 text-primary" aria-hidden />
                )}
                <span>{isAutoPlaying ? (locale === "vi" ? "Tự động" : "Auto") : (locale === "vi" ? "Tạm dừng" : "Paused")}</span>
              </button>

              <span className="text-xs font-medium tabular-nums text-muted-foreground px-2">
                <strong className="text-foreground">{safeIndex + 1}</strong> / {totalSlides}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="h-11 w-11 rounded-full bg-card border border-border hover:border-primary flex items-center justify-center text-primary transition-all hover:shadow-sm min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={i18n.prev}
                disabled={totalSlides <= 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={handleNext}
                className="h-11 w-11 rounded-full bg-card border border-border hover:border-primary flex items-center justify-center text-primary transition-all hover:shadow-sm min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={i18n.next}
                disabled={totalSlides <= 1}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBanner({
  locale,
  memberCount,
}: {
  locale: string;
  memberCount: number;
}) {
  const isVi = locale === "vi";
  const items = [
    {
      value: String(memberCount),
      label: isVi ? "Thành viên" : "Members",
    },
    { value: "2023", label: isVi ? "Thành lập" : "Founded" },
    { value: isVi ? "Hà Nội" : "Hanoi", label: isVi ? "Sóc Sơn" : "Soc Son" },
    { value: "3", label: isVi ? "Vai trò chính" : "Main Roles" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <p className="text-2xl font-bold text-primary tabular-nums">
            {item.value}
          </p>
          <p className="text-sm text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
