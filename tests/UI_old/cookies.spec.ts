import { test, expect } from '@playwright/test';
import { Cookies } from '../../pages/Cookies';
import { HomePage } from '../../pages/HomePage';

test.describe('Go to home page', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();
  });

  test('Check localization', async ({ context }) => {
    const cookie = new Cookies(context);
    await cookie.cookiesLocalization();

    await cookie.cookiesCurrencyCart();
  });
});
