import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductById } from '../api/products';
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchProductById.fulfilled, (state, action) => ({
        ...state,
        product: action.payload,
        isLoading: false,
        error: '',
      }))
      .addCase(fetchProductById.rejected, (state) => ({
        ...state,
        isLoading: false,
        error: 'Product has not been loaded. Try again later.',
      }));
  },
});

export default productSlice.reducer;

export const fetchProductById = createAsyncThunk<Product, number>(
  'product/fetch',
  (productId: number) => getProductById(productId)
);
