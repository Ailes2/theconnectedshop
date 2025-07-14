import { test, expect } from '@playwright/test';
import { accessSync } from 'fs';

test.describe('check header elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://theconnectedshop.com/');
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Перевірка переходу на сторінку логіну', async ({ page }) => {
    const account = page.locator('#section-header').getByText('Account'); //знайшло тільки в 2 браузерах з 3. В хромі не бачить

    // await expect(account).toBeTruthy(); //чи є в коді елемент (селектор)/можна не писати окремо, бо і так перевіряє
    await expect(account).toBeVisible(); //чи видимий елемент

    await page.waitForTimeout(1000);
    // await account.waitFor({ state: 'visible' });
    await expect(account).toHaveAttribute('href', '/account'); //Перевіряємо атрибут елементу
    await account.click();
  });

  test('Check logo elements', async ({ page }) => {
    const logoLink = page.locator('.Header__LogoLink');
    const logoPrimary = page.locator('.Header__LogoImage--primary');
    const transparent = page.locator('.Header__LogoImage--transparent');

    await expect(logoLink).toHaveAttribute('href', '/');
    await expect(logoPrimary).toHaveAttribute('alt', 'The Connected Shop Logo');
    await expect(logoPrimary).toHaveAttribute('width', '250');
    await expect(logoPrimary).toHaveAttribute('height', '75px');

    await expect(transparent).toHaveAttribute('alt', 'The Connected Shop Logo White');
    await expect(transparent).toHaveAttribute('width', '250');
    await expect(transparent).toHaveAttribute('height', '75px'); // має працювати і при вказанні тільки числового значення
  });

  test('Check search element', async ({ page }) => {
    const searchElement = page.locator('#section-header').getByText('Search');

    // await expect(searchElement).toBeTruthy();
    await expect(searchElement).toBeVisible();
    await expect(searchElement).toHaveAttribute('href', '/search');
  });

  test('Check cart element', async ({ page }) => {
    const cartElement = page.locator('#section-header').getByText('Cart (');
    const cartDrawerContainer = page.locator('#sidebar-cart');
    const iconCloseDrawer = page.getByRole('button', { name: 'Close cart' });

    await expect(cartElement).toBeTruthy();
    await expect(cartElement).toBeVisible();
    await expect(cartElement).toHaveAttribute('href', '/cart');
    await cartElement.click();

    await expect(cartDrawerContainer).toBeTruthy();
    await expect(cartDrawerContainer).toBeVisible();

    await iconCloseDrawer.click();
    await expect(cartDrawerContainer).toBeHidden();
  });

  test('Check the header animation', async ({ page }) => {
    const header = page.locator('#section-header');
    await expect(header).toBeTruthy();
    await expect(header).toHaveClass(/Header--transparent/);

    await header.hover();
    await expect(header).not.toHaveClass(
      'Header Header--initialized Header--center Header--transparent',
    );
  });
});
