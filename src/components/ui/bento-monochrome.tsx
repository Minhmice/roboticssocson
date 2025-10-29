import React, { useEffect, useRef, useState } from "react";
import {
  Aperture,
  BarChart3,
  LayoutGrid,
  Activity,
  Layers,
} from "lucide-react";

function FeaturesSectionMinimal() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "bento2-animations";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes bento2-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6%); }
      }
      @keyframes bento2-pulse {
        0%, 100% { transform: scale(1); opacity: 0.85; }
        50% { transform: scale(1.08); opacity: 1; }
      }
      @keyframes bento2-tilt {
        0% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
        100% { transform: rotate(-2deg); }
      }
      @keyframes bento2-drift {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(6%, -6%, 0); }
      }
      @keyframes bento2-glow {
        0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 0 rgba(0,0,0,0.4)); }
        50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(0,0,0,0.2)); }
      }
      @keyframes bento2-intro {
        0% { opacity: 0; transform: translate3d(0, 28px, 0); }
        100% { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      @keyframes bento2-card {
        0% { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.96); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "System Patterns",
      blurb:
        "Foundational blocks arranged with deliberate rhythm and precise spacing across the viewport grid.",
      meta: "Layout",
      icon: Aperture,
      animation: "bento2-float 6s ease-in-out infinite",
    },
    {
      title: "Signal Balance",
      blurb:
        "Monochrome surfaces and tight contrast ratios keep focus on intent over ornamentation.",
      meta: "Tone",
      icon: BarChart3,
      animation: "bento2-pulse 4s ease-in-out infinite",
    },
    {
      title: "Structured Flow",
      blurb:
        "Information passes through aligned channels for clarity, speed, and effortless scanning.",
      meta: "Flow",
      icon: LayoutGrid,
      animation: "bento2-tilt 5.5s ease-in-out infinite",
    },
    {
      title: "Clean Signals",
      blurb:
        "Each icon is drawn once, animated gently, and rendered strictly in strokes for a disciplined feel.",
      meta: "Craft",
      icon: Activity,
      animation: "bento2-drift 8s ease-in-out infinite",
    },
    {
      title: "Quiet Energy",
      blurb:
        "Subtle motion hints at responsiveness without ever distracting from the message conveyed.",
      meta: "Pulse",
      icon: Layers,
      animation: "bento2-glow 7s ease-in-out infinite",
    },
  ];

  const spans = [
    "md:col-span-4 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-3 md:row-span-1",
    "md:col-span-3 md:row-span-1",
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <div
          className="absolute inset-0 [--aurora-base:#040404] [--aurora-accent:rgba(59,130,246,0.15)]"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 12% 0%, var(--aurora-accent), transparent 65%), radial-gradient(ellipse 40% 80% at 88% 0%, rgba(148,163,184,0.1), transparent 70%), var(--aurora-base)",
          }}
        />
        <div
          className="absolute inset-0 [--grid-color:rgba(255,255,255,0.06)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            opacity: 0.9,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 [--edge-color:rgba(0,0,0,1)]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 55%, var(--edge-color) 100%)",
            filter: "blur(40px)",
            opacity: 0.75,
          }}
        />
      </div>

      <section
        ref={sectionRef}
        className={`relative mx-auto max-w-6xl px-6 py-20 motion-safe:opacity-0 ${
          sectionVisible
            ? "motion-safe:animate-[bento2-intro_0.9s_ease-out_forwards]"
            : ""
        }`}
      >
        <header className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.35em] text-white/40">
              Grid Studies
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Monochrome Bento
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-sm text-sm text-white/60 md:text-base">
              A stark layout built on modular spans, animated outlines, and
              purposeful whitespace.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 md:auto-rows-[minmax(120px,auto)] md:grid-cols-6">
          {features.map((feature, index) => (
            <BentoItem
              key={feature.title}
              span={spans[index]}
              feature={feature}
              index={index}
              isVisible={sectionVisible}
            />
          ))}
        </div>

        <footer className="mt-16 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/40">
          Quiet precision for expressive systems.
        </footer>
      </section>
    </div>
  );
}

function BentoItem({
  feature,
  span = "",
  index = 0,
  isVisible = false,
}: {
  feature: {
    title: string;
    blurb: string;
    meta?: string;
    icon: React.ComponentType<any>;
    animation: string;
  };
  span?: string;
  index?: number;
  isVisible?: boolean;
}) {
  const { icon: Icon, animation, title, blurb, meta } = feature;
  const gradientFill = "radial-gradient(ellipse 60% 120% at 12% 0%, rgba(59,130,246,0.24), transparent 72%)";
  const animationDelay = `${Math.max(index * 0.12, 0)}s`;

  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.55)] motion-safe:opacity-0 ${
        isVisible
          ? "motion-safe:animate-[bento2-card_0.8s_ease-out_forwards]"
          : ""
      } ${span}`}
      style={{ animationDelay }}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-white/8" />
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: gradientFill }}
        />
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10">
          <Icon
            className="h-7 w-7 text-white"
            strokeWidth={1.5}
            style={{ animation }}
          />
        </div>
        <div className="flex-1">
          <header className="flex items-start gap-3">
            <h3 className="text-base font-semibold uppercase tracking-wide text-white">
              {title}
            </h3>
            {meta && (
              <span className="ml-auto rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-white/60">
                {meta}
              </span>
            )}
          </header>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {blurb}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-2xl border border-white/10"
          style={{
            maskImage:
              "radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)",
            WebkitMaskImage:
              "radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)",
          }}
        />
      </div>
    </article>
  );
}

export default FeaturesSectionMinimal;
export { FeaturesSectionMinimal };
