import type { Metadata } from "next";
import SponsorPageClient from "./SponsorPageClient";
export const metadata: Metadata = {
  title: "Sponsor | Robotics Sóc Sơn",
  description: "Archived sponsor surface for Robotics Sóc Sơn.",
  alternates: { canonical: "/sponsor" },
};

export default function Page() {
  return <SponsorPageClient />;
}
