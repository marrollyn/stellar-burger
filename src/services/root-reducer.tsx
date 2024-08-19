import { combineReducers } from 'redux';
import { ingredientsReducer } from './slices/ingredient-slice';
import { constructorReducer } from './slices/constructor-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer
});
