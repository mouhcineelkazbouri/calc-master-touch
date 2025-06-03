
import React, { useState } from 'react';
import { basicCalculate, performScientificOperation } from '../utils/calculatorUtils';
import ScientificButton from './ScientificButton';
import CalculatorDisplay from './CalculatorDisplay';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
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
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(expression + ' ' + nextOperation + ' ');
    } else if (operation && !waitingForNewValue) {
      const currentValue = previousValue || 0;
      const newValue = basicCalculate(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setExpression(String(newValue) + ' ' + nextOperation + ' ');
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
      setDisplay(String(newValue));
      setExpression(expression + ' = ' + String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const scientificOperation = (op: string) => {
    const value = parseFloat(display);
    const { result, operationText } = performScientificOperation(op, value);

    setDisplay(String(result));
    setExpression(operationText + ' = ' + String(result));
    setWaitingForNewValue(true);
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Scientific Calculator</h2>
      
      <CalculatorDisplay expression={expression} display={display} />

      {/* Scientific Functions Row 1 */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        <ScientificButton onPress={() => scientificOperation('sin')} title="sin" backgroundColor="bg-orange-100" textColor="text-orange-700" />
        <ScientificButton onPress={() => scientificOperation('cos')} title="cos" backgroundColor="bg-orange-100" textColor="text-orange-700" />
        <ScientificButton onPress={() => scientificOperation('tan')} title="tan" backgroundColor="bg-orange-100" textColor="text-orange-700" />
        <ScientificButton onPress={() => scientificOperation('ln')} title="ln" backgroundColor="bg-orange-100" textColor="text-orange-700" />
        <ScientificButton onPress={() => scientificOperation('log')} title="log" backgroundColor="bg-orange-100" textColor="text-orange-700" />
      </div>

      <div className="grid grid-cols-5 gap-2 mb-3">
        <ScientificButton onPress={() => scientificOperation('π')} title="π" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={() => scientificOperation('e')} title="e" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={() => scientificOperation('x²')} title="x²" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={() => scientificOperation('√')} title="√x" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={() => scientificOperation('1/x')} title="1/x" backgroundColor="bg-blue-100" textColor="text-blue-700" />
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        <ScientificButton onPress={() => inputNumber('(')} title="(" backgroundColor="bg-gray-200" />
        <ScientificButton onPress={() => inputNumber(')')} title=")" backgroundColor="bg-gray-200" />
        <ScientificButton onPress={() => scientificOperation('x!')} title="x!" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={clear} title="AC" backgroundColor="bg-red-100" textColor="text-red-700" />
        <ScientificButton onPress={toggleSign} title="±" backgroundColor="bg-gray-200" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        <ScientificButton onPress={() => inputNumber('7')} title="7" size="h-14" />
        <ScientificButton onPress={() => inputNumber('8')} title="8" size="h-14" />
        <ScientificButton onPress={() => inputNumber('9')} title="9" size="h-14" />
        <ScientificButton onPress={() => inputOperation('÷')} title="÷" backgroundColor="bg-blue-500" textColor="text-white" size="h-14" />

        <ScientificButton onPress={() => inputNumber('4')} title="4" size="h-14" />
        <ScientificButton onPress={() => inputNumber('5')} title="5" size="h-14" />
        <ScientificButton onPress={() => inputNumber('6')} title="6" size="h-14" />
        <ScientificButton onPress={() => inputOperation('×')} title="×" backgroundColor="bg-blue-500" textColor="text-white" size="h-14" />

        <ScientificButton onPress={() => inputNumber('1')} title="1" size="h-14" />
        <ScientificButton onPress={() => inputNumber('2')} title="2" size="h-14" />
        <ScientificButton onPress={() => inputNumber('3')} title="3" size="h-14" />
        <ScientificButton onPress={() => inputOperation('−')} title="−" backgroundColor="bg-blue-500" textColor="text-white" size="h-14" />

        <ScientificButton onPress={() => inputNumber('0')} title="0" size="h-14" />
        <ScientificButton onPress={inputDecimal} title="." size="h-14" />
        <ScientificButton onPress={performCalculation} title="=" backgroundColor="bg-orange-500" textColor="text-white" size="h-14" />
        <ScientificButton onPress={() => inputOperation('+')} title="+" backgroundColor="bg-blue-500" textColor="text-white" size="h-14" />
      </div>
    </div>
  );
};

export default ScientificCalculator;
