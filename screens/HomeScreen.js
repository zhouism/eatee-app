import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Button, SocialIcon } from 'react-native-elements';


export default class HomeScreen extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 300, height: 300, marginBottom: 30}}
          source={{uri: 'https://media.giphy.com/media/1nOLbcPFZjsEhl3EMH/giphy.gif'}}
        />

        <Button
          large
          icon={{name: 'user', type: 'font-awesome'}}
          title="User Login"
          backgroundColor="gray"
          borderRadius={50}
          style={ styles.button }
          onPress={this._showUserLogin}
        />

        <Button
          large
          icon={{name: 'building', type: 'font-awesome'}}
          title="Restaurant Login"
          backgroundColor="tomato"
          borderRadius={50}
          style={ styles.button }
          onPress={this._showRestaurantLogin}
        />
      </View>
    );
  }

  _showUserLogin = () => {
    this.props.navigation.navigate('UserAU');
  };

  _showRestaurantLogin = () => {
    this.props.navigation.navigate('RestaurantAU');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  button: {
    width: 210,
    marginBottom: 10,

  }
});
