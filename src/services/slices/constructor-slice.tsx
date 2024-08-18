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
  // bun: {
  //   _id: '',
  //   name: '',
  //   type: '',
  //   proteins: 0,
  //   fat: 0,
  //   carbohydrates: 0,
  //   calories: 0,
  //   price: 0,
  //   image: '',
  //   image_large: '',
  //   image_mobile: '',
  //   id: ''
  // },
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const type = action.payload.type;

        // switch (type) {
        //   case 'bun':
        //     state.bun = action.payload;
        //     break;
        //   default:
        //     state.ingredients.push(action.payload);
        // }

        if (type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    },
    removeItem: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorItems: (state) => state,
    getConstructorBuns: (state) => state.bun,
    getConstructorIngredients: (state) => state.ingredients
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  getConstructorItems,
  getConstructorBuns,
  getConstructorIngredients
} = constructorSlice.selectors;
export const { addItem, removeItem, clearConstructor } =
  constructorSlice.actions;
