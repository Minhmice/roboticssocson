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
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-300 min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  
  const variants = {
    primary: "bg-cyan-500 text-slate-900 hover:bg-cyan-400 hover:shadow-[0_0_16px_rgba(34,211,238,0.5)] active:bg-cyan-600",
    secondary: "border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 active:bg-cyan-500/20",
    ghost: "text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300 active:bg-cyan-950/50",
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
        className
      )}
    >
      {content}
    </button>
  );
};

/**
 * Usage example:
 * 
 * <CTAButton 
 *   label="Trở thành Nhà Tài Trợ" 
 *   variant="primary"
 *   icon={Heart}
 *   onClick={() => console.log('Clicked')}
 * />
 */

