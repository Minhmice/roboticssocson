"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedCard } from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { GlassAnimated } from "@/components/shared/GlassAnimated";
import { AuroraBackground } from "@/components/ui/aurora-background";
import {
  Building2,
  Heart,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  Download,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  sponsorPageHeader,
  sponsorStepLabels,
  sponsorOptions,
  corporateStepInfo,
  personalStepInfo,
  bankInfo,
  qrCodeImage,
  googleFormLinks,
} from "@/data/sponsorPage";

type SponsorType = "corporate" | "personal" | null;

export default function SponsorPage() {
  const { locale } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<SponsorType>(null);

  const handleSelectType = (type: SponsorType) => {
    setSelectedType(type);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      setCurrentStep(1);
    } else if (step === 2 && selectedType !== null) {
      setCurrentStep(2);
    }
  };

  const handleDownloadQR = () => {
    // Download QR code image
    const link = document.createElement("a");
    link.href = qrCodeImage;
    link.download = "QR-Code-Robotics-Soc-Son.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AuroraBackground className="bg-background text-foreground">
      <main className="relative z-10 min-h-screen py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Intro Section */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {locale === "vi" ? "Tài trợ cho Robotics Sóc Sơn" : "Sponsor Robotics Sóc Sơn"}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {locale === "vi"
                ? "Bạn là doanh nghiệp muốn đồng hành dài lâu, hay cá nhân muốn ủng hộ theo tâm huyết? Hãy chọn hình thức phù hợp để bắt đầu!"
                : "Are you a company seeking long-term partnership, or an individual wanting to support with passion? Choose the right option to get started!"}
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-center gap-4 mt-12 mb-8">
            <button
              onClick={() => handleStepClick(1)}
              className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                  currentStep === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/20 text-primary"
                )}
              >
              {currentStep > 1 ? <CheckCircle2 className="w-6 h-6" /> : "1"}
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              {locale === "vi"
                ? sponsorStepLabels.step1_vi
                : sponsorStepLabels.step1_en}
            </span>
            </button>
            <div className="w-16 h-0.5 bg-border" />
            <button
              onClick={() => handleStepClick(2)}
              disabled={!selectedType}
              className={cn(
                "flex items-center gap-2 transition-opacity",
                selectedType
                  ? "cursor-pointer hover:opacity-80"
                  : "cursor-not-allowed opacity-50"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                  currentStep === 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              {locale === "vi"
                ? sponsorStepLabels.step2_vi
                : sponsorStepLabels.step2_en}
            </span>
            </button>
          </div>

          {/* Step 1: Choose Type */}
          {currentStep === 1 && (
            <div className="grid md:grid-cols-2 gap-6">
              {sponsorOptions.map((option) => {
                const isCorporate = option.type === "corporate";
                const Icon = isCorporate ? Building2 : Heart;
                const colorClass = isCorporate ? "primary" : "chart-2";

                return (
                  <AnimatedCard
                    key={option.type}
                    className={cn(
                      "cursor-pointer transition-all group relative overflow-hidden",
                      isCorporate
                        ? "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                        : "hover:border-chart-2/50 hover:shadow-lg hover:shadow-chart-2/10"
                    )}
                    onClick={() => handleSelectType(option.type)}
                  >
                    <div className="flex flex-col h-full p-6 sm:p-8">
                      {/* Icon */}
                      <div
                        className={cn(
                          "w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-all",
                          isCorporate
                            ? "bg-primary/10 group-hover:bg-primary/20"
                            : "bg-chart-2/10 group-hover:bg-chart-2/20"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-10 h-10",
                            isCorporate ? "text-primary" : "text-chart-2"
                          )}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-2 text-center">
                        {locale === "vi" ? option.title_vi : option.title_en}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm font-medium text-center mb-4 text-muted-foreground">
                        {locale === "vi"
                          ? option.subtitle_vi
                          : option.subtitle_en}
                      </p>

                      {/* Description Points */}
                      <div className="space-y-2 mb-4">
                        {(locale === "vi"
                          ? option.description_vi
                          : option.description_en
                        ).map((desc, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Sparkles
                              className={cn(
                                "w-4 h-4 flex-shrink-0 mt-0.5",
                                isCorporate ? "text-primary" : "text-chart-2"
                              )}
                            />
                            <span className="text-muted-foreground">{desc}</span>
                          </div>
                        ))}
                      </div>

                      {/* Hover indicator */}
                      <div className="mt-auto pt-4 text-center">
                        <span
                          className={cn(
                            "text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity",
                            isCorporate ? "text-primary" : "text-chart-2"
                          )}
                        >
                          {locale === "vi"
                            ? "Nhấn để chọn →"
                            : "Click to select →"}
                        </span>
                      </div>
                    </div>
                  </AnimatedCard>
                );
              })}
            </div>
          )}

          {/* Step 2: Corporate Info */}
          {currentStep === 2 && selectedType === "corporate" && (
            <AnimatedCard className="min-h-[500px]">
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {locale === "vi"
                      ? corporateStepInfo.title_vi
                      : corporateStepInfo.title_en}
                  </h2>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed px-6 sm:px-8">
                  {locale === "vi"
                    ? corporateStepInfo.intro_vi
                    : corporateStepInfo.intro_en}
                </p>

                <div className="space-y-3 mb-8 px-6 sm:px-8">
                  {(locale === "vi"
                    ? corporateStepInfo.checkpoints_vi
                    : corporateStepInfo.checkpoints_en
                  ).map((checkpoint, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base">{checkpoint}</p>
                    </div>
                  ))}
                </div>

                {corporateStepInfo.note_title_vi && (
                  <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 mb-6 mx-6 sm:mx-8">
                    <h3 className="font-semibold mb-2 text-primary">
                      {locale === "vi"
                        ? corporateStepInfo.note_title_vi
                        : corporateStepInfo.note_title_en}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {locale === "vi"
                        ? corporateStepInfo.note_content_vi
                        : corporateStepInfo.note_content_en}
                    </p>
                  </div>
                )}

                <div className="space-y-3 mt-auto p-6 sm:p-8 pt-0">
                  {/* Main action buttons */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <GlassAnimated>
                      <a
                        href={locale === "vi" ? googleFormLinks.vi : googleFormLinks.en}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center justify-center gap-2",
                          "px-6 py-4 rounded-lg",
                          "bg-primary hover:bg-primary/90",
                          "text-primary-foreground font-semibold text-base",
                          "transition-all duration-300",
                          "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
                          "w-full min-h-[52px]"
                        )}
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>
                          {locale === "vi"
                            ? corporateStepInfo.cta_vi
                            : corporateStepInfo.cta_en}
                        </span>
                      </a>
                    </GlassAnimated>

                    <Button
                      variant="outline"
                      onClick={() => window.open("https://m.me/roboticssocson", "_blank")}
                      className="w-full min-h-[52px] py-4 text-base font-semibold"
                    >
                      <MessageCircle className="mr-2 w-5 h-5" />
                      {locale === "vi" ? "Liên hệ trực tiếp" : "Contact Directly"}
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="w-full h-12 text-base"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    {locale === "vi"
                      ? sponsorStepLabels.back_vi
                      : sponsorStepLabels.back_en}
                  </Button>
                </div>
              </div>
            </AnimatedCard>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && selectedType === "personal" && (
            <AnimatedCard className="min-h-[500px]">
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-0">
                  <div className="w-12 h-12 rounded-xl bg-chart-2/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-chart-2" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {locale === "vi"
                      ? personalStepInfo.title_vi
                      : personalStepInfo.title_en}
                  </h2>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed px-6 sm:px-8">
                  {locale === "vi"
                    ? personalStepInfo.intro_vi
                    : personalStepInfo.intro_en}
                </p>

                {/* QR and Bank Info Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6 px-6 sm:px-8">
                  {/* QR Code - Left Side */}
                  <div className="flex flex-col">
                    <div className="flex-1 flex items-center justify-center p-6 rounded-lg bg-white">
                      <div className="text-center">
                        <Image
                          src={qrCodeImage}
                          alt="QR Code - Robotics Sóc Sơn"
                          width={320}
                          height={320}
                          className="w-full max-w-[280px] sm:max-w-[320px] mx-auto rounded-lg"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank Info - Right Side */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-card border border-border">
                      <p className="text-sm text-muted-foreground mb-1">
                        {locale === "vi"
                          ? bankInfo.bank_label_vi
                          : bankInfo.bank_label_en}
                      </p>
                      <p className="font-semibold">{bankInfo.bank_name}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border">
                      <p className="text-sm text-muted-foreground mb-1">
                        {locale === "vi"
                          ? bankInfo.account_label_vi
                          : bankInfo.account_label_en}
                      </p>
                      <p className="font-semibold">{bankInfo.account_number}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border">
                      <p className="text-sm text-muted-foreground mb-1">
                        {locale === "vi"
                          ? bankInfo.owner_label_vi
                          : bankInfo.owner_label_en}
                      </p>
                      <p className="font-semibold">{bankInfo.owner_name}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border">
                      <p className="text-sm text-muted-foreground mb-1">
                        {locale === "vi"
                          ? bankInfo.note_label_vi
                          : bankInfo.note_label_en}
                      </p>
                      <p className="font-semibold text-sm">
                        {locale === "vi"
                          ? bankInfo.note_format_vi
                          : bankInfo.note_format_en}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-chart-2/5 border-l-4 border-chart-2 mb-6 mx-6 sm:mx-8">
                  <p className="text-sm text-muted-foreground">
                    {locale === "vi"
                      ? personalStepInfo.note_content_vi
                      : personalStepInfo.note_content_en}
                  </p>
                </div>

                <div className="space-y-3 mt-auto p-6 sm:p-8 pt-0">
                  {/* Main action buttons */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => window.open("https://m.me/roboticssocson", "_blank")}
                      className="w-full min-h-[52px] py-4 text-base font-semibold"
                    >
                      <MessageCircle className="mr-2 w-5 h-5" />
                      {locale === "vi" ? "Liên hệ hỗ trợ" : "Contact Support"}
                    </Button>

                    <GlassAnimated>
                      <Button
                        onClick={handleDownloadQR}
                        className={cn(
                          "w-full min-h-[52px] py-4",
                          "bg-chart-2 hover:bg-chart-2/90",
                          "text-white font-semibold text-base",
                          "shadow-lg shadow-chart-2/30 hover:shadow-xl hover:shadow-chart-2/40",
                          "transition-all duration-300"
                        )}
                      >
                        <Download className="mr-2 w-5 h-5" />
                        {locale === "vi"
                          ? personalStepInfo.cta_vi
                          : personalStepInfo.cta_en}
                      </Button>
                    </GlassAnimated>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="w-full h-12 text-base"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    {locale === "vi"
                      ? sponsorStepLabels.back_vi
                      : sponsorStepLabels.back_en}
                  </Button>
                </div>
              </div>
            </AnimatedCard>
          )}
        </div>
      </main>
    </AuroraBackground>
  );
}
