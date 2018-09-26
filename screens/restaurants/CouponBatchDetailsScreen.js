import React, { Component } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";

export default class CouponBatchDetailScreen extends Component {
  static navigationOptions = {
    title: "Coupon Batch Detail Screen"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Coupon Batch Detail Screen</Text>
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
