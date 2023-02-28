import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QueryState = {
  appliedQuery: string;
  headerQuery: string;
  productsQuery: string;
  currentPage: number;
};

const initialState: QueryState = {
  appliedQuery: '',
  headerQuery: '',
  productsQuery: '',
  currentPage: 1,
};

export const QuerySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setAppliedQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      appliedQuery: action.payload,
    }),
    setHeaderQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      headerQuery: action.payload,
      productsQuery: '',
    }),
    setProductsQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      productsQuery: action.payload,
      headerQuery: '',
    }),
    setCurrentPage: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPage: action.payload,
    }),
  },
});

export const {
  setAppliedQuery,
  setHeaderQuery,
  setProductsQuery,
  setCurrentPage,
} = QuerySlice.actions;
export default QuerySlice.reducer;
