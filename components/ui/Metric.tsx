import { LucideIcon } from "lucide-react";

interface MetricProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export const Metric: React.FC<MetricProps> = ({
  value,
  label,
  icon: Icon,
  className,
}) => {
  return (
    <div className={`text-center ${className || ""}`}>
      {Icon && (
        <div className="mb-3 flex justify-center">
          <Icon className="h-8 w-8 text-cyan-500" />
        </div>
      )}
      <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-cyan-500">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-slate-400">{label}</div>
    </div>
  );
};

/**
 * Usage example:
 * 
 * <Metric 
 *   value="4" 
 *   label="Top Rankings" 
 *   icon={Trophy}
 * />
 */

