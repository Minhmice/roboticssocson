import type { Page } from "@playwright/test";

/** Deck page 4/26 — slide id 4 (MCU diagram), zero-based index 3 */
export const MCU_SLIDE_INDEX = 3;

/** Deck page 18/26 — slide id 20 (three pillars), zero-based index 17 */
export const THREE_PILLARS_SLIDE_INDEX = 17;

export function deckPassword(): string {
  return process.env.DECK_PRESENTATION_PASSWORD ?? process.env.ANALYTICS_DASHBOARD_PASSWORD ?? "rbs2026@";
}

export async function ensureDeckAuthenticated(page: Page): Promise<void> {
  const auth = await page.request.post("/api/deck/auth", {
    data: { password: deckPassword() },
  });
  if (!auth.ok()) {
    throw new Error(`Deck auth failed: ${auth.status()} ${await auth.text()}`);
  }
}

export async function openDeckSlide(
  page: Page,
  slideIndex: number,
  readyTestId = "deck-slide-ready",
): Promise<void> {
  await ensureDeckAuthenticated(page);

  await page.addInitScript((index) => {
    localStorage.setItem("arduino-mblock-deck-slide", String(index));
  }, slideIndex);

  await page.goto("/course/arduino-mblock-deck", { waitUntil: "domcontentloaded" });

  const region = page.getByRole("region", { name: /trình chiếu/i });
  const loginPassword = page.locator("#deck-password");

  await Promise.race([
    region.waitFor({ state: "visible", timeout: 45_000 }),
    loginPassword.waitFor({ state: "visible", timeout: 45_000 }),
  ]);

  if (await loginPassword.isVisible()) {
    await loginPassword.fill(deckPassword());
    await page.getByRole("button", { name: /bắt đầu trình chiếu/i }).click();
    await region.waitFor({ state: "visible", timeout: 15_000 });
  }

  await page.getByTestId(readyTestId).waitFor({ state: "visible", timeout: 15_000 });
}

export async function verticalGap(page: Page, topSelector: string, bottomSelector: string): Promise<number> {
  const top = page.locator(topSelector);
  const bottom = page.locator(bottomSelector);
  const topBox = await top.boundingBox();
  const bottomBox = await bottom.boundingBox();
  if (!topBox || !bottomBox) {
    throw new Error(`Missing bounding box for ${topSelector} or ${bottomSelector}`);
  }
  return bottomBox.y - (topBox.y + topBox.height);
}
