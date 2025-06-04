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

export const performScientificOperation = (op: string, value: number) => {
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
      result = (Math.asin(value) * 180) / Math.PI;
      operationText = `sin⁻¹(${value})`;
      break;
    case 'acos':
      result = (Math.acos(value) * 180) / Math.PI;
      operationText = `cos⁻¹(${value})`;
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
      result = Math.acosh(value);
      operationText = `cosh⁻¹(${value})`;
      break;
    case 'atanh':
      result = Math.atanh(value);
      operationText = `tanh⁻¹(${value})`;
      break;
    
    // Logarithmic functions
    case 'ln':
      result = Math.log(value);
      operationText = `ln(${value})`;
      break;
    case 'log':
      result = Math.log10(value);
      operationText = `log(${value})`;
      break;
    case 'log2':
      result = Math.log2(value);
      operationText = `log₂(${value})`;
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
      // This would need special handling for two operands
      result = Math.pow(value, 2); // Default to square for now
      operationText = `${value}^2`;
      break;
    
    // Root functions
    case '√':
      result = Math.sqrt(value);
      operationText = `√(${value})`;
      break;
    case '∛':
      result = Math.cbrt(value);
      operationText = `∛(${value})`;
      break;
    case 'ⁿ√':
      // This would need special handling for two operands
      result = Math.sqrt(value); // Default to square root for now
      operationText = `√(${value})`;
      break;
    
    // Other functions
    case '1/x':
      result = 1 / value;
      operationText = `1/(${value})`;
      break;
    case 'x!':
      result = factorial(Math.floor(value));
      operationText = `${Math.floor(value)}!`;
      break;
    case '|x|':
      result = Math.abs(value);
      operationText = `|${value}|`;
      break;
    case 'mod':
      // This would need special handling for two operands
      result = value % 2; // Default modulo 2 for now
      operationText = `${value} mod 2`;
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
