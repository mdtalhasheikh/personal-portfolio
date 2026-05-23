import { expect, test } from "@playwright/test";

test("portfolio home page exposes key sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Mohammad Talah Sheikh" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Ask an AI version/i })).toBeVisible();
  await expect(page.getByLabel("Ask the Digital Twin")).toBeVisible();
  await expect(page.getByRole("link", { name: /privacy notice/i })).toBeVisible();
  await page.getByRole("button", { name: "Request direct contact details" }).click();
  await expect(page.getByRole("dialog", { name: "Request direct contact details" })).toBeVisible();
  await expect(page.getByLabel("Reply email")).toBeVisible();
});
