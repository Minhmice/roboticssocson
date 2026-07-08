import { Check } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { GlowCard } from "./GlowCard";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  tier: string;
  highlight?: boolean;
  benefits: string[];
  ctaLabel?: string;
  price?: string;
  className?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  tier,
  highlight = false,
  benefits,
  ctaLabel = "Discuss",
  price,
  className,
}) => {
  return (
    <GlowCard
      className={cn(
        "h-full transition-all duration-300",
        highlight && "border-primary/40 shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:scale-105",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-foreground">{tier}</h3>
          {highlight && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Popular
            </span>
          )}
        </div>

        {price && (
          <div className="mb-6">
            <div className="text-3xl font-bold text-primary">
              {price}
            </div>
          </div>
        )}

        <ul className="flex-1 space-y-3 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>

        <CTAButton
          label={ctaLabel}
          variant={highlight ? "primary" : "secondary"}
        />
      </div>
    </GlowCard>
  );
};

/**
 * Usage example:
 * 
 * <PackageCard 
 *   tier="Gold"
 *   price="$1,000 - $2,000"
 *   highlight
 *   benefits={["Logo on robot", "Social media posts", "Event mentions"]}
 * />
 */

