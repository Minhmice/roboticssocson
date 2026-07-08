import type { Metadata } from "next";
import SponsorPageClient from "./SponsorPageClient";
import { buildMetadata } from "@/lib/seo/metadata";
import { sponsorSeo } from "@/lib/seo/routes-seo";

export const metadata: Metadata = buildMetadata(sponsorSeo.vi);

export default function Page() {
  return <SponsorPageClient />;
}
