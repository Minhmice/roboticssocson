"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { missionData, type MissionItem } from "@/data/mission";
import { Target, Rocket, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Rocket,
  Heart,
};

function getMobileSpan(item: MissionItem) {
  if (item.mobileSpan) return item.mobileSpan;
  if (item.id === "mission") return "col-span-2";
  if (item.id === "image-3") return "col-span-2";
  return "col-span-1";
}

function getHeightClasses(item: MissionItem) {
  const mobileH = item.mobileHeight || "";
  const desktopH = item.height || "";
  let desktopHeight = "";

  if (desktopH.includes("md:")) {
    const mdIndex = desktopH.indexOf("md:");
    desktopHeight = desktopH.substring(mdIndex);
  } else if (desktopH.includes("min-h-")) {
    desktopHeight = desktopH.replace(/min-h-\[[^\]]+\]\s*/, "").trim();
  } else {
    desktopHeight = desktopH;
  }

  return mobileH && desktopHeight
    ? `${mobileH} ${desktopHeight}`.trim()
    : mobileH || desktopHeight || undefined;
}

function fadeIn(el: Element) {
  gsap.fromTo(
    el,
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.48, ease: "power2.out", overwrite: "auto" }
  );

  const icon = el.querySelector(".mission-value-icon");
  if (icon) {
    gsap.fromTo(
      icon,
      { scale: 0.9 },
      { scale: 1, duration: 0.55, ease: "back.out(1.5)", overwrite: "auto" }
    );
  }
}

function fadeOut(el: Element) {
  gsap.killTweensOf(el.querySelector(".mission-value-icon"));
  gsap.to(el, {
    autoAlpha: 0,
    y: 12,
    duration: 0.3,
    ease: "power2.in",
    overwrite: "auto",
  });
}

export default function MissionSection() {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-mission-item]", { autoAlpha: 1, y: 0, clearProps: "transform" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-mission-item]");
        gsap.set(items, { autoAlpha: 1, y: 0 });

        items.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            onEnter: () => fadeIn(el),
            onLeave: () => fadeOut(el),
            onEnterBack: () => fadeIn(el),
            onLeaveBack: () => fadeOut(el),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

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

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 md:auto-rows-fr">
          {missionData.map((item) => {
            const span = `${getMobileSpan(item)} ${item.span}`;
            const height = getHeightClasses(item);

            if (item.type === "text") {
              const Icon = item.icon ? iconMap[item.icon] : null;
              const IconComponent = Icon || Target;

              return (
                <article
                  key={item.id}
                  data-mission-item
                  className={cn(
                    span,
                    height,
                    "group relative flex flex-col overflow-hidden rounded-xl md:rounded-2xl border border-border bg-card p-4 md:p-5 shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] hover:border-primary/30 md:h-full"
                  )}
                >
                  <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute inset-0 bg-muted/50" />
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
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground text-balance">
                        {locale === "vi" ? item.title_vi : item.title_en}
                      </h3>
                    </div>
                  )}

                  {item.content_vi && (
                    <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4">
                      {item.content_vi.split("\n\n").map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed text-pretty"
                        >
                          {locale === "vi"
                            ? paragraph
                            : item.content_en?.split("\n\n")[pIdx] || paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </article>
              );
            }

            if (item.type === "image") {
              return (
                <article
                  key={item.id}
                  data-mission-item
                  className={cn(span, height, "p-0 overflow-hidden rounded-2xl")}
                >
                  <div className="relative h-full w-full">
                    <MediaPlaceholder
                      type="image"
                      src={item.src}
                      caption={
                        locale === "vi"
                          ? item.caption_vi || ""
                          : item.caption_en || ""
                      }
                      className="h-full w-full m-0 rounded-2xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                    />
                  </div>
                </article>
              );
            }

            if (item.type === "value") {
              const Icon = item.icon ? iconMap[item.icon] : Target;

              return (
                <article
                  key={item.id}
                  data-mission-item
                  className={cn(
                    span,
                    height,
                    "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-[box-shadow,border-color] duration-300 hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] hover:border-primary/30 md:h-full"
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
                    <div className="absolute inset-0 bg-muted/50" />
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
                        "mission-value-icon inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-3 shadow-lg",
                        item.color
                      )}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2 text-balance">
                      {locale === "vi" ? item.title_vi : item.title_en}
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed text-pretty">
                      {locale === "vi" ? item.content_vi : item.content_en}
                    </p>
                  </div>
                </article>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
}
