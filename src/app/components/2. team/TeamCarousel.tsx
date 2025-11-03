"use client";

import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard } from "@/components/shared/AnimatedComponents";
import { MemberCard } from "@/components/ui/member-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { teamCarouselData } from "@/data/team";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeamCarouselSection() {
  const { locale } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(2); // Mobile: 2, Desktop: 3

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
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(teamCarouselData.length / itemsPerView);

  // Reset currentIndex when totalSlides changes
  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(0);
    }
  }, [totalSlides, currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Map role names for MemberCard (from teamCarouselData to MemberCard Role type)
  const mapRole = (role: string): string => {
    if (role === "Captain") return "Leader";
    if (role === "Vice Captain") return "Vice Leader";
    return role;
  };

  return (
    <section id="team-carousel" className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          badge="Team"
          title={
            locale === "vi"
              ? "Gặp đội Robotics Sóc Sơn"
              : "Meet Robotics Soc Son Team"
          }
          subtitle={
            locale === "vi"
              ? "15 thành viên tài năng với niềm đam mê robotics và STEM"
              : "15 talented members passionate about robotics and STEM"
          }
          align="center"
        />
        {/* Team Stats Banner */}
        <AnimatedCard>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-cyan-400">15</p>
              <p className="text-sm text-slate-400">
                {locale === "vi" ? "Thành viên" : "Members"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">2023</p>
              <p className="text-sm text-slate-400">
                {locale === "vi" ? "Thành lập" : "Founded"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">Hanoi</p>
              <p className="text-sm text-slate-400">
                {locale === "vi" ? "Sóc Sơn" : "Soc Son"}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cyan-400">3</p>
              <p className="text-sm text-slate-400">
                {locale === "vi" ? "Vai trò chính" : "Main Roles"}
              </p>
            </div>
          </div>
        </AnimatedCard>
        <div className="pb-2 sm:pb-4 relative">
          {/* Carousel Container */}
          <div className="overflow-hidden py-6 rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {teamCarouselData
                      .slice(
                        slideIndex * itemsPerView,
                        (slideIndex + 1) * itemsPerView
                      )
                      .map((member, memberIndex) => {
                        const globalIndex =
                          slideIndex * itemsPerView + memberIndex;

                        return (
                          <div
                            key={globalIndex}
                            className="group"
                            onMouseEnter={() => setIsAutoPlaying(false)}
                          >
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
                              className="h-full w-full"
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-2 sm:right-6 bottom-0 z-10 flex gap-2 sm:gap-3">
            <button
              onClick={handlePrev}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-800 hover:border-cyan-500 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all hover:shadow-[0_0_16px_rgba(34,211,238,0.5)] min-h-[36px] min-w-[36px]"
              aria-label="Trước"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={handleNext}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-800 hover:border-cyan-500 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all hover:shadow-[0_0_16px_rgba(34,211,238,0.5)] min-h-[36px] min-w-[36px]"
              aria-label="Tiếp theo"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={cn(
                  "h-2 rounded-full transition-all",
                  idx === currentIndex
                    ? "w-8 bg-cyan-500"
                    : "w-2 bg-slate-800 hover:bg-slate-700"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
