import { getFeedsApi } from '@api';
import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeeds = {
  data: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  loading: boolean;
};

export const initialState: TFeeds = {
  data: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: true
};

const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedOrders: (state) => state.data,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
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
      });
  }
});

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', getFeedsApi);

export const feedsReducer = feedSlice.reducer;
export const { getFeedOrders, getTotal, getTotalToday } = feedSlice.selectors;
