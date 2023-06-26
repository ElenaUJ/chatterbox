import { useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';
import backgroundImage from '../assets/background-image.png';

const colorsObject = {
  JET_BLACK: '#090C08',
  DEEP_PURPLE: '#474056',
  SLATE_GRAY: '#8A95A5',
  SAND_BEIGE: '#B9C6AE',
};
const { JET_BLACK, DEEP_PURPLE, SLATE_GRAY, SAND_BEIGE } = colorsObject;

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  // Initialization of Firebase authentication handler
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          name: name,
          color: color,
          userID: result.user.uid,
        });
        Alert.alert('Signed in successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, please try again later.');
      });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.wrapper}>
        <Text style={styles.appTitle} accessibilityHint="Chat app title">
          Chatterbox
        </Text>
      </View>
      <View style={[styles.wrapper, styles.whiteBackground]}>
        <TextInput
          style={[styles.text, styles.nameInput]}
          accessibilityLabel="Username input"
          accessibilityHint="This field allows you to set the username for the chat."
          onChangeText={setName}
          placeholder="Your Name"
          value={name}
        />
        <View style={styles.chooseBackgroundWrapper}>
          <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.circlesWrapper}>
            <TouchableOpacity
              style={[
                styles.circle,
                styles.circle1,
                color === JET_BLACK && styles.selected,
              ]}
              accessibilityLabel="Select black as background color"
              accessibilityHint="Tap to choose black as the background color for the chat."
              accessibilityRole="button"
              onPress={() => setColor(JET_BLACK)}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                styles.circle2,
                color === DEEP_PURPLE && styles.selected,
              ]}
              accessibilityLabel="Select plum as background color"
              accessibilityHint="Tap to choose plum as the background color for the chat."
              accessibilityRole="button"
              onPress={() => setColor(DEEP_PURPLE)}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                styles.circle3,
                color === SLATE_GRAY && styles.selected,
              ]}
              accessibilityLabel="Select gray as background color"
              accessibilityHint="Tap to choose gray as the background color for the chat."
              accessibilityRole="button"
              onPress={() => setColor(SLATE_GRAY)}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                styles.circle4,
                color === SAND_BEIGE && styles.selected,
              ]}
              accessibilityLabel="Select green as background color"
              accessibilityHint="Tap to choose green as the background color for the chat."
              accessibilityRole="button"
              onPress={() => setColor(SAND_BEIGE)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          accessibilityLabel="Start the chat"
          accessibilityHint="Tap to to start chat."
          accessibilityRole="button"
          onPress={signInUser}
        >
          <Text style={[styles.text, styles.buttonText]}>Start the Chat</Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    padding: '6%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6%',
  },
  appTitle: {
    paddingTop: '12%',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  whiteBackground: {
    backgroundColor: '#FFFFFF',
  },
  chooseBackgroundWrapper: {
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
  },
  circlesWrapper: {
    flexDirection: 'row',
  },
  circle: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginRight: '6%',
    marginTop: '3%',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  selected: {
    borderColor: '#FF7F50',
  },
  circle1: {
    backgroundColor: JET_BLACK,
  },
  circle2: {
    backgroundColor: DEEP_PURPLE,
  },
  circle3: {
    backgroundColor: SLATE_GRAY,
  },
  circle4: {
    backgroundColor: SAND_BEIGE,
  },
  nameInput: {
    color: '#757083',
    opacity: 0.5,
    borderWidth: 1,
    height: 60,
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: '#757083',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
