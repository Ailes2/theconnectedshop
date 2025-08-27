import { test, expect } from '@playwright/test';
import { Search } from '../../pages/search';
import { Header } from '../../pages/Header';
import { HomePage } from '../../pages/HomePage';
import { UniversalMethods } from '../../Utils/UniversalMethods';

test.describe('Go to home page', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();
  });

  test('Search input is open and working, negative case', async ({ page }) => {
    const header = new Header(page);
    const search = new Search(page, header);
    const query = 'Smart water Temperature sensor';
    const unic = new UniversalMethods(page);

    await test.step('Search input is opening', async () => {
      await search.openSearchPanel();
    });

    await test.step('Possible to fill text in search input', async () => {
      await search.searchFill(query);
    });

    await test.step('Check amount results', async () => {
      await unic.safeHidden(search.searchAmountResult); // по ідеї достатньо перевірити що такий локатор недоступний
    });

    await test.step('Dinamic check amout of result', async () => {
      await expect
        .poll(async () => {
          const text = await search.searchAmountResult.textContent();
          const match = text?.match(/(\d+)\s+results/);
          return Number(match?.[1] ?? 0);
        })
        .toBeGreaterThan(0);
    });

    await test.step('Search input is hidden after close', async () => {
      await search.assertFirstProductContains(query);
    });
  });
});
