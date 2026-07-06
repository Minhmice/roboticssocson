"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseRegistrationConfig } from "@/data/courseRegistration";
import {
  getGoogleFormUrl,
  getMessengerUrl,
  isRegistrationUrlAvailable,
} from "@/lib/course/registrationLinks";
import { Check, ExternalLink, MessageCircle } from "lucide-react";

const copy = {
  whatWeAskHeading: {
    vi: "Khi mở Google Form, phụ huynh sẽ cần cung cấp:",
    en: "When you open the Google Form, parents will provide:",
  },
  trustLine: {
    vi: "Thông tin chỉ dùng để tư vấn lớp học phù hợp. Thời gian điền khoảng 1–2 phút.",
    en: "Information is used only for class consultation. Takes about 1–2 minutes.",
  },
  googleFormCta: {
    vi: "Đăng ký qua Google Form",
    en: "Register via Google Form",
  },
  googleFormDisabled: {
    vi: "Google Form đang cập nhật",
    en: "Google Form is being updated",
  },
  googleFormHelper: {
    vi: "Trong thời gian này, phụ huynh có thể nhắn Messenger để được tư vấn.",
    en: "For now, parents can contact us through Messenger for consultation.",
  },
  messengerCta: {
    vi: "Nhắn Messenger",
    en: "Message on Messenger",
  },
};

export default function CourseRegister() {
  const { locale } = useLanguage();
  const config = courseRegistrationConfig;

  const title = locale === "vi" ? config.title_vi : config.title_en;
  const subtitle = locale === "vi" ? config.subtitle_vi : config.subtitle_en;

  const googleFormUrl = getGoogleFormUrl(config.googleFormLinks, locale);
  const messengerUrl = getMessengerUrl(config.messengerUrl, locale);
  const hasGoogleForm = isRegistrationUrlAvailable(googleFormUrl);

  const bullets = [
    locale === "vi" ? config.fieldLabels.parentName_vi : config.fieldLabels.parentName_en,
    locale === "vi" ? config.fieldLabels.phone_vi : config.fieldLabels.phone_en,
    locale === "vi"
      ? `${config.fieldLabels.studentName_vi} & ${config.fieldLabels.age_vi}`
      : `${config.fieldLabels.studentName_en} & ${config.fieldLabels.age_en}`,
    locale === "vi" ? config.fieldLabels.experience_vi : config.fieldLabels.experience_en,
    locale === "vi" ? config.fieldLabels.note_vi : config.fieldLabels.note_en,
  ];

  return (
    <FadeInSection
      id="course-register"
      className="py-12 sm:py-16 md:py-24 bg-muted/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="max-w-lg mx-auto space-y-4 text-center">
          {hasGoogleForm ? (
            <CTAButton
              label={copy.googleFormCta[locale]}
              variant="primary"
              icon={ExternalLink}
              href={googleFormUrl}
              target="_blank"
              className="w-full min-h-[44px]"
            />
          ) : (
            <div className="space-y-2">
              <CTAButton
                label={copy.googleFormDisabled[locale]}
                variant="primary"
                disabled
                className="w-full min-h-[44px] opacity-50 cursor-not-allowed border-border shadow-none hover:shadow-none hover:scale-100"
              />
              <p className="text-sm text-muted-foreground">
                {copy.googleFormHelper[locale]}
              </p>
            </div>
          )}

          {messengerUrl && (
            <CTAButton
              label={copy.messengerCta[locale]}
              variant="secondary"
              icon={MessageCircle}
              href={messengerUrl}
              target="_blank"
              className="w-full min-h-[44px]"
            />
          )}

          <div className="pt-6 text-left">
            <h3 className="text-sm font-medium text-foreground mb-3">
              {copy.whatWeAskHeading[locale]}
            </h3>
            <ul className="space-y-2">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <Check
                    className="h-4 w-4 text-primary shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              {copy.trustLine[locale]}
            </p>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
