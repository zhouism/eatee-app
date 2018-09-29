import {
   COUPON_BATCHES
  } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case COUPON_BATCHES:
        return action.payload;
    default:
        return state;
  }
}