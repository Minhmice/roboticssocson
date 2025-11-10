"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { GlassAnimated } from "@/components/shared/GlassAnimated";
import { ProgressWithLabel } from "@/components/shared/ProgressWithLabel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertCircle, CheckCircle2, Target } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  budgetTotal,
  budgetItems,
  fundedPercentage,
  fundedAmount,
} from "@/data/budget";

export default function TheChallengeSection() {
  const { locale } = useLanguage();

  const scrollToBudget = () => {
    const element = document.getElementById("budget-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="the-challenge"
      className="relative py-12 sm:py-16 md:py-24 min-h-[90vh] sm:min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <SectionHeader
          badge="Challenge"
          title={
            locale === "vi"
              ? "Thách thức: 15 trái tim nhiệt huyết, gặp phải rào cản tài chính"
              : "The Challenge: 15 passionate hearts, caught in financial constraints"
          }
          subtitle={
            locale === "vi"
              ? "Bốn mùa khẳng định – một tương lai cần vun đắp."
              : "Four seasons of affirmation – a future that needs nurturing."
            }
          align="center"
        />

        <div className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {/* Left: Problem */}
          <GlowCard className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-100">
                {locale === "vi" ? "Thách thức" : "The Challenge"}
              </h3>
            </div>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <Alert variant="destructive" className="text-xs sm:text-sm">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <AlertTitle className="text-xs sm:text-sm">
                  {locale === "vi" ? "Ngân sách không đủ" : "Limited Budget"}
                </AlertTitle>
                <AlertDescription className="text-xs sm:text-sm">
                  {locale === "vi"
                    ? "Không có kinh phí để mua robot parts và phần cứng cần thiết."
                    : "No budget for essential robot parts and hardware."}
                </AlertDescription>
              </Alert>
              <Alert className="text-xs sm:text-sm">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <AlertTitle className="text-xs sm:text-sm">
                  {locale === "vi" ? "Phí đăng ký" : "Registration Fees"}
                </AlertTitle>
                <AlertDescription className="text-xs sm:text-sm">
                  {locale === "vi"
                    ? "Không đủ để trả phí đăng ký thi đấu và tham gia workshop."
                    : "Insufficient funds for competition fees and training workshops."}
                </AlertDescription>
              </Alert>
              <Alert className="text-xs sm:text-sm">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <AlertTitle className="text-xs sm:text-sm">
                  {locale === "vi"
                    ? "Giới hạn training"
                    : "Training Limitations"}
                </AlertTitle>
                <AlertDescription className="text-xs sm:text-sm">
                  {locale === "vi"
                    ? "Không thể tham gia đầy đủ các khóa học và thực hành nâng cao."
                    : "Cannot fully participate in training and advanced practice sessions."}
                </AlertDescription>
              </Alert>
            </div>
          </GlowCard>

          {/* Right: Solution */}
          <GlowCard className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-100">
                {locale === "vi" ? "Giải pháp" : "The Solution"}
              </h3>
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                <span className="text-xs sm:text-sm md:text-base text-slate-200 font-semibold">
                  {locale === "vi"
                    ? `${budgetItems.length} linh kiện và phần cứng cần thiết`
                    : `${budgetItems.length} essential parts and hardware`}
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-slate-400 mb-1 sm:mb-2">
                  {locale === "vi" ? "Tổng ngân sách:" : "Total budget:"}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400">
                  $
                  {budgetTotal.usd.toLocaleString("en-US", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}{" "}
                  USD
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {budgetTotal.vnd.toLocaleString("vi-VN")} VNĐ
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <p className="text-xs sm:text-sm text-slate-400">
                    {locale === "vi" ? "Tình trạng:" : "Status:"}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-cyan-400">
                    $
                    {fundedAmount.usd.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    USD
                  </p>
                </div>
                <GlassAnimated className="rounded-full overflow-hidden">
                  <ProgressWithLabel
                    value={fundedPercentage}
                    label={`${fundedPercentage}% funded`}
                    className="h-4 sm:h-6 border border-cyan-500/30"
                  />
                </GlassAnimated>
              </div>
              <CTAButton
                label={
                  locale === "vi"
                    ? "Xem chi tiết ngân sách"
                    : "View detailed budget"
                }
                variant="primary"
                onClick={scrollToBudget}
                className="text-xs sm:text-sm"
              />
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
