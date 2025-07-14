import { test, expect } from '@playwright/test';

test.describe('Check funktion serching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://theconnectedshop.com/');
    const searchLink = page.locator('#section-header').getByText('Search');
    searchLink.click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('check exist element', async ({ page }) => {
    const searchInput = page.locator('input[name="q"]');

    await searchInput.fill('');
    //написати тест на пошук по тексту та перевірку тих товарів які будуть виведені в результаті. Також перевірити кількість, ну короч по красивому
  });
});
