import { Image as ImageIcon, Video } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  type: "image" | "video";
  src?: string;
  caption?: string;
  className?: string;
  sizes?: string;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  type,
  src,
  caption,
  className,
  sizes = "100vw",
}) => {
  const Icon = type === "image" ? ImageIcon : Video;

  // If src is provided, render the actual image/video
  if (src && src.trim() && type === "image") {
    // Xử lý URL: normalize và encode filename nếu cần
    const encodedSrc = (() => {
      const trimmedSrc = src.trim();
      
      // Nếu là đường dẫn tuyệt đối (http/https) hoặc data URL, giữ nguyên
      if (trimmedSrc.startsWith("http") || trimmedSrc.startsWith("data:")) {
        return trimmedSrc;
      }
      
      // Normalize: đảm bảo đường dẫn bắt đầu bằng "/"
      let normalizedSrc = trimmedSrc;
      if (!normalizedSrc.startsWith("/")) {
        normalizedSrc = "/" + normalizedSrc;
      }
      
      // Chỉ encode filename nếu có ký tự đặc biệt hoặc dấu tiếng Việt
      const lastSlashIndex = normalizedSrc.lastIndexOf("/");
      if (lastSlashIndex === -1) return normalizedSrc;
      
      const path = normalizedSrc.substring(0, lastSlashIndex + 1);
      const filename = normalizedSrc.substring(lastSlashIndex + 1);
      
      // Chỉ encode nếu filename có ký tự đặc biệt, dấu tiếng Việt, hoặc khoảng trắng
      const hasSpecialChars = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ\s()]/.test(filename);
      
      if (hasSpecialChars) {
        return path + encodeURIComponent(filename);
      }
      
      return normalizedSrc;
    })();

    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image
          src={encodedSrc}
          alt={caption || "Image"}
          fill
          sizes={sizes}
          className="object-cover rounded-2xl"
          unoptimized={src.includes("Hương") || src.includes("Dũng") || src.includes("Hà") || /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/.test(src)}
        />
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 rounded-b-2xl">
            <p className="text-xs italic text-white text-center">
              {caption}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Default placeholder
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/50 p-12 transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-[0_0_12px_rgba(37,99,235,0.25)]",
        className
      )}
    >
      <Icon className="mb-4 h-16 w-16 text-muted-foreground" />
      <p className="text-sm text-muted-foreground font-medium">
        {type === "image" ? "Placeholder Image" : "Placeholder Video"}
      </p>
      {caption && (
        <p className="mt-2 text-xs italic text-muted-foreground">
          {type === "image" ? `Ảnh: ${caption}` : `Video: ${caption}`}
        </p>
      )}
    </div>
  );
};

/**
 * Usage example:
 * 
 * <MediaPlaceholder 
 *   type="image"
 *   caption="Team photo will be displayed here"
 * />
 */

