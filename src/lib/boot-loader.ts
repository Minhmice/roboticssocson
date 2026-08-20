/** Shared boot-loader constants (safe for server + client). */

export const BOOT_LOADER_HIDE_STYLE_ID = "rbs-boot-hide";

/** Match `.boot-aware-shell` reveal transition. */
export const BOOT_SHELL_REVEAL_MS = 500;

export function isBootLoaderDisabled(): boolean {
  return process.env.NEXT_PUBLIC_DISABLE_BOOT_LOADER === "true";
}

/** True for the marketing homepage hard load — skip the initial boot overlay. */
export function isHomepagePath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return normalized === "/";
}

/** Removes the pre-paint hide gate once React owns shell visibility. */
export function clearBootPreloadGate(): void {
  if (typeof document === "undefined") return;
  document.documentElement.removeAttribute("data-rbs-boot");
  document.getElementById(BOOT_LOADER_HIDE_STYLE_ID)?.remove();
}

/**
 * Inline head script — hides the shell before paint on every hard page load
 * except the homepage (`/`), where the marketing surface should paint immediately.
 * Keep style id in sync with BootLoader.
 */
export function getBootLoaderPreloadScript(): string {
  if (isBootLoaderDisabled()) {
    return "";
  }

  return `(function(){try{var p=location.pathname;if(p==="/"||p===""){return;}document.documentElement.setAttribute("data-rbs-boot","1");var s=document.createElement("style");s.id=${JSON.stringify(BOOT_LOADER_HIDE_STYLE_ID)};s.textContent=".boot-aware-shell{opacity:0!important;visibility:hidden!important;pointer-events:none!important}";document.documentElement.appendChild(s);}catch(e){}})();`;
}
