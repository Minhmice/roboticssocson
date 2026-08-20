"use client";

import type { LucideIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  isInternalAppPath,
  requestBootNavigation,
} from "@/lib/boot-navigation";
import { captureEvent } from "@/lib/posthog/client";
import { AnalyticsEvents } from "@/lib/posthog/events";
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
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | boolean;
}

const ctaVariantMap = {
  primary: "default",
  secondary: "outline",
  ghost: "ghost",
} as const;

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
  "aria-current": ariaCurrent,
}) => {
  const brandClass = cn(
    buttonVariants({
      variant: ctaVariantMap[variant],
      size: "lg",
    }),
    "min-h-11 rounded-xl px-6 py-3 font-medium transition-all duration-300",
    variant === "primary" &&
      "hover:shadow-glow-blue",
    variant === "secondary" &&
      "border-2 border-primary bg-transparent text-primary hover:bg-primary/5 hover:text-primary",
    variant === "ghost" && "text-primary hover:bg-accent hover:text-primary",
    className,
  );

  const content = (
    <span className="flex items-center justify-center gap-2">
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      <span>{label}</span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-current={ariaCurrent}
        className={brandClass}
        onClick={(e) => {
          captureEvent(AnalyticsEvents.CTA_CLICKED, {
            label,
            href,
            variant,
            surface:
              typeof window !== "undefined" ? window.location.pathname : undefined,
          });
          onClick?.(e);
          if (e.defaultPrevented) return;
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          if (target && target !== "_self") return;
          if (!isInternalAppPath(href)) return;
          if (requestBootNavigation(href)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <Button
      type={type}
      disabled={disabled}
      className={brandClass}
      onClick={(e) => {
        captureEvent(AnalyticsEvents.CTA_CLICKED, {
          label,
          variant,
          surface:
            typeof window !== "undefined" ? window.location.pathname : undefined,
        });
        onClick?.(e);
      }}
    >
      {content}
    </Button>
  );
};
