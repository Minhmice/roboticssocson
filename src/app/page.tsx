"use client";

import Hero from "./components/1. competition/Hero";
import AboutFIRSTSection from "./components/1. competition/AboutFIRST";
import AboutFTCSection from "./components/1. competition/AboutFTC";
import TheChallengeSection from "./components/2. team/TheChallenge";
import TeamCarouselSection from "./components/2. team/TeamCarousel";
import MissionSection from "./components/2. team/Mission";
import BudgetFundraisingSection from "./components/3. financial-need/BudgetFundraising";
import BudgetBreakdownSection from "./components/3. financial-need/BudgetBreakdown";
import WhySponsorSection from "./components/4. sponsorship/WhySponsor";
import FinalCTASection from "./components/shared/FinalCTA";
import AchievementsSection from "./components/2. team/Achievements";

export default function HomePage() {
  return (
    <main className="relative scroll-smooth">
      <Hero />
      <AboutFIRSTSection />
      <AboutFTCSection />
      <TeamCarouselSection />
      <AchievementsSection />
      <MissionSection />
      <TheChallengeSection />
      <BudgetFundraisingSection />
      <BudgetBreakdownSection />
      <WhySponsorSection />
      <FinalCTASection />
    </main>
  );
}
