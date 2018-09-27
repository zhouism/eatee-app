import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Button, SocialIcon  } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class UserLogin extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  // componentDidMount() {
  //   //use AsyncStorage.removeItem('fb_token') for testing logging in again, otherwise it stays login 4ever after first try
  //   AsyncStorage.removeItem('fb_token');
  // }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }


  _showHomeScreen = async () => {
    this.props.navigation.navigate('Home')
  }

  _signInAsync = async () => {
    this.props.navigation.navigate('UserNav');
  };

  onAuthComplete(props) {
      if (props.token) {
        // if it succeeds, it will navigate to SwipeScreen?

        this.props.navigation.navigate('UserNav');
        console.log('navigated');
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <SocialIcon
          title="Sign In"
          button
          type="facebook"
          style={{ width: 200}}
          onPress={ () => { this.props.facebookLogin() }}
        />
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
  console.log(auth.token);
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(UserLogin);

