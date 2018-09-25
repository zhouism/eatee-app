import React from 'react';
import {
  Text,
  View,
  AsyncStorage
} from 'react-native';
import Swiper from 'react-native-swiper-animated';
import { connect } from 'react-redux';
import * as actions from '../../actions'

class SwipeScreen2 extends React.Component {
  static navigationOptions = {
    title: 'SwipeScreen',
  };
i
  componentDidMount() {
    this.props.facebookLogin();

    //use AsyncStorage.removeItem('fb_token') for testing logging in again, otherwise it stays login 4ever after first try
    AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      // if it succeeds, it will navigate to somewhere ~ SwipeScreen?
      // this.props.navigation.navigate('User');
      console.log("navigated");
    } else {
      this.props.navigation.navigate('User');
    }
  }

  render() {
    return (
      <Swiper
          style={styles.wrapper}
          smoothTransition
          loop
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
    )
  }
}

const styles = {
  wrapper: {
    backgroundColor: '#009688',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e91e63',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#673ab7',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
};
function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(SwipeScreen2);
