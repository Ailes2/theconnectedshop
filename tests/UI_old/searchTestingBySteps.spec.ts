import { test } from '@playwright/test';
import { Search } from '../../pages/search';
import { Header } from '../../pages/Header';
import { HomePage } from '../../pages/HomePage';

test.describe('Go to home page', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();
  });

  test('Search input is open and working', async ({ page }) => {
    const header = new Header(page);
    const search = new Search(page, header);
    const query = 'Smart water Temperature sensor';

    await test.step('Search input is opening', async () => {
      await search.openSearchPanel();
    });

    await test.step('Possible to fill text in search input', async () => {
      await search.searchFill(query);
    });

    await test.step('Check amount results', async () => {
      await search.assertResultAmount();
    });

    await test.step('Search input is hidden after close', async () => {
      await search.assertFirstProductContains(query);
    });
  });
});
