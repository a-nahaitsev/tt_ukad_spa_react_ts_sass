import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QueryState = {
  appliedQuery: string;
  headerQuery: string;
  productsQuery: string;
  currentPage: number;
  currentSearchPage: number;
};

const initialState: QueryState = {
  appliedQuery: '',
  headerQuery: '',
  productsQuery: '',
  currentPage: 1,
  currentSearchPage: 1,
};

export const QuerySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setAppliedQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      appliedQuery: action.payload.trim(),
      currentSearchPage: 1,
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
      currentSearchPage: 1,
    }),
    setCurrentSearchPage: (state, action: PayloadAction<number>) => ({
      ...state,
      currentSearchPage: action.payload,
    }),
  },
});

export const {
  setAppliedQuery,
  setHeaderQuery,
  setProductsQuery,
  setCurrentPage,
  setCurrentSearchPage,
} = QuerySlice.actions;
export default QuerySlice.reducer;
