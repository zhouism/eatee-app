import {
   FETCH_CURRENT_USER,
   REMOVE_CURRENT_USER
  } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
        return action.payload;
    case REMOVE_CURRENT_USER:
        return { currentUser: null };
    default:
        return state;
  }
}