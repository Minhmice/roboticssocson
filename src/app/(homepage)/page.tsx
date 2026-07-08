import type { Metadata } from "next";
import { HomePage } from "@/components/homepage/HomePage";
import { buildMetadata } from "@/lib/seo/metadata";
import { homeSeo } from "@/lib/seo/routes-seo";

export const metadata: Metadata = buildMetadata(homeSeo.vi);

export default function Page() {
  return <HomePage />;
}
