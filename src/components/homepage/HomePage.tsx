"use client";

import Hero from "@/components/homepage/Hero";
import AboutFIRSTSection from "@/components/homepage/AboutFIRST";
import AboutFTCSection from "@/components/homepage/AboutFTC";
import AboutSocSonHighSchool from "@/components/homepage/AboutSocSonHighSchool";
import TeamCarouselSection from "@/components/homepage/TeamCarousel";
import AchievementsSection from "@/components/homepage/Achievements";
import MissionSection from "@/components/homepage/Mission";
import CourseTeaser from "@/components/homepage/CourseTeaser";

export function HomePage() {
  return (
    <main className="relative scroll-smooth">
      <Hero />
      <AboutFIRSTSection />
      <AboutFTCSection />
      <AboutSocSonHighSchool />
      <TeamCarouselSection />
      <AchievementsSection />
      <MissionSection />
      <CourseTeaser />
    </main>
  );
}
