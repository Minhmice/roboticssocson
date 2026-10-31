"use client";

import { LocaleLink as Link } from "@/components/shared/LocaleLink";
import { ArrowRight, DollarSign, Users, Mail } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";

export function HomeClosingCTA() {
  const { locale, t } = useLanguage();
  const isVi = locale === "vi";

  return (
    <section className="relative py-16 sm:py-20 md:py-24 border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.025em] text-foreground text-balance">
            {t("cta.title")}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed text-pretty max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Fundraising Campaign */}
          <div className="flex flex-col justify-between rounded-2xl border border-primary/30 bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-accent border border-primary/20 text-primary flex items-center justify-center">
                <DollarSign className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {isVi ? "Chiến dịch gây quỹ" : "Fundraising Campaign"}
              </h3>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-pretty">
                {isVi
                  ? "Tìm hiểu kế hoạch mua sắm linh kiện cơ khí, mạch điều khiển và tài trợ thi đấu mùa giải 2026–2027."
                  : "Explore our parts purchase plan, control electronics, and team sponsorship for the 2026–2027 season."}
              </p>
            </div>
            <div className="pt-6">
              <CTAButton
                label={isVi ? "Xem chiến dịch gây quỹ" : "View Campaign"}
                variant="primary"
                href="/fundraising"
                icon={ArrowRight}
                className="w-full justify-center min-h-[44px]"
              />
            </div>
          </div>

          {/* Card 2: Recruitment Status & Notice */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 transition-colors">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-muted border border-border text-muted-foreground flex items-center justify-center">
                <Users className="h-5 w-5" aria-hidden />
              </div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-foreground">
                  {isVi ? "Tuyển thành viên" : "Team Recruitment"}
                </h3>
                <span className="inline-flex items-center rounded-full bg-muted border border-border px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                  {t("nav.recruitmentClosedBadge")}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-pretty">
                {isVi
                  ? "Đợt tuyển thành viên hiện tại đã dừng nhận đơn. Tìm hiểu cơ cấu ban kỹ thuật và thông báo tuyển đợt kế tiếp."
                  : "Applications for the current round are closed. Learn about our subteams and get ready for the next round."}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/recruitment"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors min-h-[44px]"
              >
                <span>{isVi ? "Xem thông báo đợt tuyển" : "Read Recruitment Notice"}</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Card 3: Direct Contact */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 transition-colors">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-accent border border-primary/20 text-primary flex items-center justify-center">
                <Mail className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {isVi ? "Hợp tác & Giao lưu" : "Outreach & Connect"}
              </h3>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-pretty">
                {isVi
                  ? "Dành cho các trường học, cố vấn STEM và doanh nghiệp muốn kết nối giao lưu hoặc tổ chức hoạt động trải nghiệm."
                  : "For schools, STEM mentors, and organizations looking to connect, scrimmage, or collaborate."}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/contact-us"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors min-h-[44px]"
              >
                <span>{isVi ? "Liên hệ với đội" : "Contact the Team"}</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
