"use client";

import { DeckGate } from "@/components/course/deck/DeckGate";
import { arduinoMblockDeckSlides } from "@/data/arduinoMblockDeck";

export default function ArduinoMblockDeckPage() {
  return <DeckGate slides={arduinoMblockDeckSlides} />;
}
