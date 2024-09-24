import { expect, describe, test } from '@jest/globals';
import {
  ingredientsReducer,
  initialState,
  fetchIngredients
} from './ingredient-slice';

describe('тесты слайса ингредиентов', () => {
  const pendingState = {
    success: null,
    data: [],
    loading: true,
    error: null
  };

  const rejectedState = {
    success: false,
    data: [],
    loading: false,
    error: 'error'
  };

  const fulfilledState = {
    success: true,
    data: [
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
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0,
        id: 'mockId'
      }
    ],
    loading: false,
    error: null
  };

  const ingredients = [
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
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
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
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
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
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      __v: 0,
      id: 'mockId'
    }
  ];

  test('тест pending ингредиентов', () => {
    const newState = ingredientsReducer(initialState, {
      type: fetchIngredients.pending.type
    });

    expect(newState).toEqual(pendingState);
  });

  test('тест rejected ингредиентов', () => {
    const newState = ingredientsReducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: 'error' }
    });

    expect(newState).toEqual(rejectedState);
  });

  test('тест fulfilled ингредиентов', () => {
    const newState = ingredientsReducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    });

    expect(newState).toEqual(fulfilledState);
  });
});
