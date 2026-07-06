"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  AnimatedCard,
  AnimatedGrid,
} from "@/components/shared/AnimatedComponents";
import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { sponsorshipMainSections } from "@/data/sponsorshipProcess";
import {
  Building2,
  CheckCircle2,
  ExternalLink,
  Heart,
  QrCode,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SponsorshipProcessSection() {
  const { locale } = useLanguage();

  const corporateSection = sponsorshipMainSections.find(
    (s) => s.type === "corporate"
  )!;
  const personalSection = sponsorshipMainSections.find(
    (s) => s.type === "personal"
  )!;
  const closingSection = sponsorshipMainSections.find(
    (s) => s.type === "closing"
  )!;

  return (
    <section className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          badge={locale === "vi" ? "Đồng hành" : "Partnership"}
          title={
            locale === "vi"
              ? "Hình thức tài trợ & Cách thức đồng hành"
              : "Sponsorship Forms & Partnership Methods"
          }
          subtitle={
            locale === "vi"
              ? "Chọn hình thức phù hợp để cùng Robotics Sóc Sơn hiện thực hóa ước mơ STEM"
              : "Choose the right form to help Robotics Sóc Sơn realize STEM dreams"
          }
          align="center"
        />

        <AnimatedGrid className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-12">
          {/* Corporate Sponsorship */}
          <AnimatedCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {locale === "vi"
                    ? corporateSection.title_vi
                    : corporateSection.title_en}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                {locale === "vi"
                  ? corporateSection.content_vi
                  : corporateSection.content_en}
              </p>

              <div className="space-y-3 mb-6">
                {(locale === "vi"
                  ? corporateSection.details_vi
                  : corporateSection.details_en
                ).map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-foreground">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border mb-4">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">
                    {locale === "vi" ? "Mục đích:" : "Purpose:"}
                  </span>{" "}
                  {locale === "vi"
                    ? corporateSection.purpose_vi
                    : corporateSection.purpose_en}
                </p>
              </div>

              <a
                href={corporateSection.placeholder}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center gap-2 w-full",
                  "px-4 py-3 rounded-lg",
                  "bg-primary/10 hover:bg-primary/20",
                  "border border-primary/30 hover:border-primary/50",
                  "text-primary font-medium",
                  "transition-all duration-300",
                  "group/link"
                )}
              >
                <ExternalLink className="h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
                <span className="text-sm sm:text-base">
                  {locale === "vi" ? "Đăng ký tài trợ" : "Register Sponsorship"}
                </span>
              </a>
            </div>
          </AnimatedCard>

          {/* Personal Donation */}
          <AnimatedCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-chart-2/5 rounded-full blur-3xl group-hover:bg-chart-2/10 transition-all duration-500" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-chart-2/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-chart-2" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {locale === "vi"
                    ? personalSection.title_vi
                    : personalSection.title_en}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                {locale === "vi"
                  ? personalSection.content_vi
                  : personalSection.content_en}
              </p>

              <div className="space-y-3 mb-6">
                {(locale === "vi"
                  ? personalSection.details_vi
                  : personalSection.details_en
                ).map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-foreground">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border mb-4">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">
                    {locale === "vi" ? "Mục đích:" : "Purpose:"}
                  </span>{" "}
                  {locale === "vi"
                    ? personalSection.purpose_vi
                    : personalSection.purpose_en}
                </p>
              </div>

              <div className="flex items-center justify-center p-6 rounded-lg bg-muted/30 border border-dashed border-border">
                <div className="text-center">
                  <QrCode className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {personalSection.placeholder}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </AnimatedGrid>

        {/* Closing Section */}
        <AnimatedCard className="mt-8 sm:mt-12 text-center">
          <div className="max-w-3xl mx-auto">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              {locale === "vi"
                ? closingSection.title_vi
                : closingSection.title_en}
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              {locale === "vi"
                ? closingSection.content_vi
                : closingSection.content_en}
            </p>
            <div className="space-y-2 mb-8">
              {(locale === "vi"
                ? closingSection.details_vi
                : closingSection.details_en
              ).map((detail, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-foreground flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {detail}
                </p>
              ))}
            </div>
            <CTAButton
              label={
                locale === "vi"
                  ? closingSection.cta?.text_vi || ""
                  : closingSection.cta?.text_en || ""
              }
              href={closingSection.cta?.link || "/sponsor"}
              variant="primary"
            />
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}

