# Chatterbox (Mobile Chat App)

## Table of Contents

- [Overview](#overview)
- [How to Run](#how-to-run)
- [Links](#links)
- [Process](#process)
  - [Technologies used](#technologies-used)
  - [Dependencies](#dependencies)
- [Features](#features)

## Overview

This app is still under construction. It is built with React Native and Expo, JavaScript frameworks facilitating the development of cross-platform native applications. The implementation includes the utilization of the Google Firestore Cloud database and incorporates the real-time WebSockets protocol for the storage and retrieval of chat messages. Messages will be stored locally using the React Native AsyncStorage library.

It will provide users with a chat interface and options to share their images and their location.

## How to Run

_Prerequisites_

Before running the React Native app on Expo, ensure you have the following prerequisites:

- Node.js (maximum version 16.19.0)
- npm
- Expo and Expo CLI (to install, run `npm install -g expo-cli`)
- Expo Account

_Installation_

Run following commands in your terminal:

1. To clone the repository...
   `git clone https://github.com/your/repository.git`

2. To navigate to the project directory...
   `cd chatterbox`

3. To install dependencies...
   `npm install`

4. To start Expo development server...
   `expo start` or `npm start`

Scan the QR code with the Expo Go app on your iOS or Android device, or select an emulator to run the app!

_Testing_

To test the app you can use:

- Android Studio and Android SDK (for Android development)
- Expo Go App (to test on your own mobile device)
- Xcode (for iOS development, macOS only)

## Links

- [Live site URL]()
- [Code URL](https://github.com/ElenaUJ/chatterbox)

## Process

### Technologies Used

- React Native
- Expo
- Google Firestore
- AsyncStorage

### Dependencies

This project has the following dependencies:

- "@react-navigation/native": "^6.1.6",
- "@react-navigation/native-stack": "^6.9.12",
- "expo": "~48.0.18",
- "expo-status-bar": "~1.4.4",
- "firebase": "^9.13.0",
- "react": "18.2.0",
- "react-native": "0.71.8",
- "react-native-gifted-chat": "^2.1.0",
- "react-native-safe-area-context": "^4.5.3",
- "react-native-screens": "^3.20.0"
- "@react-native-async-storage/async-storage": "1.17.11"

And dev dependencies:

- "@babel/core": "^7.20.0"

Furthermore, it uses the following linting configuration:

- [ESLint rules](https://github.com/mydea/simple-pokedex-app/blob/master/.eslintrc)
- [Prettier configuration](https://stackoverflow.com/questions/55430906/prettier-single-quote-for-javascript-and-json-double-quote-for-html-sass-and-c)

## Features

- A start page where users can enter their name and choose a background color for the chat screen before joining the chat.

- A chat page displaying the conversation, as well as an input field and submit button.

- Two additional communication features: sending images and location data.

- Data gets stored online and offline.
