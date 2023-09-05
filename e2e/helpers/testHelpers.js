import {element, by, device} from 'detox';

beforeAll(async () => {
  await device.launchApp();
});

export async function login(email, password) {
  await element(by.id('emailField')).typeText(email);
  await element(by.id('passwordField')).typeText(password);
  await element(by.id('loginButton')).tap();

  await expect(element(by.text('Pick Your Security Image'))).toBeVisible();
}

export async function loginWithImage(email, password, radioItemKey) {
  await login(email, password);

  await element(by.id(radioItemKey + '_radioButton')).tap();
  await element(by.text('Confirm')).tap();

  await expect(element(by.text('Welcome!'))).toBeVisible();
}
