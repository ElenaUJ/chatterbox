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

const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  return (
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
      <View style={styles.wrapper}>
        <Text style={styles.appTitle}>Chatterbox</Text>
      </View>
      <View style={[styles.wrapper, styles.whiteBackground]}>
        <TextInput
          style={[styles.text, styles.nameInput]}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
        <View style={styles.chooseBackgroundWrapper}>
          <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.circlesWrapper}>
            <TouchableOpacity
              style={[
                styles.circle,
                styles.circle1,
                color === colors[0] && styles.selected,
              ]}
              onPress={() => setColor(colors[0])}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                styles.circle2,
                color === colors[1] && styles.selected,
              ]}
              onPress={() => setColor(colors[1])}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                styles.circle3,
                color === colors[2] && styles.selected,
              ]}
              onPress={() => setColor(colors[2])}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                styles.circle4,
                color === colors[3] && styles.selected,
              ]}
              onPress={() => setColor(colors[3])}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Chat', { name: name, color: color })
          }
        >
          <Text style={[styles.text, styles.buttonText]}>Start the Chat</Text>
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
    borderColor: '#FF7518',
  },
  circle1: {
    backgroundColor: colors[0],
  },
  circle2: {
    backgroundColor: colors[1],
  },
  circle3: {
    backgroundColor: colors[2],
  },
  circle4: {
    backgroundColor: colors[3],
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
