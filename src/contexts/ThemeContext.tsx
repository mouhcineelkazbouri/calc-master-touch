
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system' | 'custom';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: 'light' | 'dark' | 'custom';
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
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'system';
  });

  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark' | 'custom'>('light');

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'custom');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      setEffectiveTheme(systemTheme);
    } else {
      root.classList.add(theme);
      setEffectiveTheme(theme as 'light' | 'dark' | 'custom');
    }
  }, [theme]);

  // Listen for system theme changes when theme is 'system'
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        const root = document.documentElement;
        root.classList.remove('light', 'dark', 'custom');
        root.classList.add(systemTheme);
        setEffectiveTheme(systemTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
