"use client";

import { getDeckSlideMediaSources } from "@/data/arduinoMblockDeckImages";
import type { DeckSlide } from "@/data/arduinoMblockDeck";
import { resolveDeckLayout } from "@/components/course/deck/deck-layout-map";
import { renderDeckLayout } from "@/components/course/deck/DeckSlideLayouts";
import { DeckSlideGsap } from "@/components/course/deck/DeckSlideGsap";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalized } from "@/lib/course/getLocalized";

export type DeckSlideViewProps = {
  slide: DeckSlide;
  sectionPartIndex?: number;
};

export function DeckSlideView({ slide, sectionPartIndex }: DeckSlideViewProps) {
  const { locale } = useLanguage();
  const layout = resolveDeckLayout(slide.id, slide.layout);
  const title = getLocalized(slide.title, locale);
  const subtitle = slide.subtitle
    ? getLocalized(slide.subtitle, locale)
    : undefined;
  const section = slide.section
    ? getLocalized(slide.section, locale)
    : undefined;

  return (
    <DeckSlideGsap slideId={slide.id}>
      {renderDeckLayout({
        slide,
        layout,
        title,
        subtitle,
        section,
        sectionPartIndex,
        locale,
        mediaSources: getDeckSlideMediaSources(slide.id),
      })}
    </DeckSlideGsap>
  );
}
