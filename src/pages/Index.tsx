
import React, { useState } from 'react';
import { Calculator, BarChart3, Repeat, Bitcoin, Settings } from 'lucide-react';

const Index = () => {
  const [activeScreen, setActiveScreen] = useState('basic');

  console.log('App is rendering, active screen:', activeScreen);

  // Simple Basic Calculator Component
  const BasicCalculator = () => {
    const [display, setDisplay] = useState('0');

    const handleNumber = (num: string) => {
      setDisplay(display === '0' ? num : display + num);
    };

    const clear = () => setDisplay('0');

    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Basic Calculator</h2>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="text-right text-3xl font-light text-gray-800">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <button onClick={clear} className="bg-gray-200 rounded-2xl h-16 text-lg font-medium">AC</button>
          <button className="bg-gray-200 rounded-2xl h-16 text-lg font-medium">±</button>
          <button className="bg-gray-200 rounded-2xl h-16 text-lg font-medium">%</button>
          <button className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">÷</button>
          
          <button onClick={() => handleNumber('7')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">7</button>
          <button onClick={() => handleNumber('8')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">8</button>
          <button onClick={() => handleNumber('9')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">9</button>
          <button className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">×</button>
          
          <button onClick={() => handleNumber('4')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">4</button>
          <button onClick={() => handleNumber('5')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">5</button>
          <button onClick={() => handleNumber('6')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">6</button>
          <button className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">−</button>
          
          <button onClick={() => handleNumber('1')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">1</button>
          <button onClick={() => handleNumber('2')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">2</button>
          <button onClick={() => handleNumber('3')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">3</button>
          <button className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">+</button>
          
          <button onClick={() => handleNumber('0')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium col-span-2">0</button>
          <button onClick={() => handleNumber('.')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">.</button>
          <button className="bg-orange-500 text-white rounded-2xl h-16 text-lg font-medium">=</button>
        </div>
      </div>
    );
  };

  // Simple placeholder components for other screens
  const OtherScreen = ({ title }: { title: string }) => (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      <p className="text-gray-600">This screen is coming soon!</p>
    </div>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'basic':
        return <BasicCalculator />;
      case 'scientific':
        return <OtherScreen title="Scientific Calculator" />;
      case 'converter':
        return <OtherScreen title="Unit Converter" />;
      case 'crypto':
        return <OtherScreen title="Crypto Calculator" />;
      case 'settings':
        return <OtherScreen title="Settings" />;
      default:
        return <BasicCalculator />;
    }
  };

  const navItems = [
    { id: 'basic', icon: Calculator, label: 'Basic' },
    { id: 'scientific', icon: BarChart3, label: 'Scientific' },
    { id: 'converter', icon: Repeat, label: 'Convert' },
    { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 text-center">CalcMaster Pro</h1>
        </div>

        {/* Screen Content */}
        <div className="flex-1">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
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
                    setActiveScreen(item.id);
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
      </div>
    </div>
  );
};

export default Index;
