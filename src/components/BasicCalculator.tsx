
import React, { useState } from 'react';

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

export default BasicCalculator;
