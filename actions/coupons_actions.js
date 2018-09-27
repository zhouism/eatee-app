import axios from 'axios';
import {
    FETCH_COUPON_BATCHES
} from './types'

const ROOT_IP = 'http://192.168.88.17:3001/api';
export const fetchCouponBatches = () => async dispatch => {
    try {
        console.log('fetching...');
        let response = await axios.get(`${ROOT_IP}/coupon_batches`);
        dispatch({ type: FETCH_COUPON_BATCHES, payload: response.data });
        // console.log(response.data);
    } catch(e) {
        console.error(e);
    }
};
