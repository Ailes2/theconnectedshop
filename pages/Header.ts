import { expect, Page, Locator } from '@playwright/test';

export class Header {
  readonly page: Page; // readonly - ініціалізація локаторів
  readonly accountLink: Locator;
  readonly searchLink: Locator;
  readonly cartLink: Locator;
  readonly cartDrawer: Locator;
  readonly closeCartButton: Locator;
  readonly logoLink: Locator;
  readonly logoPrimary: Locator;
  readonly logoTransparent: Locator;
  readonly selectionHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selectionHeader = page.locator('#section-header');
    this.accountLink = this.selectionHeader.locator('a', { hasText: 'Account' });
    this.searchLink = this.selectionHeader.locator('a', { hasText: 'Search' });
    this.cartLink = this.selectionHeader.locator('a', { hasText: 'Cart (' });
    this.cartDrawer = page.locator('#sidebar-cart');
    this.closeCartButton = page.getByRole('button', { name: 'Close cart' });
    this.logoLink = page.locator('.Header__LogoLink');
    this.logoPrimary = page.locator('.Header__LogoImage--primary');
    this.logoTransparent = page.locator('.Header__LogoImage--transparent');
  }

  async openAccountPage() {
    await expect(this.accountLink).toBeVisible();
    await expect(this.accountLink).toHaveAttribute('href', '/account');
    await this.accountLink.click();
  }

  async checkLogo() {
    await expect(this.logoLink).toHaveAttribute('href', '/');
    await expect(this.logoPrimary).toHaveAttribute('alt', 'The Connected Shop Logo');
    await expect(this.logoPrimary).toHaveAttribute('width', '250');
    await expect(this.logoPrimary).toHaveAttribute('height', '75px');

    // await expect(this.logoTransparent).toHaveAttribute('alt', 'The Connected Shop Logo White');
    // await expect(this.logoTransparent).toHaveAttribute('width', '250');
    // await expect(this.logoTransparent).toHaveAttribute('height', '75px');
  }

  async checkSearchLink(name: string, value: string) {
    await expect(this.searchLink).toBeVisible();
    await expect(this.searchLink).toHaveAttribute(name, value);
  }

  async openCartAndClose() {
    await expect(this.cartLink).toBeVisible();
    await expect(this.cartLink).toHaveAttribute('href', '/cart');
    await this.cartLink.click();

    await expect(this.cartDrawer).toBeVisible();
    await this.closeCartButton.click();
    await expect(this.cartDrawer).toBeHidden();
  }

  async checkHeaderAnimation() {
    await expect(this.selectionHeader).toHaveClass(/Header--transparent/);
    await this.selectionHeader.hover();
    await expect(this.selectionHeader).not.toHaveClass(
      'Header Header--initialized Header--center Header--transparent',
    );
  }
}
