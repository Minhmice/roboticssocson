"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Wrapper component that applies glass button animation effects
 * Reusable for any element that should animate on parent group hover
 */
export interface GlassAnimatedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassAnimated = React.forwardRef<
  HTMLDivElement,
  GlassAnimatedProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "glass-animated relative transition-all duration-500 ease-in-out",
        "group-hover:scale-[1.08] group-hover:shadow-[0_6px_24px_0_rgba(34,211,238,0.25),0_1.5px_4px_0_rgba(34,211,238,0.12)]",
        // Animate border of child elements when parent group is hovered
        "group-hover:[&>*]:border-cyan-500/50",
        className
      )}
      {...props}
    >
      {/* Glow effect shadow similar to glass-button-shadow */}
      <div className="glass-animated-shadow absolute inset-[-2px] -z-10 rounded-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 pointer-events-none bg-[radial-gradient(ellipse_60%_120%_at_12%_0%,rgba(34,211,238,0.3),transparent_72%)]" />
      {children}
    </div>
  );
});

GlassAnimated.displayName = "GlassAnimated";

