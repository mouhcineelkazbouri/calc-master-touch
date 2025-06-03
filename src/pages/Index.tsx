
import React, { useState } from 'react';
import BasicCalculator from '../components/BasicCalculator';
import ScientificCalculator from '../components/ScientificCalculator';
import UnitConverter from '../components/UnitConverter';
import CryptoCalculator from '../components/CryptoCalculator';
import SettingsScreen from '../components/SettingsScreen';
import Navigation from '../components/Navigation';

const Index = () => {
  const [activeScreen, setActiveScreen] = useState('basic');

  console.log('App is rendering, active screen:', activeScreen);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'basic':
        return <BasicCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'converter':
        return <UnitConverter />;
      case 'crypto':
        return <CryptoCalculator />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <BasicCalculator />;
    }
  };

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
        <Navigation activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      </div>
    </div>
  );
};

export default Index;
