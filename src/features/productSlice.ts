import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type ProductState = {
  product: Product | null;
  isLoading: boolean;
  error: string;
};

const initialState: ProductState = {
  product: null,
  isLoading: false,
  error: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
    setProduct: (state, action: PayloadAction<Product>) => ({
      ...state,
      product: action.payload,
    }),
    setError: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const { setIsLoading, setProduct, setError } = productSlice.actions;
export default productSlice.reducer;
