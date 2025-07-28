import { expect, Page, Locator } from '@playwright/test';
import { Header } from './Header';
import { UniversalMetods } from '../Utils/UniversalMethods';

export class Search extends UniversalMetods {
  // readonly page: Page;
  readonly header: Header;
  readonly searchLink: Locator;
  readonly searchInput: Locator;
  readonly searchAmountResult: Locator;
  readonly searchClose: Locator;
  readonly firstProductTitle: Locator;

  constructor(page: Page, header: Header) {
    // this.page = page;
    super(page);
    this.header = header;
    this.searchLink = this.header.selectionHeader.locator('a', { hasText: 'Search' });
    this.searchInput = page.locator('input[name="q"]');
    this.searchAmountResult = page.locator('div.Segment__Title span.Heading.Text--subdued.u-h7', {
      hasText: /results$/,
    });
    this.searchClose = page.locator('button.Search__Close');
    this.firstProductTitle = page.locator('h2.ProductItem__Title a').first();
  }

  async openSearchPanel() {
    // await expect(this.searchLink).toBeVisible();
    await this.safeVisible(this.searchLink, 'SerchPage is visible');
    // await this.searchLink.click();
    await this.safeClick(this.searchLink, 'SearchPage was clicked');
  }

  async assertSearchInputAttributes() {
    this.safeToHaveAttribute(this.searchInput, 'placeholder', 'Search...');
    this.safeToHaveAttribute(this.searchInput, 'type', 'search');
    this.safeToHaveAttribute(this.searchInput, 'aria-label', 'Search...');

    await expect(this.searchInput).toBeVisible();
  }

  async searchFill(query: string) {
    await this.searchInput.fill(query);
    await expect(this.searchInput).toHaveValue(query);
  }

  async assertResultAmount() {
    const resultText = await this.searchAmountResult.textContent();
    const match = resultText?.match(/(\d+)\s+results/);
    await expect(match).not.toBeNull();
    const resultCount = Number(match![1]);
    await expect(resultCount).toBeGreaterThan(0);
  }

  async assertFirstProductContains(query: string) {
    const productText = await this.firstProductTitle.textContent();
    await expect(productText?.toLowerCase()).toContain(query.toLowerCase());
    await this.searchClose.click();
    await expect(this.searchInput).toBeHidden(); //краще вибирати toBeHidden. Бо якщо використовувати not можуть бути помилки
  }
  //
}
