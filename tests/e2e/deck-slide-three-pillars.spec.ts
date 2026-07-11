import { expect, test } from "@playwright/test";
import {
  openDeckSlide,
  THREE_PILLARS_SLIDE_INDEX,
  verticalGap,
} from "./helpers/deck";

test.describe("Deck slide 18/26 — Ba trụ cột của một robot", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openDeckSlide(page, THREE_PILLARS_SLIDE_INDEX, "deck-three-pillars");
  });

  test("renders title and three pillar cards", async ({ page }) => {
    await expect(page.getByTestId("deck-three-pillars-title")).toContainText("Ba trụ cột");
    await expect(page.getByTestId("deck-three-pillars-card-0")).toContainText("Cơ khí");
    await expect(page.getByTestId("deck-three-pillars-card-1")).toContainText("Điện tử");
    await expect(page.getByTestId("deck-three-pillars-card-2")).toContainText("CNTT");
    await expect(page.getByTestId("deck-three-pillars-hero")).toBeVisible();
  });

  test("pillars sit directly under title without a dead middle gap", async ({ page }) => {
    const titleToBandGap = await verticalGap(
      page,
      "[data-testid='deck-three-pillars-title']",
      "[data-testid='deck-three-pillars-band']",
    );
    expect(titleToBandGap).toBeLessThan(48);

    const bandToHeroGap = await verticalGap(
      page,
      "[data-testid='deck-three-pillars-band']",
      "[data-testid='deck-three-pillars-hero']",
    );
    expect(bandToHeroGap).toBeLessThan(8);

    const band = page.getByTestId("deck-three-pillars-band");
    const region = page.getByRole("region", { name: /trình chiếu/i });
    const bandBox = await band.boundingBox();
    const regionBox = await region.boundingBox();
    expect(bandBox).not.toBeNull();
    expect(regionBox).not.toBeNull();

    const bandBottom = bandBox!.y + bandBox!.height - regionBox!.y;
    const regionHeight = regionBox!.height;
    expect(bandBottom / regionHeight).toBeLessThan(0.53);
  });

  test("hero image fills remaining slide height", async ({ page }) => {
    const hero = page.getByTestId("deck-three-pillars-hero");
    const region = page.getByRole("region", { name: /trình chiếu/i });
    const heroBox = await hero.boundingBox();
    const regionBox = await region.boundingBox();
    expect(heroBox).not.toBeNull();
    expect(regionBox).not.toBeNull();

    const heroHeightRatio = heroBox!.height / regionBox!.height;
    expect(heroHeightRatio).toBeGreaterThan(0.28);
  });
});
