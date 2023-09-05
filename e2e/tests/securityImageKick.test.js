import {element, by} from 'detox';
import {login} from '../helpers/testHelpers';

import Data from '../data/data';
const {MainAcc, SecImageNumber} = Data;

describe('Change Security Image Test', () => {
  beforeAll(async () => {
    await login(MainAcc.mail, MainAcc.password);
  });

  it('should kick the user to the login page when failed 2 times while selecting security image ', async () => {
    await element(by.id('2' + '_radioButton')).tap();
    await element(by.text('Confirm')).tap();
    await element(by.text('OK')).tap();
    await element(by.id('2' + '_radioButton')).tap();
    await element(by.text('Confirm')).tap();
    await element(by.text('OK')).tap();
    await expect(element(by.id('loginHeader'))).toBeVisible();
  });
});
