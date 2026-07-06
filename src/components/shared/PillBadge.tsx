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
    cyan: "bg-primary/10 text-primary",
    gray: "bg-muted text-muted-foreground",
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

