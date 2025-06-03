import React, { useState } from 'react';

const BasicCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setExpression(expression + num);
      setWaitingForNewValue(false);
    } else {
      const newDisplay = display === '0' ? num : display + num;
      setDisplay(newDisplay);
      if (expression === '') {
        setExpression(num);
      } else if (!waitingForNewValue) {
        // Only append if we're continuing to type the same number
        const lastChar = expression[expression.length - 1];
        if (!isNaN(Number(lastChar)) || lastChar === '.') {
          setExpression(expression + num);
        } else {
          setExpression(expression + num);
        }
      }
    }
  };

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(expression + ' ' + nextOperation + ' ');
    } else if (operation && !waitingForNewValue) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setExpression(String(newValue) + ' ' + nextOperation + ' ');
    } else {
      // Replace the last operation
      const parts = expression.trim().split(' ');
      if (parts.length >= 2) {
        parts[parts.length - 2] = nextOperation;
        setExpression(parts.join(' ') + ' ');
      }
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
      setExpression(expression + ' = ' + String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const toggleSign = () => {
    const newDisplay = display.charAt(0) === '-' ? display.slice(1) : '-' + display;
    setDisplay(newDisplay);
    // Update expression to reflect the sign change
    if (expression) {
      const parts = expression.split(' ');
      if (parts.length > 0) {
        const lastPart = parts[parts.length - 1];
        if (!isNaN(Number(lastPart))) {
          parts[parts.length - 1] = newDisplay;
          setExpression(parts.join(' '));
        }
      }
    } else {
      setExpression(newDisplay);
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    const newValue = value / 100;
    setDisplay(String(newValue));
    // Update expression
    if (expression) {
      const parts = expression.split(' ');
      if (parts.length > 0) {
        parts[parts.length - 1] = String(newValue);
        setExpression(parts.join(' '));
      }
    } else {
      setExpression(String(newValue));
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setExpression(expression + '0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
      setExpression(expression + '.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Basic Calculator</h2>
      
      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
        {/* Expression display */}
        <div className="text-right text-sm text-gray-500 mb-2 min-h-[20px]">
          {expression || '\u00A0'}
        </div>
        {/* Main display */}
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
