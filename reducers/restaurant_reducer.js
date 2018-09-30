import {
  CURRENT_RESTAURANT
} from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case CURRENT_RESTAURANT:
      console.log("state change for restaurant")
      return action.payload;
    default:
      console.log("nothing changed")
      return state;
  }
}