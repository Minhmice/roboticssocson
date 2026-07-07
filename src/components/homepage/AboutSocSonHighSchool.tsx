"use client";

import Image from "next/image";
import { GraduationCap } from "lucide-react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_QUART },
  },
};

const galleryItem: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASE_OUT_QUART,
      delay: index * 0.07,
    },
  }),
};

const galleryImagesData = [
  {
    src: "/Images/About SocSonHighschool/Image (1).webp",
    caption_vi: "Khuôn viên trường THPT Sóc Sơn",
    caption_en: "Sóc Sơn High School Campus",
  },
  {
    src: "/Images/About SocSonHighschool/Image (2).webp",
    caption_vi: "Hoạt động ngoại khóa của học sinh",
    caption_en: "Student Extracurricular Activities",
  },
  {
    src: "/Images/About SocSonHighschool/Image (3).webp",
    caption_vi: "Không gian học tập hiện đại",
    caption_en: "Modern Learning Environment",
  },
  {
    src: "/Images/About SocSonHighschool/Image (4).webp",
    caption_vi: "Sự kiện truyền thống của trường",
    caption_en: "School Traditional Events",
  },
];

const logoImageData = {
  src: "/Images/About SocSonHighschool/Logo SocSonHighschool.webp",
  caption_vi: "Logo Trường THPT Sóc Sơn",
  caption_en: "Sóc Sơn High School Logo",
};

const contentData = {
  title_vi: "Trường THPT Sóc Sơn",
  title_en: "Sóc Sơn High School",
  titleHighlight_vi: "Sóc Sơn",
  titleHighlight_en: "Sóc Sơn",
  subtitle_vi: "Ngôi trường đồng hành và nuôi dưỡng những giấc mơ công nghệ",
  subtitle_en: "The school that accompanies and nurtures technology dreams",
  subtitleHighlight_vi: "giấc mơ công nghệ",
  subtitleHighlight_en: "technology dreams",
  badge_vi: "Giới thiệu",
  badge_en: "School Introduction",
  heritage_vi: "Thành lập năm 1984 · Hơn 40 năm đồng hành cùng học sinh",
  heritage_en: "Established 1984 · Over 40 years nurturing students",
  description_vi: [
    "Robotics Sóc Sơn là đội thi đến từ Trường Trung học Phổ thông Sóc Sơn, ngôi trường có bề dày hơn 40 năm xây dựng và phát triển tại huyện Sóc Sơn (cũ), thành phố Hà Nội.",
    "Trường được thành lập từ năm 1984, là một trong những đơn vị giáo dục tiêu biểu của khu vực ngoại thành Hà Nội, luôn chú trọng phát triển toàn diện cả kiến thức, kỹ năng và đạo đức cho học sinh.",
    "THPT Sóc Sơn đã đạt được nhiều thành tích nổi bật trong các kỳ thi học sinh giỏi cấp thành phố, Olympic khu vực, cũng như nhiều hoạt động sáng tạo khoa học – kỹ thuật và phong trào Đoàn – Hội.",
    "Chính vì vậy, trong dự án/đội thi lần này, chúng tôi mong muốn nhận được sự đồng hành, hỗ trợ từ Quý nhà tài trợ để có thể phát huy tối đa năng lực của mình, đồng thời lan tỏa tinh thần học tập, sáng tạo của học sinh Trường THPT Sóc Sơn.",
  ],
  description_en: [
    "Robotics Sóc Sơn is a competition team from Sóc Sơn High School, a school with over 40 years of construction and development in Sóc Sơn District (formerly), Hanoi City.",
    "Established in 1984, the school is one of the exemplary educational institutions in Hanoi's suburban area, always focusing on comprehensive development of knowledge, skills, and ethics for students.",
    "Sóc Sơn High School has achieved many outstanding achievements in city-level excellent student competitions, regional Olympiads, as well as many creative science and technology activities and Youth Union movements.",
    "Therefore, in this project/competition team, we hope to receive companionship and support from sponsors to maximize our capabilities, while spreading the learning and creative spirit of Sóc Sơn High School students.",
  ],
};

const desktopGalleryLayout = [
  { span: "col-span-2 row-span-2", sizes: "(max-width: 1280px) 50vw, 560px" },
  { span: "col-span-2", sizes: "(max-width: 1280px) 50vw, 400px" },
  { span: "col-span-2", sizes: "(max-width: 1280px) 50vw, 400px" },
  { span: "col-span-4", sizes: "(max-width: 1280px) 100vw, 960px" },
] as const;

function highlightPhrase(text: string, phrase: string) {
  const index = text.indexOf(phrase);
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <span className="text-primary">{phrase}</span>
      {text.slice(index + phrase.length)}
    </>
  );
}

function GalleryFigure({
  src,
  caption,
  className,
  imageClassName,
  sizes,
}: {
  src: string;
  caption: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_8px_24px_rgba(37,99,235,0.08)]",
          imageClassName,
        )}
      >
        <MediaPlaceholder
          type="image"
          src={src}
          alt={caption}
          flush
          className="absolute inset-0 m-0"
          sizes={sizes}
        />
      </div>
      <figcaption className="mt-2.5 text-sm font-medium leading-snug text-foreground/75 text-pretty">
        {caption}
      </figcaption>
    </figure>
  );
}

