import axios from 'axios';
import {
    COUPON_BATCHES,
} from './types'
import { rootIP } from 'react-native-dotenv'

// const CHRIS_IP = 'http://192.168.0.191:3001/api';
// const HOME_IP = 'http://192.168.1.97:3001/api';
const LIGHTHOUSE_IP = `http://${rootIP}:3001/api`;


export const fetchCouponBatches = () => async dispatch => {
  try {
    console.log('fetching...');
    let response = await axios.get(`${LIGHTHOUSE_IP}/coupon_batches`);
    dispatch({ type: COUPON_BATCHES, payload: response.data });
  } catch(e) {
    console.error(e);
  }
};
