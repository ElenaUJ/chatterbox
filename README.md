# Chatterbox (Mobile Chat App)

## Table of Contents

- [Overview](#overview)
  - [Core Features](#core-features)
- [How to Run](#how-to-run)
- [Links](#links)
- [Process](#process)
  - [Technologies used](#technologies-used)
  - [Dependencies](#dependencies)

## Overview

This app is built with React Native and Expo, JavaScript frameworks facilitating the development of cross-platform native applications. The implementation includes the utilization of the Google Firestore Cloud database and incorporates the real-time WebSockets protocol for the storage and retrieval of chat messages. Messages are stored locally using the React Native AsyncStorage library.

The app provides users with a chat interface and options to share their images and their location using Expo's ImagePicker and Location APIs.

**Compatibility Note:** Please be aware that the camera function is currently incompatible with devices running Android 13 operating system. However, all other features and functionalities of the app are fully accessible on all supported platforms.

### Core Features

- A start page where users can enter their name and choose a background color for the chat screen before joining the chat.

- A chat page displaying the conversation, as well as an input field and submit button.

- Two additional communication features: sending images and location data.

- Data gets stored online and offline.

## How to Run

**Prerequisites**

Before running the React Native app on Expo, ensure you have the following prerequisites:

- Node.js (maximum version 16.19.0)
- npm
- Expo and Expo CLI (to install, run `npm install -g expo-cli`)
- Expo Account

**Installation**

Run following commands in your terminal:

1. To clone the repository...
   `git clone https://github.com/ElenaUJ/chatterbox.git`

2. To navigate to the project directory...
   `cd chatterbox`

3. To install dependencies...
   `npm install`

**Configuration**

4. Open the folder and create a `config.js` file in the root directory of the project.

5. (Optional) If you don't have a Firebase account yet, [create one](https://firebase.google.com/).

6. [Create a Firebase project](https://firebase.google.com/docs/web/setup#create-project) by following steps 1 through 5.

7. Next, [register your app](https://firebase.google.com/docs/web/setup#register-app) by following steps 1 through 3. Copy the `firebaseConfig` code block provided.

8. Open the `config.js` file you created earlier. Paste and export the `firebaseConfig` object as follows:

```
const firebaseConfig = {
   apiKey: "YOUR_API_KEY",
   authDomain: "YOUR_AUTH_DOMAIN",
   projectId: "YOUR_PROJECT_ID",
   storageBucket: "YOUR_STORAGE_BUCKET",
   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
   appId: "YOUR_APP_ID"
};

export default firebaseConfig;
```

6. update the necessary values within the `firebaseConfig` object to match your Firebase project configuration and then save the file.

_Note: Do not share your config.js file or commit it to version control systems as it contains sensitive information, including your Firebase API key. Keep it secure and accessible only to authorized individuals._

**Running the app**

7. Start the Expo development server by running `npx expo start` in your terminal.

8. Scan the QR code with the Expo Go app on your iOS or Android device, or select an emulator to run the app!

**Testing**

To test the app you can use:

- Android Studio and Android SDK (for Android development)
- Expo Go App (to test on your own mobile device)
- Xcode (for iOS development, macOS only)

## Links

- [Code URL](https://github.com/ElenaUJ/chatterbox)

## Process

### Technologies Used

- React Native
- Expo
- Google Firestore
- AsyncStorage
- ImagePicker API
- Location API

### Dependencies

This project has the following dependencies:

- @react-native-async-storage/async-storage: 1.17.11
- @react-native-community/netinfo: 9.3.7
- @react-navigation/native: ^6.1.6
- @react-navigation/native-stack: ^6.9.12
- expo: ~48.0.18
- expo-image-picker: ~14.1.1
- expo-location: ~15.1.1
- expo-status-bar: ~1.4.4
- firebase: ^9.13.0
- react: 18.2.0
- react-native: 0.71.8
- react-native-gifted-chat: ^2.1.0
- react-native-maps: 1.3.2
- react-native-safe-area-context: 4.5.0
- react-native-screens: ^3.20.0

And dev dependencies:

- @babel/core: ^7.20.0

Furthermore, it uses the following linting configuration:

- [ESLint rules](https://github.com/mydea/simple-pokedex-app/blob/master/.eslintrc)
- [Prettier configuration](https://stackoverflow.com/questions/55430906/prettier-single-quote-for-javascript-and-json-double-quote-for-html-sass-and-c)
