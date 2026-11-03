import { expect, test } from "@playwright/test";

const RESUME_KEY = "ftc-manual:resume:v1";

test.describe("/luat-ftc reading position", () => {
  test("hash deep link lands on a lazy chunk, saves position, reload offers resume, hash wins over resume", async ({ page }) => {
    await page.goto("/luat-ftc#G205", { waitUntil: "domcontentloaded" });
    const rule = page.locator("#G205");
    await expect(rule).toBeVisible({ timeout: 20_000 });

    // lands under the sticky chrome (navbar + manual bar), not hidden behind it
    await expect.poll(async () => (await rule.boundingBox())?.y ?? -1).toBeGreaterThan(100);
    await expect.poll(async () => (await rule.boundingBox())?.y ?? 9999).toBeLessThan(200);

    // reader moves on; position is debounced into localStorage as an anchor, never pixels
    await page.mouse.wheel(0, 900);
    await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), RESUME_KEY), { timeout: 8_000 }).toContain('"v":"TU06"');
    // the save is debounced: wait until the stored anchor stops changing, else we compare against a stale first write
    await expect
      .poll(
        async () => {
          const before = await page.evaluate((k) => localStorage.getItem(k), RESUME_KEY);
          await page.waitForTimeout(1_200);
          return before === (await page.evaluate((k) => localStorage.getItem(k), RESUME_KEY));
        },
        { timeout: 10_000 },
      )
      .toBe(true);
    const saved = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), RESUME_KEY)) ?? "{}");
    expect(saved).toMatchObject({ v: "TU06", c: expect.stringMatching(/^s11-/) });
    expect(saved).not.toHaveProperty("y");

    // fresh visit without a hash: offered, and "Đọc tiếp" scrolls to the saved anchor
    await page.goto("/luat-ftc", { waitUntil: "domcontentloaded" });
    const banner = page.getByRole("region", { name: "Tiếp tục đọc" });
    await expect(banner).toBeVisible({ timeout: 20_000 });
    await banner.getByRole("button", { name: "Đọc tiếp" }).click();
    const target = page.locator(`[id="${saved.a}"]`);
    await expect.poll(async () => (await target.boundingBox())?.y ?? -1, { timeout: 15_000 }).toBeGreaterThan(100);
    expect(page.url()).not.toContain("#"); // resuming is not a navigation

    // an explicit hash always beats the saved position: no banner
    await page.goto("/luat-ftc#I301", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#I301")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole("region", { name: "Tiếp tục đọc" })).toHaveCount(0);
  });

  test("storage from another manual version is ignored", async ({ page }) => {
    await page.addInitScript((k) => {
      localStorage.setItem(k, JSON.stringify({ v: "TU05", a: "G205", c: "s11-2", p: 101, t: Date.now() }));
    }, RESUME_KEY);
    await page.goto("/luat-ftc", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1, name: /Luật thi đấu FTC/ })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole("region", { name: "Tiếp tục đọc" })).toHaveCount(0);
  });
});
