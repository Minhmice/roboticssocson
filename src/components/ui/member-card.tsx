"use client";

import * as React from "react";
import Image from "next/image";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  src?: string; // link ảnh trong public folder, ví dụ: "/Images/Team/le-quang-trinh.webp"
  slogan?: string;
  classInfo?: string; // ví dụ: "2007" hoặc "Born 2008"
  tags?: string[]; // hashtag phía dưới
  href?: string; // link "View Profile"
  logoSrc?: string; // deprecated: kept for API compatibility
  imagePriority?: boolean;
  className?: string;
  showButton?: boolean;
}

export function MemberCard({
  name,
  role,
  image,
  src,
  slogan,
  classInfo,
  tags = ["#FTC2026", "#STEM", "#Innovation"],
  href,
  imagePriority = false,
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
        "relative overflow-hidden rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]",
        "bg-card backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.25)]",
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
          priority={imagePriority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
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
        <div className="relative rounded-full bg-card backdrop-blur-md border border-border h-10 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.01] group overflow-hidden flex items-center">
          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
            <div className="h-6 w-8 flex items-center justify-center">
              <BrandLogo className="h-6 w-auto" />
            </div>
          </div>
          <span className="text-xs font-semibold text-foreground opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[180px] group-hover:pr-3 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap flex flex-col leading-tight">
            <span>Robotics Sóc Sơn</span>
            <span>FTC33518</span>
          </span>
        </div>
      </div>

      {/* Badge - Top right */}
      <div className="absolute right-3 top-3 z-10">
        <Badge
          variant="secondary"
          className="h-10 w-fit px-4 flex items-center justify-center text-lg rounded-full bg-primary/10 text-primary border border-primary/30 backdrop-blur-sm"
        >
          {role}
        </Badge>
      </div>

      {/* Content area - absolute positioned phía dưới */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        {/* Tên */}
        <div className="mb-4">
          <div className="mb-2">
            <h3 className="text-xl font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              {name}
            </h3>
          </div>
          {classInfo && (
            <p className="text-xs text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] mb-3">
              {classInfo}
            </p>
          )}

          {slogan && (
            <p className="text-xs italic text-white/75 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] line-clamp-2 mb-3">
              {slogan}
            </p>
          )}


          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[10px] uppercase tracking-wide text-white/85 backdrop-blur-sm"
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_14px_rgba(37,99,235,0.15)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
              >
                <Link href={href}>View Profile</Link>
              </Button>
            ) : (
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_14px_rgba(37,99,235,0.15)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.25)]">
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
