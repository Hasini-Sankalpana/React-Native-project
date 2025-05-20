import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.token = action.payload.token;
    },
    signinSuccess: (state, action) => {
      state.token = action.payload.token;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout:(state) => {
      state.user = null;
      state.error = null;
      state.token = null;
    }
  },
});



export const { signupSuccess,signinSuccess,getUserSuccess,setError,logout} = authSlice.actions;

export default authSlice.reducer;