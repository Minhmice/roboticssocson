import { Image as ImageIcon, Video } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  type: "image" | "video";
  src?: string;
  caption?: string;
  className?: string;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  type,
  src,
  caption,
  className,
}) => {
  const Icon = type === "image" ? ImageIcon : Video;

  // If src is provided, render the actual image/video
  if (src && type === "image") {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image
          src={src}
          alt={caption || "Image"}
          fill
          className="object-cover rounded-2xl"
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
        "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/30 p-12 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/50 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)]",
        className
      )}
    >
      <Icon className="mb-4 h-16 w-16 text-slate-600" />
      <p className="text-sm text-slate-500 font-medium">
        {type === "image" ? "Placeholder Image" : "Placeholder Video"}
      </p>
      {caption && (
        <p className="mt-2 text-xs italic text-slate-400">
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

