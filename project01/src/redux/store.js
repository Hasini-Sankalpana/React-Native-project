import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemReducer from './itemSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    theme: themeReducer,
  },
});

export default store;
