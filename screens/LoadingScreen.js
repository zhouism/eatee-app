import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/images/eatee_logo.gif")}
        />
        <Text style={styles.slogan}>Loading...</Text>
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
  slogan: {
    color: "white",
    fontSize: 20
  },
  image: {
    width: 300,
    height: 300
  }
});
