// @ts-check

const { test, expect } = require('@playwright/test');

const LoginId= 'name'+Math.floor(Math.random() * 1000)+'email.com'
const password= 'abcdefg'+ Math.floor(Math.random() * 1000);


test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Learning app");
});


test('Login page when clicking try it now!', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Try it now!' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  
});


test('Try registering', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Try it now!' }).click();
  await page.getByRole('paragraph').getByRole('button', { name: 'Register' }).click();
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill(LoginId);
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password', { exact: true }).fill(password);
  await page.getByPlaceholder('Enter your password', { exact: true }).press('Tab');
  await page.getByPlaceholder('Re-enter your password').fill(password);
  await page.locator('input[type="submit"]').click();
  await page.getByPlaceholder('Enter your email').fill(LoginId);
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.locator('input[type="submit"]').click();


  await expect(page.getByText(LoginId)).toBeVisible();
  
});