import { combineReducers } from 'redux';
import auth from './auth_reducer.js';
import coupons from './coupons_reducer.js';

export default combineReducers({
  auth, coupons
});