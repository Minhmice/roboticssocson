"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  /** When false, hero sections can size to content instead of forcing viewport height. */
  fillViewport?: boolean;
  /** Stronger, faster aurora for course/marketing heroes. */
  intensity?: "default" | "vivid";
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  fillViewport = true,
  intensity = "default",
  ...props
}: AuroraBackgroundProps) => {
  const vivid = intensity === "vivid";

  return (
    <div
      className={cn(
        "relative isolate flex flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors",
        fillViewport ? "min-h-screen" : "min-h-0",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className={cn(
            "aurora-layer",
            `
            [--dark-gradient:repeating-linear-gradient(100deg,var(--background)_0%,var(--background)_7%,transparent_10%,transparent_12%,var(--background)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--primary)_10%,var(--chart-2)_15%,var(--chart-1)_20%,color-mix(in_srgb,var(--foreground)_82%,var(--primary)_18%)_25%,var(--primary)_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            absolute -inset-[10px]
            after:absolute after:inset-0 after:content-[""] after:[background-image:var(--dark-gradient),var(--aurora)]`,
            vivid
              ? "opacity-60 blur-[4px] animate-aurora-fast after:[background-size:220%,_120%] after:animate-aurora-fast after:mix-blend-normal after:opacity-55"
              : "opacity-40 blur-[6px] after:[background-size:200%,_100%] after:animate-aurora after:mix-blend-multiply after:opacity-40",

            showRadialGradient &&
              (vivid
                ? "[mask-image:radial-gradient(ellipse_95%_85%_at_50%_42%,black_22%,transparent_88%)]"
                : "[mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_70%)]"),
          )}
        />
        {vivid ? (
          <div
            className="aurora-layer course-aurora-sweep absolute -inset-[20px] opacity-35 blur-[2px] motion-reduce:opacity-0"
            aria-hidden
          />
        ) : null}
      </div>
      {children}
    </div>
  );
};
