"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";

export function HomeMarquee() {
  const { locale } = useLanguage();
  const isVi = locale === "vi";

  const items = isVi
    ? [
        "FIRST TECH CHALLENGE VIỆT NAM • ROBOT #33518",
        "THPT SÓC SƠN — HÀ NỘI",
        "THIẾT KẾ & GIA CÔNG CƠ KHÍ CHÍNH XÁC",
        "HỆ THỐNG THỊ GIÁC LIMELIGHT 3A",
        "GIẢI THƯỞNG TOP 4 TOÀN QUỐC",
        "LAN TỎA GIÁO DỤC STEAM CỘNG ĐỒNG",
        "TÀI TRỢ & ĐỒNG HÀNH MÙA GIẢI 2026–2027",
      ]
    : [
        "FIRST TECH CHALLENGE VIETNAM • ROBOT #33518",
        "SOC SON HIGH SCHOOL — HANOI",
        "PRECISION MECHANICAL FABRICATION",
        "LIMELIGHT 3A AUTONOMOUS VISION",
        "NATIONAL TOP 4 RANKING",
        "STEAM EDUCATION & COMMUNITY IMPACT",
        "SPONSORSHIP OPEN FOR 2026–2027",
      ];

  // Repeat for seamless infinite marquee loop
  const repeated = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-border/70 bg-muted/30 py-3 selection:bg-primary/20 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="flex w-max items-center gap-6 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {repeated.map((text, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-foreground/75"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-primary shrink-0 opacity-80" aria-hidden />
              <span>{text}</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-primary/40 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
