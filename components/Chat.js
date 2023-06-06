import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View, StyleSheet } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;

  // State initializations
  const [backgroundColor, setBackgroundColor] = useState('#090C08');
  const [messages, setMessages] = useState([]);

  const backgroundStyle = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
  });

  // Empty array because we only want to execute code once when the component is mounted
  useEffect(() => {
    navigation.setOptions({ title: name });
    setBackgroundColor(color);
    // Setting static message to be able to see changes in the UI
    // Each message requires ID, creation date and user object as per Gifted Chat library
    // User object requires ID, name, avatar
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      // Setting example system message
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
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
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
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
