import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    theme:'system',
    resolvedTheme:'light'

}

const themeSlice = createSlice ({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            AsyncStorage.setItem('theme', action.payload);
        },
        setResolvedTheme: (state,action) => {
            state.resolvedTheme = action.payload
        }
    }
})

export const { setTheme,setResolvedTheme } = themeSlice.actions;

export default themeSlice.reducer;