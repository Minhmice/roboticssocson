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
import CourseRegister from "./CourseRegister";
import CourseTrust from "./CourseTrust";

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
      <CourseTrust />
      <CourseFAQ />
      <CourseRegister />
    </div>
  );
}
