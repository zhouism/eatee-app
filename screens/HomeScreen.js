import React, { Component } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'HOME SCREEN',
  };


  render() {
    return (
      <View>
        <Image style={styles.image} source={require('../assets/images/icon.png')} />
        <Button onPress={} title="User Login Button"></Button>
        <Button onPress={} title="Restaurant Owner Login Button"></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200, 
    height: 200
  },
});
