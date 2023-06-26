import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  Bubble,
  Day,
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import CustomActions from './CustomActions.js';

const Chat = ({ db, isConnected, navigation, route, storage }) => {
  const { name, color, userID } = route.params;
  const [backgroundColor, setBackgroundColor] = useState('#090C08');
  const [messages, setMessages] = useState([]);

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

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

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
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    const currentLocation = currentMessage.location;

    if (currentLocation) {
      return (
        <View
          style={{
            borderRadius: 13,
            overflow: 'hidden',
            width: 150,
            height: 100,
            margin: 3,
          }}
        >
          <MapView
            style={{
              height: '100%',
              width: '100%',
            }}
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      );
    }
    return null;
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

  useEffect(() => {
    navigation.setOptions({ title: name });
    setBackgroundColor(color);
  }, []);

  // unsubMessages has to be declared outside of useEffect hook to keep reference to the old unsubscribe function
  let unsubMessages;
  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) {
        unsubMessages();
      }
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

      unsubMessages = onSnapshot(q, (docsSnapshot) => {
        let newMessages = [];

        // Document fields and values are extracted as an object with the .data() function (excluding doc ID)
        docsSnapshot.forEach((doc) => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
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
    // Cleaning up code and stop listenting to changes
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

  const backgroundStyle = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
  });

  return (
    <View style={backgroundStyle.background}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderBubble={renderBubble}
        renderCustomView={renderCustomView}
        renderDay={renderDay}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderSystemMessage={renderSystemMessage}
        sendButtonProps={{ color: 'red' }}
        user={{ _id: userID, name: name }}
      />
      {/* Fix display issue on old Android phones */}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behaviour="height" />
      ) : null}
    </View>
  );
};

export default Chat;
