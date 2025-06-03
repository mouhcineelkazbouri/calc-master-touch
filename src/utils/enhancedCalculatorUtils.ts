
import { basicCalculate } from './calculatorUtils';

export const evaluateExpression = (expression: string): number | null => {
  try {
    // Simple expression evaluation for basic operations
    // This is a safe evaluation that only handles basic math
    const sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');
    
    // Only allow numbers, basic operators, parentheses, and decimal points
    if (!/^[\d+\-*/().\s]+$/.test(sanitized)) {
      return null;
    }
    
    // Use Function constructor for safe evaluation (safer than eval)
    const result = Function(`"use strict"; return (${sanitized})`)();
    
    return typeof result === 'number' && isFinite(result) ? result : null;
  } catch {
    return null;
  }
};

export const getRealtimePreview = (expression: string): string | null => {
  if (!expression || expression.trim() === '') return null;
  
  // Don't show preview if expression ends with an operator
  if (/[+\-×÷]$/.test(expression.trim())) return null;
  
  const result = evaluateExpression(expression);
  return result !== null ? String(result) : null;
};

export const formatLargeNumber = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) return 'Error';
  
  // Handle very large or very small numbers with scientific notation
  if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-6 && num !== 0)) {
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