function MotionWrap({
  animated,
  className,
  children,
  variants,
  custom,
}: {
  animated: boolean;
  className?: string;
  children: ReactNode;
  variants: Variants;
  custom?: number;
}) {
  if (!animated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      custom={custom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Aspect grid for mobile gallery — first image full-width hero. */
const mobileGalleryGrid = [
  { colSpan: "col-span-2", aspect: "aspect-[4/3]" },
  { colSpan: "col-span-1", aspect: "aspect-[5/4]" },
  { colSpan: "col-span-1", aspect: "aspect-[5/4]" },
  { colSpan: "col-span-2", aspect: "aspect-[16/9]" },
] as const;

export default function AboutSocSonHighSchool() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;

  const galleryImages = galleryImagesData.map((img) => ({
    src: img.src,
    caption: locale === "vi" ? img.caption_vi : img.caption_en,
  }));

  const logoImage = {
    src: logoImageData.src,
    caption:
      locale === "vi" ? logoImageData.caption_vi : logoImageData.caption_en,
  };

  const description =
    locale === "vi" ? contentData.description_vi : contentData.description_en;

  const title =
    locale === "vi" ? contentData.title_vi : contentData.title_en;
  const titleHighlight =
    locale === "vi"
      ? contentData.titleHighlight_vi
      : contentData.titleHighlight_en;
  const subtitle =
    locale === "vi" ? contentData.subtitle_vi : contentData.subtitle_en;
  const subtitleHighlight =
    locale === "vi"
      ? contentData.subtitleHighlight_vi
      : contentData.subtitleHighlight_en;
  const badge = locale === "vi" ? contentData.badge_vi : contentData.badge_en;
  const heritage =
    locale === "vi" ? contentData.heritage_vi : contentData.heritage_en;

  return (
    <section
      id="about-school"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28"
    >
      {/* Section wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-muted"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_85%_65%_at_75%_-15%,rgba(37,99,235,0.16),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-12 xl:gap-14">
          {/* ── text column ── */}
          <MotionWrap animated={animated} variants={fadeUp}>
            <div className="mx-auto max-w-xl space-y-8 text-center lg:mx-0 lg:max-w-none lg:text-left">
              <header>
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
                  <GraduationCap className="h-3.5 w-3.5" aria-hidden />
                  {badge}
                </span>

                <h2 className="text-balance text-[clamp(2.125rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-foreground">
                  {highlightPhrase(title, titleHighlight)}
                </h2>

                <p className="mt-5 text-pretty text-[clamp(1.0625rem,1.8vw,1.3125rem)] leading-[1.55] text-foreground/80">
                  {highlightPhrase(subtitle, subtitleHighlight)}
                </p>

                <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground/70">
                  {heritage}
                </p>
              </header>

              {/* Logo + description block */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-2 shadow-sm sm:h-[4.5rem] sm:w-[4.5rem]">
                  <Image
                    src={logoImage.src}
                    alt={logoImage.caption}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>

                <div className="min-w-0 space-y-4 text-left">
                  {description.map((paragraph, index) => (
                    <p
                      key={index}
                      className={cn(
                        "max-w-[65ch] text-pretty leading-relaxed text-foreground/85",
                        index === 0
                          ? "text-base font-medium md:text-lg"
                          : "text-sm md:text-base",
                      )}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </MotionWrap>

          {/* ── desktop bento gallery ── */}
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_56px_rgba(37,99,235,0.14)]">
              <div className="grid grid-cols-4 grid-rows-[14rem_14rem_16rem] gap-1.5">
                {galleryImages.map((img, idx) => {
                  const layout = desktopGalleryLayout[idx];
                  const figure = (
                    <figure
                      className={cn(
                        "relative overflow-hidden bg-card",
                        layout.span,
                      )}
                    >
                      <MediaPlaceholder
                        type="image"
                        src={img.src}
                        alt={img.caption}
                        flush
                        className="absolute inset-0 m-0"
                        sizes={layout.sizes}
                      />
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-slate-900/85 via-slate-900/45 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white text-pretty">
                        {img.caption}
                      </figcaption>
                    </figure>
                  );

                  if (!animated) {
                    return (
                      <div key={img.src} className="contents">
                        {figure}
                      </div>
                    );
                  }

                  return (
                    <motion.figure
                      key={img.src}
                      custom={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      variants={galleryItem}
                      className={cn(
                        "relative overflow-hidden bg-card",
                        layout.span,
                      )}
                    >
                      <MediaPlaceholder
                        type="image"
                        src={img.src}
                        alt={img.caption}
                        flush
                        className="absolute inset-0 m-0"
                        sizes={layout.sizes}
                      />
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-slate-900/85 via-slate-900/45 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white text-pretty">
                        {img.caption}
                      </figcaption>
                    </motion.figure>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── mobile gallery ── */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:hidden">
          {galleryImages.map((img, idx) => {
            const grid = mobileGalleryGrid[idx];
            return (
              <GalleryFigure
                key={img.src}
                src={img.src}
                caption={img.caption}
                className={grid.colSpan}
                imageClassName={cn("aspect-auto", grid.aspect)}
                sizes="(max-width: 768px) 100vw, 560px"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
