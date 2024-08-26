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

export const fetchRegister = createAsyncThunk('user/fetchRegister', registerUserApi);
export const fetchLogin = createAsyncThunk('user/fetchLogin', loginUserApi);
export const fetchForgotPassword = createAsyncThunk('user/fetchForgotPassword', forgotPasswordApi);
export const fetchResetPassword = createAsyncThunk('user/resetPassword', resetPasswordApi);
export const fetchLogout = createAsyncThunk('user/fetchLogout', logoutApi);
export const fetchUpdateUser = createAsyncThunk('user/fetchUpdateUser', updateUserApi);
export const fetchGetUser = createAsyncThunk('user/fetchGetUser', getUserApi);

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
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    selectors: {},
    extraReducers: (builder) => {
        
    }
})