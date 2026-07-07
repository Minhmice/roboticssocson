"use client";

import { MediaPlaceholder } from "./MediaPlaceholder";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ImageGalleryLayout = "1" | "2" | "4";

export type ImageGalleryItem = {
  caption?: string;
  src?: string;
};

interface ImageGalleryProps {
  layout?: ImageGalleryLayout;
  images?: Array<ImageGalleryItem>;
  className?: string;
  sizes?: string;
  animated?: boolean;
}

export function ImageGallery({
  layout = "1",
  images,
  className,
  sizes,
  animated = true,
}: ImageGalleryProps) {
  // Default images nếu không có
  const defaultImages: ImageGalleryItem[] = Array.from({
    length: parseInt(layout),
  }).map((_, i) => ({
    caption: `Image ${i + 1}`,
    src: undefined,
  }));

  const displayImages: ImageGalleryItem[] = images || defaultImages;

  // Limit số lượng ảnh theo layout
  const maxImages = parseInt(layout);
  const galleryImages = displayImages.slice(0, maxImages);
  const imageSizes =
    sizes ??
    (layout === "1"
      ? "(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 760px"
      : "(max-width: 768px) 50vw, (max-width: 1280px) 30vw, 380px");

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
    const image = (
      <MediaPlaceholder
        type="image"
        src={galleryImages[0]?.src}
        caption={galleryImages[0]?.caption || ""}
        flush
        className={cn("h-48 md:h-56 w-full object-cover rounded-xl")}
        sizes={imageSizes}
      />
    );

    if (!animated) {
      return <div className={cn("w-full", className)}>{image}</div>;
    }

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
            caption={galleryImages[0]?.caption || ""}
            flush
            className={cn("h-48 md:h-56 w-full object-cover rounded-xl")}
            sizes={imageSizes}
          />
        </motion.div>
      </motion.div>
    );
  }

  if (layout === "2") {
    const grid = (
      <div className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}>
        {galleryImages.map((img, idx) => (
          <MediaPlaceholder
            key={img.src ?? img.caption ?? idx}
            type="image"
            src={img.src}
            caption={img.caption || ""}
            flush
            className="h-40 md:h-48 w-full object-cover rounded-xl"
            sizes={imageSizes}
          />
        ))}
      </div>
    );

    if (!animated) return grid;

    return (
      <motion.div
        className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {galleryImages.map((img, idx) => (
          <motion.div key={img.src ?? img.caption ?? idx} variants={itemVariants}>
            <MediaPlaceholder
              type="image"
              src={img.src}
              caption={img.caption || ""}
              flush
              className="h-40 md:h-48 w-full object-cover rounded-xl"
              sizes={imageSizes}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (layout === "4") {
    const grid = (
      <div className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}>
        {galleryImages.map((img, idx) => (
          <MediaPlaceholder
            key={img.src ?? img.caption ?? idx}
            type="image"
            src={img.src}
            caption={img.caption || ""}
            flush
            className="h-16 sm:h-24 md:h-32 w-full object-cover rounded-xl"
            sizes={imageSizes}
          />
        ))}
      </div>
    );

    if (!animated) return grid;

    return (
      <motion.div
        className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {galleryImages.map((img, idx) => (
          <motion.div key={img.src ?? img.caption ?? idx} variants={itemVariants}>
            <MediaPlaceholder
              type="image"
              src={img.src}
              caption={img.caption || ""}
              flush
              className="h-16 sm:h-24 md:h-32 w-full object-cover rounded-xl"
              sizes={imageSizes}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return null;
}
