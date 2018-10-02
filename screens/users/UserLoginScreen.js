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

  //use AsyncStorage.removeItem('fb_token') for testing logging in again, otherwise it stays login 4ever after first try
  componentDidMount() {
    AsyncStorage.removeItem("fb_token");
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  _signInAsync = async () => {
    this.props.navigation.navigate("UserNav");
  };

  // if it succeeds, it will navigate to SwipeScreen?
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
          backgroundColor: "black",
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
  return { token: auth.token };
}

export default connect(
  mapStateToProps,
  actions
)(UserLogin);
