import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  Bubble,
  CustomActions,
  Day,
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions.js';

const Chat = ({ db, isConnected, navigation, route }) => {
  const [backgroundColor, setBackgroundColor] = useState('#090C08');
  const [messages, setMessages] = useState([]);

  const { name, color, userID } = route.params;

  const backgroundStyle = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
  });

  // try-catch block is a safety measure to prevent app from crashing if it's unable to store data
  const cacheMessages = async (messagesToCache) => {
    try {
      // AsyncStorage can only store string values
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    // In case AsyncStorage.getItem fails, an empty array will get asigned to cachedMessages
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // To be executed when mounted/updated
  useEffect(() => {
    navigation.setOptions({ title: name });
    setBackgroundColor(color);
  }, []);

  // unsubMessages has to be declared outside of useEffect hook to keep reference to the old unsubscribe function - otherwise it would be lost when set to null and a new listener would be set up everytime the useEffect code would be executed, causing a memory leak
  let unsubMessages;
  useEffect(
    () => {
      if (isConnected === true) {
        // Active listener is stopped and cleaned up before starting it again upon going back online
        if (unsubMessages) {
          unsubMessages();
        }
        unsubMessages = null;
        // Getting real-time updates of the database
        // Fetches collection upon mounting, actively listens to changes done to the collection, and will then fetch updated documents
        // collection() has 2 arguments, its first is the database object, second is collection name
        const q = query(
          collection(db, 'messages'),
          orderBy('createdAt', 'desc')
        );
        // onSnapshot takes 2 arguments: 1. reference, 2. callback function that will be called whenever a change has been detected (and once at the start)
        unsubMessages = onSnapshot(q, (docsSnapshot) => {
          let newMessages = [];

          // For each Firestore doc, we create a new message compatible with Gifted Chat
          // Every object has a document ID `.id`
          // Document properties (like text, time) can be extracted as an object with the .data() function (represeting document's fields and values)
          docsSnapshot.forEach((doc) => {
            newMessages.push({
              // The doc ID is typically not included in the what the data() method retrieves from the Firestoe document
              _id: doc.id,
              ...doc.data(),
              // Date has to be converted, because the way Firestore saves the date is in another format than Gifted Chat needs
              // Firestore createdAt will be overwritten with Gifted Chat-compatible format
              createdAt: new Date(doc.data().createdAt.toMillis()),
            });
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        });
      } else {
        loadCachedMessages();
      }

      // return statement in useEffect will be executed when component is unmounted
      // Cleaning up code, only when unsubMessages is not undefined (to avoid memory leaks)
      // Stops listening to changes
      return () => {
        if (unsubMessages) {
          unsubMessages();
        }
      };
    },
    // Call function whenever connection status changes
    [isConnected]
  );

  // setMessages() is called with callback function, that appends the new message to the previousMessages array, resulting in the newMessages array (set up in a way that multiple messages could be sent at the same time)
  const onSend = (newMessages) => {
    // addDod() automatically adds .id to newly generated document
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  // Altering speech bubble, inheriting its props but changing wrapperStyle
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        timeTextStyle={{
          right: {
            color: '#FFF',
          },
          left: {
            color: '#F2F2F2',
          },
        }}
        textStyle={{
          right: {
            color: '#FFF',
          },
          left: {
            color: '#F2F2F2',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#FF6B6B',
          },
          left: {
            backgroundColor: '#68C3D4',
          },
        }}
      />
    );
  };

  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  const renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{
          color: '#F2F2F2',
        }}
      />
    );
  };

  // Only show input toolbar when online
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
        textStyle={{
          color: '#68C3D4',
        }}
      />
    );
  };

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        textStyle={{
          color: '#F2F2F2',
        }}
      />
    );
  };

  return (
    <View style={backgroundStyle.background}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderBubble={renderBubble}
        renderDay={renderDay}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderSystemMessage={renderSystemMessage}
        sendButtonProps={{ color: 'red' }}
        user={{ _id: userID, name: name }}
      />
      {/* Fix display issue on old Android phones - React Native can check for platform used by user */}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behaviour="height" />
      ) : null}
    </View>
  );
};

export default Chat;
