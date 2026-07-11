"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import {
  contactRowButtonResetClass,
  contactRowClass,
  contactRowFocusRingClass,
  contactRowLabelClass,
  contactRowLabelWrapClass,
  contactRowUnderlineClass,
  contactRowUnderlineTrackClass,
} from "@/components/shared/contactLinkStyles";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { cn } from "@/lib/utils";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export type CopyContactLinkVariant = "on-dark" | "footer" | "stacked";

export type CopyContactLinkProps = {
  kind: "email" | "phone";
  copyValue: string;
  display: React.ReactNode;
  variant?: CopyContactLinkVariant;
  className?: string;
  labelClassName?: string;
  rowHover?: boolean;
};

const variantStyles: Record<CopyContactLinkVariant, { root: string; label: string }> =
  {
    "on-dark": {
      root: "inline-flex w-fit max-w-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
      label:
        "font-medium leading-tight tracking-normal text-white no-underline",
    },
    stacked: {
      root: "",
      label: "",
    },
    footer: {
      root: "inline-flex w-full min-h-[44px] max-w-full items-center rounded-sm sm:min-h-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      label: "text-xs sm:text-sm text-muted-foreground no-underline",
    },
  };

export function CopyContactLink({
  kind,
  copyValue,
  display,
  variant = "footer",
  className,
  labelClassName,
  rowHover = false,
}: CopyContactLinkProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const styles = variantStyles[variant];
  const useStackedRow = variant === "stacked";
  const animateUnderline = rowHover && useStackedRow;

  const tooltipLabel = t("contact.clickToCopy");
  const copiedLabel = t("contact.copied");
  const ariaLabel =
    kind === "email" ? t("contact.copyEmail") : t("contact.copyPhone");

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(copyValue);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }, [copyValue]);

  const labelNode = (
    <span
      className={cn(
        "animate-contact-link-blink min-w-0",
        useStackedRow && rowHover && contactRowLabelClass,
        useStackedRow && !rowHover && "text-white",
        !useStackedRow && styles.label,
        copied && "text-primary",
        labelClassName,
      )}
    >
      {copied ? copiedLabel : display}
    </span>
  );

  const underlineNode = copied ? (
    <span className={cn(contactRowUnderlineClass, "h-0.5 bg-primary shadow-none")} />
  ) : animateUnderline ? (
    <motion.span
      className={contactRowUnderlineClass}
      initial={{ scaleX: 0, opacity: 0.6 }}
      animate={{ scaleX: 1, opacity: 0.9 }}
      transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.08 }}
    />
  ) : (
    <span className={contactRowUnderlineClass} />
  );

  const buttonInner = useStackedRow ? (
    <>
      <span className={cn(contactRowLabelWrapClass, "contact-row__label-wrap--plain")}>
        {labelNode}
      </span>
      <span className={contactRowUnderlineTrackClass} aria-hidden>
        {underlineNode}
      </span>
    </>
  ) : (
    labelNode
  );

  const buttonClass = cn(
    contactRowButtonResetClass,
    copied && "animate-contact-copy-pop",
    useStackedRow
      ? cn(contactRowClass, contactRowFocusRingClass)
      : styles.root,
    className,
  );

  return (
    <TooltipProvider delayDuration={520}>
      <Tooltip open={copied ? false : undefined}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => void handleCopy()}
            data-copied={copied ? "true" : undefined}
            className={buttonClass}
            aria-label={copied ? copiedLabel : ariaLabel}
          >
            {buttonInner}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          avoidCollisions
          className={cn(
            "contact-copy-tooltip",
            "!animate-none !fade-in-0 !zoom-in-100",
            "data-[state=closed]:!animate-none data-[state=closed]:!fade-out-0 data-[state=closed]:!zoom-out-100",
            "data-[side=right]:!slide-in-from-left-0",
          )}
        >
          {tooltipLabel}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
