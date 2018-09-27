import axios from 'axios';
import {
    FETCH_COUPON_BATCHES
} from './types'


export const fetchCouponBatches = () => async dispatch => {
    try {
        console.log('fetching...');
        let response = await axios.get('http://192.168.1.97:3001/api/coupon_batches');
        dispatch({ type: FETCH_COUPON_BATCHES, payload: response.data });
    } catch(e) {
        console.error(e);
    }
};
