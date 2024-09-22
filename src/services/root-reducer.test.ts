import { expect, describe, test } from '@jest/globals';
import { rootReducer } from './root-reducer';
import { initialState as userState } from './slices/user-slice';
import { initialState as userOrderState } from './slices/user-order-slice';
import { initialState as ingredientState } from './slices/ingredient-slice';
import { initialState as feedState } from './slices/feed-slice';
import { initialState as constructorState } from './slices/constructor-slice';

const expected = {
  ingredients: ingredientState,
  constructorBurger: constructorState,
  user: userState,
  feeds: feedState,
  userOrders: userOrderState
};

describe('тест rootReducer', () => {
  test('test rootReducer', () => {
    const result = rootReducer(undefined, { type: 'ACTION' });

    expect(result).toEqual(expected);
  });
});
