"use client";

import Hero from "./1. competition/Hero";
import AboutFIRSTSection from "./1. competition/AboutFIRST";
import AboutFTCSection from "./1. competition/AboutFTC";
import TheChallengeSection from "./2. team/TheChallenge";
import TeamCarouselSection from "./2. team/TeamCarousel";
import MissionSection from "./2. team/Mission";
import BudgetFundraisingSection from "./3. financial-need/BudgetFundraising";
import BudgetBreakdownSection from "./3. financial-need/BudgetBreakdown";
import WhySponsorSection from "./4. sponsorship/WhySponsor";
import FinalCTASection from "./shared/FinalCTA";
import AchievementsSection from "./2. team/Achievements";
import AboutSocSonHighSchool from "./2. team/AboutSocSonHighSchool";

export default function HomePage() {
  return (
    <main className="relative scroll-smooth">
      <Hero />
      <AboutFIRSTSection />
      <AboutFTCSection />
      <AboutSocSonHighSchool /> 
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
