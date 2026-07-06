"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className={cn(
            `
            [--dark-gradient:repeating-linear-gradient(100deg,var(--background)_0%,var(--background)_7%,transparent_10%,transparent_12%,var(--background)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--primary)_10%,var(--chart-2)_15%,var(--chart-1)_20%,color-mix(in_srgb,var(--foreground)_82%,var(--primary)_18%)_25%,var(--primary)_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            absolute -inset-[10px] opacity-40 blur-[10px] will-change-transform
            after:absolute after:inset-0 after:content-[""] after:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-multiply after:opacity-40`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_70%)]`
          )}
        />
      </div>
      {children}
    </div>
  );
};
