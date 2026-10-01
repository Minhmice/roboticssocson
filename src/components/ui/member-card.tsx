"use client";

import * as React from "react";
import Image from "next/image";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";

type Role =
  | "President"
  | "Vice President"
  | "Head of Engineering"
  | "Head of Programming"
  | "Head of Media Design"
  | "Leader"
  | "Vice Leader"
  | "Engineering"
  | "Coding"
  | "Media - Design"
  | "Member"
  | string;
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

  const isLeadershipRole = React.useMemo(() => {
    if (!role) return false;
    const normalized = role.toLowerCase().trim();
    return normalized !== "member" && normalized !== "thành viên";
  }, [role]);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]",
        "bg-card backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.25)]",
        "text-card-foreground min-h-[400px] sm:min-h-[450px] md:min-h-[480px]",
        className
      )}
    >
      {/* Cover image - Full card */}
      {encodedImageSrc ? (
        <Image
          src={encodedImageSrc}
          alt={`${name}${role ? ` - ${role}` : ""} cover`}
          fill
          className="object-cover"
          priority={imagePriority}
          loading={imagePriority ? undefined : "lazy"}
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

      {/* Dark gradient overlay for bottom text contrast */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

      {/* Top Header: Team Mark (left) + Role Badge (right) */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-start justify-between gap-1.5 sm:gap-2 pointer-events-none">
        {/* Team Mark / Logo */}
        <div
          className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0 shadow-md pointer-events-auto transition-transform duration-200 group-hover:scale-105"
          title="Robotics Sóc Sơn • FTC33518"
          aria-label="Robotics Sóc Sơn • FTC33518"
        >
          <div className="h-3.5 w-4 sm:h-4.5 sm:w-5.5 flex items-center justify-center">
            <BrandLogo className="h-3.5 w-auto sm:h-4.5 text-white" />
          </div>
        </div>

        {/* Role Badge - hardened against text overflow, collision, and contrast bugs */}
        {role && (
          <div className="min-w-0 flex-1 flex justify-end pointer-events-auto">
            <span
              className={cn(
                "inline-flex items-center justify-center text-center font-semibold leading-tight tracking-tight shadow-md backdrop-blur-md transition-all duration-200",
                "px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs rounded-xl sm:rounded-full max-w-[125px] sm:max-w-none",
                isLeadershipRole
                  ? "bg-blue-600 text-white border border-blue-400/40 shadow-[0_2px_12px_rgba(37,99,235,0.4)]"
                  : "bg-slate-900/85 text-slate-100 border border-white/20 shadow-sm"
              )}
            >
              <span className="whitespace-normal sm:whitespace-nowrap break-words line-clamp-2">
                {role}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Content area - absolute positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-3.5 sm:p-4">
        <div className="mb-3.5">
          {/* Name */}
          <div className="mb-1">
            <h3 className="text-lg sm:text-xl font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              {name}
            </h3>
          </div>

          {/* Role & Class meta line */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5 mb-2 text-xs leading-normal">
            {role && (
              <span
                className={cn(
                  "font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]",
                  isLeadershipRole ? "text-blue-300" : "text-slate-200"
                )}
              >
                {role}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-white/80">
              {role && classInfo && (
                <span className="hidden sm:inline text-white/40 select-none">•</span>
              )}
              {classInfo && (
                <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  {classInfo}
                </span>
              )}
            </div>
          </div>

          {/* Slogan */}
          {slogan && (
            <p className="text-xs italic text-white/75 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] line-clamp-2 mb-2.5">
              {slogan}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/85 backdrop-blur-sm"
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
