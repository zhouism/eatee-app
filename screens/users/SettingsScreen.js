import React from 'react';
import { Text, View, Button } from "react-native";
import { connect } from 'react-redux';
import * as actions from '../../actions'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  componentDidMount() {
    this.props.facebookLogin();
  }

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

export default connect(null, actions)(SettingsScreen);
