/**
 * Home page - Landing page for sponsorship fundraising
 * Section order:
 * 1. Hero (fundraising)
 * 2. About FIRST Organization
 * 3. About FTC Competition
 * 4. Competition Logos (Social Proof)
 * 5. The Challenge
 * 6. Track Record (Achievements)
 * 7. Team Carousel
 * 8. Mission & Vision
 * 9. Budget Breakdown
 * 10. Why Sponsor Us
 * 11. Final CTA
 */

"use client";

import Hero from "./components/competition/Hero";
import AboutFIRSTSection from "./components/competition/AboutFIRST";
import AboutFTCSection from "./components/competition/AboutFTC";
import TheChallengeSection from "./components/team/TheChallenge";
import TeamCarouselSection from "./components/team/TeamCarousel";
import MissionSection from "./components/team/Mission";
import BudgetFundraisingSection from "./components/financial-need/BudgetFundraising";
import BudgetBreakdownSection from "./components/financial-need/BudgetBreakdown";
import WhySponsorSection from "./components/sponsorship/WhySponsor";
import FinalCTASection from "./components/shared/FinalCTA";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import AchievementsSection from "./components/team/Achievements";

export default function HomePage() {
  // Enable scroll snap with 500ms delay and custom speed
  useScrollSnap({
    delay: 500,
    threshold: 500,
    snapSpeed: "slow", // "slow" | "normal" | "fast" | number (ms)
    easing: "ease-in-out", // "ease-in-out" | "ease-out" | "ease-in" | "linear"
  });

  return (
    <main className="relative scroll-smooth scroll-snap-y">
      <div data-scroll-snap className="scroll-snap-start">
        <Hero variant="fundraising" />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <AboutFIRSTSection />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <AboutFTCSection />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <TheChallengeSection />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <MissionSection />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <TeamCarouselSection />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <AchievementsSection />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <BudgetFundraisingSection />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <BudgetBreakdownSection />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <WhySponsorSection />
      </div>
      <div data-scroll-snap className="scroll-snap-start">
        <FinalCTASection />
      </div>
    </main>
  );
}
