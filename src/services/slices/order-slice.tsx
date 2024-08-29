import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrderBurger = createAsyncThunk(
  'orderBurger/fetchOrderBurger',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const fetchOrderNumber = createAsyncThunk(
  'orderNumber/fetchOrderNumber',
  async (number: string) => {
    const num = Number(number);
    const response = await getOrderByNumberApi(num);
    return response;
  }
);