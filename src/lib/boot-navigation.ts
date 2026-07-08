/**
 * Bridge between links and BootLoader so route transitions can run
 * OUT → load → IN.
 *
 * Uses window global so Next.js HMR / split chunks never desync
 * handler registration from BootLink consumers.
 */

export type BootNavHandler = (href: string) => boolean;

const GLOBAL_KEY = "__rbsBootNavHandler";

function getHandler(): BootNavHandler | null {
  if (typeof window === "undefined") return null;
  return (
    (window as Window & { [GLOBAL_KEY]?: BootNavHandler | null })[GLOBAL_KEY] ??
    null
  );
}

export function setBootNavigationHandler(next: BootNavHandler | null): void {
  if (typeof window === "undefined") return;
  (window as Window & { [GLOBAL_KEY]?: BootNavHandler | null })[GLOBAL_KEY] =
    next;
}

/** Returns true when BootLoader accepted and will drive navigation. */
export function requestBootNavigation(href: string): boolean {
  const handler = getHandler();
  if (!handler) return false;
  return handler(href);
}

export function isInternalAppPath(href: string): boolean {
  if (!href) return false;
  if (href.startsWith("#")) return false;
  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  ) {
    return false;
  }
  return href.startsWith("/");
}
