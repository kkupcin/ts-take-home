import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchQueryState {
  value: string;
}

const initialState: SearchQueryState = {
  value: '',
};

export const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearchQuery } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
