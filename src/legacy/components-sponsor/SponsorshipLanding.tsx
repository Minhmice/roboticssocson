"use client";

import TheChallengeSection from "@/components/sponsor/TheChallenge";
import BudgetFundraisingSection from "@/components/sponsor/BudgetFundraising";
import BudgetBreakdownSection from "@/components/sponsor/BudgetBreakdown";
import WhySponsorSection from "@/components/sponsor/WhySponsor";
import FinalCTASection from "@/components/sponsor/FinalCTA";
import { useLanguage } from "@/contexts/LanguageContext";

export function SponsorshipLanding() {
  const { locale } = useLanguage();

  return (
    <div className="relative scroll-smooth">
      <header className="relative overflow-hidden border-b border-border bg-muted/40 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 md:px-8">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {locale === "vi"
              ? "Đồng hành tài trợ cùng Robotics Sóc Sơn"
              : "Partner with Robotics Sóc Sơn"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-foreground/80 sm:text-lg">
            {locale === "vi"
              ? "Ngân sách minh bạch, quyền lợi rõ ràng, và quy trình tài trợ dành cho doanh nghiệp cùng cá nhân."
              : "Transparent budget, clear benefits, and sponsorship pathways for companies and individuals."}
          </p>
        </div>
      </header>
      <TheChallengeSection />
      <BudgetFundraisingSection />
      <BudgetBreakdownSection />
      <WhySponsorSection />
      <FinalCTASection />
    </div>
  );
}
