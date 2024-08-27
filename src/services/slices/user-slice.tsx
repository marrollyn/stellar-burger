import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TUser } from '@utils-types';

type TInitialState = {
  data: TUser;
  loading: boolean;
  error: string | null | undefined;
  isAuthChecked: boolean;
};

const initialState: TInitialState = {
  data: {
    email: '',
    name: ''
  },
  loading: false,
  error: null,
  isAuthChecked: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // authChecked: (state) => {
    //     state.isAuthChecked = true;
    // },
  },
  selectors: {
    getAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.error = action.error?.message || null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.data = action.payload.user;
      });
    builder
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error?.message || null;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.data = action.payload.user;
        state.error = null;
      });
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.data = action.payload.user;
      });
    builder.addCase(fetchLogout.fulfilled, (state) => (state = initialState));
    builder
      .addCase(fetchUpdateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.data = action.payload.user;
        state.error = null;
      });
  }
});

export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  registerUserApi
);
export const fetchLogin = createAsyncThunk('user/fetchLogin', loginUserApi);
export const fetchLogout = createAsyncThunk('user/fetchLogout', logoutApi);
export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  updateUserApi
);
export const fetchGetUser = createAsyncThunk('user/fetchGetUser', getUserApi);

export const fetchForgotPassword = createAsyncThunk(
  'user/fetchForgotPassword',
  forgotPasswordApi
);
export const fetchResetPassword = createAsyncThunk(
  'user/resetPassword',
  resetPasswordApi
);

export const { getAuthChecked, getUser } = userSlice.selectors;
export const userReducer = userSlice.reducer;
