import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: null,
  token: null,
  error: null,
  loading:false
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
    setLoading:(state) => {
       state.loading = true;
       state.error=null;
},
    logout:(state) => {
      state.user = null;
      state.error = null;
      state.token = null;
    }
  },
});



export const { signupSuccess,signinSuccess,getUserSuccess,setError,setLoading,logout} = authSlice.actions;

export default authSlice.reducer;