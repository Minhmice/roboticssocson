import { Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  type: "image" | "video";
  caption?: string;
  className?: string;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  type,
  caption,
  className,
}) => {
  const Icon = type === "image" ? ImageIcon : Video;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/30 p-12 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/50 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)]",
        className
      )}
    >
      <Icon className="mb-4 h-16 w-16 text-slate-600" />
      <p className="text-sm text-slate-500">
        {type === "image" ? "Placeholder Image" : "Placeholder Video"}
      </p>
      {caption && (
        <p className="mt-2 text-xs italic text-slate-600">{caption}</p>
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

