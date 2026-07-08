"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/homepage/Hero";
import AboutFIRSTSection from "@/components/homepage/AboutFIRST";
import AboutFTCSection from "@/components/homepage/AboutFTC";
import AboutSocSonHighSchool from "@/components/homepage/AboutSocSonHighSchool";
import TeamCarouselSection from "@/components/homepage/TeamCarousel";
import AchievementsSection from "@/components/homepage/Achievements";
import CourseTeaser from "@/components/homepage/CourseTeaser";

/** GSAP/ScrollTrigger live only in Mission (below the fold) — keep out of initial JS. */
const MissionSection = dynamic(
  () => import("@/components/homepage/Mission"),
  { ssr: true },
);

export function HomePage() {
  return (
    <div className="relative scroll-smooth">
      <Hero />
      <AboutFIRSTSection />
      <AboutFTCSection />
      <AboutSocSonHighSchool />
      <TeamCarouselSection />
      <AchievementsSection />
      <MissionSection />
      <CourseTeaser />
    </div>
  );
}
