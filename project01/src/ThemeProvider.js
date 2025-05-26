import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from './css/colors';
import { useColorScheme } from 'react-native';
import { setResolvedTheme } from './redux/themeSlice';


export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme()
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const newresolvedTheme = theme === 'system' ? colorScheme : theme;

 useEffect(() => {
    // const newResolvedTheme = theme === 'system' ? colorScheme : theme;
     setResolvedTheme(newresolvedTheme);
   },[theme,colorScheme,dispatch])
  
  const themeColors = colors[newresolvedTheme];

  return (
    <ThemeContext.Provider value={themeColors}>
      {children}
    </ThemeContext.Provider>
  );
};