"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { AuroraBackground } from "@/components/ui/aurora-background";
import {
  AnimatedSection,
  AnimatedText,
} from "@/components/shared/AnimatedComponents";
import { heroData } from "@/data/hero";
import { pitchPdfUrl } from "@/data/settings";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { cn } from "@/lib/utils";
import { Download, Award, Users, Trophy } from "lucide-react";

/**
 * AnimatedTextWithChars - Component để animation từng chữ
 */
function AnimatedTextWithChars({ text }: { text: string }) {
  const chars = text.split("");

  return (
    <div className="inline-flex items-center font-black text-primary">
      {chars.map((char, index) => (
        <motion.span
          key={index}
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

  const animatedWords = getField(
    heroData,
    "animatedWords"
  ) as unknown as readonly string[];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentWordIndex === animatedWords.length - 1) {
        setCurrentWordIndex(0);
      } else {
        setCurrentWordIndex(currentWordIndex + 1);
      }
    }, 3500); // Tăng thời gian để đọc được nhiều từ hơn
    return () => clearTimeout(timeoutId);
  }, [currentWordIndex, animatedWords.length]);

  return (
    <AuroraBackground className="bg-background text-foreground">
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-4">
        {/* Badge */}
        <AnimatedText className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-lg">
          <Award className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary">
            {getField(heroData, "badge")}
          </span>
        </AnimatedText>

        {/* Main headline */}
        <AnimatedText direction="left" delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight text-balance">
            {locale === "vi" ? (
              <>
                <span className="text-foreground">
                  Kiến tạo tương lai cùng Robotics Sóc Sơn —{" "}
                </span>
                <span className="relative inline-flex min-h-[80px] md:min-h-[120px] items-center justify-center w-full overflow-hidden">
                  <AnimatedTextWithChars
                    text={animatedWords[currentWordIndex]}
                  />
                </span>
              </>
            ) : (
              <>
                <span className="text-foreground">
                  Build the future with Robotics Sóc Sơn —{" "}
                </span>
                <span className="relative inline-flex min-h-[80px] md:min-h-[120px] items-center justify-center w-full overflow-hidden">
                  <AnimatedTextWithChars
                    text={animatedWords[currentWordIndex]}
                  />
                </span>
              </>
            )}
          </h1>
        </AnimatedText>

        {/* Sub headline */}
        <AnimatedText direction="right" delay={0.2}>
          <p className="text-xl md:text-2xl text-muted-foreground mt-3 font-light">
            {getField(heroData, "sub")}
          </p>
        </AnimatedText>

        {/* CTA Buttons */}
        <AnimatedText delay={0.5}>
          <div className="mt-8 flex gap-4 flex-wrap justify-center items-center">
            <CTAButton
              label={getField(heroData, "cta_primary")}
              variant="primary"
              href="/contact"
              className="w-full sm:w-auto text-lg px-8 py-4"
              aria-label="Contact for sponsorship"
            />
            <CTAButton
              label={getField(heroData, "cta_secondary")}
              variant="secondary"
              href={pitchPdfUrl}
              icon={Download}
              className="w-full sm:w-auto text-lg px-8 py-4"
              aria-label="Download pitch PDF"
            />
          </div>
        </AnimatedText>
      </div>
    </AuroraBackground>
  );
}
