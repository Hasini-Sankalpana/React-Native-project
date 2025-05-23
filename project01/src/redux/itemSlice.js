import { createSlice } from "@reduxjs/toolkit"; 

const initialState ={
    items:[],
    loading:false,
    error:null,
}

const itemSlice = createSlice ({
    name:'item',
    initialState,
    reducers:{
        setItemLoading:(state)=> {
            state.loading = true;
            state.error =null
        },
        setItemError:(state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        getItemSuccess:(state,action) => {
            state.items = action.payload;
        }

    }
})

export const {setItemLoading,setItemError,getItemSuccess} = itemSlice.actions

export default itemSlice.reducer;