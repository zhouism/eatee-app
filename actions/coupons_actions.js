import axios from 'axios';
import {
    FETCH_COUPON_BATCHES
} from './types.js'



export const fetchCouponBatches = () => async dispatch => {
    try {
        console.log('click');
        let response = await axios.get('http://192.168.88.17:3001/api/coupon_batches');
        dispatch({ type: FETCH_COUPON_BATCHES, payload: response.data });
        console.log(response.data);
        console.log('click this');
    } catch(e) {
        console.error(e);
    }
}