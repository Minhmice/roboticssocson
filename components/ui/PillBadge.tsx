import { cn } from "@/lib/utils";

interface PillBadgeProps {
  text: string;
  color?: "cyan" | "gray" | "gold";
  className?: string;
}

export const PillBadge: React.FC<PillBadgeProps> = ({
  text,
  color = "cyan",
  className,
}) => {
  const colorVariants = {
    cyan: "bg-cyan-950/50 text-cyan-400",
    gray: "bg-slate-800 text-slate-300",
    gold: "bg-yellow-950/50 text-yellow-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        colorVariants[color],
        className
      )}
    >
      {text}
    </span>
  );
};

/**
 * Usage example:
 * 
 * <PillBadge text="Top 4" color="cyan" />
 */

