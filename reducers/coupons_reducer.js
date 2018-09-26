import {
   FETCH_COUPON_BATCHES
  } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_COUPON_BATCHES:
            return action.payload;
        default:
            return state;
    }
}