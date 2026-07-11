import { expect, test } from "@playwright/test";
import { MCU_SLIDE_INDEX, deckPassword, ensureDeckAuthenticated, openDeckSlide } from "./helpers/deck";

test.describe("Deck slide 4/26 — MCU flow diagram", () => {
  test.beforeEach(async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      const text = msg.text();
      if (msg.type() === "error" || text.includes("strokeOpacity") || text.includes("not animatable")) {
        consoleErrors.push(text);
      }
    });
    page.on("pageerror", (err) => {
      consoleErrors.push(err.message);
    });

    await page.emulateMedia({ reducedMotion: "reduce" });
    await openDeckSlide(page, MCU_SLIDE_INDEX, "deck-slide-4-layout");

    const errorsAfterLoad = [...consoleErrors];
    expect(errorsAfterLoad, `Console errors: ${errorsAfterLoad.join(" | ")}`).toEqual([]);
  });

  test("renders diagram, title, and bullet copy", async ({ page }) => {
    await expect(page.getByTestId("mcu-flow-diagram")).toBeVisible();
    await expect(page.getByRole("heading", { name: /vai trò trung tâm/i })).toBeVisible();
    await expect(page.getByText("Tiếp nhận dữ liệu từ môi trường")).toBeVisible();
    await expect(page.getByText("Xử lý khoảng cách, màu sắc và góc nghiêng")).toBeVisible();
    await expect(page.getByText("Điều khiển động cơ, servo và cơ cấu chấp hành")).toBeVisible();
  });

  test("diagram node labels stay inside their boxes", async ({ page }) => {
    const overflow = await page.evaluate(() => {
      const diagram = document.querySelector('[data-testid="mcu-flow-diagram"] svg');
      if (!diagram) return ["missing diagram svg"];

      const issues: string[] = [];
      const nodes = diagram.querySelectorAll('g[data-testid^="mcu-node-"][role="button"]');

      nodes.forEach((nodeGroup) => {
        const box = nodeGroup.querySelector('[data-testid="mcu-node-box"]') as SVGGraphicsElement | null;
        const title = nodeGroup.querySelector('[data-testid="mcu-node-title"]') as SVGGraphicsElement | null;
        const subtitle = nodeGroup.querySelector('[data-testid="mcu-node-subtitle"]') as SVGGraphicsElement | null;
        if (!box || !title || !subtitle) {
          issues.push(`missing parts in ${nodeGroup.getAttribute("data-testid")}`);
          return;
        }

        const boxRect = box.getBBox();
        const pad = 4;

        for (const label of [title, subtitle]) {
          const labelRect = label.getBBox();
          if (labelRect.x < boxRect.x - pad) issues.push(`${nodeGroup.getAttribute("data-testid")} label left overflow`);
          if (labelRect.x + labelRect.width > boxRect.x + boxRect.width + pad) {
            issues.push(`${nodeGroup.getAttribute("data-testid")} label right overflow`);
          }
          if (labelRect.y < boxRect.y - pad) issues.push(`${nodeGroup.getAttribute("data-testid")} label top overflow`);
          if (labelRect.y + labelRect.height > boxRect.y + boxRect.height + pad) {
            issues.push(`${nodeGroup.getAttribute("data-testid")} label bottom overflow`);
          }
        }

        const titleRect = title.getBBox();
        const subtitleRect = subtitle.getBBox();
        if (subtitleRect.y < titleRect.y + titleRect.height - 2) {
          issues.push(`${nodeGroup.getAttribute("data-testid")} title/subtitle overlap`);
        }
      });

      return issues;
    });

    expect(overflow, overflow.join("; ")).toEqual([]);
  });

  test("diagram fills the left column at 1280×720", async ({ page }) => {
    const layout = page.getByTestId("deck-slide-4-layout");
    const diagram = page.getByTestId("mcu-flow-diagram");
    const layoutBox = await layout.boundingBox();
    const diagramBox = await diagram.boundingBox();
    expect(layoutBox).not.toBeNull();
    expect(diagramBox).not.toBeNull();

    const diagramWidthRatio = diagramBox!.width / layoutBox!.width;
    expect(diagramWidthRatio).toBeGreaterThan(0.5);
    expect(diagramWidthRatio).toBeLessThan(0.66);
  });

  test("no strokeOpacity console errors while animation runs", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      const text = msg.text();
      if (text.includes("strokeOpacity") || text.includes("not animatable")) {
        consoleErrors.push(text);
      }
    });

    await ensureDeckAuthenticated(page);
    await page.addInitScript((index) => {
      localStorage.setItem("arduino-mblock-deck-slide", String(index));
    }, MCU_SLIDE_INDEX);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/course/arduino-mblock-deck", { waitUntil: "domcontentloaded" });

    const loginPassword = page.locator("#deck-password");
    if (await loginPassword.isVisible()) {
      await loginPassword.fill(deckPassword());
      await page.getByRole("button", { name: /bắt đầu trình chiếu/i }).click();
    }

    await page.getByTestId("deck-slide-4-layout").waitFor({ state: "visible", timeout: 15_000 });
    await page.waitForTimeout(2500);

    expect(consoleErrors, consoleErrors.join(" | ")).toEqual([]);
  });
});
