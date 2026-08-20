"use client";

import { RecruitmentFlow } from "@/components/recruitment/RecruitmentFlow";
import { PageAnalytics } from "@/components/shared/PageAnalytics";
import { AnalyticsEvents } from "@/lib/posthog/events";

export default function RecruitmentClient() {
  return (
    <>
      <PageAnalytics event={AnalyticsEvents.RECRUITMENT_PAGE_VIEWED} surface="/recruitment" />
      <RecruitmentFlow />
    </>
  );
}
