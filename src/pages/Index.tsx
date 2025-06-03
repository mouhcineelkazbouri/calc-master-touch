
import React, { useState } from 'react';
import { Calculator, BarChart3, Repeat, Bitcoin, Settings } from 'lucide-react';
import UnitConverter from '../components/UnitConverter';
import CryptoCalculator from '../components/CryptoCalculator';
import SettingsScreen from '../components/SettingsScreen';

const Index = () => {
  const [activeScreen, setActiveScreen] = useState('basic');

  console.log('App is rendering, active screen:', activeScreen);

  // Simple Basic Calculator Component
  const BasicCalculator = () => {
    const [display, setDisplay] = useState('0');

    const handleNumber = (num: string) => {
      setDisplay(display === '0' ? num : display + num);
    };

    const clear = () => setDisplay('0');

    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Basic Calculator</h2>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="text-right text-3xl font-light text-gray-800">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <button onClick={clear} className="bg-gray-200 rounded-2xl h-16 text-lg font-medium">AC</button>
          <button className="bg-gray-200 rounded-2xl h-16 text-lg font-medium">±</button>
          <button className="bg-gray-200 rounded-2xl h-16 text-lg font-medium">%</button>
          <button className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">÷</button>
          
          <button onClick={() => handleNumber('7')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">7</button>
          <button onClick={() => handleNumber('8')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">8</button>
          <button onClick={() => handleNumber('9')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">9</button>
          <button className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">×</button>
          
          <button onClick={() => handleNumber('4')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">4</button>
          <button onClick={() => handleNumber('5')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">5</button>
          <button onClick={() => handleNumber('6')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">6</button>
          <button className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">−</button>
          
          <button onClick={() => handleNumber('1')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">1</button>
          <button onClick={() => handleNumber('2')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">2</button>
          <button onClick={() => handleNumber('3')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">3</button>
          <button className="bg-blue-500 text-white rounded-2xl h-16 text-lg font-medium">+</button>
          
          <button onClick={() => handleNumber('0')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium col-span-2">0</button>
          <button onClick={() => handleNumber('.')} className="bg-gray-100 rounded-2xl h-16 text-lg font-medium">.</button>
          <button className="bg-orange-500 text-white rounded-2xl h-16 text-lg font-medium">=</button>
        </div>
      </div>
    );
  };

  // Scientific Calculator Component
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
          return firstValue / secondValue;
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
          <ScientificButton onPress={() => inputNumber('.')} title="." size="h-14" />
          <ScientificButton onPress={performCalculation} title="=" backgroundColor="bg-orange-500" textColor="text-white" size="h-14" />
          <ScientificButton onPress={() => inputOperation('+')} title="+" backgroundColor="bg-blue-500" textColor="text-white" size="h-14" />
        </div>
      </div>
    );
  };

  // Simple placeholder components for other screens
  const OtherScreen = ({ title }: { title: string }) => (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      <p className="text-gray-600">This screen is coming soon!</p>
    </div>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'basic':
        return <BasicCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'converter':
        return <UnitConverter />;
      case 'crypto':
        return <CryptoCalculator />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <BasicCalculator />;
    }
  };

  const navItems = [
    { id: 'basic', icon: Calculator, label: 'Basic' },
    { id: 'scientific', icon: BarChart3, label: 'Scientific' },
    { id: 'converter', icon: Repeat, label: 'Convert' },
    { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 text-center">CalcMaster Pro</h1>
        </div>

        {/* Screen Content */}
        <div className="flex-1">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-2 py-2">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    console.log('Switching to screen:', item.id);
                    setActiveScreen(item.id);
                  }}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
