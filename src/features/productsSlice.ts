import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../api/products';
import { AppThunk } from '../app/store';
import { MINUTE } from '../constants/timeConstants';
import { Product } from '../types/Product';

const CACHING_TIME = 5 * MINUTE;

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string;
  lastFetchedTime: number;
};

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: '',
  lastFetchedTime: new Date('0').getTime(),
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
        lastFetchedTime: new Date().getTime(),
      }))
      .addCase(fetchProducts.rejected, (state) => ({
        ...state,
        isLoading: false,
        error: 'Products have not been loaded. Try again later.',
      }));
  },
});

export default productsSlice.reducer;

const fetchProducts = createAsyncThunk<Product[]>('products/fetch', () => {
  return getProducts();
});

export const init = (): AppThunk => {
  return (dispatch, getState) => {
    const { lastFetchedTime } = getState().products;
    const currentTime = new Date().getTime();

    if (currentTime - lastFetchedTime > CACHING_TIME) {
      dispatch(fetchProducts());
    }
  };
};
