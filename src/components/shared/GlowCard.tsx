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
        "group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300",
        hover &&
          "hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] hover:scale-[1.02] transition-all duration-300 ease-out",
        className,
      )}
    >
      {children}
    </div>
  );
};
