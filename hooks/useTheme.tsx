import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isNightMode: boolean;
  toggleNightMode: () => void;
  theme: {
    backgroundColor: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    // Load saved theme preference
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('nightMode');
      if (savedTheme !== null) {
        setIsNightMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  };

  const toggleNightMode = async () => {
    const newMode = !isNightMode;
    setIsNightMode(newMode);
    try {
      await AsyncStorage.setItem('nightMode', JSON.stringify(newMode));
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const theme = {
    backgroundColor: isNightMode ? '#1A1A1A' : '#F8F9FA',
    cardBackground: isNightMode ? '#2D2D2D' : '#FFFFFF',
    textPrimary: isNightMode ? '#FFFFFF' : '#2C3E50',
    textSecondary: isNightMode ? '#B0B0B0' : '#8E8E93',
    accent: '#2AA8A8',
    border: isNightMode ? '#404040' : '#E1E1E6',
  };

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleNightMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 