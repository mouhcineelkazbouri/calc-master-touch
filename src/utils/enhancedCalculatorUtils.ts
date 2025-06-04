
import { evaluateExpressionSafely } from './calculatorUtils';

export const evaluateExpression = (expression: string): number | null => {
  return evaluateExpressionSafely(expression);
};

export const getRealtimePreview = (expression: string): string | null => {
  if (!expression || expression.trim() === '') return null;
  
  // Don't show preview if expression ends with an operator or is incomplete
  const trimmed = expression.trim();
  if (/[+\-×÷(]$/.test(trimmed)) return null;
  
  // Check for unbalanced parentheses
  let parenCount = 0;
  for (let char of trimmed) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
  }
  if (parenCount !== 0) return null;
  
  const result = evaluateExpression(expression);
  return result !== null ? formatLargeNumber(result) : null;
};

export const formatLargeNumber = (num: number): string => {
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return num > 0 ? 'Infinity' : '-Infinity';
  
  // Handle very large or very small numbers with scientific notation
  if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(6);
  }
  
  // Format with appropriate decimal places
  const str = num.toString();
  if (str.length > 12) {
    // Round to fit display
    return parseFloat(num.toPrecision(10)).toString();
  }
  
  return str;
};

export const parseComplexNumber = (input: string): number | null => {
  try {
    // Handle scientific notation, decimals, negative numbers
    const num = parseFloat(input);
    return isNaN(num) ? null : num;
  } catch {
    return null;
  }
};

// Helper function to insert text at cursor position in expression
export const insertAtCursor = (expression: string, textToInsert: string, cursorPosition?: number): string => {
  if (cursorPosition === undefined) {
    return expression + textToInsert;
  }
  
  const before = expression.substring(0, cursorPosition);
  const after = expression.substring(cursorPosition);
  return before + textToInsert + after;
};

// Helper function to validate mathematical expressions
export const isValidExpression = (expression: string): boolean => {
  if (!expression) return false;
  
  // Check for balanced parentheses
  let parenCount = 0;
  for (let char of expression) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (parenCount < 0) return false;
  }
  
  return parenCount === 0;
};
