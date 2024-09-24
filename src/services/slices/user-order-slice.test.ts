import { expect, describe, test } from '@jest/globals';
import {
  userOrdersReducer,
  initialState,
  fetchNewOrder,
  fetchGetOrders
} from './user-order-slice';

describe('тесты слайса user-order', () => {
  const order = {
    name: 'бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0,
          id: 'mockId'
        },
        {
          _id: '643d69a5c3f7b9001cfa093f',
          name: 'Мясо бессмертных моллюсков Protostomia',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://code.s3.yandex.net/react/code/meat-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-02-large.png',
          __v: 0,
          id: 'mockId'
        },
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0,
          id: 'mockId'
        }
      ],
      _id: '661d34e997ede0001d065b82',
      owner: {
        name: 'Joe Doe',
        email: 'joedoe@email.ru',
        createdAt: '2024-08-30T04:20:56.074Z',
        updatedAt: '2024-08-30T04:20:56.527Z'
      },
      status: 'done',
      name: ' бургер',
      createdAt: '2024-04-15T14:08:41.157Z',
      updatedAt: '2024-04-15T14:08:41.743Z',
      number: 55555,
      price: 3388
    }
  };

  const fulfilledNewOrderState = {
    data: [],
    newOrder: order.order,
    error: null,
    orderRequest: false
  };

  const pendingNewOrderState = {
    data: [],
    newOrder: null,
    error: null,
    orderRequest: true
  };

  const rejectedState = {
    data: [],
    newOrder: null,
    error: 'error',
    orderRequest: false
  };

  const userOrders = [
    {
      _id: '65fd698897ede0001d061a4b',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный экзо-плантаго фалленианский метеоритный бургер',
      createdAt: '2024-03-22T11:20:40.483Z',
      updatedAt: '2024-03-22T11:20:40.966Z',
      number: 36477
    },
    {
      _id: '65fd6ca797ede0001d061a54',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный метеоритный бургер',
      createdAt: '2024-03-22T11:33:59.260Z',
      updatedAt: '2024-03-22T11:33:59.720Z',
      number: 36478
    }
  ];

  const fulfilledUserOrdersState = {
    data: userOrders,
    newOrder: null,
    error: null,
    orderRequest: false
  };

  test('тест fetchNewOrder pending', () => {
    const newState = userOrdersReducer(initialState, {
      type: fetchNewOrder.pending.type
    });

    expect(newState).toEqual(pendingNewOrderState);
  });

  test('тест fetchNewOrder rejected', () => {
    const newState = userOrdersReducer(initialState, {
      type: fetchNewOrder.rejected.type,
      error: { message: 'error' }
    });

    expect(newState).toEqual(rejectedState);
  });

  test('тест fetchGetOrders rejected', () => {
    const newState = userOrdersReducer(initialState, {
      type: fetchGetOrders.rejected.type,
      error: { message: 'error' }
    });

    expect(newState).toEqual(rejectedState);
  });

  test('тест fetchNewOrder fulfilled', () => {
    const newState = userOrdersReducer(initialState, {
      type: fetchNewOrder.fulfilled.type,
      payload: order
    });

    expect(newState).toEqual(fulfilledNewOrderState);
  });

  test('тест fetchGetOrders fulfilled', () => {
    const newState = userOrdersReducer(initialState, {
      type: fetchGetOrders.fulfilled.type,
      payload: userOrders
    });

    expect(newState).toEqual(fulfilledUserOrdersState);
  });
});
