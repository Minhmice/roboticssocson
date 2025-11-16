"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedText } from "@/components/shared/AnimatedComponents";
import { heroData } from "@/data/hero";
import { pitchPdfUrl } from "@/data/settings";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { Download, Award } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

/**
 * AnimatedTextWithChars - Component để animation từng chữ
 * Key prop để force remount khi text thay đổi
 */
function AnimatedTextWithChars({ text }: { text: string }) {
  if (!text || typeof text !== "string") return null;
  const chars = text.split("");

  return (
    <div
      className="inline-flex items-center font-black text-primary"
      key={text}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${text}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: -50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 1,
            delay: index * 0.05,
            type: "spring",
            stiffness: 100,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * Fullscreen Hero Section using data from heroData
 *
 * @component
 */
export default function Hero() {
  const { locale, t } = useLanguage();
  const { getField } = useTranslatedData();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const animatedWordsRaw = getField(heroData, "animatedWords");
  const animatedWords = useMemo(
    () =>
      Array.isArray(animatedWordsRaw)
        ? animatedWordsRaw
        : locale === "vi"
          ? heroData.animatedWords_vi
          : heroData.animatedWords_en,
    [animatedWordsRaw, locale]
  );

  useEffect(() => {
    if (!animatedWords || animatedWords.length === 0) return;
    
    const timeoutId = setTimeout(() => {
      // Fade out trước khi đổi chữ
      setIsTransitioning(true);

      // Sau khi fade out xong (300ms), đổi chữ và fade in lại
      transitionTimeoutRef.current = setTimeout(() => {
        if (currentWordIndex === animatedWords.length - 1) {
          setCurrentWordIndex(0);
        } else {
          setCurrentWordIndex(currentWordIndex + 1);
        }
        setIsTransitioning(false);
      }, 300);
    }, 3000); // Tổng thời gian hiển thị mỗi từ

    return () => {
      clearTimeout(timeoutId);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentWordIndex, animatedWords]);

  return (
    <AuroraBackground className="bg-background text-foreground">
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-2 sm:space-y-4 px-4 sm:px-6 md:px-8">
        {/* Badge */}
        <AnimatedText className="inline-flex justify-center">
          <GlassButton
            type="button"
            size="sm"
            contentClassName="flex items-center gap-2"
          >
            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">
              {getField(heroData, "badge")}
            </span>
          </GlassButton>
        </AnimatedText>

        {/* Main headline */}
        <AnimatedText direction="left" delay={0.1}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] sm:leading-tight text-balance max-w-[65ch] mx-auto">
            {locale === "vi" ? (
              <>
                <span className="text-foreground">
                  Kiến tạo tương lai cùng Robotics Sóc Sơn{" "}
                </span>
                <span className="relative inline-flex min-h-[60px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[120px] items-center justify-center w-full overflow-hidden">
                  <motion.div
                    key={currentWordIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isTransitioning ? 0 : 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <AnimatedTextWithChars
                      text={animatedWords[currentWordIndex]}
                    />
                  </motion.div>
                </span>
              </>
            ) : (
              <>
                <span className="text-foreground">
                  Build the future with Robotics Sóc Sơn{" "}
                </span>
                <span className="relative inline-flex min-h-[60px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[120px] items-center justify-center w-full overflow-hidden">
                  <motion.div
                    key={currentWordIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isTransitioning ? 0 : 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <AnimatedTextWithChars
                      text={animatedWords[currentWordIndex]}
                    />
                  </motion.div>
                </span>
              </>
            )}
          </h1>
        </AnimatedText>

        {/* Sub headline */}
        <AnimatedText direction="right" delay={0.2}>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light px-2 sm:px-0 max-w-[65ch] mx-auto">
            {getField(heroData, "sub")}
          </p>
        </AnimatedText>

        <AnimatedText delay={0.5}>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto">
            <div className="flex flex-1 w-full sm:w-auto">
              <CTAButton
                label={t("nav.sponsorButton")}
                variant="primary"
                href="/sponsor"
                className="flex-1 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] w-full"
                aria-label="Contact for sponsorship"
              />
            </div>
            <div className="flex flex-1 w-full sm:w-aut o">
              <CTAButton
                label={getField(heroData, "cta_secondary")}
                variant="secondary"
                href={pitchPdfUrl}
                icon={Download}
                className="flex-1 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] w-full"
                aria-label="Download pitch PDF"
              />
            </div>
          </div>
        </AnimatedText>
      </div>
    </AuroraBackground>
  );
}
