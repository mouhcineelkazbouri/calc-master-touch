
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
      <div className="max-w-md mx-auto bg-white shadow-xl h-screen relative overflow-hidden">
        {/* Header - Fixed height */}
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 px-6 py-3 border-b border-gray-200 h-16 flex items-center">
          <h1 className="text-xl font-bold text-gray-800 text-center w-full">CalcMaster Pro</h1>
        </div>

        {/* Screen Content - Fixed height with overflow hidden */}
        <div className="h-[calc(100vh-140px)] overflow-hidden">
          {renderScreen()}
        </div>

        {/* Fixed Bottom Navigation - Fixed height */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md h-20">
          <Navigation activeScreen={activeScreen} onScreenChange={setActiveScreen} />
        </div>
      </div>
    </div>
  );
};

export default Index;
