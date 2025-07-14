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
    const searchAmoutResults = page
      .locator('div.Segment__Title span.Heading.Text--subdued.u-h7')
      .filter({ hasText: /results$/ }); //довго мучався, бо локатор не унікальний і який би не робив локатор находило 2 елемента. Цей підхід підсказав gpt
    const searhResult = page.locator('div.Grid__Cell').filter({ hasText: /Smart Temperature/ });
    const searchClose = page.locator('button.Search__Close');

    await searchInput.fill('Smart Temperature');
    await searchAmoutResults.isVisible();
    await expect(searchAmoutResults).toHaveText('15 results');
    await expect(searhResult).toHaveCount(3);
    await searchClose.click();
    await page.waitForTimeout(1000);

    await expect(page.locator('div.Search_Inner')).not.toBeVisible();
  });
});
