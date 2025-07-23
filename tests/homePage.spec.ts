import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

let homePage: HomePage;

test.describe('Check localization', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('name', async ({}) => {
    await homePage.goToHomePage();
    await homePage.assertUrl('https://theconnectedshop.com/');
    await homePage.assertTitle(
      'The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office',
    );
  });
});
