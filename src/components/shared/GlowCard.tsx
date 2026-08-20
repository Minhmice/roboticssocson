import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
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
    <Card
      className={cn(
        "rounded-2xl border-border bg-card p-6 shadow-sm transition-all duration-300",
        hover &&
          "hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)]",
        className,
      )}
    >
      {children}
    </Card>
  );
};
