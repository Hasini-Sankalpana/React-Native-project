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
    setUserError: (state, action) => {
      state.error = action.payload;
    },
    setUserLoading:(state) => {
       state.loading = true;
       state.error=null;
},
    logout:(state) => {
      state.user = null;
      state.error = null;
      state.token = null;
      state.loading=false;
    }
  },
});



export const { signupSuccess,signinSuccess,getUserSuccess,setUserError,setUserLoading,logout} = authSlice.actions;

export default authSlice.reducer;