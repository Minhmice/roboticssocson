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
        className,
      )}
    >
      {badge && (
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
