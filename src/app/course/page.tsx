"use client";

import CourseAIUsage from "./CourseAIUsage";
import CourseCurriculum from "./CourseCurriculum";
import CourseFAQ from "./CourseFAQ";
import CourseHero from "./CourseHero";
import CourseLeveling from "./CourseLeveling";
import CourseMethod from "./CourseMethod";
import CourseMidPageCTA from "./CourseMidPageCTA";
import CourseOffer from "./CourseOffer";
import CourseOutcomes from "./CourseOutcomes";
import CourseProblem from "./CourseProblem";
import CourseProjects from "./CourseProjects";
import CourseRegister from "./CourseRegister";
import CourseSolution from "./CourseSolution";
import CourseStickyCTA from "./CourseStickyCTA";

export default function CoursePage() {
  return (
    <div className="pb-20">
      <CourseHero />
      <CourseProblem />
      <CourseSolution />
      <CourseOutcomes />
      <CourseCurriculum />
      <CourseProjects />
      <CourseMethod />
      <CourseLeveling />
      <CourseAIUsage />
      <CourseMidPageCTA />
      <CourseFAQ />
      <CourseOffer />
      <CourseRegister />
      <CourseStickyCTA />
    </div>
  );
}
