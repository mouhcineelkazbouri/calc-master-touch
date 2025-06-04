export const basicCalculate = (firstValue: number, secondValue: number, operation: string) => {
  switch (operation) {
    case '+':
      return firstValue + secondValue;
    case '−':
      return firstValue - secondValue;
    case '×':
      return firstValue * secondValue;
    case '÷':
      return secondValue !== 0 ? firstValue / secondValue : 0;
    case 'x^y':
      return Math.pow(firstValue, secondValue);
    case 'ⁿ√':
      return Math.pow(firstValue, 1 / secondValue);
    case 'mod':
      return firstValue % secondValue;
    default:
      return secondValue;
  }
};

export const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export const performScientificOperation = (op: string, value: number, secondValue?: number) => {
  let result = 0;
  let operationText = '';

  switch (op) {
    // Basic trigonometric functions (degrees)
    case 'sin':
      result = Math.sin((value * Math.PI) / 180);
      operationText = `sin(${value})`;
      break;
    case 'cos':
      result = Math.cos((value * Math.PI) / 180);
      operationText = `cos(${value})`;
      break;
    case 'tan':
      result = Math.tan((value * Math.PI) / 180);
      operationText = `tan(${value})`;
      break;
    
    // Inverse trigonometric functions (returns degrees)
    case 'asin':
      if (value < -1 || value > 1) {
        result = NaN;
        operationText = `sin⁻¹(${value}) - Domain Error`;
      } else {
        result = (Math.asin(value) * 180) / Math.PI;
        operationText = `sin⁻¹(${value})`;
      }
      break;
    case 'acos':
      if (value < -1 || value > 1) {
        result = NaN;
        operationText = `cos⁻¹(${value}) - Domain Error`;
      } else {
        result = (Math.acos(value) * 180) / Math.PI;
        operationText = `cos⁻¹(${value})`;
      }
      break;
    case 'atan':
      result = (Math.atan(value) * 180) / Math.PI;
      operationText = `tan⁻¹(${value})`;
      break;
    
    // Hyperbolic functions
    case 'sinh':
      result = Math.sinh(value);
      operationText = `sinh(${value})`;
      break;
    case 'cosh':
      result = Math.cosh(value);
      operationText = `cosh(${value})`;
      break;
    case 'tanh':
      result = Math.tanh(value);
      operationText = `tanh(${value})`;
      break;
    
    // Inverse hyperbolic functions
    case 'asinh':
      result = Math.asinh(value);
      operationText = `sinh⁻¹(${value})`;
      break;
    case 'acosh':
      if (value < 1) {
        result = NaN;
        operationText = `cosh⁻¹(${value}) - Domain Error`;
      } else {
        result = Math.acosh(value);
        operationText = `cosh⁻¹(${value})`;
      }
      break;
    case 'atanh':
      if (value <= -1 || value >= 1) {
        result = NaN;
        operationText = `tanh⁻¹(${value}) - Domain Error`;
      } else {
        result = Math.atanh(value);
        operationText = `tanh⁻¹(${value})`;
      }
      break;
    
    // Logarithmic functions
    case 'ln':
      if (value <= 0) {
        result = NaN;
        operationText = `ln(${value}) - Domain Error`;
      } else {
        result = Math.log(value);
        operationText = `ln(${value})`;
      }
      break;
    case 'log':
      if (value <= 0) {
        result = NaN;
        operationText = `log(${value}) - Domain Error`;
      } else {
        result = Math.log10(value);
        operationText = `log(${value})`;
      }
      break;
    case 'log2':
      if (value <= 0) {
        result = NaN;
        operationText = `log₂(${value}) - Domain Error`;
      } else {
        result = Math.log2(value);
        operationText = `log₂(${value})`;
      }
      break;
    
    // Exponential functions
    case 'exp':
      result = Math.exp(value);
      operationText = `e^${value}`;
      break;
    case '10^x':
      result = Math.pow(10, value);
      operationText = `10^${value}`;
      break;
    case '2^x':
      result = Math.pow(2, value);
      operationText = `2^${value}`;
      break;
    
    // Power functions
    case 'x²':
      result = value * value;
      operationText = `${value}²`;
      break;
    case 'x³':
      result = value * value * value;
      operationText = `${value}³`;
      break;
    case 'x^y':
      if (secondValue !== undefined) {
        result = Math.pow(value, secondValue);
        operationText = `${value}^${secondValue}`;
      } else {
        result = Math.pow(value, 2); // Default to square
        operationText = `${value}²`;
      }
      break;
    
    // Root functions
    case '√':
      if (value < 0) {
        result = NaN;
        operationText = `√(${value}) - Domain Error`;
      } else {
        result = Math.sqrt(value);
        operationText = `√(${value})`;
      }
      break;
    case '∛':
      result = Math.cbrt(value);
      operationText = `∛(${value})`;
      break;
    case 'ⁿ√':
      if (secondValue !== undefined) {
        if (secondValue === 0) {
          result = NaN;
          operationText = `${secondValue}√(${value}) - Division by Zero`;
        } else {
          result = Math.pow(value, 1 / secondValue);
          operationText = `${secondValue}√(${value})`;
        }
      } else {
        result = Math.sqrt(value); // Default to square root
        operationText = `√(${value})`;
      }
      break;
    
    // Other functions
    case '1/x':
      if (value === 0) {
        result = Infinity;
        operationText = `1/(${value}) - Division by Zero`;
      } else {
        result = 1 / value;
        operationText = `1/(${value})`;
      }
      break;
    case 'x!':
      result = factorial(Math.floor(Math.abs(value)));
      operationText = `${Math.floor(Math.abs(value))}!`;
      break;
    case '|x|':
      result = Math.abs(value);
      operationText = `|${value}|`;
      break;
    case 'mod':
      if (secondValue !== undefined) {
        if (secondValue === 0) {
          result = NaN;
          operationText = `${value} mod ${secondValue} - Division by Zero`;
        } else {
          result = value % secondValue;
          operationText = `${value} mod ${secondValue}`;
        }
      } else {
        result = value % 2; // Default modulo 2
        operationText = `${value} mod 2`;
      }
      break;
    
    // Constants
    case 'π':
      result = Math.PI;
      operationText = 'π';
      break;
    case 'e':
      result = Math.E;
      operationText = 'e';
      break;
    case 'φ':
      result = (1 + Math.sqrt(5)) / 2; // Golden ratio
      operationText = 'φ';
      break;
    case 'rand':
      result = Math.random();
      operationText = 'rand()';
      break;
    
    default:
      return { result: value, operationText: '' };
  }

  return { result, operationText };
};

// Enhanced expression evaluation with proper parentheses support
export const evaluateExpressionSafely = (expression: string): number | null => {
  try {
    // Clean the expression
    let cleaned = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/\s+/g, ''); // Remove spaces

    // Validate the expression - only allow safe characters
    if (!/^[\d+\-*/().\s]+$/.test(cleaned)) {
      return null;
    }

    // Check for balanced parentheses
    let parenCount = 0;
    for (let char of cleaned) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      if (parenCount < 0) return null; // More closing than opening
    }
    if (parenCount !== 0) return null; // Unbalanced parentheses

    // Use Function constructor for safe evaluation
    const result = Function(`"use strict"; return (${cleaned})`)();
    
    return typeof result === 'number' && isFinite(result) ? result : null;
  } catch {
    return null;
  }
};
