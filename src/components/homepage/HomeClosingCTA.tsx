"use client";

import { useRef } from "react";
import { LocaleLink as Link } from "@/components/shared/LocaleLink";
import { ArrowRight, DollarSign, FileText, Mail } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function HomeClosingCTA() {
  const { locale, t } = useLanguage();
  const isVi = locale === "vi";

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-cta-card]", { autoAlpha: 1, y: 0, scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-cta-card]");
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 28, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 border-t border-border bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.025em] text-foreground text-balance">
            {t("cta.title")}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed text-pretty max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Fundraising Campaign */}
          <div
            data-cta-card="true"
            className="group flex flex-col justify-between rounded-2xl border border-primary/30 bg-card p-6 shadow-sm hover:shadow-glow-blue hover:border-primary/60 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-accent border border-primary/20 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <DollarSign className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {isVi ? "Chiến dịch gây quỹ" : "Fundraising Campaign"}
              </h3>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-pretty">
                {isVi
                  ? "Tìm hiểu kế hoạch mua sắm linh kiện cơ khí, mạch điều khiển và tài trợ thi đấu mùa giải 2026–2027."
                  : "Explore our parts purchase plan, control electronics, and team sponsorship for the 2026–2027 season."}
              </p>
            </div>
            <div className="pt-6">
              <CTAButton
                label={isVi ? "Xem chiến dịch gây quỹ" : "View Campaign"}
                variant="primary"
                href="/fundraising"
                icon={ArrowRight}
                className="w-full justify-center min-h-[44px]"
              />
            </div>
          </div>

          {/* Card 2: Sponsorship Dossier */}
          <div
            data-cta-card="true"
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 hover:shadow-glow-blue transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-accent border border-primary/20 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <FileText className="h-5 w-5" aria-hidden />
              </div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-foreground">
                  {isVi ? "Hồ sơ tài trợ" : "Sponsorship Dossier"}
                </h3>
                <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
                  {isVi ? "Mùa 2026–2027" : "2026–2027"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-pretty">
                {isVi
                  ? "Xem hồ sơ đội: mục tiêu ngân sách, các hình thức hỗ trợ (tiền, hiện vật, chuyên môn) và cam kết minh bạch."
                  : "Read the team profile: budget targets, ways to support (cash, in-kind, expertise) and our transparency commitments."}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/profile"
                className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-primary/5 hover:border-primary/40 transition-colors min-h-[44px]"
              >
                <span>{isVi ? "Xem hồ sơ tài trợ" : "View Sponsorship Dossier"}</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5">
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            </div>
          </div>

          {/* Card 3: Direct Contact */}
          <div
            data-cta-card="true"
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 hover:shadow-glow-blue transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-accent border border-primary/20 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Mail className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {isVi ? "Hợp tác & Giao lưu" : "Outreach & Connect"}
              </h3>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-pretty">
                {isVi
                  ? "Dành cho các trường học, cố vấn STEM và doanh nghiệp muốn kết nối giao lưu hoặc tổ chức hoạt động trải nghiệm."
                  : "For schools, STEM mentors, and organizations looking to connect, scrimmage, or collaborate."}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/contact-us"
                className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-primary/5 hover:border-primary/40 transition-colors min-h-[44px]"
              >
                <span>{isVi ? "Liên hệ với đội" : "Contact the Team"}</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5">
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
