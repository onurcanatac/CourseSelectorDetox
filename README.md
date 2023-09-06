# Course Selector Application with Detox E2E Tests
A course selector application that I have built with React Native for the purpose of learning and utilizing Detox E2E Testing.

## What is Detox, Why is it Useful?
Detox is a grey-box E2E (end-to-end) testing framework for mobile (mainly React Native) applications. It simulates user scenarios in an application by behaving like a user. It also has other benefits, such as the elimination of the need to add custom wait statements since it automatically detects API requests. More information on [their website](https://wix.github.io/Detox/).

## How to Set The Project Up?
The configuration of Detox framework in the project is made from the ".detoxrc.js" file in the root directory of the project. The tests are stored in the "e2e" folder.

After the download of the project from Github, you have to apply some commands in the root terminal to make the project work:

* This command downloads the dependencies to the project: ```npm install```.

* Detox works in integration with Jest, if you have Jest in any version higher than 27.x, it should work fine. For those who don't: ```npm install "jest@^29" --save-dev```.

* Now we can upload the dependencies for Detox: ```npm install detox --save-dev```.

* Lastly, initialize Detox to the project: ```detox init```.

The project should be good to go!

## How Does It Work with The Application?
I tested Detox for android, using Android Studio emulators (since I have a Windows computer). After running the application on a metro server (by typing ```npm run android```), Detox can be built in android debug mode by ```detox build --configuration android.emu.debug```. After that, by the command  ```detox test --configuration android.emu.debug```, the application launches an Android Studio emulator automatically and run the tests on that emulator. The results (fail, pass and other details) of the tests can be seen in the terminal:

Note: If you want to run a specific test, you can add the path of the test after the generic command: ```detox test --configuration android.emu.debug [PATH]```.


![CourseSelector1](https://github.com/onurcanatac/CourseSelectorDetox/assets/32818778/838f0179-e321-45be-bc56-f3fe7d7e1cec)


You can also run the tests on multiple emulators, regarding how long and how many your tests are, by adding a basic command line argument to the test statement: ```detox test --configuration android.emu.debug -w 4``` (4 emulators in this instance):


![CourseSelector2](https://github.com/onurcanatac/CourseSelectorDetox/assets/32818778/36c9867d-1293-4d03-bcb8-63b610f77301)

Thank you for checking the project out! You can have more information about Detox using [their guides](https://wix.github.io/Detox/docs/api/device/).


