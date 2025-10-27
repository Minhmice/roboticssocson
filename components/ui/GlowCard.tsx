import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className,
  hover = true,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300",
        hover &&
          "shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:shadow-[0_0_20px_rgba(34,211,238,0.45)] hover:border-cyan-500/50",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Usage example:
 * 
 * <GlowCard>
 *   <p className="text-slate-300">Card content here</p>
 * </GlowCard>
 */

