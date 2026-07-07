"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Image as ImageIcon, Video } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  type: "image" | "video";
  src?: string;
  caption?: string;
  alt?: string;
  flush?: boolean;
  className?: string;
  sizes?: string;
  unoptimized?: boolean;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  type,
  src,
  caption,
  alt,
  flush = false,
  className,
  sizes = "100vw",
  unoptimized,
}) => {
  const { locale } = useLanguage();
  const Icon = type === "image" ? ImageIcon : Video;
  const placeholderLabel =
    type === "image"
      ? locale === "vi"
        ? "Ảnh sẽ được cập nhật"
        : "Image coming soon"
      : locale === "vi"
        ? "Video sẽ được cập nhật"
        : "Video coming soon";

  if (src && src.trim() && type === "image") {
    const encodedSrc = (() => {
      const trimmedSrc = src.trim();

      if (trimmedSrc.startsWith("http") || trimmedSrc.startsWith("data:")) {
        return trimmedSrc;
      }

      let normalizedSrc = trimmedSrc;
      if (!normalizedSrc.startsWith("/")) {
        normalizedSrc = "/" + normalizedSrc;
      }

      const lastSlashIndex = normalizedSrc.lastIndexOf("/");
      if (lastSlashIndex === -1) return normalizedSrc;

      const path = normalizedSrc.substring(0, lastSlashIndex + 1);
      const filename = normalizedSrc.substring(lastSlashIndex + 1);

      const hasSpecialChars =
        /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ\s()]/.test(
          filename
        );

      if (hasSpecialChars) {
        return path + encodeURIComponent(filename);
      }

      return normalizedSrc;
    })();

    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image
          src={encodedSrc}
          alt={alt || caption || "Image"}
          fill
          sizes={sizes}
          className={cn("object-cover", !flush && "rounded-2xl")}
          unoptimized={unoptimized}
        />
        {caption && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2",
              !flush && "rounded-b-2xl"
            )}
          >
            <p className="text-xs italic text-white text-center">{caption}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/50 p-12 transition-colors duration-300 hover:border-primary/40 hover:bg-card hover:shadow-[0_0_12px_rgba(37,99,235,0.25)]",
        className
      )}
      role="img"
      aria-label={caption || placeholderLabel}
    >
      <Icon className="mb-4 h-16 w-16 text-muted-foreground" aria-hidden />
      <p className="text-sm text-foreground font-medium">{placeholderLabel}</p>
      {caption && (
        <p className="mt-2 text-xs italic text-muted-foreground text-center max-w-[32ch]">
          {caption}
        </p>
      )}
    </div>
  );
};
