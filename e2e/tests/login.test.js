import {element, by, device} from 'detox';

describe('Login Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should display the "Login" section title', async () => {
    await expect(element(by.id('loginHeader'))).toBeVisible();
  });

  it('should display the security image page when credentials are entered', async () => {
    await element(by.id('emailField')).typeText('onur@example.com');
    await element(by.id('passwordField')).typeText('12345');
    await element(by.id('loginButton')).tap();

    //await expect(element(by.text('Pick Your Security Image'))).toBeVisible();
  });

  it('should display home page when correct image is selected', async () => {
    await element(by.id('3' + '_radioButton')).tap();
    await element(by.text('Confirm')).tap();

    await expect(element(by.text('Welcome!'))).toBeVisible();
  });
});
