import { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import image from '../assets/background-image.png';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
      <View style={styles.wrapper}>
        <Text style={styles.appTitle}>Chatterbox</Text>
      </View>
      <View style={[styles.wrapper, styles.whiteBackground]}>
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Chat')}
        >
          <Text style={styles.buttonText}>Start the Chat</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
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
  nameInput: {
    fontSize: 16,
    fontWeight: '300',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
