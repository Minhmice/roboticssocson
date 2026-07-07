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
export default function CoursePage() {
  return (
    <div>
      <CourseHero />
      <CourseProblem />
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
    </div>
  );
}
