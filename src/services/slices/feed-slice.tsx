import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeeds = {
  data: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  loading: boolean;
  currentOrder: TOrder[] | null;
};

export const initialState: TFeeds = {
  data: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: true,
  currentOrder: null
};

const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedOrders: (state) => state.data,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getCurrentOrder: (state) => state.currentOrder?.[0]
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.data = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error = action.error.message || 'ошибка загрузки';
        state.loading = false;
      })
      .addCase(fetchFeeds.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders;
      })
      .addCase(fetchOrderByNumber.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message || 'ошибка загрузки';
        state.loading = false;
      });
  }
});

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', getFeedsApi);
export const fetchOrderByNumber = createAsyncThunk(
  'orderNumber/fetchOrderByNumber',
  async (number: string) => {
    const num = Number(number);
    const response = await getOrderByNumberApi(num);
    return response;
  }
);

export const feedsReducer = feedSlice.reducer;
export const { getFeedOrders, getTotal, getTotalToday, getCurrentOrder } =
  feedSlice.selectors;
