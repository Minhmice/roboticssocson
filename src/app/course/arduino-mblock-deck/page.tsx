"use client";

import { DeckPlayer } from "@/components/course/deck/DeckPlayer";
import { arduinoMblockDeckSlides } from "@/data/arduinoMblockDeck";

export default function ArduinoMblockDeckPage() {
  return <DeckPlayer slides={arduinoMblockDeckSlides} />;
}
