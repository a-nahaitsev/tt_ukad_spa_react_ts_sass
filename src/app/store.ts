import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import productReducer from '../features/productSlice';
import queryReducer from '../features/querySlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    query: queryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
