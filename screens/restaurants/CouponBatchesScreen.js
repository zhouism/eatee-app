import React, { Component } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";

export default class CouponBatchesScreen extends Component {
  static navigationOptions = {
    title: 'CouponBatchesScreen!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
