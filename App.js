// Importing React Navigation and creating the navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//Importing screens
import Start from './components/Start.js';
import Chat from './components/Chat.js';

// Importing Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const App = () => {
  // Configuration code has been generated in my firestore project in browser
  const firebaseConfig = {
    apiKey: 'AIzaSyAXv04d-eVr0y3TJ3cZ2VwuchAGmGENF9c',
    authDomain: 'chatterbox-9b48d.firebaseapp.com',
    projectId: 'chatterbox-9b48d',
    storageBucket: 'chatterbox-9b48d.appspot.com',
    messagingSenderId: '345502823354',
    appId: '1:345502823354:web:a1eabda6fcf36c1cb2a383',
  };
  // Initialization of Firebase and Cloud Firestore database (should be done in root component)
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        {/* To pass the db reference as a prop, this format can be used */}
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
