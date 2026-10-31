import type { EducationalOrganization, WithContext } from "schema-dts";
import { aboutMeta } from "@/data/about";
import { contactEmail, socials } from "@/data/settings";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";
import { getSiteUrl } from "./site-url";

function toAbsoluteUrl(canonicalPath: string, locale: Locale): string {
  const site = getSiteUrl();
  const path = localizedHref(canonicalPath, locale);
  if (path === "/") {
    return site;
  }
  return `${site}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getOrganizationJsonLd(
  locale: Locale,
): WithContext<EducationalOrganization> {
  const site = getSiteUrl();
  const socialLinks = Object.values(socials).filter(
    (url): url is string => typeof url === "string" && url.trim().length > 0,
  );

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Robotics Sóc Sơn",
    url: toAbsoluteUrl("/", locale),
    logo: `${site}/Logo/RBS Logo.svg`,
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: aboutMeta.school,
    },
    sameAs: socialLinks,
    contactPoint: {
      "@type": "ContactPoint",
      email: contactEmail,
      contactType: "inquiries",
    },
  };
}
