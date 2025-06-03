
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

  const applyCustomColors = () => {
    const savedColors = localStorage.getItem('customThemeColors');
    if (savedColors) {
      const colors = JSON.parse(savedColors);
      const root = document.documentElement;
      
      const hexToHsl = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }

        return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
      };

      root.style.setProperty('--background', hexToHsl(colors.background));
      root.style.setProperty('--foreground', hexToHsl(colors.foreground));
      root.style.setProperty('--primary', hexToHsl(colors.primary));
      root.style.setProperty('--secondary', hexToHsl(colors.secondary));
      root.style.setProperty('--accent', hexToHsl(colors.accent));
      root.style.setProperty('--muted', hexToHsl(colors.muted));
      root.style.setProperty('--border', hexToHsl(colors.border));
      root.style.setProperty('--input', hexToHsl(colors.border));
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'custom');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      setEffectiveTheme(systemTheme);
    } else if (theme === 'custom') {
      root.classList.add('custom');
      setEffectiveTheme('custom');
      applyCustomColors();
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
