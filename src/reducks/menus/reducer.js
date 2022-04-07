import * as Actions from './actions';
import initialState from '../store/initialState';

export const MenusReducer = (state = initialState.menus, action) => {
  switch(action.type) {
    case Actions.DELETE_MENU:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.FETCH_MENUS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
};