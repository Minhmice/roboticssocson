import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  label,
  variant = "primary",
  icon: Icon,
  href,
  onClick,
  className,
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-300";
  
  const variants = {
    primary: "bg-cyan-500 text-slate-900 hover:bg-cyan-400 hover:shadow-[0_0_16px_rgba(34,211,238,0.5)] focus:ring-2 focus:ring-cyan-500",
    secondary: "border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 focus:ring-2 focus:ring-cyan-500",
    ghost: "text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300 focus:ring-2 focus:ring-cyan-500",
  };

  const content = (
    <span className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
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
      className={cn(baseStyles, variants[variant], className)}
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

