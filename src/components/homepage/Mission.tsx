"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { localize } from "@/lib/i18n/localized";
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
    { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" }
  );

  const icon = el.querySelector(".mission-value-icon");
  if (icon) {
    gsap.fromTo(
      icon,
      { scale: 0.92 },
      { scale: 1, duration: 0.5, ease: "back.out(1.4)", overwrite: "auto" }
    );
  }
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
            once: true,
            onEnter: () => fadeIn(el),
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
      className="relative py-12 sm:py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
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

        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 md:auto-rows-fr">
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
                    "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-primary/40 md:h-full"
                  )}
                >
                  {item.title && (
                    <div className="flex items-center gap-3 mb-4">
                      <div className="mission-value-icon h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-accent border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm">
                        <IconComponent className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground text-balance">
                        {localize(item.title, locale)}
                      </h3>
                    </div>
                  )}

                  {item.content && (
                    <div className="flex-1 space-y-3">
                      {localize(item.content, locale)
                        .split("\n\n")
                        .map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-xs sm:text-sm md:text-base text-foreground/85 leading-relaxed text-pretty"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  )}
                </article>
              );
            }

            if (item.type === "image") {
              const caption = item.caption ? localize(item.caption, locale) : "";

              return (
                <article
                  key={item.id}
                  data-mission-item
                  className={cn(span, height, "p-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm group")}
                >
                  <div className="relative h-full w-full">
                    <MediaPlaceholder
                      type="image"
                      src={item.src}
                      caption={caption}
                      flush
                      className="h-full w-full m-0 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                    />
                    {caption && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-3 text-xs font-medium text-white line-clamp-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        {caption}
                      </div>
                    )}
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
                    "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-primary/40 md:h-full"
                  )}
                >
                  <div>
                    <div className="mission-value-icon inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-accent border border-primary/20 text-primary mb-3 shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 text-balance">
                      {item.title ? localize(item.title, locale) : null}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-pretty">
                    {item.content ? localize(item.content, locale) : null}
                  </p>
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
