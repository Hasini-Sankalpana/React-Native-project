import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    theme: 'dark'
}

const themeSlice = createSlice ({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            AsyncStorage.setItem('theme', action.payload);
        }
    }
})

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;