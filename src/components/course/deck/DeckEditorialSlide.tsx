"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { McuFlowDiagram } from "@/components/course/deck/diagrams/McuFlowDiagram";
import type { LayoutRenderContext } from "@/components/course/deck/DeckSlideLayouts";
import { deckImageReveal, deckRevealTransform } from "@/components/course/deck/deck-motion";
import { deckBulletList, deckType } from "@/components/course/deck/deck-typography";
import { getLocalized, type LocalizedText } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";

type DeckEditorialSlideProps = {
  ctx: LayoutRenderContext;
  imageSide: "left" | "right";
};

const SLIDE_4_BULLETS: LocalizedText[] = [
  {
    vi: "Tiếp nhận dữ liệu từ môi trường",
    en: "Receives data from the environment",
  },
  {
    vi: "Xử lý khoảng cách, màu sắc và góc nghiêng",
    en: "Processes distance, color, and tilt angle",
  },
  {
    vi: "Điều khiển động cơ, servo và cơ cấu chấp hành",
    en: "Controls motors, servos, and actuators",
  },
];

function altOf(ctx: LayoutRenderContext, i = 0) {
  return (
    ctx.slide.mediaAlt?.[i] ?? {
      vi: "Hình minh họa",
      en: "Illustration",
    }
  );
}

export function DeckEditorialSlide({ ctx, imageSide }: DeckEditorialSlideProps) {
  const { slide, title, section, subtitle, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const isSlide3 = slide.id === 3;
  const isSlide4 = slide.id === 4;
  const bullets = isSlide4 ? SLIDE_4_BULLETS : slide.bullets;
  const bulletStartIndex = section ? 2 : 1;
  const imageDelayIndex = bulletStartIndex + (bullets?.length ?? 0);
  const imageReveal = deckImageReveal(imageSide, imageDelayIndex);

  const src = mediaSources[0];
  const imageLabel = getLocalized(altOf(ctx), locale);

  const textColumn = (
    <div
      className={cn(
        "relative flex min-h-0 flex-col",
        isSlide4 ? "col-span-12 md:col-span-5" : "",
        isSlide3 ? "max-w-[36rem] md:pr-2" : isSlide4 ? "max-w-none" : "max-w-3xl",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-[-8%] w-[120%]",
          imageSide === "right" ? "-left-[10%]" : "-right-[10%]",
          "bg-[radial-gradient(ellipse_65%_55%_at_35%_50%,rgba(37,99,235,0.08),transparent_72%)]",
        )}
        aria-hidden
      />

      <div className="relative flex flex-col">
        {section ? (
          <motion.div
            className={cn(isSlide4 ? "mb-0" : "mb-3 md:mb-4")}
            custom={0}
            variants={deckRevealTransform}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <span className={deckType.chip}>{section}</span>
          </motion.div>
        ) : null}

        <motion.h2
          className={cn(
            isSlide4
              ? "max-w-[14ch] text-balance text-[clamp(3.625rem,5.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground"
              : deckType.heading,
            isSlide3 ? "max-w-[17ch] text-balance" : !isSlide4 && "max-w-[20ch]",
          )}
          custom={section ? 1 : 0}
          variants={deckRevealTransform}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {title}
        </motion.h2>

        {subtitle ? (
          <motion.p
            className={cn("mt-3", deckType.subhead)}
            custom={section ? 2 : 1}
            variants={deckRevealTransform}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {subtitle}
          </motion.p>
        ) : null}

        {bullets ? (
          <ul
            className={cn(
              isSlide4
                ? "mt-6 max-w-[22ch] space-y-[clamp(1.5rem,2.4vw,1.875rem)] text-[clamp(1.875rem,3.2vw,2.125rem)] font-medium leading-[1.35] text-foreground md:mt-7"
                : deckBulletList(true),
              isSlide3 ? "mt-7 md:mt-9" : !isSlide4 && "mt-5 md:mt-6",
              isSlide3 && "max-w-[34ch]",
            )}
          >
            {bullets.map((item, i) => {
              const text = getLocalized(item, locale);
              return (
                <motion.li
                  key={text}
                  className={cn(
                    "flex gap-4",
                    isSlide4 ? "items-baseline" : "gap-3.5",
                  )}
                  custom={bulletStartIndex + i}
                  variants={deckRevealTransform}
                  initial={reduced ? false : "hidden"}
                  animate="show"
                >
                  <span
                    className={cn(
                      "shrink-0 rounded-full bg-primary",
                      isSlide4 ? "size-3 translate-y-[0.35em] shadow-[0_0_0_3px_rgba(37,99,235,0.15)]" : "mt-[0.65em] size-2",
                    )}
                  />
                  <span className="text-pretty">{text}</span>
                </motion.li>
              );
            })}
          </ul>
        ) : null}

        {slide.notes ? (
          <motion.p
            className={cn("mt-5", deckType.caption)}
            custom={imageDelayIndex}
            variants={deckRevealTransform}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {getLocalized(slide.notes, locale)}
          </motion.p>
        ) : null}
      </div>
    </div>
  );

  const imageColumn = isSlide4 ? (
    <motion.div
      className="relative col-span-12 min-h-0 md:col-span-7 md:h-full"
      variants={imageReveal}
      initial={reduced ? false : "hidden"}
      animate="show"
    >
      <McuFlowDiagram className="h-full w-full" />
    </motion.div>
  ) : (
    <motion.div
      className={cn(
        "relative min-h-[180px] md:min-h-0 md:h-full",
        isSlide3 && imageSide === "right" && "md:pl-1",
      )}
      variants={imageReveal}
      initial={reduced ? false : "hidden"}
      animate="show"
    >
      {!src ? (
        <div className="flex h-full min-h-[180px] items-center justify-center rounded-2xl border border-border bg-muted/40 md:min-h-0">
          <span className={cn(deckType.caption, "px-4 text-center")}>{imageLabel}</span>
        </div>
      ) : (
        <div
          className={cn(
            "relative h-full min-h-[180px] overflow-hidden rounded-2xl border border-border shadow-[0_12px_40px_rgba(15,23,42,0.08)] md:min-h-0",
            isSlide3 && "md:rounded-[1.125rem]",
          )}
        >
          <MediaPlaceholder
            type="image"
            src={src}
            alt={imageLabel}
            className="h-full min-h-full bg-muted"
            sizes="(max-width: 768px) 90vw, 44vw"
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              imageSide === "right"
                ? "bg-gradient-to-l from-background/10 via-transparent to-transparent"
                : "bg-gradient-to-r from-background/10 via-transparent to-transparent",
            )}
            aria-hidden
          />
        </div>
      )}
    </motion.div>
  );

  if (isSlide4) {
    return (
      <div
        className="flex h-full min-h-0 items-center"
        data-deck-fm-scope
        data-testid="deck-slide-4-layout"
      >
        <div className="grid w-full grid-cols-12 items-start gap-y-6 gap-x-10 lg:gap-x-12">
          {imageSide === "left" ? imageColumn : textColumn}
          {imageSide === "left" ? textColumn : imageColumn}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid h-full min-h-0 items-center",
        isSlide3
          ? "gap-6 md:gap-8 lg:gap-10"
          : "gap-5 md:gap-6",
        imageSide === "right"
          ? isSlide3
            ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)]"
            : "md:grid-cols-[1fr_1.12fr]"
          : "md:grid-cols-[1.12fr_1fr]",
      )}
      data-deck-fm-scope
    >
      {imageSide === "left" ? imageColumn : textColumn}
      {imageSide === "left" ? textColumn : imageColumn}
    </div>
  );
}
