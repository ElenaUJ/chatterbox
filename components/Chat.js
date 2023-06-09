import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  Bubble,
  Day,
  GiftedChat,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import { collection, onSnapshot } from 'firebase/firestone';

const Chat = ({ db, navigation, route }) => {
  const [backgroundColor, setBackgroundColor] = useState('#090C08');
  const [messages, setMessages] = useState([]);

  const { name, color } = route.params;

  const backgroundStyle = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
  });

  // Empty array because we only want to execute code once when the component is mounted
  useEffect(() => {
    // To be executed when mounted/updated
    navigation.setOptions({ title: name });
    setBackgroundColor(color);

    // Getting real-time updates of the database
    // Fetches collection upon mounting, actively listens to changes done to the collection, and will then fetch updated documents
    // onSnapshot takes 2 arguments: 1. reference, 2. callback function that will be called whenever a change has been detected (and once at the start)
    const unsubMessages = onSnapshot(
      // collection() has 2 arguments, its first is the database object, second is collection name
      collection(db, 'messages'),
      (docsSnapshot) => {
        let newMessages = [];

        // Every object has a document ID `.id`
        // Document properties (like text, time) can be extracted as an object with the .data() function
        docsSnapshot.forEach((doc) => {
          newMessages.push({ id: doc.id, ...doc.data() });
        });
        setMessages(newMessages);
      }
    );
    // return statement in useEffect will be executed when component is unmounted
    // Cleaning up code, only when unsubMessages is not undefined (to avoid memory leaks)
    // Stops listening to changes
    return () => {
      if (unsubMessages) unsubMessages();
    };
    // Setting static message to be able to see changes in the UI
    // Each message requires ID, creation date and user object as per Gifted Chat library
    // User object requires ID, name, avatar
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://picsum.photos/140',
    //     },
    //   },
    //   // Setting system message to indicate chat has been entered
    //   {
    //     _id: 2,
    //     text: 'You entered the chat.',
    //     createdAt: new Date(),
    //     system: true,
    //   },
    // ]);
  }, []);

  // setMessages() is called with callback function, that appends the new message to the previousMessages array, resulting in the newMessages array
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
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
        renderBubble={renderBubble}
        renderDay={renderDay}
        renderSend={renderSend}
        renderSystemMessage={renderSystemMessage}
        sendButtonProps={{ color: 'red' }}
        user={{ _id: 1 }}
      />
      {/* Fix display issue on old Android phones - React Native can check for platform used by user */}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behaviour="height" />
      ) : null}
    </View>
  );
};

export default Chat;
