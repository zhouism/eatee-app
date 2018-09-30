import { combineReducers } from 'redux';
import auth from './auth_reducer.js';
import coupons from './coupons_reducer.js';
import currentUser from './user_reducer.js';
import currentRestaurant from './restaurant_reducer.js';

export default combineReducers({
  auth, coupons, currentUser, currentRestaurant
});