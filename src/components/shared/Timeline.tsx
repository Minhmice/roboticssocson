import { CheckCircle } from "lucide-react";
import { PillBadge } from "./PillBadge";

interface TimelineItem {
  year: string;
  title: string;
  description?: string;
  status?: "planned" | "done";
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={`relative ${className || ""}`}>
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:flex md:items-start md:gap-6 md:overflow-x-auto pb-8">
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 md:w-64">
            <div className="flex items-start gap-3">
              {/* Dot */}
              <div
                className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                  item.status === "done"
                    ? "border-primary bg-primary/10 shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                    : "border-border"
                }`}
              >
                {item.status === "done" && (
                  <CheckCircle className="h-6 w-6 text-primary" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <PillBadge text={item.year} color="cyan" />
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector line */}
            {index < items.length - 1 && (
              <div className="absolute left-6 top-12 h-px w-full bg-gradient-to-r from-primary/40 to-transparent md:w-64" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical layout */}
      <div className="md:hidden">
        {items.map((item, index) => (
          <div key={index} className="relative pb-8 pl-8">
            {/* Vertical line */}
            {index < items.length - 1 && (
              <div className="absolute left-3 top-12 h-full w-px bg-gradient-to-b from-primary/40 to-transparent" />
            )}

            {/* Dot */}
            <div
              className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                item.status === "done"
                  ? "border-primary bg-primary/10 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                  : "border-border bg-muted"
              }`}
            >
              {item.status === "done" && (
                <CheckCircle className="h-4 w-4 text-primary" />
              )}
            </div>

            {/* Content */}
            <div>
              <PillBadge text={item.year} color="cyan" />
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Usage example:
 * 
 * <Timeline items={[
 *   { year: "2024", title: "Top 4 VRC", description: "66 teams", status: "done" },
 *   { year: "2025", title: "Motions In Fire", status: "done" },
 * ]} />
 */

