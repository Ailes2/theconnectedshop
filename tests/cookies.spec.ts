import { test, expect } from '@playwright/test';

test.describe('Check cookies', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Check localization cookie', async ({ context }) => {
    const cookies = await context.cookies();
    // console.log(cookies);
    const localization = cookies.find((c) => c.name === 'localization');
    await expect(localization).toBeDefined();

    await expect(localization?.value).toBe('UA');
    await expect(localization?.domain).toBe('theconnectedshop.com');
    await expect(localization?.path).toBe('/');
  });

  test('Check currency cookie', async ({ context }) => {
    const cookies = await context.cookies();
    const currencyCart = cookies.find((c) => c.name === 'cart_currency');
    // console.log(currencyCart);
    await expect(currencyCart).toBeDefined();

    await expect(currencyCart?.value).toBe('UAH');
    await expect(currencyCart?.domain).toBe('theconnectedshop.com');
    await expect(currencyCart?.path).toBe('/');
  });
});
