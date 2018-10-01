import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="User Login" onPress={this._showUserLogin} />
        <Button title="Restaurant Login" onPress={this._showRestaurantLogin} />
      </View>
    );
  }

  _showUserLogin = () => {
    this.props.navigation.navigate('User');
  };

  _showRestaurantLogin = () => {
    this.props.navigation.navigate('Restaurant');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
