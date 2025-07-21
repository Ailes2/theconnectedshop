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
    console.log('Всього найдено стільки фреймів - ' + allFraime.length);
    const frameWebPixel = page.locator(
      '#web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-aa986369w89f019d8pedb14a83mf698ddc1',
    );

    await expect(frameWebPixel).toHaveAttribute(
      'src',
      'https://theconnectedshop.com/wpm@aa986369w89f019d8pedb14a83mf698ddc1/custom/web-pixel-shopify-custom-pixel@0440/sandbox/modern/',
    );
    await expect(frameWebPixel).toHaveAttribute(
      'name',
      'web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-aa986369w89f019d8pedb14a83mf698ddc1',
    );
    await expect(frameWebPixel).toHaveAttribute('sandbox', 'allow-scripts allow-forms'); //sandbox це атрибут який обмежує поведінку фрейму
  });
});
