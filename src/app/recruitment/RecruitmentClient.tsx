"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarX2, House } from "lucide-react";
import { PageAnalytics } from "@/components/shared/PageAnalytics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnalyticsEvents } from "@/lib/posthog/events";

const content = {
  vi: {
    signal: "RBS 4.0 / ĐÃ ĐÓNG ĐƠN",
    title: "Đợt tuyển thành viên đã kết thúc.",
    body: "Cảm ơn bạn đã quan tâm đến Robotics Sóc Sơn. Đội đã dừng nhận đơn cho đợt tuyển thành viên hiện tại.",
    noticeTitle: "Form đăng ký đã đóng",
    noticeBody: "Hồ sơ mới không còn được tiếp nhận. Nếu đã gửi đơn, bạn hãy theo dõi kênh liên hệ đã cung cấp trong hồ sơ.",
    followUp: "Theo dõi các kênh chính thức của đội để cập nhật đợt tuyển tiếp theo.",
    contact: "Liên hệ đội",
    home: "Về trang chủ",
    imageAlt: "Các thành viên Robotics Sóc Sơn tại giải đấu FTC",
  },
  en: {
    signal: "RBS 4.0 / APPLICATIONS CLOSED",
    title: "Member applications are now closed.",
    body: "Thank you for your interest in Robotics Soc Son. We are no longer accepting applications for this recruitment round.",
    noticeTitle: "The application form is closed",
    noticeBody: "New applications are no longer accepted. If you already applied, please watch the contact channel included in your submission.",
    followUp: "Follow the team's official channels for future recruitment updates.",
    contact: "Contact the team",
    home: "Back to home",
    imageAlt: "Robotics Soc Son members at an FTC competition",
  },
} as const;

export default function RecruitmentClient() {
  const { locale } = useLanguage();
  const copy = content[locale];

  return (
    <>
      <PageAnalytics event={AnalyticsEvents.RECRUITMENT_PAGE_VIEWED} surface="/recruitment" />
      <div className="min-w-0 bg-background text-foreground">
        <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="relative min-h-72 min-w-0 overflow-hidden bg-slate-950 lg:min-h-full">
            <Image
              src="/Images/Achievements/FTC 2024-2025/Image  (2).webp"
              alt={copy.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-center saturate-[0.88]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_30%,rgba(15,23,42,0.8)_100%)]"
            />
            <p className="absolute inset-x-5 bottom-5 text-sm font-semibold tracking-[0.08em] text-white sm:inset-x-8 sm:bottom-8">
              {copy.signal}
            </p>
          </div>

          <div className="flex min-w-0 items-center px-5 py-12 sm:px-10 sm:py-16 lg:px-14">
            <div className="w-full min-w-0 max-w-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                <CalendarX2 className="h-6 w-6" aria-hidden />
              </div>

              <h1 className="mt-6 max-w-[15ch] text-balance text-[clamp(2.25rem,6vw,4.25rem)] font-black leading-[1.06] tracking-[-0.03em]">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-[58ch] text-pretty text-lg leading-8 text-foreground/80">
                {copy.body}
              </p>

              <Alert className="mt-8 border-primary/20 bg-accent/70 px-5 py-4 text-foreground">
                <CalendarX2 className="h-4 w-4 text-primary!" aria-hidden />
                <AlertTitle className="font-semibold">{copy.noticeTitle}</AlertTitle>
                <AlertDescription className="text-foreground/75">
                  {copy.noticeBody}
                </AlertDescription>
              </Alert>

              <p className="mt-6 max-w-[58ch] text-sm leading-6 text-muted-foreground">
                {copy.followUp}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="min-h-11 px-6 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] motion-reduce:transition-none">
                  <Link href="/contact-us">
                    {copy.contact}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-h-11 px-6 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] motion-reduce:transition-none">
                  <Link href="/">
                    <House className="h-4 w-4" aria-hidden />
                    {copy.home}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
