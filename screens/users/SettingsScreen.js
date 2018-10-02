import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Slider } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../../actions";


class SettingsScreen extends React.Component {
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
    this.props.facebookLogout();
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

function mapStateToProps({ auth }) {
  console.log('user logged out. Current user token:', auth.token);
  return { token: auth.token };
}

export default connect(
  mapStateToProps,
  actions
)(SettingsScreen);