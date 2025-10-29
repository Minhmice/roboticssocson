"use client";

import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard, AnimatedSection } from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { team } from "@/data/team";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeamCarouselSection() {
  const { locale } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const itemsPerView = 3; // Show 3 items at a time on desktop
  
  const totalSlides = Math.ceil(team.length / itemsPerView);

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

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "");
  };

  return (
    <section id="team-carousel" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Team"
          title={locale === "vi" ? "Gặp đội Robotics Sóc Sơn" : "Meet Robotics Soc Son Team"}
          subtitle={
            locale === "vi"
              ? "14 thành viên tài năng với niềm đam mê robotics và STEM"
              : "14 talented members passionate about robotics and STEM"
          }
          align="center"
        />

        <AnimatedSection className="mt-12 relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                    {team
                      .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                      .map((member, memberIndex) => {
                        const globalIndex = slideIndex * itemsPerView + memberIndex;
                        return (
                          <div
                            key={globalIndex}
                            className="p-6 group hover:scale-105 transition-transform"
                            onMouseEnter={() => setIsAutoPlaying(false)}
                          >
                            <AnimatedCard className="h-full">
                            {/* Avatar circle */}
                            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg">
                              {getInitials(member.name)}
                            </div>
                            
                            {/* Name & role */}
                            <div className="text-center">
                              <h3 className="font-semibold text-slate-100 mb-1">{member.name}</h3>
                              <p className="text-sm text-cyan-400">{member.role}</p>
                              
                              {/* Role badge */}
                              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                                <span className="text-xs text-slate-400">
                                  {member.role === "Captain" || member.role === "Vice Captain"
                                    ? "Leadership"
                                    : "Team Member"}
                                </span>
                              </div>
                            </div>
                            </AnimatedCard>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-800 hover:border-cyan-500 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-800 hover:border-cyan-500 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] z-10"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

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
        </AnimatedSection>

        {/* Team Stats Banner */}
        <AnimatedCard className="mt-12 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-cyan-400">14</p>
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
      </div>
    </section>
  );
}

