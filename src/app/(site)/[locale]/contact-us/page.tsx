import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isSupportedLocale } from "@/lib/i18n/locales";
import { contactUsMetadata } from "@/lib/seo/contact-pages-seo";
import ContactUsClient from "./ContactUsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return contactUsMetadata(locale);
}

export default function ContactUsPage() {
  return <ContactUsClient />;
}
