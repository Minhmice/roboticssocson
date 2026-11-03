import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateProfileMetadata, SectionView } from "../ProfileContent";
import PrintTrigger from "./PrintTrigger";
import { PROFILE_EMAIL, PROFILE_UPDATED, profileMeta, profileSections } from "@/data/profile";
import { isSupportedLocale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Canonical stays /profile; this print copy must not be indexed as a duplicate.
  return { ...(await generateProfileMetadata({ params })), robots: { index: false, follow: false } };
}

export default async function ProfilePrintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const tocLabel = localize(profileMeta.toc, locale);

  return (
    <div id="profile-top" className="profile-print mx-auto max-w-3xl bg-background px-4 py-6 text-foreground sm:px-6 print:max-w-none print:px-0 print:py-0">
      <PrintTrigger locale={locale} />
      <header className="mb-6 space-y-3 border-b border-border pb-4">
        <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
          <span>Robotics Sóc Sơn</span>
          <span>
            {localize(profileMeta.updated, locale)}: {PROFILE_UPDATED}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">{localize(profileMeta.title, locale)}</h1>
        <p className="text-base leading-7 text-foreground/90">{localize(profileMeta.lead, locale)}</p>
        <p className="text-sm text-muted-foreground">{PROFILE_EMAIL}</p>
      </header>
      <div className="space-y-8 print:space-y-6">
        {profileSections.map((section) => (
          <SectionView key={section.id} section={section} locale={locale} tocLabel={tocLabel} />
        ))}
      </div>
    </div>
  );
}
