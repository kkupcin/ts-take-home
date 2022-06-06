import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchModalResults = createAsyncThunk('search/modalSearchResults', async (url: string, thunkAPI) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data;
});

interface ModalResultsState {
  results: {};
  isLoading: boolean;
}

const initialState = {
  results: {},
  isLoading: true,
} as ModalResultsState;

export const modalResultsSlice = createSlice({
  name: 'modalResults',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchModalResults.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchModalResults.fulfilled, (state, action) => {
      state.results = action.payload;
      state.isLoading = false;
    });
  },
});

export default modalResultsSlice.reducer;
