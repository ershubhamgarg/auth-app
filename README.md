# AuthApp

## About
This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

**AuthApp** has the basic authetication flow implmented where app state has been managed using Context API and persisted using [AsyncStorage](https://www.npmjs.com/package/@react-native-async-storage/async-storage). Also, for navigation between screens, [@react-navigation/native](https://www.npmjs.com/package/@react-navigation/native) has been integrated.

As soon as the user installs the app, and signs up with some credentials including Name, Email, password and confirm password, a user is saved with its details in the async storage and now the email and password can be used to login with that same user to go to home screen when the name and email is shown with a logout button at the bottom. Once user presses Logout button, app will navigate to Login screen.
WHen the app is un-installed, all the saved users data is removed from local storage so its a local user data only.

## To run the app

Once you have cloned the code, run following commands :

```sh
# to install node_modules
yarn
```


Now open a new terminal window/pane from the root of AuthApp project, and use one of the following commands to build and run Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you build the app, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```
If everything is set up correctly, you should see Auth App running in the Android Emulator, iOS Simulator, or your connected device.

## How the app looks 

### 1. Login Screen/ Landing page
This is the landig page as soon as user opens the app. From here user can log into the app with existing user credentials (email and password). Here both the inputs are required. Below the Login button, there is a link to navigate to signup screen if user is not already signed up.

<img width="270" height="600" alt="login" src="https://github.com/user-attachments/assets/a2036fa4-b029-452d-90b9-f0c5abdb18b2" />


### 2. Signup Screen
This is how the signup screen looks like. This screen can be accessed from Login screen by pressing the signup CTA below login button. On this screen, the user needs to fill in all the valid details to create an account on the AuthApp. Once user fills in all the valid details and presses Signup, a new user will be created in the AsyncStorage and the app will navigate to the Home page with user's details shown.

<img width="270" height="600" alt="signup" src="https://github.com/user-attachments/assets/a3369322-1a06-4688-9a25-06e50a20cc0b" />

# 3. Home screen
The home screen is in the basic state of it showing the logged in user's name and email on the top and a logout button at the bottom to log the user out and navigate back to Login screen.

<img width="270" height="600" alt="home" src="https://github.com/user-attachments/assets/6938c77f-9cc7-4e10-bf72-baf740f30132" />

## See the app in action


https://github.com/user-attachments/assets/c60f1e98-7fac-4b5b-b8ea-7626edcc58d6




## Testing the app

Jest environment and test files have been set up to test the app screens. Run below command to run the tests :


```sh
yarn test
```

