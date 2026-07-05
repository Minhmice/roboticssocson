export type CourseCard = {
  id: string;
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
  icon?: string;
};

export const courseProblemCards: CourseCard[] = [];
export const courseSolutionCards: CourseCard[] = [];
export const courseOutcomeCards: CourseCard[] = [];
export const courseMethodSteps: CourseCard[] = [];
export const courseLevelingCards: CourseCard[] = [];
export const courseAiUsageCards: CourseCard[] = [];
