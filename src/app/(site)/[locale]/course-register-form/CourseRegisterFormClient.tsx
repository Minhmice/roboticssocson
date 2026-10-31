"use client";

import { CourseConsultForm } from "@/components/course/CourseConsultForm";
import {
  ContactExperienceShell,
  defaultContactMeta,
} from "@/components/shared/ContactExperienceShell";
import { PageAnalytics } from "@/components/shared/PageAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnalyticsEvents } from "@/lib/posthog/events";

const titles = {
  vi: "Đăng ký khóa học",
  en: "Register for the course",
};

export default function CourseRegisterFormClient() {
  const { locale } = useLanguage();

  return (
    <ContactExperienceShell
      title={titles[locale]}
      backgroundSrc="/Images/Achievements/FTC 2024-2025/Image  (2).webp"
      backgroundAlt={
        locale === "vi"
          ? "Đội Robotics Sóc Sơn tại giải FTC"
          : "Robotics Soc Son team at FTC competition"
      }
      meta={[
        {
          label:
            locale === "vi"
              ? "Phản hồi 24–48 giờ"
              : "Reply in 24–48 hrs",
        },
        ...defaultContactMeta(locale).filter((m) => m.href),
      ]}
    >
      <PageAnalytics
        event={AnalyticsEvents.COURSE_REGISTER_PAGE_VIEWED}
        surface="/course-register-form"
      />
      <CourseConsultForm />
    </ContactExperienceShell>
  );
}
