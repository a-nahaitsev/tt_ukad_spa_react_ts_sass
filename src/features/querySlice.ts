import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QueryState = {
  query: string;
  currentSearchPage: number;
};

const initialState: QueryState = {
  query: '',
  currentSearchPage: 1,
};

export const QuerySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
    }),
    setCurrentSearchPage: (state, action: PayloadAction<number>) => ({
      ...state,
      currentSearchPage: action.payload,
    }),
  },
});

export const { setQuery, setCurrentSearchPage } = QuerySlice.actions;
export default QuerySlice.reducer;
