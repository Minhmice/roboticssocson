"use client";

import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseMentors, courseReviews } from "@/data/courseTrust";
import { getLocalized } from "@/lib/course/getLocalized";

export default function CourseTrust() {
  const { locale } = useLanguage();

  return (
    <FadeInSection
      id="course-trust"
      className="py-12 sm:py-16 md:py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-14 sm:space-y-16">
        <SectionHeader
          title={
            locale === "vi"
              ? "Tin tưởng từ phụ huynh & đội ngũ"
              : "Trusted by parents & mentors"
          }
          subtitle={
            locale === "vi"
              ? "Review mẫu sẽ được thay bằng lời thật sau các khoá đầu. Mentor là thành viên đội Robotics Sóc Sơn."
              : "Placeholder reviews will be replaced with real quotes after the first cohorts. Mentors are Robotics Sóc Sơn team members."
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          {courseReviews.map((review) => (
            <blockquote
              key={review.quote.vi}
              className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
            >
              <p className="text-pretty text-sm sm:text-base leading-relaxed text-foreground/90">
                &ldquo;{getLocalized(review.quote, locale)}&rdquo;
              </p>
              <footer className="mt-4 border-t border-border pt-3">
                <p className="text-sm font-semibold text-foreground">
                  {getLocalized(review.name, locale)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getLocalized(review.role, locale)}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 text-balance">
            {locale === "vi" ? "Giảng viên & mentor" : "Instructors & mentors"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {courseMentors.map((mentor) => (
              <article
                key={mentor.name.vi}
                className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-sm font-bold text-primary"
                  aria-hidden
                >
                  {getLocalized(mentor.name, locale).slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground">
                    {getLocalized(mentor.name, locale)}
                  </h4>
                  <p className="text-sm text-primary">
                    {getLocalized(mentor.title, locale)}
                  </p>
                  <p className="mt-2 text-sm text-foreground/80 text-pretty leading-relaxed">
                    {getLocalized(mentor.bio, locale)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
