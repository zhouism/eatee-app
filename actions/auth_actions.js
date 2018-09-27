import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';


// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {

    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });

  } else {
    doFacebookLogin(dispatch);
  }
};

doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('295626764586477', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  } else if (type === 'success') {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email`);
      const userInfo = await response.json();
      console.log(userInfo.first_name);
      console.log(userInfo.last_name);
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};