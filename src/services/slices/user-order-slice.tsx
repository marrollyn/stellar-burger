import { orderBurgerApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrders = {
  data: TOrder[];
  newOrder: TOrder | null;
  error: string | null;
  orderRequest: boolean;
};

export const initialState: TOrders = {
  data: [],
  newOrder: null,
  error: null,
  orderRequest: false
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getUserOrders: (state) => state.data,
    getNewOrder: (state) => state.newOrder,
    getOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrders.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchGetOrders.rejected, (state, action) => {
        state.error =
          action.error.message || 'Ошибка загрузки заказов пользователя';
      })
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.newOrder = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchNewOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export const fetchNewOrder = createAsyncThunk(
  'user/fetchNewOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const fetchGetOrders = createAsyncThunk(
  'user/fetchGetOrders',
  getOrdersApi
);

export const userOrdersReducer = userOrdersSlice.reducer;
export const { getUserOrders, getNewOrder, getOrderRequest } =
  userOrdersSlice.selectors;
export const { clearNewOrder } = userOrdersSlice.actions;
