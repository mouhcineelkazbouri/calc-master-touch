
import { useState, useCallback } from 'react';
import { basicCalculate, performScientificOperation } from '../utils/calculatorUtils';
import { getRealtimePreview, formatLargeNumber, parseComplexNumber, isValidExpression } from '../utils/enhancedCalculatorUtils';
import { HistoryItem } from '../components/CalculatorHistory';
import { toast } from 'sonner';

export const useScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [twoOperandFunction, setTwoOperandFunction] = useState<string | null>(null);

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
    if (justCalculated) {
      setDisplay(num);
      setExpression(num);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(false);
      setJustCalculated(false);
      setWaitingForSecondOperand(false);
      setTwoOperandFunction(null);
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
      } else {
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
    if (justCalculated) {
      setDisplay('0.');
      setExpression('0.');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(false);
      setJustCalculated(false);
      setWaitingForSecondOperand(false);
      setTwoOperandFunction(null);
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

  const inputParenthesis = (paren: string) => {
    setJustCalculated(false);
    
    if (paren === '(') {
      if (waitingForNewValue || display === '0' || expression === '') {
        setExpression(expression + '(');
        setDisplay('(');
      } else {
        setExpression(expression + '×(');
        setDisplay('(');
      }
      setWaitingForNewValue(true);
    } else {
      if (!waitingForNewValue && expression) {
        setExpression(expression + ')');
        setDisplay(')');
        setWaitingForNewValue(false);
      }
    }
  };

  const inputOperation = (nextOperation: string) => {
    setJustCalculated(false);
    setWaitingForSecondOperand(false);
    setTwoOperandFunction(null);
    
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
    if (waitingForSecondOperand && twoOperandFunction && previousValue !== null) {
      const secondValue = parseFloat(display);
      const { result, operationText } = performScientificOperation(twoOperandFunction, previousValue, secondValue);
      const formattedResult = formatLargeNumber(result);
      
      setDisplay(formattedResult);
      setExpression(operationText + ' = ' + formattedResult);
      addToHistory(operationText, formattedResult);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
      setJustCalculated(true);
      setWaitingForSecondOperand(false);
      setTwoOperandFunction(null);
      return;
    }

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
      setJustCalculated(true);
    } else {
      if (isValidExpression(expression)) {
        const result = getRealtimePreview(expression);
        if (result && result !== display) {
          const fullExpression = expression + ' = ' + result;
          setDisplay(result);
          setExpression(fullExpression);
          addToHistory(expression, result);
          setJustCalculated(true);
          setWaitingForNewValue(true);
        }
      }
    }
  };

  const scientificOperation = (op: string) => {
    setJustCalculated(false);
    
    if (['π', 'e', 'φ', 'rand'].includes(op)) {
      const { result, operationText } = performScientificOperation(op, 0);
      const formattedResult = formatLargeNumber(result);
      
      if (waitingForNewValue || display === '0') {
        setDisplay(formattedResult);
        setExpression(expression + formattedResult);
      } else {
        setDisplay(formattedResult);
        setExpression(expression + '×' + formattedResult);
      }
      setWaitingForNewValue(false);
      return;
    }

    if (['x^y', 'ⁿ√', 'mod'].includes(op)) {
      const value = parseFloat(display);
      setPreviousValue(value);
      setTwoOperandFunction(op);
      setWaitingForSecondOperand(true);
      setWaitingForNewValue(true);
      
      const operatorSymbol = op === 'x^y' ? '^' : op === 'ⁿ√' ? '√' : 'mod';
      setExpression(expression + ' ' + operatorSymbol + ' ');
      toast.info(`Enter second operand for ${op}`);
      return;
    }

    const value = parseFloat(display);
    const { result, operationText } = performScientificOperation(op, value);
    const formattedResult = formatLargeNumber(result);

    setDisplay(formattedResult);
    const fullExpression = operationText + ' = ' + formattedResult;
    setExpression(fullExpression);
    addToHistory(operationText, formattedResult);
    setWaitingForNewValue(true);
    setJustCalculated(true);
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setJustCalculated(false);
    setWaitingForSecondOperand(false);
    setTwoOperandFunction(null);
  };

  const toggleSign = () => {
    setJustCalculated(false);
    
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

  return {
    display,
    expression,
    preview,
    history,
    inputNumber,
    inputDecimal,
    inputParenthesis,
    inputOperation,
    performCalculation,
    scientificOperation,
    clear,
    toggleSign,
    handlePaste,
    addToHistory,
    setHistory
  };
};
