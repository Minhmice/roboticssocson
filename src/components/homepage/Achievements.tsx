"use client";

import React from "react";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { localize } from "@/lib/i18n/localized";
import type { Locale } from "@/lib/i18n/locales";
import { achievements, type AchievementImage, achievementsHeader } from "@/data/achievements";
import { Trophy, Award, Medal, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function AchievementsSection() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  return (
    <section id="achievements" className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={
            localize(achievementsHeader.title, locale)
          }
          subtitle={
            localize(achievementsHeader.description, locale)
          }
          align="center"
        />

        <div className="mt-10 sm:mt-12 space-y-8 sm:space-y-10">
          {achievements.map((achievement, index) => (
            <AchievementDossierRow
              key={achievement.year + achievement.competition}
              achievement={achievement}
              index={index}
              locale={locale}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementDossierRow({
  achievement,
  index,
  locale,
  reduced,
}: {
  achievement: (typeof achievements)[number];
  index: number;
  locale: Locale;
  reduced: boolean;
}) {
  const isVi = locale === "vi";
  const rank = localize(achievement.rank, locale);
  const title = localize(achievement.title, locale);
  const description = localize(achievement.description, locale);
  const participants = achievement.participants
    ? localize(achievement.participants, locale)
    : undefined;

  const images = (achievement.images || []) as readonly AchievementImage[];
  const featuredImages = images.slice(0, 4);
  const remainingImages = images.slice(4);

  const IconComponent = index === 0 ? Trophy : index === 1 ? Award : Medal;

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] gap-4 sm:gap-6 items-start">
      {/* Left rail: Year, Rank badge, and scale */}
      <div className="space-y-2 lg:pt-2">
        <p className="text-2xl sm:text-3xl font-black text-primary tabular-nums tracking-tight">
          {achievement.year}
        </p>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-accent px-3 py-1 text-xs font-semibold text-primary">
          <IconComponent className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{rank}</span>
        </div>
        {participants && (
          <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 pt-1">
            <Users className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
            <span>{participants}</span>
          </p>
        )}
      </div>

      {/* Right dossier card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-sm transition-all hover:border-primary/30">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground text-balance">
          {title}
        </h3>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-foreground/85 max-w-[65ch] text-pretty">
          {description}
        </p>

        {/* Curated 4-photo Grid */}
        {featuredImages.length > 0 && (
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {featuredImages.map((image, imgIdx) => {
              const caption = localize(image.caption, locale);
              return (
                <figure
                  key={imgIdx}
                  className="group relative overflow-hidden rounded-xl border border-border bg-muted aspect-[4/3]"
                >
                  <MediaPlaceholder
                    type="image"
                    src={image.src}
                    caption={caption}
                    flush
                    className="h-full w-full object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px"
                  />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-transparent p-2 text-xs font-medium text-white line-clamp-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    {caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}

        {/* Progressive Disclosure for entries with more than 4 photos */}
        {remainingImages.length > 0 && (
          <details className="group/details mt-4 rounded-xl border border-border/80 bg-muted/40 p-3">
            <summary className="cursor-pointer list-none text-xs font-semibold text-primary marker:content-none [&::-webkit-details-marker]:hidden flex items-center justify-between min-h-8">
              <span>
                {isVi
                  ? `Xem thêm ${remainingImages.length} ảnh tư liệu mùa giải`
                  : `View ${remainingImages.length} more season archive photos`}
              </span>
              <span className="text-muted-foreground group-open/details:rotate-180 transition-transform">
                ↓
              </span>
            </summary>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2 border-t border-border/60">
              {remainingImages.map((image, imgIdx) => {
                const caption = localize(image.caption, locale);
                return (
                  <figure
                    key={imgIdx}
                    className="group relative overflow-hidden rounded-xl border border-border bg-muted aspect-[4/3]"
                  >
                    <MediaPlaceholder
                      type="image"
                      src={image.src}
                      caption={caption}
                      flush
                      className="h-full w-full object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px"
                    />
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-transparent p-2 text-xs font-medium text-white line-clamp-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      {caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </details>
        )}
      </div>
    </div>
  );

  if (reduced) {
    return <article className="relative">{content}</article>;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      className="relative"
    >
      {content}
    </motion.article>
  );
}
