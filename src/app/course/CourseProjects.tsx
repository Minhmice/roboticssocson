"use client";

import { FadeInSection } from "@/components/shared/FadeInSection";
import { GlowCard } from "@/components/shared/GlowCard";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseProjects } from "@/data/courseProjects";
import { getLocalized, getLocalizedList } from "@/lib/course/getLocalized";

const projectsCopy = {
  title: { vi: "Dự án cuối khóa", en: "Capstone projects" },
  subtitle: {
    vi: "Hai dự án tích hợp cảm biến, logic và output thực tế — học sinh demo trước lớp.",
    en: "Two projects integrating sensors, logic, and real outputs — students demo to the class.",
  },
  badge: { vi: "Dự án", en: "Projects" },
  components: { vi: "Linh kiện", en: "Components" },
  logic: { vi: "Sơ đồ logic", en: "Logic flow" },
  skills: { vi: "Kỹ năng học được", en: "Skills gained" },
};

export default function CourseProjects() {
  const { locale } = useLanguage();

  return (
    <FadeInSection
      id="course-projects"
      className="py-12 sm:py-16 md:py-24 bg-muted/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={getLocalized(projectsCopy.title, locale)}
          subtitle={getLocalized(projectsCopy.subtitle, locale)}
          badge={getLocalized(projectsCopy.badge, locale)}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {courseProjects.map((project) => (
            <GlowCard key={project.id} className="flex flex-col h-full">
              <div className="mb-4 min-h-[180px]">
                <MediaPlaceholder
                  type="image"
                  className="h-[180px]"
                  caption={getLocalized(project.title, locale)}
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {getLocalized(project.title, locale)}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {getLocalized(project.description, locale)}
              </p>
              <div className="space-y-4 mt-auto text-sm">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    {getLocalized(projectsCopy.components, locale)}
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {getLocalizedList(project.components, locale).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    {getLocalized(projectsCopy.logic, locale)}
                  </h4>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                    {getLocalizedList(project.logic, locale).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    {getLocalized(projectsCopy.skills, locale)}
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {getLocalizedList(project.skills, locale).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}
