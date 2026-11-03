import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isSupportedLocale, type Locale } from "@/lib/i18n/locales";
import { buildMetadata } from "@/lib/seo/metadata";
import { ResourcesHub } from "@/components/resources/ResourcesHub";

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
        ? "Tài nguyên Robotics & FIRST® Tech Challenge | Robotics Sóc Sơn"
        : "Robotics & FIRST® Tech Challenge Resources | Robotics Sóc Sơn",
      description: isVi
        ? "Kho tài nguyên kỹ thuật mở từ Robotics Sóc Sơn: Luật thi đấu FTC Rules, cẩm nang phần cứng Control Hub, động cơ, cảm biến, hồ sơ Engineering Portfolio và kiến thức chế tạo robotics."
        : "Open technical resource center by Robotics Sóc Sơn: FTC Rules manual, hardware guides for Control Hub, motors, sensors, Engineering Portfolio and robotics engineering fundamentals.",
      canonicalPath: "/resources",
      keywords: [
        "tài nguyên robotics",
        "ftc resources",
        "ftc components",
        "kiến thức ftc",
        "luật thi đấu ftc",
        "ftc rules",
        "engineering portfolio",
        "robotics sóc sơn",
      ],
    },
    locale as Locale,
  );
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  return <ResourcesHub locale={locale as Locale} />;
}
