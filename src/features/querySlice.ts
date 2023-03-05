import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QueryState = {
  appliedQuery: string;
  query: string;
  currentPage: number;
  currentSearchPage: number;
};

const initialState: QueryState = {
  appliedQuery: '',
  query: '',
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
    }),
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    setCurrentPage: (state, action: PayloadAction<number>) => ({
      ...state,
      currentPage: action.payload,
    }),
    setCurrentSearchPage: (state, action: PayloadAction<number>) => ({
      ...state,
      currentSearchPage: action.payload,
    }),
  },
});

export const {
  setAppliedQuery,
  setQuery,
  setCurrentPage,
  setCurrentSearchPage,
} = QuerySlice.actions;
export default QuerySlice.reducer;
