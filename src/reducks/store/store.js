import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk'
import { UsersReducer } from '../users/reducer';
import { RestaurantsReducer } from '../restaurants/reducer';
import { MenusReducer } from '../menus/reducer';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger';
import { ReviewsReducer } from '../reviews/reducer';

export default function createStore(history) {
  const logger = createLogger({
    collapsed: true,
    diff: true
  });

  return reduxCreateStore(
    combineReducers({
      restaurants: RestaurantsReducer,
      menus: MenusReducer,
      reviews: ReviewsReducer,
      router: connectRouter(history),
      users: UsersReducer
    }),
    applyMiddleware(
      logger,
      routerMiddleware(history),
      thunk
    )
  )
}