import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type ProductsState = {
  products: Product[];
};

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => ({
      ...state,
      posts: action.payload,
    }),
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
