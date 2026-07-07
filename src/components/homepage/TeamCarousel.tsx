"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { MemberCard } from "@/components/ui/member-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { teamCarouselData } from "@/data/team";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

export default function TeamCarouselSection() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(2); // Mobile: 2, Desktop: 3
  const resumeTimeoutRef = useRef<number | null>(null);

  // Update itemsPerView based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 768) {
        setItemsPerView(3); // md: desktop - 3 items
      } else {
        setItemsPerView(2); // mobile - 2 items
      }
      setCurrentIndex(0); // Reset to first slide on resize
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

  // Map role names for MemberCard (from teamCarouselData to MemberCard Role type)
  const mapRole = (role: string): string => {
    if (role === "Captain") return "Leader";
    if (role === "Vice Captain") return "Vice Leader";
    return role;
  };

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
          badge={i18n.badge}
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
                slides.map((members, slideIndex) => (
                  <div key={slideIndex} className="min-w-full px-3 sm:px-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {members.map((member, memberIndex) => {
                      const globalIndex = slideIndex * itemsPerView + memberIndex;

                      return (
                        <div key={globalIndex} className="group min-w-0">
                          <MemberCard
                            name={member.name}
                            role={mapRole(member.role)}
                            image={member.image}
                            src={member.src}
                            classInfo={member.classInfo}
                            tags={member.tags}
                            slogan={member.slogan}
                            href={member.href}
                            showButton={false}
                            imagePriority={safeIndex === 0}
                            className="h-full w-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                ))
              )}
            </div>
          </div>

          <div className="absolute right-2 sm:right-6 bottom-0 z-10 flex gap-2 sm:gap-3">
            <button
              onClick={handlePrev}
              className="h-11 w-11 rounded-full bg-card backdrop-blur-sm border border-border hover:border-primary flex items-center justify-center text-primary hover:text-primary transition-all hover:shadow-[0_4px_14px_rgba(37,99,235,0.15)] min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={i18n.prev}
              disabled={totalSlides <= 1}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={handleNext}
              className="h-11 w-11 rounded-full bg-card backdrop-blur-sm border border-border hover:border-primary flex items-center justify-center text-primary hover:text-primary transition-all hover:shadow-[0_4px_14px_rgba(37,99,235,0.15)] min-h-[44px] min-w-[44px] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={i18n.next}
              disabled={totalSlides <= 1}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    pauseAutoFor(9000);
                  }}
                  className="group h-11 w-11 min-h-[44px] min-w-[44px] rounded-full grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={i18n.slide(idx + 1)}
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-all",
                      idx === safeIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-primary/20 group-hover:bg-primary/30",
                    )}
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          )}
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
