"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ContactExperienceMeta } from "@/components/shared/ContactExperienceShell";
import { useBootAnimationReady } from "@/contexts/BootRevealContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  rest: { opacity: 1, y: 0, filter: "blur(0px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: easeOutExpo },
  },
};

const ruleGrow: Variants = {
  rest: { scaleX: 1, opacity: 1 },
  enter: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease: easeOutQuint, delay: 0.12 },
  },
};

const linkReveal: Variants = {
  rest: { opacity: 1, x: 0 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.62, ease: easeOutQuint },
  },
};

type ContactExperiencePanelProps = {
  title: string;
  showTitle?: boolean;
  email: string;
  emailLabel?: string;
  phone?: string;
  phoneLabel?: string;
  meta?: ContactExperienceMeta[];
  /** @deprecated use layout="register" */
  compactWhenStacked?: boolean;
  layout?: "default" | "register";
};

export function ContactExperiencePanel({
  title,
  showTitle = true,
  email,
  emailLabel,
  phone,
  phoneLabel,
  meta = [],
  compactWhenStacked = false,
  layout = compactWhenStacked ? "register" : "default",
}: ContactExperiencePanelProps) {
  const { locale } = useLanguage();
  const reduceMotion = useReducedMotion();
  const animationReady = useBootAnimationReady();
  const instant = Boolean(reduceMotion);
  const controls = useAnimationControls();
  const hasEnteredRef = useRef(false);
  const isRegister = layout === "register";

  useEffect(() => {
    if (instant) {
      controls.set({ opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }
    if (!animationReady) {
      hasEnteredRef.current = false;
      controls.set({ opacity: 1, y: 14, filter: "blur(4px)" });
      return;
    }
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;

    controls.set({ opacity: 1, y: 14, filter: "blur(4px)" });
    void controls.start({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.72, ease: easeOutExpo, delay: 0.12 },
    });
  }, [animationReady, controls, instant]);

  const titleWords = title.split(/\s+/).filter(Boolean);

  return (
    <motion.div
      className={cn(
        "relative flex w-full flex-col items-start",
        isRegister
          ? "max-w-none gap-2.5 lg:max-w-none lg:gap-3"
          : "max-w-184 gap-5 lg:w-[min(42em,92vw)]",
      )}
      initial={false}
      animate={controls}
    >
      {showTitle ? (
        <motion.h1
          className={cn(
            "pointer-events-none m-0 flex flex-wrap font-black text-balance text-white [text-shadow:0_2px_24px_rgba(15,23,42,0.35)]",
            isRegister
              ? "gap-x-[0.16em] gap-y-0 leading-[0.86] tracking-[-0.03em] lg:leading-[0.84]"
              : "gap-x-[0.22em] gap-y-0.5 leading-[0.98] tracking-tight",
            isRegister
              ? locale === "en"
                ? "max-w-[15ch] text-[clamp(2rem,5.5vw,3.5rem)] lg:max-w-[13ch] lg:text-[clamp(2.85rem,5.25vw,4.85rem)]"
                : "max-w-[11ch] text-[clamp(2rem,5.75vw,3.15rem)] lg:max-w-[11ch] lg:text-[clamp(2.9rem,5.5vw,5.1rem)]"
              : "max-w-[12ch] text-[clamp(3rem,8vw,5.85rem)] max-[991px]:max-w-[14ch] max-[991px]:text-[clamp(2.6rem,12vw,4rem)] max-[479px]:text-[clamp(2.35rem,13vw,3.2rem)]",
          )}
          variants={instant ? undefined : fadeUp}
          initial="rest"
          animate={instant ? undefined : animationReady ? "enter" : "rest"}
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={`${word}-${animationReady && !instant ? "in" : "rest"}-${index}`}
              className="inline-block whitespace-nowrap"
              initial={
                animationReady && !instant
                  ? { opacity: 1, y: 12, filter: "blur(4px)" }
                  : false
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: instant ? 0 : 0.68,
                delay: animationReady && !instant ? 0.06 + index * 0.09 : 0,
                ease: easeOutExpo,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      ) : null}

      <motion.div
        data-panel-rule
        className={cn(
          "h-px origin-left bg-gradient-to-r from-white/80 via-primary/70 to-transparent",
          isRegister ? "w-16 lg:w-[min(12rem,42vw)]" : "w-[min(12rem,42vw)]",
        )}
        variants={instant ? undefined : ruleGrow}
        initial="rest"
        animate={instant ? undefined : animationReady ? "enter" : "rest"}
        aria-hidden
      />

      <motion.div
        className={cn(
          "flex w-full flex-col gap-2",
          isRegister ? "lg:gap-3" : "gap-5 xl:flex-row xl:items-start xl:gap-[clamp(1.75rem,3.5vw,3rem)]",
        )}
        variants={instant ? undefined : fadeUp}
        initial="rest"
        animate={instant ? undefined : animationReady ? "enter" : "rest"}
      >
        <motion.a
          href={`mailto:${email}`}
          className="inline-flex w-fit flex-col items-start gap-0.5 rounded-sm no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          variants={instant ? undefined : linkReveal}
          initial="rest"
          animate={instant ? undefined : animationReady ? "enter" : "rest"}
        >
          <span
            className={cn(
              "font-medium leading-tight tracking-normal text-white transition-colors group-hover:text-blue-100",
              isRegister
                ? "text-[0.8125rem] lg:text-[clamp(0.88rem,1.2vw,1rem)]"
                : "text-[clamp(0.88rem,1.35vw,1.12rem)] max-[479px]:text-[0.82rem]",
            )}
          >
            {emailLabel ?? email}
          </span>
          <motion.span
            className="h-px w-full bg-white opacity-90 transition-[background-color,height] duration-200 group-hover:h-0.5 group-hover:bg-primary"
            initial={false}
            animate={{ scaleX: 1 }}
            transition={{
              duration: instant ? 0 : 0.75,
              delay: animationReady && !instant ? 0.28 : 0,
              ease: easeOutQuint,
            }}
            style={{ transformOrigin: "left center" }}
          />
        </motion.a>

        {phone ? (
          <motion.a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="inline-flex w-fit flex-col items-start gap-0.5 rounded-sm no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            variants={instant ? undefined : linkReveal}
            initial="rest"
            animate={instant ? undefined : animationReady ? "enter" : "rest"}
          >
            <span
              className={cn(
                "font-medium leading-tight tracking-normal text-white/95 transition-colors group-hover:text-blue-100",
                isRegister
                  ? "text-[0.8125rem] lg:text-[clamp(0.88rem,1.2vw,1rem)]"
                  : "text-[clamp(0.88rem,1.35vw,1.12rem)] max-[479px]:text-[0.82rem]",
              )}
            >
              {phoneLabel}
            </span>
            <motion.span
              className="h-px w-full bg-white/80 opacity-90 transition-[background-color,height] duration-200 group-hover:h-0.5 group-hover:bg-primary"
              initial={false}
              animate={{ scaleX: 1 }}
              transition={{
                duration: instant ? 0 : 0.75,
                delay: animationReady && !instant ? 0.4 : 0,
                ease: easeOutQuint,
              }}
              style={{ transformOrigin: "left center" }}
            />
          </motion.a>
        ) : null}
      </motion.div>

      {meta.length > 0 ? (
        <motion.div
          data-panel-meta
          className={cn(
            "pointer-events-auto flex w-full flex-col gap-1.5",
            isRegister
              ? "max-lg:hidden lg:max-w-[28ch] lg:pt-1"
              : "max-w-[28ch] xl:max-w-[22ch] xl:shrink-0 xl:pt-0.5",
          )}
          initial={false}
        >
          {meta.map((item, index) =>
            item.href ? (
              <motion.a
                key={item.label}
                href={item.href}
                className={cn(
                  "w-fit max-w-full rounded-sm border-b border-white/45 text-[clamp(0.78rem,1.1vw,0.9rem)] font-medium leading-snug tracking-normal text-pretty text-white no-underline transition-colors hover:border-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                )}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: instant ? 0 : 0.55,
                  delay: animationReady && !instant ? 0.32 + index * 0.08 : 0,
                  ease: easeOutQuint,
                }}
              >
                {item.label}
              </motion.a>
            ) : (
              <motion.p
                key={item.label}
                className="m-0 max-w-full text-[clamp(0.78rem,1.1vw,0.9rem)] font-medium leading-snug tracking-normal text-pretty text-white/90"
              >
                {item.label}
              </motion.p>
            ),
          )}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
