"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Rocket, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { missionData } from "@/data/mission";

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Target,
  Rocket,
  Heart,
};

export default function MissionSection() {
  const { locale } = useLanguage();
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Add bento animations
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "bento-mission-animations";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes bento2-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6%); }
      }
      @keyframes bento2-pulse {
        0%, 100% { transform: scale(1); opacity: 0.85; }
        50% { transform: scale(1.08); opacity: 1; }
      }
      @keyframes bento2-tilt {
        0% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
        100% { transform: rotate(-2deg); }
      }
      @keyframes bento2-drift {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(6%, -6%, 0); }
      }
      @keyframes bento2-card {
        0% { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.96); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    // On mobile, show immediately; on desktop, wait for intersection
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setSectionVisible(true);
      return;
    }

    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-24 translate-z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          badge="Mission & Vision"
          title={
            locale === "vi"
              ? "Mục tiêu & Sứ mệnh của đội"
              : "Our Mission & Vision"
          }
          subtitle={
            locale === "vi"
              ? "Năng động — Sáng tạo — Không ngừng khám phá"
              : "Dynamic — Creative — Driven to Discover"
          }
          align="center"
        />

        {/* Bento Grid Layout */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 md:auto-rows-fr">
          {missionData.map((item, index) => {
            const animationDelay = `${Math.max(index * 0.12, 0)}s`;

            // Mobile span: prefer data.mobileSpan, fallback to defaults
            const getMobileSpan = () => {
              if (item.mobileSpan) return item.mobileSpan;
              if (item.id === "mission") return "col-span-2";
              if (item.id === "image-3") return "col-span-2";
              return "col-span-1";
            };

            // Combine mobileHeight and height for responsive sizing
            const getHeightClasses = () => {
              const mobileH = item.mobileHeight || "";
              const desktopH = item.height || "";
              // If desktopH contains "md:", extract the part after "md:"
              // Otherwise, if it contains "min-h-", remove it since we have mobileHeight
              let desktopHeight = "";
              if (desktopH.includes("md:")) {
                const mdIndex = desktopH.indexOf("md:");
                desktopHeight = desktopH.substring(mdIndex);
              } else if (desktopH.includes("min-h-")) {
                // Extract only the desktop height part (remove min-h-...)
                desktopHeight = desktopH
                  .replace(/min-h-\[[^\]]+\]\s*/, "")
                  .trim();
              } else {
                desktopHeight = desktopH;
              }
              // Combine mobile and desktop heights
              // Return as string to ensure proper class application
              return mobileH && desktopHeight
                ? `${mobileH} ${desktopHeight}`.trim()
                : mobileH || desktopHeight || undefined;
            };

            if (item.type === "text") {
              const Icon = item.icon ? iconMap[item.icon] : null;
              const IconComponent = Icon || Target;

              return (
                <BentoItem
                  key={item.id}
                  span={`${getMobileSpan()} ${item.span}`}
                  height={getHeightClasses()}
                  isVisible={sectionVisible}
                  animationDelay={animationDelay}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-xl md:rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4 md:p-5 shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.45)] hover:border-cyan-500/50 hover:scale-105 md:h-full"
                  )}
                >
                  <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute inset-0 bg-slate-900/30" />
                    {item.color && (
                      <div
                        className={cn(
                          "absolute inset-0 opacity-40 bg-gradient-to-br",
                          item.color
                        )}
                      />
                    )}
                  </div>

                  {item.title_vi && (
                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                      {Icon && (
                        <div
                          className={cn(
                            "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg",
                            item.color && `bg-gradient-to-br ${item.color}`
                          )}
                        >
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                        </div>
                      )}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-100">
                        {locale === "vi" ? item.title_vi : item.title_en}
                      </h3>
                    </div>
                  )}

                  {item.content_vi && (
                    <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4">
                      {item.content_vi.split("\n\n").map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed"
                        >
                          {locale === "vi"
                            ? paragraph
                            : item.content_en?.split("\n\n")[pIdx] || paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </BentoItem>
              );
            }

            if (item.type === "image") {
              return (
                <BentoItem
                  key={item.id}
                  span={`${getMobileSpan()} ${item.span}`}
                  height={getHeightClasses()}
                  isVisible={sectionVisible}
                  animationDelay={animationDelay}
                  className="p-0 overflow-hidden rounded-2xl"
                >
                  <div className="relative h-full w-full">
                    <MediaPlaceholder
                      type="image"
                      caption={
                        locale === "vi"
                          ? item.caption_vi || ""
                          : item.caption_en || ""
                      }
                      className="h-full w-full m-0 rounded-2xl"
                    />
                  </div>
                </BentoItem>
              );
            }

            if (item.type === "value") {
              const Icon = item.icon ? iconMap[item.icon] : Target;

              return (
                <BentoItem
                  key={item.id}
                  span={`${getMobileSpan()} ${item.span}`}
                  height={getHeightClasses()}
                  isVisible={sectionVisible}
                  animationDelay={animationDelay}
                  className={cn(
                    "group hover:scale-105 transition-all duration-300 relative",
                    "flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:shadow-[0_0_20px_rgba(34,211,238,0.45)] hover:border-cyan-500/50 md:h-full"
                  )}
                >
                  {item.bgColor && (
                    <div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br",
                        item.bgColor
                      )}
                    />
                  )}
                  <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute inset-0 bg-slate-900/30" />
                    {item.color && (
                      <div
                        className={cn(
                          "absolute inset-0 opacity-40 bg-gradient-to-br",
                          item.color
                        )}
                      />
                    )}
                  </div>
                  <div className="relative z-10 h-full flex flex-col">
                    <div
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-3 shadow-lg",
                        item.color
                      )}
                    >
                      <Icon
                        className="h-6 w-6 text-white"
                        style={
                          item.animation
                            ? { animation: item.animation }
                            : undefined
                        }
                      />
                    </div>
                    <h4 className="text-lg font-bold text-slate-100 mb-2">
                      {locale === "vi" ? item.title_vi : item.title_en}
                    </h4>
                    <p className="text-sm text-slate-100 leading-relaxed">
                      {locale === "vi" ? item.content_vi : item.content_en}
                    </p>
                  </div>
                </BentoItem>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  span: string;
  height?: string;
  isVisible: boolean;
  animationDelay: string;
  className?: string;
  style?: React.CSSProperties;
}

function BentoItem({
  children,
  span,
  height,
  isVisible,
  animationDelay,
  className,
  style,
}: BentoItemProps) {
  return (
    <article
      className={cn(
        "opacity-100 md:motion-safe:opacity-0",
        isVisible &&
          "md:motion-safe:animate-[bento2-card_0.8s_ease-out_forwards]",
        span,
        className,
        height // Put height last to ensure it can override h-full on mobile
      )}
      style={{ animationDelay, ...style }}
    >
      {children}
    </article>
  );
}
