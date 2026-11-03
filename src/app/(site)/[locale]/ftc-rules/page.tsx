import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { isSupportedLocale, type Locale } from "@/lib/i18n/locales";
import { ManualViewer } from "@/components/manual/ManualViewer";
import type { ManualIndex, ManualChunkData } from "@/types/manual";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  const isVi = locale === "vi";
  return buildMetadata(
    {
      title: isVi
        ? "Rules | Sổ tay luật thi đấu FIRST® Tech Challenge | Robotics Sóc Sơn"
        : "Rules | FIRST® Tech Challenge Competition Manual | Robotics Sóc Sơn",
      description: isVi
        ? "Bản dịch cộng đồng Sổ tay luật thi đấu FIRST® Tech Challenge sang tiếng Việt (phi chính thức; văn bản tiếng Anh của FIRST là căn cứ chính thức), có đầy đủ hình ảnh, bảng biểu và mục lục tra cứu nhanh dành cho cộng đồng học sinh & mentor."
        : "Community reference for the FIRST® Tech Challenge competition manual with full diagrams, tables, and rapid indexed search for students and mentors. Source English text is authoritative.",
      canonicalPath: "/ftc-rules",
      keywords: [
        "luật thi đấu ftc",
        "ftc rules",
        "rules robotics",
        "competition manual ftc",
        "luat ftc tieng viet",
        "FIRST Tech Challenge competition manual",
        "biobuzz tu06 tieng viet",
        "robotics sóc sơn",
      ],
    },
    locale as Locale,
  );
}

export default async function ResourcesRulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  const root = process.cwd();
  const indexPath = path.join(root, "public", "manual", "index.json");
  const indexData: ManualIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));

  let firstChunk: ManualChunkData | null = null;
  const firstChunkId = indexData.sections[0]?.chunks[0]?.id;
  if (firstChunkId) {
    const chunkPath = path.join(
      root,
      "public",
      "manual",
      "chunks",
      `${firstChunkId}.json`,
    );
    if (fs.existsSync(chunkPath)) {
      firstChunk = JSON.parse(fs.readFileSync(chunkPath, "utf-8"));
    }
  }

  return <ManualViewer index={indexData} firstChunk={firstChunk} locale={locale as "vi" | "en"} />;
}
