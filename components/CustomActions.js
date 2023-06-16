import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

// wrapperStyle and iconTextStyle are props being passed from Chat.js, to potentially modify the component's style from outside of the component
const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
  // Fetching the ActionSheet reference object
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      'Choose from Library',
      'TakePicture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;

    // Initialization and showing of ActionSheet
    actionSheet.showActionSheetWithOptions(
      // Options objects containint the options for the action sheet and the index of the cancel button
      { options, cancelButtonIndex },
      // Callback function: Handling of user selection based on buttonIndex
      async (buttonIndex) => {
        // `switch` is a control flow statement for selecting one of many code blocks based on expression, here: buttonIndex
        switch (buttonIndex) {
          // `case` is a label that matches value of expression, here: buttonIndex
          case 0:
            console.log('user wants to pick an image');
            return;
          case 1:
            console.log('user wants to take a photo');
            return;
          case 2:
            console.log('user wants to get their location');
          // Question: Why is there no retun here?
          // return;
          // Question: Is the default case necessary if nothing is in it?
          // If buttonIndex doesn't match any defined case, it will be skipped (because it is empty)
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
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
