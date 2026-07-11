"use client";

import CourseAIUsage from "./CourseAIUsage";
import CourseCurriculum from "./CourseCurriculum";
import CourseFAQ from "./CourseFAQ";
import CourseHero from "./CourseHero";
import CourseLeveling from "./CourseLeveling";
import CourseMethod from "./CourseMethod";
import CourseOutcomes from "./CourseOutcomes";
import CourseProblem from "./CourseProblem";
import CourseProjects from "./CourseProjects";
import CoursePricing from "./CoursePricing";
import CoursePricingStickyCta from "./CoursePricingStickyCta";
import CourseRegister from "./CourseRegister";
import { PageAnalytics } from "@/components/shared/PageAnalytics";
import { AnalyticsEvents } from "@/lib/posthog/events";

export default function CoursePage() {
  return (
    <div>
      <PageAnalytics
        event={AnalyticsEvents.COURSE_PAGE_VIEWED}
        surface="/course"
      />
      <CourseHero />
      <CourseProblem />
      <CourseOutcomes />
      <CourseCurriculum />
      <CourseProjects />
      <CourseMethod />
      <CourseLeveling />
      <CourseAIUsage />
      <CoursePricing />
      <CourseFAQ />
      <CourseRegister />
      <CoursePricingStickyCta />
    </div>
  );
}
