import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata(): Metadata {
  return {
    ...buildMetadata({
      title: "Arduino & mBlock — Trình chiếu nội bộ",
      description:
        "Trình chiếu nội bộ cho đội Robotics Sóc Sơn — yêu cầu mật khẩu.",
      canonicalPath: "/course/arduino-mblock-deck",
    }),
    robots: { index: false, follow: false },
  };
}

export default function ArduinoMblockDeckLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
