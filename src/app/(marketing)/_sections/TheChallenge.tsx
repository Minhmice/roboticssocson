"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertCircle, CheckCircle2, Target } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";

export default function TheChallengeSection() {
  const { locale } = useLanguage();

  const scrollToBudget = () => {
    const element = document.getElementById("budget-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="the-challenge" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Challenge"
          title={
            locale === "vi"
              ? "Thách thức: 15 sinh viên tài năng, ngân sách hạn hẹp"
              : "The Challenge: 15 talented students, limited budget"
          }
          subtitle={
            locale === "vi"
              ? "Chúng em đã chứng minh tiềm năng qua 4 giải đấu. Bây giờ cần sự hỗ trợ để tiếp tục."
              : "We've proven our potential through 4 competitions. Now we need support to continue."
          }
          align="center"
        />

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Left: Problem */}
          <GlowCard className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-400" />
              <h3 className="text-xl font-bold text-slate-100">
                {locale === "vi" ? "Thách thức" : "The Challenge"}
              </h3>
            </div>
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {locale === "vi" ? "Ngân sách không đủ" : "Limited Budget"}
                </AlertTitle>
                <AlertDescription>
                  {locale === "vi"
                    ? "Không có kinh phí để mua robot parts và phần cứng cần thiết."
                    : "No budget for essential robot parts and hardware."}
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {locale === "vi" ? "Phí đăng ký" : "Registration Fees"}
                </AlertTitle>
                <AlertDescription>
                  {locale === "vi"
                    ? "Không đủ để trả phí đăng ký thi đấu và tham gia workshop."
                    : "Insufficient funds for competition fees and training workshops."}
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {locale === "vi" ? "Giới hạn training" : "Training Limitations"}
                </AlertTitle>
                <AlertDescription>
                  {locale === "vi"
                    ? "Không thể tham gia đầy đủ các khóa học và thực hành nâng cao."
                    : "Cannot fully participate in training and advanced practice sessions."}
                </AlertDescription>
              </Alert>
            </div>
          </GlowCard>

          {/* Right: Solution */}
          <GlowCard className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-slate-100">
                {locale === "vi" ? "Giải pháp" : "The Solution"}
              </h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-200 font-semibold">
                  {locale === "vi" ? "10 items cần thiết" : "10 essential items"}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">
                  {locale === "vi" ? "Tổng ngân sách:" : "Total budget:"}
                </p>
                <p className="text-2xl font-bold text-cyan-400">$2,579 USD</p>
                <p className="text-sm text-slate-400 mt-1">67,067,000 VNĐ</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">
                  {locale === "vi" ? "Tình trạng:" : "Status:"}
                </p>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">
                  {locale === "vi" ? "0% funded" : "0% funded"}
                </p>
              </div>
              <CTAButton
                label={
                  locale === "vi"
                    ? "Xem chi tiết ngân sách"
                    : "View detailed budget"
                }
                variant="primary"
                onClick={scrollToBudget}
              />
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

