import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../api/products';
import { AppThunk } from '../app/store';
import { Product } from '../types/Product';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string;
  lastFetched: number;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: '',
  lastFetched: new Date('0').getTime(),
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchProducts.fulfilled, (state, action) => ({
        ...state,
        products: action.payload,
        isLoading: false,
        error: '',
        lastFetched: new Date().getTime(),
      }))
      .addCase(fetchProducts.rejected, (state) => ({
        ...state,
        isLoading: false,
        error: 'Something went wrong!',
      }));
  },
});

export default productsSlice.reducer;

const fetchProducts = createAsyncThunk<Product[]>('products/fetch', () => {
  return getProducts();
});

export const init = (): AppThunk => {
  return (dispatch, getState) => {
    const { lastFetched } = getState().products;
    const now = new Date().getTime();

    if (now - lastFetched > 5 * 60 * 1000) {
      dispatch(fetchProducts());
    }
  };
};
