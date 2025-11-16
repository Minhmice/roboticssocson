"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { User as UserIcon, Wrench, Code2, PenTool } from "lucide-react";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";

type Role =
  | "Leader"
  | "Vice Leader"
  | "Engineering"
  | "Coding"
  | "Media - Design"
  | "Member";

export interface MemberCardProps {
  name: string;
  role: Role | string;
  image?: string; // ảnh nền lớn trong card (cover image) - deprecated, dùng src
  src?: string; // link ảnh trong public folder, ví dụ: "/Images/Team/le-quang-trinh.jpg"
  slogan?: string;
  classInfo?: string; // ví dụ: "2007" hoặc "Born 2008"
  tags?: string[]; // hashtag phía dưới
  href?: string; // link "View Profile"
  logoSrc?: string; // mặc định: "/Logo.svg"
  className?: string;
  showButton?: boolean;
}

// Utility function for role icons (currently unused but kept for future use)
// const roleIcon = (role: string) => {
//   const r = role.toLowerCase();
//   if (r.includes("engineer") || r.includes("engineering"))
//     return <Wrench className="h-4 w-4" />;
//   if (r.includes("coding") || r.includes("developer") || r.includes("dev"))
//     return <Code2 className="h-4 w-4" />;
//   if (r.includes("media") || r.includes("design"))
//     return <PenTool className="h-4 w-4" />;
//   return <UserIcon className="h-4 w-4" />;
// };

export function MemberCard({
  name,
  role,
  image,
  src,
  slogan,
  classInfo,
  tags = ["#FTC2026", "#STEM", "#Innovation"],
  href,
  logoSrc = "/Logo/RBS Logo.svg",
  className,
  showButton = true,
}: MemberCardProps) {
  // Ưu tiên src, sau đó mới đến image
  const imageSrc = src || image;
  
  // Encode URL để xử lý ký tự đặc biệt (dấu tiếng Việt)
  // Chỉ encode filename (phần cuối), giữ nguyên path
  const encodedImageSrc = imageSrc
    ? (() => {
        const lastSlashIndex = imageSrc.lastIndexOf("/");
        if (lastSlashIndex === -1) return encodeURIComponent(imageSrc);
        const path = imageSrc.substring(0, lastSlashIndex + 1);
        const filename = imageSrc.substring(lastSlashIndex + 1);
        return path + encodeURIComponent(filename);
      })()
    : undefined;

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]",
        "bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]",
        "text-card-foreground min-h-[400px] sm:min-h-[450px] md:min-h-[480px]",
        className
      )}
    >
      {/* Cover image - Full card */}
      {encodedImageSrc ? (
        <Image
          src={encodedImageSrc}
          alt={`${name} cover`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
          unoptimized={imageSrc?.includes("Hương") || imageSrc?.includes("Dũng") || imageSrc?.includes("Hà")}
        />
      ) : (
        <div className="absolute inset-0">
          <MediaPlaceholder
            type="image"
            caption={`Ảnh bìa - ${name}`}
            className="h-full w-full rounded-none m-0"
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none" />

      <div className="absolute left-3 top-3 z-10">
        <div className="relative rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 h-10 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.01] group overflow-hidden flex items-center">
          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image
                src={logoSrc}
                alt="Robotics Sóc Sơn"
                width={24}
                height={24}
                className="object-contain object-center"
                sizes="24px"
              />
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-100 opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[180px] group-hover:pr-3 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap flex flex-col leading-tight">
            <span>Robotics Sóc Sơn</span>
            <span>FTC33518</span>
          </span>
        </div>
      </div>

      {/* Badge - Top right */}
      <div className="absolute right-3 top-3 z-10">
        <Badge
          variant="secondary"
          className="h-10 w-fit px-4 flex items-center justify-center text-lg rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm"
        >
          {role}
        </Badge>
      </div>

      {/* Content area - absolute positioned phía dưới */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        {/* Tên */}
        <div className="mb-4">
          <div className="mb-2">
            <h3 className="text-xl font-bold leading-tight text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {name}
            </h3>
          </div>
          {classInfo && (
            <p className="text-xs text-slate-200/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] mb-3">
              {classInfo}
            </p>
          )}

          {slogan && (
            <p className="text-xs italic text-slate-300 line-clamp-2 mb-3">
              {slogan}
            </p>
          )}


          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-slate-800/60 border border-slate-700/50 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {(showButton || href) && (
          <div>
            {href ? (
              <Button
                asChild
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:shadow-[0_0_16px_rgba(34,211,238,0.4)]"
              >
                <Link href={href}>View Profile</Link>
              </Button>
            ) : (
              <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:shadow-[0_0_16px_rgba(34,211,238,0.4)]">
                View Profile
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export default MemberCard;
