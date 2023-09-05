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

  it('should drop CS102 after clicking "drop button"', async () => {
    const cs102DropButton = element(by.id('course2_dropButton'));
    await cs102DropButton.tap();
    await element(by.text('Delete')).tap();
    await expect(element(by.id('course2_dropButton'))).not.toExist();
  });

  it('should be able to add CS102 again after dropping it', async () => {
    const addButton = element(by.text('Add Course'));
    await addButton.tap();
    await expect(element(by.text('Confirm'))).toBeVisible();

    await element(by.text('Select a course')).tap();
    await element(by.id('modalScroller')).swipe('up');
    await element(by.text('CS102')).tap();
    await element(by.text('Confirm')).tap();

    //I cant understand this error
    await expect(element(by.id('course2_dropButton'))).toExist();
  });
});
