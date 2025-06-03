
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ThemeCustomizerProps {
  open: boolean;
  onClose: () => void;
}

const ThemeCustomizer = ({ open, onClose }: ThemeCustomizerProps) => {
  const [colors, setColors] = useState({
    background: '#f5f3ff',
    foreground: '#1a0d33',
    primary: '#8b5cf6',
    secondary: '#e0d4f7',
    accent: '#c4a7e8',
    muted: '#e0d4f7',
    border: '#c4a7e8',
  });

  const handleColorChange = (colorKey: string, value: string) => {
    setColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const applyCustomTheme = () => {
    const root = document.documentElement;
    
    // Convert hex to HSL and apply CSS variables
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

    // Apply the custom colors as CSS variables
    root.style.setProperty('--background', hexToHsl(colors.background));
    root.style.setProperty('--foreground', hexToHsl(colors.foreground));
    root.style.setProperty('--primary', hexToHsl(colors.primary));
    root.style.setProperty('--primary-foreground', '0 0% 100%');
    root.style.setProperty('--secondary', hexToHsl(colors.secondary));
    root.style.setProperty('--secondary-foreground', hexToHsl(colors.foreground));
    root.style.setProperty('--accent', hexToHsl(colors.accent));
    root.style.setProperty('--accent-foreground', hexToHsl(colors.foreground));
    root.style.setProperty('--muted', hexToHsl(colors.muted));
    root.style.setProperty('--muted-foreground', hexToHsl(colors.foreground));
    root.style.setProperty('--border', hexToHsl(colors.border));
    root.style.setProperty('--input', hexToHsl(colors.border));
    root.style.setProperty('--ring', hexToHsl(colors.primary));
    root.style.setProperty('--card', hexToHsl(colors.background));
    root.style.setProperty('--card-foreground', hexToHsl(colors.foreground));
    root.style.setProperty('--popover', hexToHsl(colors.background));
    root.style.setProperty('--popover-foreground', hexToHsl(colors.foreground));
    root.style.setProperty('--destructive', '0 84.2% 60.2%');
    root.style.setProperty('--destructive-foreground', '210 40% 98%');

    // Save to localStorage
    localStorage.setItem('customThemeColors', JSON.stringify(colors));
    
    onClose();
  };

  const resetToDefault = () => {
    setColors({
      background: '#f5f3ff',
      foreground: '#1a0d33',
      primary: '#8b5cf6',
      secondary: '#e0d4f7',
      accent: '#c4a7e8',
      muted: '#e0d4f7',
      border: '#c4a7e8',
    });
  };

  const ColorInput = ({ label, colorKey }: { label: string; colorKey: string }) => (
    <div className="space-y-2">
      <Label htmlFor={colorKey} className="text-sm font-medium">
        {label}
      </Label>
      <div className="flex items-center gap-3">
        <input
          id={colorKey}
          type="color"
          value={colors[colorKey as keyof typeof colors]}
          onChange={(e) => handleColorChange(colorKey, e.target.value)}
          className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={colors[colorKey as keyof typeof colors]}
          onChange={(e) => handleColorChange(colorKey, e.target.value)}
          className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Theme Colors</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <ColorInput label="Background" colorKey="background" />
          <ColorInput label="Text Color" colorKey="foreground" />
          <ColorInput label="Primary" colorKey="primary" />
          <ColorInput label="Secondary" colorKey="secondary" />
          <ColorInput label="Accent" colorKey="accent" />
          <ColorInput label="Muted" colorKey="muted" />
          <ColorInput label="Border" colorKey="border" />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={resetToDefault} variant="outline" className="flex-1">
            Reset
          </Button>
          <Button onClick={applyCustomTheme} className="flex-1">
            Apply Theme
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeCustomizer;
