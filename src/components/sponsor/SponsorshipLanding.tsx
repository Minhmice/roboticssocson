"use client";

import BudgetFundraisingSection from "@/components/sponsor/BudgetFundraising";
import BudgetBreakdownSection from "@/components/sponsor/BudgetBreakdown";
import WhySponsorSection from "@/components/sponsor/WhySponsor";
import FinalCTASection from "@/components/sponsor/FinalCTA";

export function SponsorshipLanding() {
  return (
    <main className="relative scroll-smooth">
      <BudgetFundraisingSection />
      <BudgetBreakdownSection />
      <WhySponsorSection />
      <FinalCTASection />
    </main>
  );
}
