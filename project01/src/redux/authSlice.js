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
  },
});



export const { signupSuccess,signinSuccess,getUserSuccess,setError} = authSlice.actions;

export default authSlice.reducer;