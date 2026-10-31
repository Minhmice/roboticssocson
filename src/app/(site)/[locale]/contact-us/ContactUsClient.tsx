"use client";

import { ContactExperienceShell } from "@/components/shared/ContactExperienceShell";
import { ContactInfoBlock } from "@/components/shared/ContactInfoBlock";
import { useLanguage } from "@/contexts/LanguageContext";

const sectionLabel = {
  vi: "Thông tin liên hệ",
  en: "Contact information",
};

export default function ContactUsClient() {
  const { locale } = useLanguage();

  return (
    <ContactExperienceShell
      title={sectionLabel[locale]}
      backgroundSrc="/Images/Achievements/FTC 2024-2025/Image  (3).webp"
      showTitle={false}
      showAside={false}
      leadingContent={<ContactInfoBlock locale={locale} />}
    />
  );
}
