import React, { Component } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";

export default class CreateCouponBatchScreen extends Component {
  static navigationOptions = {
    title: "CreateCouponBatchScreen"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Create Coupon Batch Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
