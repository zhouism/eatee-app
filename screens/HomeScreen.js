import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Eatee</Text>
        <Text style={styles.slogan}>Find Your Next Meal Deal</Text>
        <Image
          style={styles.image}
          source={require("../assets/images/eatee_logo.gif")}
        />
        <Button
          buttonStyle={styles.button}
          title="I AM HUNGRY"
          onPress={() => navigate("User")}
        />
        <Button
          buttonStyle={styles.button}
          title="I HAVE FOOD"
          onPress={() => navigate("Restaurant")}
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
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50
  },
  slogan: {
    color: "white",
    fontSize: 20
  },
  image: {
    width: 300,
    height: 300
  },
  button: {
    backgroundColor: "#000000",
    width: 200,
    borderRadius: 30,
    margin: 10,
    borderColor: "#FC4E3E"
  }
});
