import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';

export default class HomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Button title="User Login" onPress={() => navigate('User')} />
        <Button title="Restaurant Login" onPress={() => navigate('Restaurant')} />
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
