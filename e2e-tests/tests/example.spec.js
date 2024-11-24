// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://quiz-app-2024.deno.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Learning App");
});