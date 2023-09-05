import {element, by} from 'detox';
import {loginWithImage} from '../helpers/testHelpers';

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

  it('should display popup to change email when clicked to the button', async () => {
    await element(by.text('Change Email')).tap();
    await expect(element(by.text('Confirm'))).toBeVisible();
  });

  it('should change the email adress and display the new address on profile page', async () => {
    await element(by.id('newEmailInput')).typeText('onur2@example.com');
    await element(by.text('Confirm')).tap();

    await expect(element(by.text('E-Mail: onur2@example.com'))).toExist();
  });

  it('should logout and login with the new email', async () => {
    await element(by.text('Logout')).tap();

    await element(by.id('emailField')).typeText('onur2@example.com');
    await element(by.id('passwordField')).typeText('12345');
    await element(by.id('loginButton')).tap();

    await expect(element(by.text('Pick Your Security Image'))).toBeVisible();
  });
});
