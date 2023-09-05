import {element, by} from 'detox';
import {loginWithImage} from '../helpers/testHelpers';

describe('Sign Up Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should display sign up page when Sign Up button is clicked', async () => {
    const signUpButton = element(by.text('Sign up'));

    await signUpButton.tap();

    await expect(element(by.id('signupButton'))).toBeVisible();
  });

  it('should fill the required places and create the account successfully', async () => {
    await element(by.id('usernameField')).typeText('Mert Çetin');
    await element(by.id('emailField')).typeText('mert@example.com');
    await element(by.id('departmentField')).typeText('EEE');
    await element(by.id('semesterField')).typeText('5');
    await element(by.id('semesterField')).tapReturnKey();
    await element(by.id('passwordField')).typeText('12345');
    await element(by.id('semesterField')).tapReturnKey();

    const signUpButton = element(by.text('Sign up'));

    await signUpButton.tap();

    await expect(
      element(by.text('Account created successfully!')),
    ).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should show the right information in profile page', async () => {
    await loginWithImage('mert@example.com', '12345', '3');

    const MyProfileButton = element(by.text('My Profile'));

    await MyProfileButton.tap();

    await expect(element(by.text('Mert Çetin'))).toBeVisible();
  });
});
