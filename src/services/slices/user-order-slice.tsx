import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNewOrder = createAsyncThunk(
  'newOrder/fetchNewOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

