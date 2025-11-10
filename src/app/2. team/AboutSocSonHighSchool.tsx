"use client";

import Image from "next/image";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const galleryImagesData = [
  {
    src: "/Images/About SocSonHighschool/Image (1).jpg",
    caption_vi: "Khuôn viên trường THPT Sóc Sơn",
    caption_en: "Sóc Sơn High School Campus",
  },
  {
    src: "/Images/About SocSonHighschool/Image (2).jpg",
    caption_vi: "Hoạt động ngoại khóa của học sinh",
    caption_en: "Student Extracurricular Activities",
  },
  {
    src: "/Images/About SocSonHighschool/Image (3).jpg",
    caption_vi: "Không gian học tập hiện đại",
    caption_en: "Modern Learning Environment",
  },
  {
    src: "/Images/About SocSonHighschool/Image (4).jpg",
    caption_vi: "Sự kiện truyền thống của trường",
    caption_en: "School Traditional Events",
  },
];

const logoImageData = {
  src: "/Images/About SocSonHighschool/Logo SocSonHighschool.png",
  caption_vi: "Logo Trường THPT Sóc Sơn",
  caption_en: "Sóc Sơn High School Logo",
};

const contentData = {
  title_vi: "Trường THPT Sóc Sơn",
  title_en: "Sóc Sơn High School",
  subtitle_vi: "Ngôi trường đồng hành và nuôi dưỡng những giấc mơ công nghệ",
  subtitle_en: "The school that accompanies and nurtures technology dreams",
  badge_vi: "Giới thiệu",
  badge_en: "School Introduction",
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

export default function AboutSocSonHighSchool() {
  const { locale } = useLanguage();
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Add bento animations
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "bento-school-animations";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes bento2-card {
        0% { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.96); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    // On mobile, show immediately; on desktop, wait for intersection
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setSectionVisible(true);
      return;
    }

    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-24 translate-z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          title={locale === "vi" ? contentData.title_vi : contentData.title_en}
          subtitle={
            locale === "vi" ? contentData.subtitle_vi : contentData.subtitle_en
          }
          badge={locale === "vi" ? contentData.badge_vi : contentData.badge_en}
          align="center"
        />

        {/* Bento Grid Layout */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 md:auto-rows-fr">
          {galleryImages.map((img, idx) => {
            const animationDelay = `${Math.max(idx * 0.1, 0)}s`;
            return (
              <BentoItem
                key={idx}
                span="col-span-2"
                isVisible={sectionVisible}
                animationDelay={animationDelay}
                className="p-0 overflow-hidden rounded-2xl"
              >
                <div className="relative h-full w-full">
                  <MediaPlaceholder
                    type="image"
                    src={img.src}
                    caption={img.caption}
                    className="h-full w-full m-0 rounded-2xl"
                  />
                </div>
              </BentoItem>
            );
          })}

          <BentoItem
            span="col-span-4"
            isVisible={sectionVisible}
            animationDelay="0.4s"
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-xl md:rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4 md:p-6 shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.45)] hover:border-cyan-500/50 hover:scale-105 md:h-full"
            )}
          >
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl sm:rounded-2xl">
              <div className="absolute inset-0 bg-slate-900/30" />
              <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-cyan-500 to-cyan-600" />
            </div>

            <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="flex items-center justify-center rounded-full bg-white p-2 w-16 h-16 md:w-20 md:h-20 overflow-hidden flex-shrink-0 shadow-lg">
                <Image
                  src={logoImage.src}
                  alt={logoImage.caption}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                {locale === "vi" ? contentData.title_vi : contentData.title_en}
              </h3>
            </div>

            <div className="flex-1 space-y-3 md:space-y-4">
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm md:text-base text-slate-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </BentoItem>
        </div>
      </div>
    </section>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  span: string;
  height?: string;
  isVisible: boolean;
  animationDelay: string;
  className?: string;
  style?: React.CSSProperties;
}

function BentoItem({
  children,
  span,
  height,
  isVisible,
  animationDelay,
  className,
  style,
}: BentoItemProps) {
  return (
    <article
      className={cn(
        "opacity-100 md:motion-safe:opacity-0",
        isVisible &&
          "md:motion-safe:animate-[bento2-card_0.8s_ease-out_forwards]",
        span,
        className,
        height
      )}
      style={{ animationDelay, ...style }}
    >
      {children}
    </article>
  );
}
