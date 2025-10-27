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
        highlight && "border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:scale-105",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-slate-100">{tier}</h3>
          {highlight && (
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
              Popular
            </span>
          )}
        </div>

        {price && (
          <div className="mb-6">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-cyan-500">
              {price}
            </div>
          </div>
        )}

        <ul className="flex-1 space-y-3 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-500" />
              <span className="text-sm text-slate-300">{benefit}</span>
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

