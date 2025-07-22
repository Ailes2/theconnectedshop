import { test, expect } from '@playwright/test';

test.describe('Check cookies', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Check localization cookie', async ({ context }) => {
    const cookies = await context.cookies();
    console.log(cookies);
    const localization = cookies.find((c) => c.name === 'localization');
    const now = Date.now() / 1000;
    const minExpireData = now + 60 * 60 * 24 * 364; // 60 секунд і 60 хвилин, 24 години на день, 363 днів (похибка на мінус 1 день)
    const maxExpireData = now + 60 * 60 * 24 * 366; //а тут похибка на +1 день

    await expect(localization).toBeDefined();
    await expect(localization?.value).toBe('UA');
    await expect(localization?.domain).toBe('theconnectedshop.com');
    await expect(localization?.path).toBe('/');
    await expect(localization?.httpOnly).toBe(false);
    await expect(localization?.secure).toBe(false);
    await expect(localization?.expires).toBeGreaterThan(minExpireData);
    await expect(localization?.expires).toBeLessThan(maxExpireData);
  });

  test('Check currency cookie', async ({ context }) => {
    const cookies = await context.cookies();
    const currencyCart = cookies.find((c) => c.name === 'cart_currency');
    // console.log(currencyCart);
    const now = Date.now() / 1000;
    const minExpireData = now + 60 * 60 * 24 * 13; // 60 секунд і 60 хвилин, 24 години на день, 363 днів (похибка на мінус 1 день)
    const maxExpireData = now + 60 * 60 * 24 * 15; //а тут похибка на +1 день

    await expect(currencyCart).toBeDefined();
    await expect(currencyCart?.value).toBe('UAH');
    await expect(currencyCart?.domain).toBe('theconnectedshop.com');
    await expect(currencyCart?.path).toBe('/');
    await expect(currencyCart?.httpOnly).toBe(false);
    await expect(currencyCart?.secure).toBe(false);
    await expect(currencyCart?.expires).toBeGreaterThan(minExpireData);
    await expect(currencyCart?.expires).toBeLessThan(maxExpireData);
  });
});
