import {element, by} from 'detox';
import {login, loginWithImage} from '../helpers/testHelpers';

import Data from '../data/data';
const {MainAcc, SecImageNumber} = Data;

describe('Change Security Image Test', () => {
  beforeAll(async () => {
    await loginWithImage(MainAcc.mail, MainAcc.password, SecImageNumber);
  });

  it('should display profile page when clicked to "My Profile" button', async () => {
    const MyProfileButton = element(by.text('My Profile'));

    await MyProfileButton.tap();

    await expect(element(by.id('ChangeEmailButton'))).toBeVisible();
  });

  it('should display new page to change security image when clicked to the button', async () => {
    await element(by.text('Change Security Image')).tap();
    await expect(element(by.text('Confirm'))).toBeVisible();
  });

  it('should change the security image', async () => {
    await element(by.id('2' + '_radioButton')).tap();
    await element(by.text('Confirm')).tap();
  });

  it('should logout and login with the new security image', async () => {
    await element(by.text('Logout')).tap();

    await login(MainAcc.mail, MainAcc.password);

    await element(by.id('2' + '_radioButton')).tap();
    await element(by.text('Confirm')).tap();

    await expect(element(by.text('Welcome!'))).toBeVisible();
  });
});
