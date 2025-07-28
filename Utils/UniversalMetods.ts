import { expect, Page, Locator } from '@playwright/test';

export class UniversalMetods {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async safeClick(locator: Locator, description = 'element') {
    try {
      await this.safeVisible(locator, description);
      await locator.click();
    } catch (error) {
      throw new Error(`Failed to click on ${description}: ${error}`);
    }
  }

  async safeFill(locator: Locator, value: string, description = 'input') {
    try {
      await this.safeVisible(locator, description);
      await locator.fill(value);
      await expect(locator).toHaveValue(value);
    } catch (error) {
      throw new Error(`Failed to fill ${description} with value "${value}": ${error}`);
    }
  }

  async safeVisible(locator: Locator, description = 'element') {
    try {
      await expect(locator).toBeVisible();
    } catch (error) {
      throw new Error(`${description} is not visible: ${error}`);
    }
  }

  async safeHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  async getText(locator: Locator): Promise<string> {
    await this.safeVisible(locator);
    const text = await locator.textContent();
    return text?.trim() || ''; // більше дізнатись
  }

  async safeToHaveAttributes(
    locator: Locator,
    param: string,
    value: string,
    description = 'attribute',
  ) {
    try {
      await this.safeVisible(locator, description);
      await expect(locator).toHaveAttribute(param, value);
    } catch (error) {
      throw new Error(`${description} is not find: ${error}`);
    }
  }
}
