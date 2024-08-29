import { combineReducers } from 'redux';
import { ingredientsReducer } from './slices/ingredient-slice';
import { constructorReducer } from './slices/constructor-slice';
import { userReducer } from './slices/user-slice';
import { feedsReducer } from './slices/feed-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  user: userReducer,
  feeds: feedsReducer
});
