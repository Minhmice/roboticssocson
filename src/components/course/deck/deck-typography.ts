/** Presentation typography — projector-readable scale */

export const deckType = {
  display:
    "text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.04] tracking-[-0.035em] text-foreground",
  title:
    "text-balance text-[clamp(2.25rem,5.2vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.03em] text-foreground",
  heading:
    "text-balance text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground",
  subhead: "text-pretty text-2xl leading-relaxed text-foreground/85 md:text-3xl lg:text-[2.125rem]",
  body: "text-xl leading-relaxed text-foreground/90 md:text-2xl lg:text-[1.75rem]",
  bodyLg: "text-2xl leading-relaxed text-foreground/90 md:text-[1.75rem] lg:text-[2rem]",
  caption: "text-lg leading-snug text-foreground/75 md:text-xl lg:text-2xl",
  counter:
    "font-mono text-base tabular-nums tracking-wide text-foreground/80 md:text-lg lg:text-xl",
  label: "text-lg font-semibold text-primary md:text-2xl",
  mono: "font-mono text-xl leading-relaxed text-foreground/90 md:text-2xl",
  chip: "inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-base font-semibold text-primary md:text-lg",
} as const;

export const deckBulletList = (large = false) =>
  large
    ? "mt-4 max-w-3xl space-y-3.5 text-2xl leading-relaxed text-foreground/90 md:text-[1.75rem] lg:text-[2rem]"
    : "mt-3 max-w-3xl space-y-3 text-xl leading-relaxed text-foreground/90 md:text-2xl";
