import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface PillBadgeProps {
  text: string;
  color?: "cyan" | "gray" | "gold";
  className?: string;
}

const colorToVariant: Record<
  NonNullable<PillBadgeProps["color"]>,
  VariantProps<typeof badgeVariants>["variant"]
> = {
  cyan: "default",
  gray: "secondary",
  gold: "outline",
};

export const PillBadge: React.FC<PillBadgeProps> = ({
  text,
  color = "cyan",
  className,
}) => {
  return (
    <Badge
      variant={colorToVariant[color]}
      className={cn(
        "rounded-full px-3 py-1 font-medium",
        color === "cyan" && "border-transparent bg-primary/10 text-primary hover:bg-primary/10",
        color === "gray" && "border-transparent",
        color === "gold" &&
          "border-transparent bg-amber-950/50 text-amber-300 hover:bg-amber-950/50",
        className,
      )}
    >
      {text}
    </Badge>
  );
};
