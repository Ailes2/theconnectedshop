import { test, expect } from '@playwright/test';

test.describe('Check function serching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const searchLink = page.locator('#section-header').getByText('Search');
    await expect(searchLink).toBeVisible();
    await searchLink.click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('check exist element', async ({ page }) => {
    const searchInput = page.locator('input[name="q"]');
    const searchAmoutResults = page
      .locator('div.Segment__Title span.Heading.Text--subdued.u-h7')
      .filter({ hasText: /results$/ }); //довго мучався, бо локатор не унікальний і який би не робив локатор находило 2 елемента. Цей підхід підсказав gpt
    const searchClose = page.locator('button.Search__Close');
    const firstProductTitle = page.locator('h2.ProductItem__Title a').first(); //Перший елемент по рахунку, якщо найдено по локатору 2
    const query = 'Smart water Temperature sensor';

    await expect(searchInput).toHaveAttribute('placeholder', 'Search...');
    await expect(searchInput).toHaveAttribute('type', 'search');
    await expect(searchInput).toHaveAttribute('aria-label', 'Search...');

    await searchInput.fill(query);
    await expect(searchInput).toHaveValue(query);
    await expect(searchAmoutResults).toBeVisible();

    //Далі перевіряємо результат що поле "Results не 0"
    const resultText = await searchAmoutResults.textContent();
    const match = resultText?.match(/(\d+)\s+results/);
    await expect(match).not.toBeNull();
    const resultCount = Number(match![1]);
    await expect(resultCount).toBeGreaterThan(0);

    const productText = await firstProductTitle.textContent();
    await expect(productText?.toLowerCase()).toContain(query.toLowerCase());
    await searchClose.click();

    await expect(searchInput).not.toBeVisible();
  });
});
