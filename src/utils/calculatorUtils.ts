
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
    case 'ln':
      result = Math.log(value);
      operationText = `ln(${value})`;
      break;
    case 'log':
      result = Math.log10(value);
      operationText = `log(${value})`;
      break;
    case 'x²':
      result = value * value;
      operationText = `${value}²`;
      break;
    case '√':
      result = Math.sqrt(value);
      operationText = `√(${value})`;
      break;
    case '1/x':
      result = 1 / value;
      operationText = `1/(${value})`;
      break;
    case 'x!':
      result = factorial(Math.floor(value));
      operationText = `${Math.floor(value)}!`;
      break;
    case 'π':
      result = Math.PI;
      operationText = 'π';
      break;
    case 'e':
      result = Math.E;
      operationText = 'e';
      break;
    default:
      return { result: value, operationText: '' };
  }

  return { result, operationText };
};
