import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './features/modalSlice';
import searchQueryReducer from './features/searchQuerySlice';
import searchResultsReducer from './features/searchResultsSlice';
import modalResultsReducer from './features/modalResultsSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    searchQuery: searchQueryReducer,
    results: searchResultsReducer,
    modalResults: modalResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
