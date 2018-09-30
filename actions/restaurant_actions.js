import _ from 'lodash';
import axios from 'axios';
import {
    CURRENT_RESTAURANT
} from './types'
import { rootIP } from 'react-native-dotenv';

export const restaurantLogin = (yelpid) => dispatch => {
  dispatch({ type: CURRENT_RESTAURANT, payload: yelpid });
}