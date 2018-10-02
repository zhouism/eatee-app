import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Slider } from "react-native-elements";

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "User Settings"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 5
    };
  }



  _handleLogout() {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View>
        <Text>USER LOCATION SETTINGS</Text>
        <Text>USER PRICE SETTINGS</Text>
        <Slider
    value={this.state.value}
    onValueChange={(value) => this.setState({value})} />
    <Text>Value: {this.state.value}</Text>
        <Button
          large
          icon={{ name: "sign-out", type: "font-awesome" }}
          title="LOGOUT"
          onPress={() => this._handleLogout()}
        />
      </View>
    );
  }
}

