import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  href?: string;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  label,
  variant = "primary",
  icon: Icon,
  href,
  onClick,
  className,
  type = "button",
  disabled = false,
  target,
  rel,
}) => {
  const baseStyles =
    "px-6 py-3 rounded-xl font-medium transition-all duration-300 min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_4px_14px_rgba(37,99,235,0.25)] active:bg-primary/95",
    secondary:
      "border-2 border-primary text-primary hover:bg-primary/5 hover:border-primary/80 active:bg-primary/10",
    ghost: "text-primary hover:bg-accent hover:text-primary active:bg-accent/80",
  };

  const content = (
    <span className="flex items-center justify-center gap-2">
      {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
      <span>{label}</span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={cn(baseStyles, variants[variant], className)}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {content}
    </button>
  );
}