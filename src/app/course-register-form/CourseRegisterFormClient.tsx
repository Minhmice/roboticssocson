"use client";

import { CourseConsultForm } from "@/components/course/CourseConsultForm";
import {
  ContactExperienceShell,
  defaultContactMeta,
} from "@/components/shared/ContactExperienceShell";
import { useLanguage } from "@/contexts/LanguageContext";

const titles = {
  vi: "Đăng ký tư vấn",
  en: "Book a consult",
};

export default function CourseRegisterFormClient() {
  const { locale } = useLanguage();

  return (
    <ContactExperienceShell
      title={titles[locale]}
      backgroundSrc="/Images/Achievements/FTC 2024-2025/Image  (2).webp"
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
      <CourseConsultForm />
    </ContactExperienceShell>
  );
}
