"use client";

import * as React from "react";
import { useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/**
 * Progress bar component with label text displayed in the middle of the filled portion
 * Animates progress value when scrolled into view
 */
export interface ProgressWithLabelProps
  extends React.ComponentPropsWithoutRef<typeof Progress> {
  label: string;
  showAmount?: boolean;
  amount?: number;
  currency?: "USD" | "VND";
  animateOnScroll?: boolean; // Enable/disable scroll animation
}

export const ProgressWithLabel = React.forwardRef<
  React.ElementRef<typeof Progress>,
  ProgressWithLabelProps
>(({ label, showAmount, amount, currency = "USD", className, value, animateOnScroll = true, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: false, // Allow animation on scroll back
    margin: "0px 0px -50px 0px",
    amount: 0.3,
  });

  // Animated value using Framer Motion
  const targetValue = value || 0;
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
  });

  // Update animated value based on scroll
  React.useEffect(() => {
    if (animateOnScroll) {
      if (isInView) {
        motionValue.set(targetValue);
      } else {
        motionValue.set(0);
      }
    } else {
      motionValue.set(targetValue);
    }
  }, [isInView, targetValue, motionValue, animateOnScroll]);

  // Get current animated percentage
  const [animatedPercentage, setAnimatedPercentage] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setAnimatedPercentage(latest);
    });
    return unsubscribe;
  }, [springValue]);

  const hasContent = animatedPercentage > 5; // Only show label if progress is > 5%

  return (
    <div ref={containerRef} className="relative w-full">
      <Progress ref={ref} value={animatedPercentage} className={cn("relative", className)} {...props} />
      {hasContent && (
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center pointer-events-none z-10"
          style={{
            width: `${Math.max(animatedPercentage, 15)}%`, // Minimum width for text visibility
          }}
        >
          <span className="text-[10px] sm:text-xs font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap px-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            {label}
            {showAmount && amount !== undefined && (
              <>
                {" "}
                {currency === "USD"
                  ? `$${amount.toLocaleString("en-US")}`
                  : `${amount.toLocaleString("vi-VN")} đ`}
              </>
            )}
          </span>
        </div>
      )}
    </div>
  );
});

ProgressWithLabel.displayName = "ProgressWithLabel";

