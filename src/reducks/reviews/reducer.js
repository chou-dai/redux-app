import * as Actions from './actions';
import initialState from '../store/initialState';

export const ReviewsReducer = (state = initialState.reviews, action) => {
  switch(action.type) {
    case Actions.DELETE_REVIEW:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.FETCH_REVIEWS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
};