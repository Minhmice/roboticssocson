export type CourseProject = {
  id: string;
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
  components_vi: string[];
  components_en: string[];
  logic_vi: string[];
  logic_en: string[];
  skills_vi: string[];
  skills_en: string[];
  imageSrc?: string;
  imageAlt_vi?: string;
  imageAlt_en?: string;
};

export const courseProjects: CourseProject[] = [];
