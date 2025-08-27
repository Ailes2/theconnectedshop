import { test, Locator } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { UniversalMethods } from '../../Utils/UniversalMethods';
import { Collections } from '../../pages/Collections';
import { Header } from '../../pages/Header';

test.describe('Check the Collactions page', () => {
  let smartDoorProduct: Locator;
  let smartLocksProduct: Locator;
  let smartSensorsProduct: Locator;
  let cameraMonitorProduct: Locator;
  let smartRobotsProduct: Locator;
  let smartWalletsProduct: Locator;
  let carDashCamsProduct: Locator;

  let unic: UniversalMethods;
  let collact: Collections;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goToHomePage();

    smartDoorProduct = page.locator('a.CollectionItem', { hasText: 'Smart Door Locks' });
    smartLocksProduct = page.locator('a.CollectionItem', { hasText: 'Smart Locks' });
    smartSensorsProduct = page.locator('a.CollectionItem', { hasText: 'Smart Sensors' });
    cameraMonitorProduct = page.locator('a.CollectionItem', { hasText: 'Camera Monitors' });
    smartRobotsProduct = page.locator('a.CollectionItem', { hasText: 'Smart Robots' });
    smartWalletsProduct = page.locator('a.CollectionItem', { hasText: 'Smart Wallets' });
    carDashCamsProduct = page.locator('a.CollectionItem', { hasText: 'Car Dash Cams' });

    unic = new UniversalMethods(page);
    collact = new Collections(page);
    header = new Header(page);

    //Виносимо в beforeEach щоб не повторювати в кожному тесті
    await header.openCollections();
  });

  test('Check collaction products ', async ({}) => {
    //loking for collaction page in header menu and follow to page
    await header.openCollections();

    //Check all products on the page
    await unic.safeVisible(smartDoorProduct);
    await unic.safeVisible(smartLocksProduct);
    await unic.safeVisible(smartSensorsProduct);
    await unic.safeVisible(cameraMonitorProduct);
    await unic.safeVisible(smartRobotsProduct);
    await unic.safeVisible(smartWalletsProduct);
    await unic.safeVisible(carDashCamsProduct);
  });

  test('Check Smart Door Locks product', async ({}) => {
    await collact.checkDescribeTheProduct(
      smartDoorProduct,
      'Find here the latest selection of the best connected smart door locks. Smart door locks offer a convenient way to secure your home or office as well as to offer a simple way to get rid of keys. They feature, fingerprint unlock access, mobile app connection with Bluetooth, passcode key pad, physical backup keys.',
    );
  });

  test('Check smart lockes products', async ({}) => {
    await collact.checkDescribeTheProduct(
      smartLocksProduct,
      'Smart locks, door locks, bike locks and padlocks. Find here the latest selection of the best connected smart locks. Smart locks offer a convenient way to secure your home or office as well as to offer a simple way to get rid of keys. They feature, fingerprint unlock access, mobile app connection with Bluetooth, passcode key pad, physical backup keys.',
    );
  });

  test('Check smart sensor products', async ({}) => {
    await collact.checkDescribeTheProduct(
      smartSensorsProduct,
      'Smart sensors. Find here the latest selection of the best connected smart sensors. Smart sensors offer a convenient way to secure your home or office.',
    );
  });

  test('Check camera monitors products', async ({}) => {
    await collact.checkDescribeTheProduct(
      cameraMonitorProduct,
      'Smart camera monitors. Find here the latest selection of the best connected camera monitors. Smart camera monitors offer a convenient way to secure your home or office.',
    );
  });

  test('Check robots products', async ({}) => {
    await collact.checkDescribeTheProduct(
      smartRobotsProduct,
      'Smart robots. Find here the latest selection of the best connected robots. Smart robots offer a convenient way to help make your life easier in your home or office.',
    );
  });

  test('Check smart wallets products', async ({}) => {
    await collact.checkDescribeTheProduct(
      smartWalletsProduct,
      'Smart Wallets and Smart Card Holders. Find here the latest selection of the trendiest connected Bluetooth wallets. Smart wallets offer a convenient way to store and transport your money, your credit cards and ID as well as to protect you against loss or theft. They feature, device tracking, and modern design all in genuine leather.',
    );
  });

  test('Check car dash cams products', async ({}) => {
    await collact.checkDescribeTheProduct(
      carDashCamsProduct,
      'Smart dash cams. Find here the latest selection of the best connected smart dash cams. Smart dash cams offer a convenient way to secure car.',
    );
  });
});

//треба зробити 1 класс на всі ці одинакові перевірки, а то шо я туплю
