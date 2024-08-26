import {
  PayloadAction,
  createSlice,
  nanoid,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

type TInitialState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TInitialState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const type = action.payload.type;

        switch (type) {
          case 'bun':
            state.bun = action.payload;
            break;
          default:
            state.ingredients.push(action.payload);
        }

        // if (type === 'bun') {
        //   state.bun = action.payload;
        // } else {
        //   state.ingredients.push(action.payload);
        // }
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    },
    deleteItem: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveUp: (state) => {},
    moveDown: (state) => {}
  },
  selectors: {
    getConstructorItems: (state) => state
    // getConstructorBuns: (state) => state.bun,
    // getConstructorIngredients: (state) => state.ingredients
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  getConstructorItems
  // getConstructorBuns,
  // getConstructorIngredients
} = constructorSlice.selectors;
export const { addItem, deleteItem, clearConstructor } =
  constructorSlice.actions;
