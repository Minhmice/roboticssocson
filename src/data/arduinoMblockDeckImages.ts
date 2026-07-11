/** Real image paths for deck slides — synced from public/RAW via `npm run sync:deck-images`. */
export const DECK_SLIDE_MEDIA: Record<number, string[]> = {
  1: ["/Images/Deck/slide-01-00.webp"],
  2: ["/Images/Deck/slide-02-00.webp"],
  3: ["/Images/Deck/slide-03-00.webp"],
  5: ["/Images/Deck/slide-05-00.webp"],
  6: [
    "/Images/Deck/slide-06-01.webp",
    "/Images/Deck/slide-06-02.webp",
    "/Images/Deck/slide-06-03.webp",
    "/Images/Deck/slide-06-04.webp",
  ],
  7: [
    "/Images/Deck/slide-07-01.webp",
    "/Images/Deck/slide-07-02.webp",
    "/Images/Deck/slide-07-03.webp",
  ],
  8: ["/Images/Deck/slide-08-00.webp"],
  9: ["/Images/Deck/slide-09-00.webp"],
  10: [
    "/Images/About FTC/3.3.webp",
    "/Images/Mission/Image (7).webp",
  ],
  13: ["/Images/Deck/slide-11-00.webp"],
  14: [
    "/Images/Deck/slide-12-01.webp",
    "/Images/Deck/slide-12-02.webp",
  ],
  15: ["/Images/Deck/slide-13-00.webp"],
  16: ["/Images/Deck/slide-08-00.webp"],
  17: ["/Images/Deck/assets/mblock-logo.webp"],
  18: [
    "/Images/Deck/slide-16-01.webp",
    "/Images/Deck/slide-16-02.webp",
  ],
  19: ["/Images/Achievements/FTC 2024-2025/Image  (2).webp"],
  20: ["/Images/Course/capstone-hero.webp"],
  22: ["/Images/Deck/slide-19-00.webp"],
  23: ["/Images/Deck/slide-20-00.webp"],
  24: ["/Images/Deck/slide-21-00.webp"],
  25: ["/Images/Achievements/FTC 2024-2025/Image  (4).webp"],
  26: ["/Images/Mission/Image (6).webp"],
  27: ["/Images/Mission/Image (7).webp"],
  28: ["/Images/Deck/slide-25-00.webp"],
  30: ["/Images/Deck/slide-30-qr.webp"],
};

export function getDeckSlideMediaSources(slideId: number): string[] {
  return DECK_SLIDE_MEDIA[slideId] ?? [];
}
