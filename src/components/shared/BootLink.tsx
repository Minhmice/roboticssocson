"use client";

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  isInternalAppPath,
  requestBootNavigation,
} from "@/lib/boot-navigation";
import { cn } from "@/lib/utils";

type BootLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  /** Skip boot transition for this link. */
  noBoot?: boolean;
};

/**
 * Internal route link that runs site boot OUT → load → IN.
 * Uses a plain anchor so Next.js Link cannot soft-navigate past the gate.
 */
export const BootLink = forwardRef<HTMLAnchorElement, BootLinkProps>(
  function BootLink(
    { href, onClick, noBoot = false, children, className, ...rest },
    ref,
  ) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || noBoot) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      if (rest.target && rest.target !== "_self") return;
      if (!isInternalAppPath(href)) return;

      // Always take over internal path changes.
      event.preventDefault();
      event.stopPropagation();

      const accepted = requestBootNavigation(href);
      if (!accepted) {
        // Soft fallback — still navigate without locking forever.
        window.location.assign(href);
      }
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        data-boot-link="true"
        className={cn(className)}
        {...rest}
      >
        {children}
      </a>
    );
  },
);
