import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;
  const [backgroundColor, setBackgroundColor] = useState('#090C08');

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
  }, []);

  return <View style={backgroundStyle.background}></View>;
};

export default Chat;
