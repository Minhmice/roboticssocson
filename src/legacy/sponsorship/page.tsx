import type { Metadata } from "next";
import { SponsorshipLanding } from "@/legacy/components-sponsor/SponsorshipLanding";

export const metadata: Metadata = {
  title: "Sponsorship | Robotics Sóc Sơn",
  description: "Archived sponsorship surface for Robotics Sóc Sơn.",
  alternates: { canonical: "/sponsorship" },
};

export default function SponsorshipPage() {
  return <SponsorshipLanding />;
}
