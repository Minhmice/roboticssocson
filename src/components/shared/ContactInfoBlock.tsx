"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  contactLeadName,
  contactPhone,
  messengerUrl,
  sponsorEmail,
  socials,
} from "@/data/settings";
import { cn } from "@/lib/utils";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const linkClass =
  "inline-flex w-fit max-w-full flex-col items-start gap-0.5 no-underline group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
const labelClass =
  "text-[clamp(0.88rem,1.35vw,1.12rem)] font-medium uppercase tracking-[0.06em] leading-snug text-white max-[479px]:text-[0.82rem]";
const underlineClass =
  "h-px w-full origin-left bg-white opacity-90 transition-[background-color,height] duration-200 group-hover:h-0.5 group-hover:bg-primary";

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
}: {
  href?: string;
  label: string;
  external?: boolean;
  animateUnderline?: boolean;
}) {
  const Underline = animateUnderline ? motion.span : "span";
  const underlineMotion = animateUnderline
    ? {
        initial: { scaleX: 0, opacity: 0.6 },
        animate: { scaleX: 1, opacity: 0.9 },
        transition: { duration: 0.38, ease: easeOutExpo, delay: 0.08 },
      }
    : {};

  if (!href) {
    return (
      <p className="m-0">
        <span className={cn(labelClass, "text-white/95")}>{label}</span>
        <Underline
          className="mt-1 block h-px w-full max-w-[min(100%,28ch)] origin-left bg-white/45"
          {...underlineMotion}
        />
      </p>
    );
  }

  return (
    <a
      href={href}
      className={linkClass}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className={labelClass}>{label}</span>
      <Underline className={underlineClass} {...underlineMotion} />
    </a>
  );
}

const copy = {
  section: { vi: "Thông tin liên hệ", en: "Contact information" },
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

const lines = (locale: "vi" | "en") =>
  [
    { href: `mailto:${sponsorEmail}`, label: sponsorEmail },
    { href: `tel:${contactPhone}`, label: copy.phone[locale] },
    { href: socials.facebook, label: copy.facebook[locale], external: true },
    { href: messengerUrl, label: copy.messenger[locale], external: true },
    { label: copy.location[locale] },
  ] as const;

export function ContactInfoBlock({ locale }: { locale: "vi" | "en" }) {
  const reduceMotion = useReducedMotion();
  const items = lines(locale);

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
    <div className="pointer-events-auto flex w-full max-w-[min(100%,38em)] flex-col items-start gap-5 sm:gap-6">
      <TitleTag
        {...titleMotion}
        className="m-0 text-balance text-[clamp(3rem,8vw,5.85rem)] font-black leading-[0.98] tracking-tight text-white [text-shadow:0_2px_24px_rgba(15,23,42,0.35)] max-[991px]:text-[clamp(2.6rem,12vw,4rem)] max-[479px]:text-[clamp(2.35rem,13vw,3.2rem)]"
      >
        {copy.section[locale]}
      </TitleTag>

      <ListTag
        {...listMotion}
        className="flex w-full flex-col items-start gap-4 sm:gap-5"
      >
        {items.map((item) => (
          <LineWrap
            key={item.label}
            {...(reduceMotion ? {} : { variants: lineVariants })}
            className="w-full"
          >
            <ContactLine
              href={"href" in item ? item.href : undefined}
              label={item.label}
              external={"external" in item ? item.external : undefined}
              animateUnderline={!reduceMotion}
            />
          </LineWrap>
        ))}
      </ListTag>
    </div>
  );
}
