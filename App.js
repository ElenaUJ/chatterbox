// Importing React Navigation and creating the navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//Importing screens
import Start from './components/Start.js';
import Chat from './components/Chat.js';

// Importing Firestore (and image storage)
import { initializeApp } from 'firebase/app';
import {
  disableNetwork,
  enableNetwork,
  getFirestore,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Loading environmental variables (API key)
import config from './config.js';

// Importing useNetInfo to access latest value of network connection state (state object that updates automatically, like a React Hook)
// Best to be used in root/main component to have state available go=lobally
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { Alert } from 'react-native';

const App = () => {
  // Configuration code has been generated in my firestore project in browser
  const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: 'chatterbox-9b48d.firebaseapp.com',
    projectId: 'chatterbox-9b48d',
    storageBucket: 'chatterbox-9b48d.appspot.com',
    messagingSenderId: '345502823354',
    appId: '1:345502823354:web:a1eabda6fcf36c1cb2a383',
  };
  // Initialization of Firebase and Cloud Firestore database (should be done in root component) as well as storage for images
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Definition of state representing network connectivity status
  // Firebase reconnection attempts are to be disabled when user if offline/reenabled when user is online
  const connectionStatus = useNetInfo();
  useEffect(() => {
    // ===false because ! would also be truthy for null which is is useNetInfo(),s initial value
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        {/* To pass the db reference as a prop, this format can be used */}
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              isConnected={connectionStatus.isConnected}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
