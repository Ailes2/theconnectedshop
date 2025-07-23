import { test, expect } from '@playwright/test';
import { log, timeLog } from 'console';
import { loadavg } from 'os';

test.describe('Login to site theconnectedshop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/contact-us');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Send the message for contact us', async ({ page }) => {
    const fieldName = page.locator('input[name="contact[name]"]');
    const fieldEmail = page.locator(
      'input[type="email"][name="contact[email]"][aria-label="Your email"]',
    );
    const fieldPhone = page.locator('input[name="contact[Your phone]"]');
    const fieldmessage = page.locator('textarea[name="contact[body]"]');

    const buttonSendMessage = page.locator(
      'button.Form__Submit.Button.Button--primary.Button--full',
    );

    await expect(fieldName).toHaveAttribute('placeholder', 'Your name');
    await expect(fieldEmail).toHaveAttribute('placeholder', 'Your email');
    await expect(fieldPhone).toHaveAttribute('placeholder', 'Your phone');
    await expect(fieldmessage).toHaveAttribute('placeholder', 'Your message');
    await expect(fieldmessage).toHaveAttribute('cols', '30');
    await expect(fieldmessage).toHaveAttribute('rows', '10');

    await fieldName.fill('Roman');
    await expect(fieldName).toHaveValue('Roman');
    await fieldEmail.fill('woboja8543@jxbav.com');
    await expect(fieldEmail).toHaveValue('woboja8543@jxbav.com');
    await fieldPhone.fill('0999999999');
    await expect(fieldPhone).toHaveValue('0999999999');
    await fieldmessage.fill('Не переймайтесь. Тест');
    await expect(fieldmessage).toHaveValue('Не переймайтесь. Тест');
    await buttonSendMessage.click();

    //Незнаю як далі, зявилась капча після кліку
    // const successMessage = page.locator('#contact_form .note.form-success');
    // await expect(successMessage).toBeVisible();
    // await expect(successMessage).toHaveText('Your message has been successfully sent.');
  });
});
