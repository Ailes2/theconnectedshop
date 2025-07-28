import { test } from '@playwright/test';
import { Search } from '../../pages/search';
import { Header } from '../../pages/Header';
import { UniversalMetods } from '../../Utils/UniversalMethods';
import { HomePage } from '../../pages/HomePage';

test('check exist element', async ({ page }) => {
  const homePage = new HomePage(page);
  const header = new Header(page);
  const search = new Search(page, header);
  const universalMetods = new UniversalMetods(page);

  await homePage.goToHomePage();

  await search.openSearchPanel();
  const query = 'Smart water Temperature sensor';

  await search.assertSearchInputAttributes();

  await universalMetods.safeFill(search.searchInput, query, 'Search fild');

  // await search.searchFill(query);
  await search.assertResultAmount();
  // await search.assertFirstProductContains(query);
});
