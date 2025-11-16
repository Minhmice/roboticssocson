import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  align = "center",
  className,
}) => {
  return (
    <div
      className={cn(
        "py-8 md:py-12",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-block rounded-full bg-cyan-950/50 px-3 py-1 text-xs font-medium text-cyan-400 mb-4">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl text-slate-400 max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * Usage example:
 * 
 * <SectionHeader 
 *   title="Thành Tích" 
 *   subtitle="Những dấu ấn của đội qua các mùa giải"
 *   badge="Achievements"
 *   align="center"
 * />
 */

