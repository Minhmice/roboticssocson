"use client";

import Image from "next/image";
import type { ReactNode } from "react";
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
  /** Content below the page title (contact-us info list). */
  leadingContent?: ReactNode;
  /** Hide the shell h1 when leading content carries the page title. */
  showTitle?: boolean;
  /** Right column for forms. Off on contact-us. */
  showAside?: boolean;
  children?: ReactNode;
};

export const CONTACT_EXPERIENCE_BG =
  "/Images/Achievements/FTC 2024-2025/Image  (3).webp";

/**
 * Full-bleed photo + tech-blue wash + MouseTrail.
 * Default: title top-left, form bottom-right. Navbar/Footer from AppShell.
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

  return (
    <div className="min-h-dvh bg-slate-900">
      <section
        className="relative z-2 min-h-dvh overflow-hidden"
        aria-label={title}
      >
        <div className="relative z-3 min-h-dvh w-full">
          <div
            id="trail-section"
            className={cn(
              "relative flex min-h-dvh flex-col overflow-hidden px-[clamp(1.25rem,5vw,4.5rem)] pb-[clamp(2rem,4vh,3.75rem)]",
              anchorBottom
                ? "justify-end pt-[calc(4rem+1.25rem)]"
                : "pt-[calc(4rem+3.5em)]",
              showAside
                ? "items-start gap-10 lg:flex-row lg:items-start lg:gap-[clamp(2.5rem,5vw,4.75rem)]"
                : "items-start",
            )}
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
              aria-hidden
            />

            <div
              className={cn(
                "pointer-events-none relative z-100 flex w-full",
                anchorBottom
                  ? "mt-auto pb-[clamp(0.5rem,2vh,1.25rem)]"
                  : "items-start",
              )}
            >
              <div className="pointer-events-auto relative flex w-full max-w-184 flex-col items-start gap-5 lg:w-[min(42em,92vw)]">
                {showTitle ? (
                  <h1 className="pointer-events-none m-0 text-balance text-[clamp(3rem,8vw,5.85rem)] font-black leading-[0.98] tracking-tight text-white [text-shadow:0_2px_24px_rgba(15,23,42,0.35)] max-[991px]:text-[clamp(2.6rem,12vw,4rem)] max-[479px]:text-[clamp(2.35rem,13vw,3.2rem)]">
                    {title}
                  </h1>
                ) : null}

                {leadingContent}

                {showDefaultContact && (
                  <div className="flex w-full flex-col gap-5 xl:flex-row xl:items-start xl:gap-[clamp(1.75rem,3.5vw,3rem)]">
                    <div className="flex flex-col gap-5">
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex w-fit flex-col items-start gap-0.5 no-underline group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                      >
                        <span className="text-[clamp(0.88rem,1.35vw,1.12rem)] font-medium uppercase tracking-[0.06em] leading-tight text-white max-[479px]:text-[0.82rem]">
                          {emailLabel ?? email}
                        </span>
                        <span className="h-px w-full bg-white opacity-90 transition-[background-color,height] duration-200 group-hover:h-0.5 group-hover:bg-primary" />
                      </a>

                      {phone ? (
                        <a
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                          className="inline-flex w-fit flex-col items-start gap-0.5 no-underline group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                        >
                          <span className="text-[clamp(0.88rem,1.35vw,1.12rem)] font-medium uppercase tracking-[0.06em] leading-tight text-white/95 max-[479px]:text-[0.82rem]">
                            {phoneLabel}
                          </span>
                          <span className="h-px w-full bg-white/80 opacity-90 transition-[background-color,height] duration-200 group-hover:h-0.5 group-hover:bg-primary" />
                        </a>
                      ) : null}
                    </div>

                    {meta.length > 0 && (
                      <div className="pointer-events-auto flex w-full max-w-[28ch] flex-col gap-1.5 xl:max-w-[22ch] xl:shrink-0 xl:pt-0.5">
                        {meta.map((item) =>
                          item.href ? (
                            <a
                              key={item.label}
                              href={item.href}
                              className="w-fit max-w-full border-b border-white/45 text-[clamp(0.78rem,1.1vw,0.9rem)] font-medium uppercase tracking-[0.04em] leading-snug text-pretty text-white no-underline transition-colors hover:border-white rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                              target={item.external ? "_blank" : undefined}
                              rel={
                                item.external ? "noopener noreferrer" : undefined
                              }
                            >
                              {item.label}
                            </a>
                          ) : (
                            <p
                              key={item.label}
                              className="m-0 max-w-full text-[clamp(0.78rem,1.1vw,0.9rem)] font-medium uppercase tracking-[0.04em] leading-snug text-pretty text-white"
                            >
                              {item.label}
                            </p>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {showAside && children ? (
              <div className="relative z-100 flex w-full flex-col items-start pt-0 lg:ml-auto lg:mt-auto lg:w-[min(42em,100%)] lg:self-stretch lg:pt-8">
                {children}
              </div>
            ) : null}
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
