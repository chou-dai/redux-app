import * as Actions from './actions';
import initialState from '../store/initialState';

export const RestaurantsReducer = (state = initialState.restaurants, action) => {
  switch(action.type) {
    case Actions.DELETE_RESTAURANT:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.FETCH_RESTAURANT:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
};