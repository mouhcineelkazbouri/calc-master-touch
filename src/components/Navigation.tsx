
import React from 'react';
import { Calculator, BarChart3, Repeat, Bitcoin, Settings } from 'lucide-react';

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

const Navigation = ({ activeScreen, onScreenChange }: NavigationProps) => {
  const navItems = [
    { id: 'basic', icon: Calculator, label: 'Basic' },
    { id: 'scientific', icon: BarChart3, label: 'Scientific' },
    { id: 'converter', icon: Repeat, label: 'Convert' },
    { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-2 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                console.log('Switching to screen:', item.id);
                onScreenChange(item.id);
              }}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
