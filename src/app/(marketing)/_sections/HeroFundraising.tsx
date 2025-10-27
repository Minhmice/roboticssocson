"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Users, Trophy } from "lucide-react";

export default function HeroFundraising() {
  const { locale } = useLanguage();

  const scrollToTiers = () => {
    const element = document.getElementById("sponsorship-tiers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBudget = () => {
    const element = document.getElementById("budget-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#0B1220]" />
      
      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-20 bg-cyan-500/20" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full blur-3xl opacity-15 bg-cyan-400/10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center min-h-screen py-24">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-sm">
            <Award className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">
              {locale === "vi" ? "Robotics Sóc Sơn • FIRST Tech Challenge" : "Robotics Soc Son • FIRST Tech Challenge"}
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-tight">
            {locale === "vi" 
              ? "Giúp chúng em chinh phục" 
              : "Help us conquer"}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              {locale === "vi" 
                ? "FIRST Tech Challenge 2024-2025" 
                : "FIRST Tech Challenge 2024-2025"}
            </span>
          </h1>

          {/* Subheadings */}
          <p className="text-xl md:text-2xl text-slate-300">
            {locale === "vi"
              ? "Đội Robotics Sóc Sơn cần $2,579 USD để thi đấu. Sự ủng hộ của bạn sẽ thay đổi 15 sinh viên."
              : "Robotics Soc Son needs $2,579 USD to compete. Your support will transform 15 students."}
          </p>
          <p className="text-base md:text-lg text-slate-500 italic">
            {locale === "vi"
              ? "We are a young but proven team, competing in FIRST Tech Challenge. Help us make it happen."
              : "Đội trẻ nhưng đã chứng minh tiềm năng. Giúp chúng em thực hiện ước mơ."}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-4 flex-wrap justify-center items-center">
            <CTAButton
              label={locale === "vi" ? "Tài trợ ngay" : "Become a Sponsor"}
              variant="primary"
              onClick={scrollToTiers}
              className="w-full sm:w-auto text-lg px-8 py-4"
              aria-label="Scroll to sponsorship tiers"
            />
            <CTAButton
              label={locale === "vi" ? "Xem ngân sách" : "View Budget"}
              variant="secondary"
              onClick={scrollToBudget}
              className="w-full sm:w-auto text-lg px-8 py-4"
              aria-label="Scroll to budget breakdown"
            />
          </div>

          {/* Stats mini */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
              <Award className="h-5 w-5 text-cyan-400" />
              <div className="text-left">
                <p className="text-2xl font-bold text-cyan-400">$2,579</p>
                <p className="text-xs text-slate-400">USD / 67M VND</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
              <Users className="h-5 w-5 text-cyan-400" />
              <div className="text-left">
                <p className="text-2xl font-bold text-cyan-400">15</p>
                <p className="text-xs text-slate-400">{locale === "vi" ? "học sinh" : "students"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
              <Trophy className="h-5 w-5 text-cyan-400" />
              <div className="text-left">
                <p className="text-2xl font-bold text-cyan-400">4</p>
                <p className="text-xs text-slate-400">{locale === "vi" ? "giải đấu" : "competitions"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

