const LIST_ID = "manual-list";
const FLASH_MS = 1800;
const QUIET_MS = 600; // stop re-aligning after the layout has been still this long
const MAX_MS = 3000;
const USER_INPUT = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

let cancelLock: (() => void) | null = null;

/** True while a programmatic jump is still re-aligning (don't persist the transient position). */
export const isScrollLocked = () => cancelLock !== null;

function flash(el: HTMLElement) {
  el.classList.remove("manual-flash");
  void el.offsetWidth; // restart the animation when jumping to the same element twice
  el.classList.add("manual-flash");
  window.setTimeout(() => el.classList.remove("manual-flash"), FLASH_MS);
}

/**
 * Jump to an element and keep it aligned while lazy chunks around it change height.
 * `behavior: "instant"` is explicit: the page sets `scroll-behavior: smooth` on <html>, and a smooth
 * animation across tens of thousands of px is useless and fights the re-alignment.
 * Any user input cancels the lock so we never fight the reader.
 */
export function scrollToAnchor(el: HTMLElement, opts: { flash?: boolean } = {}): void {
  cancelLock?.();
  const align = () => el.scrollIntoView({ block: "start", behavior: "instant" });
  align();
  if (opts.flash !== false) flash(el);

  const started = performance.now();
  let lastChange = started;
  const ro = new ResizeObserver(() => {
    lastChange = performance.now();
    align();
  });
  ro.observe(document.getElementById(LIST_ID) ?? document.body);

  const stop = () => {
    window.clearInterval(timer);
    ro.disconnect();
    for (const ev of USER_INPUT) window.removeEventListener(ev, stop);
    if (cancelLock === stop) cancelLock = null;
  };
  const timer = window.setInterval(() => {
    const now = performance.now();
    if (now - lastChange > QUIET_MS || now - started > MAX_MS) stop();
  }, 100);
  for (const ev of USER_INPUT) window.addEventListener(ev, stop, { passive: true });
  cancelLock = stop;
}

/** Resolve once the element is in the DOM (chunk just rendered), or null after the timeout. */
export function waitForElement(id: string, timeoutMs = 2500): Promise<HTMLElement | null> {
  const { promise, resolve } = Promise.withResolvers<HTMLElement | null>();
  const start = performance.now();
  const tick = () => {
    const el = document.getElementById(id);
    if (el) return resolve(el);
    if (performance.now() - start > timeoutMs) return resolve(null);
    requestAnimationFrame(tick);
  };
  tick();
  return promise;
}
