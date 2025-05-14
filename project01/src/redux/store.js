import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemReducer from './itemSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
  },
});

export default store;
