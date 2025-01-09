import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Try it now!' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  
});