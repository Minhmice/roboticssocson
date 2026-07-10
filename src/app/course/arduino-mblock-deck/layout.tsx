import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "Arduino & mBlock — Trình chiếu Robotics",
    description:
      "Trình chiếu 30 slide về Arduino và mBlock trong giảng dạy Robotics — cho học sinh và phụ huynh.",
    canonicalPath: "/course/arduino-mblock-deck",
  });
}

export default function ArduinoMblockDeckLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
