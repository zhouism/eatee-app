import React from "react";
import { Text, View, Image, StyleSheet, AsyncStorage } from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Ionicons } from "@expo/vector-icons";

class UserLogin extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    // AsyncStorage.removeItem("fb_token");
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate("UserNav");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/eatee_logo.gif")}
        />
        <SocialIcon
          title="SIGN IN WITH FACEBOOK"
          button
          type="facebook"
          underlayColor="black"
          style={{ width: 300,
          backgroundColor: "black"
           }}
          onPress={() => {
            this.props.facebookLogin();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FC4E3E"
  },
  image: {
    width: 300,
    height: 300
  },
});


function mapStateToProps({ auth }) {
  console.log('Current user token in login screen:', auth.token);
  return { token: auth.token };
}

export default connect(
  mapStateToProps,
  actions
)(UserLogin);
