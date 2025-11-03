"use client";

import { MediaPlaceholder } from "./MediaPlaceholder";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ImageGalleryLayout = "1" | "2" | "4";

interface ImageGalleryProps {
  layout?: ImageGalleryLayout;
  images?: Array<{ caption?: string; src?: string }>;
  className?: string;
}

export function ImageGallery({
  layout = "1",
  images,
  className,
}: ImageGalleryProps) {
  // Default images nếu không có
  const defaultImages = Array.from({ length: parseInt(layout) }).map(
    (_, i) => ({
      caption: `Image ${i + 1}`,
    })
  );

  const displayImages = images || defaultImages;

  // Limit số lượng ảnh theo layout
  const maxImages = parseInt(layout);
  const galleryImages = displayImages.slice(0, maxImages);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  if (layout === "1") {
    return (
      <motion.div
        className={cn("w-full", className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="w-full">
          <MediaPlaceholder
            type="image"
            src={galleryImages[0]?.src}
            caption={galleryImages[0]?.caption}
            className={cn("h-48 md:h-56 w-full object-cover rounded-xl")}
          />
        </motion.div>
      </motion.div>
    );
  }

  if (layout === "2") {
    return (
      <motion.div
        className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {galleryImages.map((img, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <MediaPlaceholder
              type="image"
              src={img.src}
              caption={img.caption}
              className="h-40 md:h-48 w-full object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (layout === "4") {
    return (
      <motion.div
        className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {galleryImages.map((img, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <MediaPlaceholder
              type="image"
              src={img.src}
              caption={img.caption}
              className="h-16 sm:h-24 md:h-32 w-full object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return null;
}
