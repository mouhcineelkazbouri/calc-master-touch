
import React, { useState } from 'react';

const BasicCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '−':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const toggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Basic Calculator</h2>
      
      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
        <div className="text-right text-3xl font-light text-gray-800">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className="bg-gray-200 rounded-2xl h-16 text-lg font-medium">AC</button>
        <button onClick={toggleSign} className="bg-gray-200 rounded-2xl h-16 text-lg font-medium">±</button>
        <button onClick={handlePercent} className="bg-gray-200 rounded-2xl h-16 text-lg font-medium">%</button>
        <button onClick={() => handleOperation('÷')} className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">÷</button>
        
        <button onClick={() => handleNumber('7')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">7</button>
        <button onClick={() => handleNumber('8')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">8</button>
        <button onClick={() => handleNumber('9')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">9</button>
        <button onClick={() => handleOperation('×')} className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">×</button>
        
        <button onClick={() => handleNumber('4')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">4</button>
        <button onClick={() => handleNumber('5')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">5</button>
        <button onClick={() => handleNumber('6')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">6</button>
        <button onClick={() => handleOperation('−')} className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">−</button>
        
        <button onClick={() => handleNumber('1')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">1</button>
        <button onClick={() => handleNumber('2')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">2</button>
        <button onClick={() => handleNumber('3')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">3</button>
        <button onClick={() => handleOperation('+')} className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">+</button>
        
        <button onClick={() => handleNumber('0')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium col-span-2">0</button>
        <button onClick={handleDecimal} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">.</button>
        <button onClick={handleEquals} className="bg-orange-500 text-white rounded-2xl h-16 text-lg font-medium">=</button>
      </div>
    </div>
  );
};

export default BasicCalculator;
