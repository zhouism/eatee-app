import React from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
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
  }

  _handleLogout() {
    this.props.facebookLogout();
    AsyncStorage.removeItem("fb_token");
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          large
          buttonStyle={styles.button}
          title="LOGOUT"
          onPress={() => this._handleLogout()}
        />
      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  console.log("user logged out. Current user token:", auth.token);
  return { token: auth.token };
}

export default connect(
  mapStateToProps,
  actions
)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FC4E3E"
  },
  button: {
    backgroundColor: "#000000",
    marginTop: 10,
    width: 300,
    borderRadius: 30,
    margin: 10,
    borderColor: "#FC4E3E"
  }
});
