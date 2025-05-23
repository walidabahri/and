import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
export const lightTheme = {
  primary: '#4CAF50', // Vibrant green
  primaryLight: '#A5D6A7',
  primaryDark: '#2E7D32',
  secondary: '#FF9800', // Warm orange
  secondaryLight: '#FFCC80',
  secondaryDark: '#EF6C00',
  accent: '#9C27B0', // Purple accent
  success: '#00C853',
  warning: '#FFB300',
  error: '#F44336',
  background: '#FFFFFF',
  card: '#F5F5F5',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  disabled: '#BDBDBD',
  mode: 'light',
};

export const darkTheme = {
  primary: '#81C784', // Lighter green for dark mode
  primaryLight: '#4CAF50',
  primaryDark: '#1B5E20',
  secondary: '#FFB74D', // Lighter orange for dark mode
  secondaryLight: '#FFCC80',
  secondaryDark: '#E65100',
  accent: '#CE93D8', // Lighter purple for dark mode
  success: '#69F0AE',
  warning: '#FFD54F',
  error: '#FF8A80',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#BDBDBD',
  border: '#424242',
  disabled: '#757575',
  mode: 'dark',
};

type Theme = typeof lightTheme;
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};