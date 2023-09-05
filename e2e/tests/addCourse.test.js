import {element, by} from 'detox';
import {loginWithImage} from '../helpers/testHelpers';

import Data from '../data/data';
const {MainAcc, SecImageNumber} = Data;

describe('Add Course Tests', () => {
  beforeAll(async () => {
    await loginWithImage(MainAcc.mail, MainAcc.password, SecImageNumber);
  });

  it('should display courses page, list of courses appear', async () => {
    await element(by.text('My Courses')).tap();
    await expect(element(by.id('courseList'))).toBeVisible();
  });

  it('should open Add Course Popup when Add Course button is clicked', async () => {
    const addButton = element(by.text('Add Course'));
    await addButton.tap();
    await expect(element(by.text('Confirm'))).toBeVisible();
  });

  it('should add MATH301 course to MyCourses when it is selected', async () => {
    await element(by.text('Select a course')).tap();
    await element(by.text('MATH301')).tap();
    await element(by.text('Confirm')).tap();
    await expect(element(by.id('course8_dropButton'))).toExist();
  });

  it('should be able to drop MATH301 again after adding it', async () => {
    await element(by.id('coursesScroller')).swipe('up');

    const dropButton = element(by.id('course8_dropButton'));
    await dropButton.tap();
    await element(by.text('Delete')).tap();
    await expect(element(by.id('course8_dropButton'))).not.toExist();
  });
});
