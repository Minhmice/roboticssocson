"use client";

import React from "react";
import { CTAButton } from "@/components/shared/CTAButton";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { heroData } from "@/data/hero";
import { pitchPdfUrl } from "@/data/settings";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

/**
 * Fullscreen Hero Section
 * Displays bilingual headline, subtext, CTAs, and background media placeholder
 * 
 * @component
 */
export default function Hero() {
  const { t } = useLanguage();
  const { getField } = useTranslatedData();
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] to-[#0F172A]" />

      {/* Decorative glow layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.18), transparent)",
          }}
        />
        <div
          className="absolute top-1/2 -right-32 h-96 w-96 rounded-full blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.12), transparent)",
          }}
        />
        <div
          className="absolute -bottom-24 left-1/4 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-10"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.10), transparent)",
          }}
        />
      </div>

      {/* Inner container */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center min-h-screen py-24">
        {/* Content block */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-sm">
            <span className="text-sm text-cyan-400">
              {t("hero.badge")}
            </span>
          </div>

          {/* Headline VN */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-tight">
            {getField(heroData, "headline")}
          </h1>

          {/* Headline EN */}
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-400 mt-3 font-light">
            {getField(heroData, "headline") === heroData.headline_vi ? heroData.headline_en : heroData.headline_vi}
          </p>

          {/* Sub VN */}
          <p className="text-lg md:text-xl text-slate-300 mt-6 max-w-2xl mx-auto">
            {getField(heroData, "sub")}
          </p>

          {/* Sub EN */}
          <p className="text-base md:text-lg text-slate-500 mt-1 italic max-w-2xl mx-auto">
            {getField(heroData, "sub") === heroData.sub_vi ? heroData.sub_en : heroData.sub_vi}
          </p>

          {/* CTA row */}
          <div className="mt-8 flex gap-4 flex-wrap justify-center items-center">
            <CTAButton
              label={getField(heroData, "cta_primary")}
              variant="primary"
              href="/contact"
              className="w-full sm:w-auto"
              aria-label="Contact for sponsorship"
            />
            <CTAButton
              label={getField(heroData, "cta_secondary")}
              variant="secondary"
              href={pitchPdfUrl}
              icon={Download}
              className="w-full sm:w-auto"
              aria-label="Download pitch PDF"
            />
          </div>
        </div>

        {/* Media background - behind text */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="max-w-5xl mx-auto mt-24 opacity-60">
            <MediaPlaceholder
              type={heroData.media.type}
              caption={getField(heroData.media, "caption")}
              className="border-0 rounded-none"
            />
          </div>
        </div>

        {/* TODO: Add LanguageToggle integration when needed */}
      </div>
    </section>
  );
}
