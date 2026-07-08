import type { Metadata } from "next";
import { SponsorshipLanding } from "@/components/sponsor/SponsorshipLanding";
import { buildMetadata } from "@/lib/seo/metadata";
import { sponsorshipSeo } from "@/lib/seo/routes-seo";

export const metadata: Metadata = buildMetadata(sponsorshipSeo.vi);

export default function SponsorshipPage() {
  return <SponsorshipLanding />;
}
