"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { ContactExperiencePanel } from "@/components/shared/ContactExperiencePanel";
import { MouseTrail } from "@/components/shared/MouseTrail";
import {
  contactLeadName,
  contactPhone,
  messengerUrl,
  sponsorEmail,
  socials,
} from "@/data/settings";
import { cn } from "@/lib/utils";

export type ContactExperienceMeta = {
  label: string;
  href?: string;
  external?: boolean;
};

type ContactExperienceShellProps = {
  title: string;
  email?: string;
  emailLabel?: string;
  backgroundSrc?: string;
  backgroundAlt?: string;
  meta?: ContactExperienceMeta[];
  leadingContent?: ReactNode;
  showTitle?: boolean;
  showAside?: boolean;
  children?: ReactNode;
};

export const CONTACT_EXPERIENCE_BG =
  "/Images/Achievements/FTC 2024-2025/Image  (3).webp";

const shellPadding =
  "px-[clamp(1.25rem,5vw,4.5rem)] pb-[clamp(1.25rem,3vh,2.5rem)]";

/**
 * Full-bleed photo + tech-blue wash + MouseTrail.
 * Background always spans the viewport; content sits in an inner row on register.
 */
export function ContactExperienceShell({
  title,
  email = sponsorEmail,
  emailLabel,
  backgroundSrc = CONTACT_EXPERIENCE_BG,
  backgroundAlt = "",
  meta = [],
  leadingContent,
  showTitle = true,
  showAside = true,
  children,
}: ContactExperienceShellProps) {
  const phone = contactPhone.trim();
  const phoneLabel = phone ? `${phone} — ${contactLeadName}` : "";
  const showDefaultContact = !leadingContent;
  const anchorBottom = !showAside && Boolean(leadingContent);
  const registerLayout = showAside && Boolean(children);

  const panelBlock = (
    <div
      className={cn(
        "pointer-events-none relative z-10 flex w-full min-w-0 shrink-0",
        registerLayout && "lg:min-w-0 lg:flex-[0.95]",
        anchorBottom
          ? "mt-auto pb-[clamp(0.5rem,2vh,1.25rem)]"
          : "items-start",
      )}
    >
      <div className="pointer-events-auto relative w-full min-w-0">
        {leadingContent}

        {showDefaultContact ? (
          <ContactExperiencePanel
            title={title}
            showTitle={showTitle}
            email={email}
            emailLabel={emailLabel}
            phone={phone}
            phoneLabel={phoneLabel}
            meta={meta}
            layout={registerLayout ? "register" : "default"}
          />
        ) : null}
      </div>
    </div>
  );

  const asideBlock =
    showAside && children ? (
      <div
        className={cn(
          "relative z-10 flex w-full min-w-0 flex-col items-start",
          "max-lg:pb-[calc(4.5rem+env(safe-area-inset-bottom))]",
          registerLayout && "lg:min-w-0 lg:flex-[1.05] lg:pb-0",
        )}
      >
        {children}
      </div>
    ) : null;

  return (
    <div className="min-h-dvh bg-slate-900">
      <section
        className="relative z-2 min-h-dvh overflow-hidden"
        aria-label={title}
      >
        <div className="relative z-3 min-h-dvh w-full">
          <div
            id="trail-section"
            className="relative flex min-h-dvh w-full flex-col overflow-hidden"
          >
            <MouseTrail />

            <Image
              src={backgroundSrc}
              alt={backgroundAlt}
              fill
              priority
              className="pointer-events-none z-0 object-cover object-center"
              sizes="100vw"
            />
            <div
              className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(115deg,rgba(15,23,42,0.78)_0%,rgba(15,23,42,0.42)_42%,rgba(37,99,235,0.38)_100%),linear-gradient(to_top,rgba(15,23,42,0.55)_0%,transparent_45%)]"
              data-trail-underlay
              aria-hidden
            />

            {registerLayout ? (
              <div
                className={cn(
                  "relative z-10 flex w-full min-w-0 flex-1 flex-col gap-4",
                  shellPadding,
                  "pt-[calc(4rem+0.65rem)]",
                  "lg:mx-auto lg:max-w-[min(76rem,100%)] lg:min-h-[calc(100dvh-4rem)] lg:flex-row lg:items-center lg:justify-between lg:gap-x-[clamp(1.5rem,3vw,3rem)] lg:pt-[calc(4rem+1.25rem)] lg:pb-6",
                )}
              >
                {panelBlock}
                {asideBlock}
              </div>
            ) : (
              <div
                className={cn(
                  "relative z-10 flex w-full min-w-0 flex-1 flex-col",
                  shellPadding,
                  anchorBottom
                    ? "justify-end pt-[calc(4rem+1.25rem)]"
                    : "items-start pt-[calc(4rem+3.5em)]",
                )}
              >
                {panelBlock}
                {asideBlock}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export const defaultContactMeta = (
  locale: "vi" | "en",
): ContactExperienceMeta[] => [
  {
    label: locale === "vi" ? "Nhắn Messenger" : "Message on Messenger",
    href: messengerUrl,
    external: true,
  },
  {
    label: locale === "vi" ? "Sóc Sơn, Hà Nội" : "Soc Son, Hanoi",
  },
  {
    label: "Facebook",
    href: socials.facebook,
    external: true,
  },
];
