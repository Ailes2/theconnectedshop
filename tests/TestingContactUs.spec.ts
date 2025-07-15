import { test, expect } from '@playwright/test';

test.describe('Login to site theconnectedshop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://theconnectedshop.com/pages/contact-us');
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
    await fieldEmail.fill('woboja8543@jxbav.com');
    await fieldPhone.fill('0999999999');
    await fieldmessage.fill('Не переймайтесь. Тест');

    await page.setDefaultTimeout(1000);
    await buttonSendMessage.click();

    //чомусь на цьому кроці пише повідомлення "Хост theconnectedshop.com відхилив запит на з’єднання."
    const alertText = page.locator('div.Rte p.Alert');
    await expect(alertText).toBeVisible();
    await expect(alertText).toHaveText('Your message has been successfully sent.');
  });
});
