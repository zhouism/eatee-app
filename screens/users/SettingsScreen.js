import React from 'react';
import { Text, View, Button } from "react-native";


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>USER LOCATION SETTINGS</Text>
        <Text>USER PRICE SETTINGS</Text>
      </View>
    )
  }
}

export default SettingsScreen;
