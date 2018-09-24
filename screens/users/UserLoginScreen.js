import React from 'react';
import { Text, View, Image, Button, StyleSheet } from "react-native";

export default class UserLogin extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="User Sign in!" onPress={this._signInAsync} />
        <Button title="Go Back" onPress={this._showHomeScreen} />
      </View>
    );
  }
  _showHomeScreen = async () => {
    this.props.navigation.navigate('Home')
  }

  _signInAsync = async () => {
    this.props.navigation.navigate('UserNav');
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

