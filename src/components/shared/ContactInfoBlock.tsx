"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CopyContactLink } from "@/components/shared/CopyContactLink";
import {
  contactRowArrowClass,
  contactRowClass,
  contactRowFocusRingClass,
  contactRowLabelClass,
  contactRowLabelWrapClass,
  contactRowUnderlineClass,
  contactRowUnderlineTrackClass,
} from "@/components/shared/contactLinkStyles";
import {
  contactLeadName,
  contactPhone,
  messengerUrl,
  sponsorEmail,
  socials,
} from "@/data/settings";
import { cn } from "@/lib/utils";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const labelClass =
  "text-[clamp(0.88rem,1.35vw,1.12rem)] font-medium uppercase tracking-[0.06em] leading-snug max-[479px]:text-[0.82rem] md:text-[clamp(0.95rem,1.4vw,1.2rem)] lg:text-[clamp(1rem,1.45vw,1.35rem)]";

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.42,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOutExpo },
  },
};

function ContactLine({
  href,
  label,
  external,
  animateUnderline,
  rowHover,
}: {
  href?: string;
  label: string;
  external?: boolean;
  animateUnderline?: boolean;
  rowHover?: boolean;
}) {
  const labelNode = (
    <span
      className={cn(
        labelClass,
        rowHover ? contactRowLabelClass : "text-white/95",
      )}
    >
      {label}
    </span>
  );

  const underlineNode = animateUnderline ? (
    <motion.span
      className={contactRowUnderlineClass}
      initial={{ scaleX: 0, opacity: 0.6 }}
      animate={{ scaleX: 1, opacity: 0.9 }}
      transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.08 }}
    />
  ) : (
    <span className={contactRowUnderlineClass} />
  );

  const shellClass = cn(
    contactRowClass,
    contactRowFocusRingClass,
    rowHover && "contact-row--interactive",
  );

  if (!href) {
    if (!rowHover) {
      return (
        <p className="m-0">
          {labelNode}
          <span className="mt-1 block h-px w-full max-w-[min(100%,28ch)] origin-left bg-white/45 md:max-w-[min(100%,32ch)] lg:max-w-[min(100%,36ch)]" />
        </p>
      );
    }

    return (
      <div className={shellClass}>
        {labelNode}
        <span className={contactRowUnderlineTrackClass} aria-hidden>
          {underlineNode}
        </span>
      </div>
    );
  }

  return (
    <a
      href={href}
      className={shellClass}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className={contactRowLabelWrapClass}>
        {labelNode}
        <span className={contactRowArrowClass} aria-hidden>
          →
        </span>
      </span>
      <span className={contactRowUnderlineTrackClass} aria-hidden>
        {underlineNode}
      </span>
    </a>
  );
}

const copy = {
  section: {
    vi: { line1: "Thông tin", line2: "liên hệ" },
    en: { line1: "Contact", line2: "information" },
  },
  phone: {
    vi: `${contactPhone} — ${contactLeadName} (Zalo)`,
    en: `${contactPhone} — ${contactLeadName} (Zalo available)`,
  },
  facebook: {
    vi: "facebook.com/roboticssocson",
    en: "facebook.com/roboticssocson",
  },
  messenger: { vi: "Nhắn Messenger", en: "Message on Messenger" },
  location: {
    vi: "THPT Sóc Sơn, Hà Nội",
    en: "Soc Son High School, Hanoi",
  },
} as const;

const titleClassName =
  "m-0 font-black leading-[0.92] tracking-[-0.03em] text-white [text-shadow:0_2px_24px_rgba(15,23,42,0.35)] text-[clamp(2.75rem,11vw,4.25rem)] max-[479px]:text-[clamp(2.35rem,12vw,3.5rem)] md:text-[clamp(3.75rem,9vw,5.75rem)] lg:text-[clamp(4.5rem,7.5vw,6rem)]";

const lines = (locale: "vi" | "en") =>
  [
    {
      kind: "email" as const,
      copyValue: sponsorEmail,
      label: sponsorEmail,
    },
    {
      kind: "phone" as const,
      copyValue: contactPhone,
      label: copy.phone[locale],
    },
    { href: socials.facebook, label: copy.facebook[locale], external: true },
    { href: messengerUrl, label: copy.messenger[locale], external: true },
    { label: copy.location[locale] },
  ] as const;

export function ContactInfoBlock({ locale }: { locale: "vi" | "en" }) {
  const reduceMotion = useReducedMotion();
  const items = lines(locale);
  const title = copy.section[locale];

  const TitleTag = reduceMotion ? "h1" : motion.h1;
  const ListTag = reduceMotion ? "div" : motion.div;
  const LineWrap = reduceMotion ? "div" : motion.div;

  const titleMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.58, ease: easeOutExpo },
      };

  const listMotion = reduceMotion
    ? {}
    : {
        variants: listVariants,
        initial: "hidden",
        animate: "show",
      };

  return (
    <div className="pointer-events-auto flex w-full max-w-[min(100%,38em)] flex-col items-start gap-5 sm:gap-6 md:max-w-[min(100%,46em)] md:gap-7 lg:max-w-[min(100%,54em)] lg:gap-8 xl:max-w-[min(100%,60em)] xl:gap-9">
      <TitleTag {...titleMotion} className={titleClassName}>
        <span className="block text-balance">{title.line1}</span>
        <span className="block text-balance">{title.line2}</span>
      </TitleTag>

      <ListTag
        {...listMotion}
        className="flex w-full flex-col items-start gap-4 sm:gap-5 md:gap-5 lg:gap-6"
      >
        {items.map((item) => (
          <LineWrap
            key={"kind" in item ? item.kind : item.label}
            {...(reduceMotion ? {} : { variants: lineVariants })}
            className="w-full"
          >
            {"kind" in item ? (
              <CopyContactLink
                kind={item.kind}
                copyValue={item.copyValue}
                variant="stacked"
                display={item.label}
                labelClassName={labelClass}
                rowHover={!reduceMotion}
              />
            ) : (
              <ContactLine
                href={"href" in item ? item.href : undefined}
                label={item.label}
                external={"external" in item ? item.external : undefined}
                animateUnderline={!reduceMotion}
                rowHover={!reduceMotion}
              />
            )}
          </LineWrap>
        ))}
      </ListTag>
    </div>
  );
}
