"use client";

import { Timeline } from "@/components/ui/timeline";
import { GlowCard } from "@/components/shared/GlowCard";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { achievements } from "@/data/achievements";
import { Trophy, Award, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AchievementsSection() {
  const { locale } = useLanguage();
  const { getField } = useTranslatedData();

  // Transform achievements data for Timeline component
  const timelineData = achievements.map((achievement, index) => ({
    title: achievement.year,
    content: (
      <AchievementContent
        achievement={achievement}
        index={index}
        getField={getField}
      />
    ),
  }));

  return (
    <section id="achievements" className="relative min-h-screen">
      <Timeline data={timelineData} />
    </section>
  );
}

// Separate component for achievement content with animations
function AchievementContent({
  achievement,
  index,
  getField,
}: {
  achievement: any;
  index: number;
  getField: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut" as const,
      },
    }),
  };

  const images = [
    { caption: "Robot thi đấu", delay: 0 },
    { caption: "Đội thi", delay: 1 },
    { caption: "Giải thưởng", delay: 2 },
    { caption: "Hoạt động", delay: 3 },
  ];

  return (
    <div ref={ref} className="space-y-6">
      {/* Achievement Header */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="h-16 w-16 rounded-xl bg-primary/20 flex items-center justify-center shadow-lg border bg-primary">
          {index === 0 ? (
            <Trophy className="h-8 w-8 text-primary-foreground" />
          ) : index === 1 ? (
            <Award className="h-8 w-8 text-primary-foreground" />
          ) : (
            <Medal className="h-8 w-8 text-primary-foreground" />
          )}
        </div>
        <div>
          <h4 className="text-2xl font-bold text-foreground mb-2">
            {getField(achievement, "title")}
          </h4>
          <Badge
            variant="outline"
            className="text-primary border-primary/30 text-lg px-4 py-2"
          >
            {achievement.rank}
          </Badge>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-muted-foreground text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        {getField(achievement, "description")}
      </motion.p>

      {/* Participants */}
      {achievement.participants && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <Badge variant="secondary" className="text-base px-4 py-2 mb-6">
            {achievement.participants}
          </Badge>
        </motion.div>
      )}

      {/* Image Grid with staggered animations */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {images.map((image, imageIndex) => (
          <motion.div
            key={imageIndex}
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={imageIndex}
          >
            <GlowCard className="p-0 overflow-hidden">
              <MediaPlaceholder
                type="image"
                caption={image.caption}
                className="h-40 md:h-60 w-full object-cover"
              />
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
