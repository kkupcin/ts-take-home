import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (url: string, thunkAPI) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data;
});

interface SearchResultsState {
  results: {};
  isLoading: boolean;
}

const initialState = {
  results: {},
  isLoading: true,
} as SearchResultsState;

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.results = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setLoading } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
