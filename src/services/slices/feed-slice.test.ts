import { expect, describe, test } from '@jest/globals';
import {
  feedsReducer,
  initialState,
  fetchFeeds,
  fetchOrderByNumber
} from './feed-slice';

describe('тесты слайса ленты заказов', () => {
  const orderFeeds = {
    success: true,
    orders: [
      {
        _id: '661e422e97ede0001d065d1a',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный традиционный-галактический spicy бургер',
        createdAt: '2024-04-16T09:17:34.087Z',
        updatedAt: '2024-04-16T09:17:34.577Z',
        number: 38182
      },
      {
        _id: '661e3d1497ede0001d065d15',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный био-марсианский бургер',
        createdAt: '2024-04-16T08:55:48.760Z',
        updatedAt: '2024-04-16T08:55:49.399Z',
        number: 38181
      }
    ],
    total: 10,
    totalToday: 110
  };

  const fulfilledOrdersFeedState = {
    data: orderFeeds.orders,
    total: orderFeeds.total,
    totalToday: orderFeeds.totalToday,
    error: null,
    loading: false,
    currentOrder: null
  };

  const rejectedFeedState = {
    data: [],
    total: 0,
    totalToday: 0,
    error: 'error',
    loading: false,
    currentOrder: null
  };

  const pendingFeedState = {
    data: [],
    total: 0,
    totalToday: 0,
    error: null,
    loading: true,
    currentOrder: null
  };

  test('тест fetchFeeds rejected', () => {
    const newState = feedsReducer(initialState, {
      type: fetchFeeds.rejected.type,
      error: { message: 'error' }
    });

    expect(newState).toEqual(rejectedFeedState);
  });

  test('тест fetchOrderByNumber rejected', () => {
    const newState = feedsReducer(initialState, {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'error' }
    });

    expect(newState).toEqual(rejectedFeedState);
  });

  test('тест fetchFeeds pending', () => {
    const newState = feedsReducer(initialState, {
      type: fetchFeeds.pending.type
    });

    expect(newState).toEqual(pendingFeedState);
  });

  test('тест fetchOrderByNumber pending', () => {
    const newState = feedsReducer(initialState, {
      type: fetchOrderByNumber.pending.type
    });

    expect(newState).toEqual(pendingFeedState);
  });

  test('тест fetchFeeds fulfilled', () => {
    const newState = feedsReducer(initialState, {
      type: fetchFeeds.fulfilled.type,
      payload: orderFeeds
    });

    expect(newState).toEqual(fulfilledOrdersFeedState);
  });
});
