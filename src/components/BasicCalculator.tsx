
import React, { useState, useCallback } from 'react';
import { History } from 'lucide-react';
import EnhancedCalculatorDisplay from './EnhancedCalculatorDisplay';
import CalculatorHistory, { HistoryItem } from './CalculatorHistory';
import { getRealtimePreview, formatLargeNumber, parseComplexNumber } from '../utils/enhancedCalculatorUtils';
import { toast } from 'sonner';

const BasicCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Get real-time preview
  const preview = getRealtimePreview(expression);

  const addToHistory = useCallback((expr: string, result: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression: expr,
      result: result,
      timestamp: new Date()
    };
    setHistory(prev => [...prev, newItem].slice(-50)); // Keep last 50 calculations
  }, []);

  const handleNumber = (num: string) => {
    // If we just calculated and user types a number, start fresh like AC
    if (justCalculated) {
      setDisplay(num);
      setExpression(num);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(false);
      setJustCalculated(false);
      return;
    }

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
    setJustCalculated(false); // Clear the flag when operation is pressed
    
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(expression + ' ' + nextOperation + ' ');
    } else if (operation && !waitingForNewValue) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      const formattedValue = formatLargeNumber(newValue);
      setDisplay(formattedValue);
      setPreviousValue(newValue);
      setExpression(formattedValue + ' ' + nextOperation + ' ');
    } else {
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
      const formattedValue = formatLargeNumber(newValue);
      const fullExpression = expression + ' = ' + formattedValue;
      
      setDisplay(formattedValue);
      setExpression(fullExpression);
      addToHistory(expression, formattedValue);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
      setJustCalculated(true); // Set flag when calculation is complete
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setJustCalculated(false);
  };

  const toggleSign = () => {
    setJustCalculated(false); // Clear the flag when modifying current value
    
    const newDisplay = display.charAt(0) === '-' ? display.slice(1) : '-' + display;
    setDisplay(newDisplay);
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
    setJustCalculated(false); // Clear the flag when modifying current value
    
    const value = parseFloat(display);
    const newValue = value / 100;
    const formattedValue = formatLargeNumber(newValue);
    setDisplay(formattedValue);
    if (expression) {
      const parts = expression.split(' ');
      if (parts.length > 0) {
        parts[parts.length - 1] = formattedValue;
        setExpression(parts.join(' '));
      }
    } else {
      setExpression(formattedValue);
    }
  };

  const handleDecimal = () => {
    // If we just calculated and user types decimal, start fresh with "0."
    if (justCalculated) {
      setDisplay('0.');
      setExpression('0.');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(false);
      setJustCalculated(false);
      return;
    }

    if (waitingForNewValue) {
      setDisplay('0.');
      setExpression(expression + '0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
      setExpression(expression + '.');
    }
  };

  const handlePaste = (value: string) => {
    const num = parseComplexNumber(value);
    if (num !== null) {
      const formattedValue = formatLargeNumber(num);
      setDisplay(formattedValue);
      if (waitingForNewValue || display === '0') {
        setExpression(expression + formattedValue);
      } else {
        setExpression(expression + formattedValue);
      }
      setWaitingForNewValue(false);
    }
  };

  const handleUseHistoryResult = (result: string) => {
    setDisplay(result);
    setExpression(result);
    setWaitingForNewValue(false);
    setShowHistory(false);
    toast.success('Result applied');
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success('History cleared');
  };

  return (
    <div className="p-6">
      <EnhancedCalculatorDisplay 
        expression={expression} 
        display={display} 
        preview={preview}
        onPaste={handlePaste}
        onShowHistory={() => setShowHistory(true)}
      />

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

      {showHistory && (
        <CalculatorHistory
          history={history}
          onUseResult={handleUseHistoryResult}
          onClearHistory={clearHistory}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
};

export default BasicCalculator;
