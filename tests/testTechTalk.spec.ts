import { test, expect } from '@playwright/test';

test.describe('Check funktion serching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blogs/tech-talk');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Check logo "tech talk"', async ({ page }) => {
    const logo = page.locator('div.ImageHero__Image');
    const logoAttribute = await logo.getAttribute('src');

    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('data-optimumx', '1.4');
    await expect(logoAttribute).toContain(
      'from-wifi-to-bluetooth-how-smart-door-locks-stay-connected-2330569',
    );
  });
});
