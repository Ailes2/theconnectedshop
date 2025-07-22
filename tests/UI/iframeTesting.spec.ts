import { test, expect } from '@playwright/test';

test.describe('Check iframe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Check iframe attribute"', async ({ page }) => {
    const allFraime = page.frames();
    // console.log('Всього найдено ' + allFraime.length + ' фреймів');
    const frameWebPixel = page.locator(
      'iframe[id^="web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX"]',
    );

    await expect(frameWebPixel).toHaveAttribute(
      'src',
      expect.stringContaining('/custom/web-pixel-shopify-custom-pixel@0440/sandbox/modern/'),
    );

    await expect(frameWebPixel).toHaveAttribute(
      'name',
      expect.stringContaining('web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX'),
    );

    await expect(frameWebPixel).toHaveAttribute('sandbox', 'allow-scripts allow-forms'); //sandbox це атрибут який обмежує поведінку фрейму
  });
});
