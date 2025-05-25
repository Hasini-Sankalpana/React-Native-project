import React from 'react';
import { useSelector } from 'react-redux';
import { colors } from './css/colors';


export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  
  const themeColors = colors[theme] || colors.dark;

  return (
    <ThemeContext.Provider value={themeColors}>
      {children}
    </ThemeContext.Provider>
  );
};