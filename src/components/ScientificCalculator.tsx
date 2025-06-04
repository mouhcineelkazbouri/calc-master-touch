
import React, { useState, useCallback } from 'react';
import { History } from 'lucide-react';
import { basicCalculate, performScientificOperation } from '../utils/calculatorUtils';
import { getRealtimePreview, formatLargeNumber, parseComplexNumber } from '../utils/enhancedCalculatorUtils';
import ScientificButton from './ScientificButton';
import EnhancedCalculatorDisplay from './EnhancedCalculatorDisplay';
import CalculatorHistory, { HistoryItem } from './CalculatorHistory';
import { toast } from 'sonner';

const ScientificCalculator = () => {
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
    setHistory(prev => [...prev, newItem].slice(-50));
  }, []);

  const inputNumber = (num: string) => {
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

  const inputDecimal = () => {
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

  const inputOperation = (nextOperation: string) => {
    setJustCalculated(false); // Clear the flag when operation is pressed
    
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(expression + ' ' + nextOperation + ' ');
    } else if (operation && !waitingForNewValue) {
      const currentValue = previousValue || 0;
      const newValue = basicCalculate(currentValue, inputValue, operation);
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

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = basicCalculate(previousValue, inputValue, operation);
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

  const scientificOperation = (op: string) => {
    setJustCalculated(false); // Clear the flag when scientific operation is pressed
    
    const value = parseFloat(display);
    const { result, operationText } = performScientificOperation(op, value);
    const formattedResult = formatLargeNumber(result);

    setDisplay(formattedResult);
    const fullExpression = operationText + ' = ' + formattedResult;
    setExpression(fullExpression);
    addToHistory(operationText, formattedResult);
    setWaitingForNewValue(true);
    setJustCalculated(true); // Set flag when scientific calculation is complete
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
    <div className="p-3 h-screen flex flex-col bg-gray-50">
      <div className="flex-shrink-0">
        <EnhancedCalculatorDisplay 
          expression={expression} 
          display={display} 
          preview={preview}
          onPaste={handlePaste}
          onShowHistory={() => setShowHistory(true)}
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-2">
        {/* Scientific Functions Row 1 */}
        <div className="grid grid-cols-5 gap-2">
          <ScientificButton onPress={() => scientificOperation('sin')} title="sin" backgroundColor="bg-orange-200" textColor="text-orange-800" size="h-10" />
          <ScientificButton onPress={() => scientificOperation('cos')} title="cos" backgroundColor="bg-orange-200" textColor="text-orange-800" size="h-10" />
          <ScientificButton onPress={() => scientificOperation('tan')} title="tan" backgroundColor="bg-orange-200" textColor="text-orange-800" size="h-10" />
          <ScientificButton onPress={() => scientificOperation('ln')} title="ln" backgroundColor="bg-orange-200" textColor="text-orange-800" size="h-10" />
          <ScientificButton onPress={() => scientificOperation('log')} title="log" backgroundColor="bg-orange-200" textColor="text-orange-800" size="h-10" />
        </div>

        {/* Scientific Functions Row 2 */}
        <div className="grid grid-cols-5 gap-2">
          <ScientificButton onPress={() => scientificOperation('π')} title="π" backgroundColor="bg-blue-200" textColor="text-blue-800" size="h-10" />
          <ScientificButton onPress={() => scientificOperation('e')} title="e" backgroundColor="bg-blue-200" textColor="text-blue-800" size="h-10" />
          <ScientificButton onPress={() => scientificOperation('x²')} title="x²" backgroundColor="bg-blue-200" textColor="text-blue-800" size="h-10" />
          <ScientificButton onPress={() => scientificOperation('√')} title="√x" backgroundColor="bg-blue-200" textColor="text-blue-800" size="h-10" />
          <ScientificButton onPress={() => scientificOperation('1/x')} title="1/x" backgroundColor="bg-blue-200" textColor="text-blue-800" size="h-10" />
        </div>

        {/* Scientific Functions Row 3 */}
        <div className="grid grid-cols-5 gap-2">
          <ScientificButton onPress={() => inputNumber('(')} title="(" backgroundColor="bg-gray-300" textColor="text-gray-800" size="h-10" />
          <ScientificButton onPress={() => inputNumber(')')} title=")" backgroundColor="bg-gray-300" textColor="text-gray-800" size="h-10" />
          <ScientificButton onPress={() => scientificOperation('x!')} title="x!" backgroundColor="bg-blue-200" textColor="text-blue-800" size="h-10" />
          <ScientificButton onPress={clear} title="AC" backgroundColor="bg-red-200" textColor="text-red-800" size="h-10" />
          <ScientificButton onPress={toggleSign} title="±" backgroundColor="bg-gray-300" textColor="text-gray-800" size="h-10" />
        </div>

        {/* Number pad - takes remaining space */}
        <div className="flex-1 grid grid-cols-4 gap-2 content-start">
          <ScientificButton onPress={() => inputNumber('7')} title="7" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={() => inputNumber('8')} title="8" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={() => inputNumber('9')} title="9" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={() => inputOperation('÷')} title="÷" backgroundColor="bg-blue-500" textColor="text-white" size="h-12" />

          <ScientificButton onPress={() => inputNumber('4')} title="4" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={() => inputNumber('5')} title="5" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={() => inputNumber('6')} title="6" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={() => inputOperation('×')} title="×" backgroundColor="bg-blue-500" textColor="text-white" size="h-12" />

          <ScientificButton onPress={() => inputNumber('1')} title="1" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={() => inputNumber('2')} title="2" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={() => inputNumber('3')} title="3" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={() => inputOperation('−')} title="−" backgroundColor="bg-blue-500" textColor="text-white" size="h-12" />

          <ScientificButton onPress={() => inputNumber('0')} title="0" backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={inputDecimal} title="." backgroundColor="bg-white" textColor="text-gray-800" size="h-12" />
          <ScientificButton onPress={performCalculation} title="=" backgroundColor="bg-orange-500" textColor="text-white" size="h-12" />
          <ScientificButton onPress={() => inputOperation('+')} title="+" backgroundColor="bg-blue-500" textColor="text-white" size="h-12" />
        </div>
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

export default ScientificCalculator;
