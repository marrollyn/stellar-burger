import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

type TInitialState = {
  success: boolean | null;
  data: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TInitialState = {
  success: null,
  data: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.data,
    getIngredientsLoadingSelector: (state) => state.loading,
    getIngredientsLoadingStatusSelector: (state) => {
      state.loading, state.error, state.success;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

export const ingredientsReducer = ingredientsSlice.reducer;
export const {
  getIngredientsSelector,
  getIngredientsLoadingSelector,
  getIngredientsLoadingStatusSelector
} = ingredientsSlice.selectors;
