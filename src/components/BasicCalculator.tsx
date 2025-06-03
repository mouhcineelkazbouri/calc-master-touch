
import React, { useState } from 'react';

const BasicCalculator = () => {
  const [display, setDisplay] = useState('0');

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const clear = () => setDisplay('0');

  return (
    <div className="h-full flex flex-col p-4">
      {/* Display Section - Fixed height */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4 h-20 flex items-center justify-end">
        <div className="text-right text-2xl font-light text-gray-800 truncate">{display}</div>
      </div>

      {/* Buttons Grid - Remaining height */}
      <div className="flex-1 grid grid-cols-4 gap-3">
        <button onClick={clear} className="bg-gray-200 rounded-2xl text-lg font-medium flex items-center justify-center">AC</button>
        <button className="bg-gray-200 rounded-2xl text-lg font-medium flex items-center justify-center">±</button>
        <button className="bg-gray-200 rounded-2xl text-lg font-medium flex items-center justify-center">%</button>
        <button className="bg-blue-500 text-white rounded-2xl text-lg font-medium flex items-center justify-center">÷</button>
        
        <button onClick={() => handleNumber('7')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">7</button>
        <button onClick={() => handleNumber('8')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">8</button>
        <button onClick={() => handleNumber('9')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">9</button>
        <button className="bg-blue-500 text-white rounded-2xl text-lg font-medium flex items-center justify-center">×</button>
        
        <button onClick={() => handleNumber('4')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">4</button>
        <button onClick={() => handleNumber('5')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">5</button>
        <button onClick={() => handleNumber('6')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">6</button>
        <button className="bg-blue-500 text-white rounded-2xl text-lg font-medium flex items-center justify-center">−</button>
        
        <button onClick={() => handleNumber('1')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">1</button>
        <button onClick={() => handleNumber('2')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">2</button>
        <button onClick={() => handleNumber('3')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">3</button>
        <button className="bg-blue-500 text-white rounded-2xl text-lg font-medium flex items-center justify-center">+</button>
        
        <button onClick={() => handleNumber('0')} className="bg-gray-100 rounded-2xl text-lg font-medium col-span-2 flex items-center justify-center">0</button>
        <button onClick={() => handleNumber('.')} className="bg-gray-100 rounded-2xl text-lg font-medium flex items-center justify-center">.</button>
        <button className="bg-orange-500 text-white rounded-2xl text-lg font-medium flex items-center justify-center">=</button>
      </div>
    </div>
  );
};

export default BasicCalculator;
