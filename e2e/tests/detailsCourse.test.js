import {element, by} from 'detox';
import {loginWithImage} from '../helpers/testHelpers';

import Data from '../data/data';
const {MainAcc, SecImageNumber} = Data;

describe('Change Security Image Test', () => {
  beforeAll(async () => {
    await loginWithImage(MainAcc.mail, MainAcc.password, SecImageNumber);
  });

  it('should display courses page, list of courses appear', async () => {
    await element(by.text('My Courses')).tap();
    await expect(element(by.id('courseList'))).toBeVisible();
  });

  it('should display details of course CS102 when clicked to the details button', async () => {
    await element(by.text('My Courses')).tap();
    const cs102DetailsButton = element(by.id('course2_detailsButton'));
    await cs102DetailsButton.tap();
    await expect(element(by.id('course2_description'))).toBeVisible();
  });
});
