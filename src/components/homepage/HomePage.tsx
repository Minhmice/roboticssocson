"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/homepage/Hero";
import AboutSocSonHighSchool from "@/components/homepage/AboutSocSonHighSchool";
import TeamCarouselSection from "@/components/homepage/TeamCarousel";
import { courseSurfacesEnabled } from "@/data/courseRegistration";

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

const RecruitmentDialog = dynamic(
  () =>
    import("@/components/homepage/RecruitmentDialog").then(
      (m) => m.RecruitmentDialog,
    ),
  { ssr: false },
);
export function HomePage() {
  return (
    <div className="relative scroll-smooth">
      <RecruitmentDialog />
      <Hero />
      <AboutSocSonHighSchool />
      <TeamCarouselSection />
      <AchievementsSection />
      <AboutFIRSTSection />
      <AboutFTCSection />
      <MissionSection />
      {courseSurfacesEnabled ? <CourseTeaser /> : null}
    </div>
  );
}
