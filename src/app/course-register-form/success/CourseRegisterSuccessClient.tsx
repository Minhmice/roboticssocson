"use client";

import { CourseRegisterSuccess } from "@/components/course/CourseRegisterSuccess";
import { ContactExperienceShell } from "@/components/shared/ContactExperienceShell";
import { useLanguage } from "@/contexts/LanguageContext";

const titles = {
  vi: "Đăng ký thành công",
  en: "Registration successful",
};

export default function CourseRegisterSuccessClient() {
  const { locale } = useLanguage();

  return (
    <ContactExperienceShell
      title={titles[locale]}
      showTitle={false}
      showAside={false}
      backgroundSrc="/Images/Achievements/FTC 2024-2025/Image  (2).webp"
      leadingContent={<CourseRegisterSuccess />}
    />
  );
}
