import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const CustomActions = ({
  iconTextStyle,
  onSend,
  storage,
  userID,
  wrapperStyle,
}) => {
  const actionSheet = useActionSheet();

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    // Splits the path into array of substrings at every /, and the only uses the last value of the array, the actual file name
    const imageName = uri.split('/')[uri.split('/').length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});

      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else {
        Alert.alert('Error occurred while fetching location');
      }
    } else {
      Alert.alert('Permissions not granted');
    }
  };

  const onActionPress = () => {
    const options = [
      'Choose from Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      { options, cancelButtonIndex },

      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
        }
      }
    );
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      } else {
        Alert.alert('Image selection canceled');
      }
    } else {
      Alert.alert('Permissions not granted');
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      try {
        let result = await ImagePicker.launchCameraAsync();

        if (!result.canceled) {
          await uploadAndSendImage(result.assets[0].uri);
        } else {
          Alert.alert('Camera capture canceled');
        }
      } catch (error) {
        Alert.alert('Unable to launch camera');
        console.error(error);
      }
    } else {
      Alert.alert('Permissions not granted');
    }
  };

  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    // Firebase needs the image to be converted into a blob (binary large object)
    const blob = await response.blob();

    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      accessibilityLabel="Action sheet button"
      accessibilityHint="Tap to access the action sheet."
      accessibilityRole="button"
      onPress={onActionPress}
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
    lineHeight: 26,
    marginTop: -3,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
  },
});

export default CustomActions;
