"use client";

import { HomePage } from "@/components/homepage/HomePage";
import { SponsorshipLanding } from "@/components/sponsor/SponsorshipLanding";

/** @deprecated Archive snapshot — full homepage with sponsorship (pre Phase 2 split paths) */
export function SponsorshipHomepageSnapshot() {
  return (
    <>
      <HomePage />
      <SponsorshipLanding />
    </>
  );
}
