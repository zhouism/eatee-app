import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class UserLogin extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  //use AsyncStorage.removeItem('fb_token') for testing logging in again, otherwise it stays login 4ever after first try
  componentDidMount() {
    AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }


  _showHomeScreen = async () => {
    this.props.navigation.navigate('Home')
  }

  _signInAsync = async () => {
    this.props.navigation.navigate('UserNav');
  };

  // if it succeeds, it will navigate to SwipeScreen?
  onAuthComplete(props) {
      if (props.token) {
        this.props.navigation.navigate('UserNav');
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <Button title="User Sign in!" onPress={ () => { this.props.facebookLogin() }} />
        <Button title="Go Back" onPress={this._showHomeScreen} />
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

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(UserLogin);

