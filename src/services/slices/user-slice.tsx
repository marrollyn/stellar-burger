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
  extraReducers: (builder) => {}
});

export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  registerUserApi
);
export const fetchLogin = createAsyncThunk('user/fetchLogin', loginUserApi);
export const fetchForgotPassword = createAsyncThunk(
  'user/fetchForgotPassword',
  forgotPasswordApi
);
export const fetchResetPassword = createAsyncThunk(
  'user/resetPassword',
  resetPasswordApi
);
export const fetchLogout = createAsyncThunk('user/fetchLogout', logoutApi);
export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  updateUserApi
);
export const fetchGetUser = createAsyncThunk('user/fetchGetUser', getUserApi);

export const { getAuthChecked, getUser } = userSlice.selectors;
export const userReducer = userSlice.reducer;
