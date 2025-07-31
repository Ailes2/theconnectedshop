import { Page, Locator, expect } from '@playwright/test';
import { UniversalMetods } from '../Utils/UniversalMethods';

export class Collactions {
  readonly page: Page; // readonly - ініціалізація локаторів
  readonly unic: UniversalMetods;
  readonly centralDescribeSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.unic = new UniversalMetods(page);
    this.centralDescribeSection = page.locator('.SectionHeader__Description');
  }

  async checkDescribeTheProduct(locator: Locator, value: string) {
    await this.unic.safeClick(locator);
    await this.unic.safeVisible(this.centralDescribeSection);
    await expect(this.centralDescribeSection).toHaveText(value);
  }
}
