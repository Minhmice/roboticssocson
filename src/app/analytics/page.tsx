import type { Metadata } from "next";
import { AnalyticsGate } from "@/app/analytics/AnalyticsGate";

export const metadata: Metadata = {
  title: "Analytics | Robotics Sóc Sơn",
  description: "Internal PostHog behavior dashboard for Robotics Sóc Sơn.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsPage() {
  return <AnalyticsGate />;
}
