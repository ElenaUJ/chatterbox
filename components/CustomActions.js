import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';

// wrapperStyle and iconTextStyle are props being passed from Chat.js, to potentially modify the component's style from outside of the component
const CustomActions = ({
  iconTextStyle,
  onSend,
  storage,
  userID,
  wrapperStyle,
}) => {
  // Fetching the ActionSheet reference object
  const actionSheet = useActionSheet();

  // Creating reference to recodring object
  let recordingObject = null;

  // Function to generate unique reference name for image upload
  const generateReference = (uri) => {
    // getTime() method converts data object into milliseconds -> turns it into numeric value
    const timeStamp = new Date().getTime();
    // Splits the path into array of substrings at every /, and the only uses the last value of the array, the actual file name
    const imageName = uri.split('/')[uri.split('/').length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);

    // Creation of reference on Storage cloud: address for location of uploaded file
    // Second argument is reference string
    const newUploadRef = ref(storage, uniqueRefString);

    const response = await fetch(imageURI);

    // Firebase needs the image to be converted into a blob (binary large object)
    const blob = await response.blob();

    // Uploading image file
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      } else {
        Alert.alert("Permissions haven't been granted");
      }
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
          Alert.alert("Permissions haven't been granted.");
        }
      } catch (error) {
        Alert.alert('Unable to launch the camera.');
        console.error(error);
      }
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    // ?. operator is a safe way to check for an object's property, because it wouldn't throw an error if `permissions` were undefined
    if (permissions?.granted) {
      // (Empty configuration)
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
      Alert.alert("Permissions haven't been granted");
    }
  };

  const startRecording = async () => {
    try {
      let permissions = await Audio.requestPermissionsAsync();

      if (permissions?.granted) {
        // iOS specific config to allow recording on iPhone
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
          .then((results) => {
            return results.recording;
          })
          .then((recording) => {
            recordingObject = recording;
          });
      }
    } catch (error) {
      Alert.alert('Failed to record.');
    }
  };

  const stopRecording = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });

    await recordingObject.stopAndUnloadAsync();
  };

  const sendRecordedSound = async () => {
    await stopRecording();
    const uniqueRefString = generateReference(recordingObject.getURI());
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(recordingObject.getURI());
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const soundURL = await getDownloadURL(snapshot.ref);
      onSend({ audio: soundURL });
    });
  };

  const onActionPress = () => {
    const options = [
      'Choose from Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;

    // Initialization and showing of ActionSheet
    actionSheet.showActionSheetWithOptions(
      // Options objects containint the options for the action sheet and the index of the cancel button
      { options, cancelButtonIndex },
      // Callback function: Handling of user selection based on buttonIndex
      // Question: Is the async keyword important here? Because we have it again in the callback functions.
      async (buttonIndex) => {
        // `switch` is a control flow statement for selecting one of many code blocks based on expression, here: buttonIndex
        switch (buttonIndex) {
          // `case` is a label that matches value of expression, here: buttonIndex
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          // Question: Why is there no return here?
          // return;
          // Question: Is the default case necessary if nothing is in it?
          // If buttonIndex doesn't match any defined case, it will be skipped (because it is empty)
          default:
        }
      }
    );
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
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
});

export default CustomActions;
