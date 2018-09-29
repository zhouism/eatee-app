import _ from 'lodash';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  CURRENT_USER
} from './types';

// const CHRIS_IP = 'http://192.168.0.191:3001/api';
// const HOME_IP = 'http://192.168.1.97:3001/api';
const LIGHTHOUSE_IP = 'http://192.168.88.17:3001/api';
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
    permissions: ['public_profile','user_location']
  });

  console.log("token from fb", token);
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  } else if (type === 'success') {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email,birthday,gender,location`);
      const userInfo = await response.json();
      let user_savedID = await axios.get(`${LIGHTHOUSE_IP}/users/fbid/${userInfo.id}`);
      let userData = user_savedID.data;
      if (_.isEmpty(userData)) {
        console.log("saving new user");
        await axios.post(`${LIGHTHOUSE_IP}/users`, {
          facebook_id: userInfo.id,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          phone: "1111111111",
          age: userInfo.birthday,
          sex: userInfo.gender,
          city: userInfo.location.name
        })
      } else {
        console.log("user exist");
      }
      dispatch({ type: CURRENT_USER, payload: userInfo.id });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });

};












