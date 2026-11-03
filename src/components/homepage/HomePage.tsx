"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/homepage/Hero";
import AboutSocSonHighSchool from "@/components/homepage/AboutSocSonHighSchool";
import TeamCarouselSection from "@/components/homepage/TeamCarousel";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { HomeClosingCTA } from "@/components/homepage/HomeClosingCTA";
import { HomeMarquee } from "@/components/homepage/HomeMarquee";
import { HomeMotion } from "@/components/homepage/HomeMotion";
import { ScrollProgress } from "@/components/homepage/ScrollProgress";
const AchievementsSection = dynamic(
  () => import("@/components/homepage/Achievements"),
  { ssr: true },
);

const AboutFIRSTSection = dynamic(
  () => import("@/components/homepage/AboutFIRST"),
  { ssr: true },
);

const AboutFTCSection = dynamic(
  () => import("@/components/homepage/AboutFTC"),
  { ssr: true },
);

/** GSAP/ScrollTrigger live only in Mission (below the fold) — keep out of initial JS. */
const MissionSection = dynamic(
  () => import("@/components/homepage/Mission"),
  { ssr: true },
);

const CourseTeaser = dynamic(
  () => import("@/components/homepage/CourseTeaser"),
  { ssr: true },
);

export function HomePage() {
  return (
    <HomeMotion>
      <ScrollProgress />
      <Hero />
      <HomeMarquee />
      <AboutSocSonHighSchool />
      <TeamCarouselSection />
      <AchievementsSection />
      <AboutFIRSTSection />
      <AboutFTCSection />
      <MissionSection />
      {courseSurfacesEnabled ? <CourseTeaser /> : null}
      <HomeClosingCTA />
    </HomeMotion>
  );
}
