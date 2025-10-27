/**
 * Home page - Landing page for sponsorship fundraising
 * Section order:
 * 1. Hero (fundraising)
 * 2. The Challenge
 * 3. Track Record (Achievements)
 * 4. About FIRST
 * 5. Team Grid
 * 6. Budget Breakdown
 * 7. Why Sponsor Us
 * 8. Sponsorship Tiers
 * 9. Final CTA
 */

import HeroFundraising from "./(marketing)/_sections/HeroFundraising";
import TheChallengeSection from "./(marketing)/_sections/TheChallenge";
import TrackRecordSection from "./(marketing)/_sections/TrackRecord";
import AboutFIRSTSection from "./(marketing)/_sections/AboutFIRST";
import TeamGridSection from "./(marketing)/_sections/TeamGrid";
import BudgetFundraisingSection from "./(marketing)/_sections/BudgetFundraising";
import WhySponsorSection from "./(marketing)/_sections/WhySponsor";
import SponsorshipTiersSection from "./(marketing)/_sections/SponsorshipTiers";
import FinalCTASection from "./(marketing)/_sections/FinalCTA";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroFundraising />
      <TheChallengeSection />
      <TrackRecordSection />
      <AboutFIRSTSection />
      <TeamGridSection />
      <BudgetFundraisingSection />
      <WhySponsorSection />
      <SponsorshipTiersSection />
      <FinalCTASection />
    </main>
  );
}
