
import React, { useState } from 'react';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const inputOperation = (nextOperation: string) => {
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

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const scientificOperation = (op: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (op) {
      case 'sin':
        result = Math.sin((value * Math.PI) / 180);
        break;
      case 'cos':
        result = Math.cos((value * Math.PI) / 180);
        break;
      case 'tan':
        result = Math.tan((value * Math.PI) / 180);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'x²':
        result = value * value;
        break;
      case '√':
        result = Math.sqrt(value);
        break;
      case '1/x':
        result = 1 / value;
        break;
      case 'x!':
        result = factorial(Math.floor(value));
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
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

  const ScientificButton = ({ onPress, title, backgroundColor = 'bg-gray-100', textColor = 'text-gray-800', size = 'h-12' }: any) => (
    <button
      className={`${size} ${backgroundColor} ${textColor} rounded-xl font-medium text-sm shadow-md hover:shadow-lg active:scale-95 transition-all duration-150 hover:brightness-105`}
      onClick={onPress}
    >
      {title}
    </button>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Scientific Calculator</h2>
      
      {/* Display */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4">
        <div className="text-right text-2xl font-light text-gray-800 break-all">{display}</div>
      </div>

      {/* Scientific Functions Row 1 */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        <ScientificButton onPress={() => scientificOperation('sin')} title="sin" backgroundColor="bg-orange-100" textColor="text-orange-700" />
        <ScientificButton onPress={() => scientificOperation('cos')} title="cos" backgroundColor="bg-orange-100" textColor="text-orange-700" />
        <ScientificButton onPress={() => scientificOperation('tan')} title="tan" backgroundColor="bg-orange-100" textColor="text-orange-700" />
        <ScientificButton onPress={() => scientificOperation('ln')} title="ln" backgroundColor="bg-orange-100" textColor="text-orange-700" />
        <ScientificButton onPress={() => scientificOperation('log')} title="log" backgroundColor="bg-orange-100" textColor="text-orange-700" />
      </div>

      {/* Scientific Functions Row 2 */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        <ScientificButton onPress={() => scientificOperation('π')} title="π" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={() => scientificOperation('e')} title="e" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={() => scientificOperation('x²')} title="x²" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={() => scientificOperation('√')} title="√x" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={() => scientificOperation('1/x')} title="1/x" backgroundColor="bg-blue-100" textColor="text-blue-700" />
      </div>

      {/* Scientific Functions Row 3 */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <ScientificButton onPress={() => inputNumber('(')} title="(" backgroundColor="bg-gray-200" />
        <ScientificButton onPress={() => inputNumber(')')} title=")" backgroundColor="bg-gray-200" />
        <ScientificButton onPress={() => scientificOperation('x!')} title="x!" backgroundColor="bg-blue-100" textColor="text-blue-700" />
        <ScientificButton onPress={clear} title="AC" backgroundColor="bg-red-100" textColor="text-red-700" />
        <ScientificButton onPress={toggleSign} title="±" backgroundColor="bg-gray-200" />
      </div>

      {/* Basic Calculator Buttons */}
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
