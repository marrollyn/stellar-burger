import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData,
  TUserResponse
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

type TInitialState = {
  data: TUser | null;
  loading: boolean;
  error: string | null | undefined;
  isAuthChecked: boolean;
};

const initialState: TInitialState = {
  data: null,
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
    setUser: (state, action: PayloadAction<TUser>) => {
      state.data = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.data,
    getUserName: (state) => state.data?.name
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
        state.data = action.payload;
      });
    // builder
    //   .addCase(fetchGetUser.rejected, (state, action) => {
    //     state.isAuthChecked = false;
    //     state.error = action.error?.message || null;
    //   })
    //   .addCase(fetchGetUser.fulfilled, (state, action) => {
    //     state.isAuthChecked = true;
    //     state.data = action.payload;
    //     state.error = null;
    //   });
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
        state.data = action.payload;
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
        state.data = action.payload;
        state.error = null;
      });
  }
});

export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  async ({ email, name, password }: TRegisterData) => {
    const response = await registerUserApi({ email, name, password });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);
export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);
export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});
export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async ({ email, name, password }: Partial<TRegisterData>) => {
    const response = await updateUserApi({ email, name, password });
    return response.user;
  }
);
export const checkUserAuth = createAsyncThunk(
  'user/fetchGetUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((response) => dispatch(setUser(response.user)))
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const fetchForgotPassword = createAsyncThunk(
  'user/fetchForgotPassword',
  forgotPasswordApi
);
export const fetchResetPassword = createAsyncThunk(
  'user/resetPassword',
  resetPasswordApi
);

export const { getAuthChecked, getUser, getUserName } = userSlice.selectors;
export const { setUser, setIsAuthChecked } = userSlice.actions;
export const userReducer = userSlice.reducer;
