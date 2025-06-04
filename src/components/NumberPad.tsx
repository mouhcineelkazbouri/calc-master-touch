
import React from 'react';
import ScientificButton from './ScientificButton';

interface NumberPadProps {
  onInputNumber: (num: string) => void;
  onInputDecimal: () => void;
  onInputOperation: (op: string) => void;
  onPerformCalculation: () => void;
}

const NumberPad = ({
  onInputNumber,
  onInputDecimal,
  onInputOperation,
  onPerformCalculation
}: NumberPadProps) => {
  return (
    <div className="flex-1 grid grid-cols-4 gap-2 content-start">
      <ScientificButton onPress={() => onInputNumber('7')} title="7" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={() => onInputNumber('8')} title="8" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={() => onInputNumber('9')} title="9" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={() => onInputOperation('÷')} title="÷" backgroundColor="bg-blue-500" textColor="text-white" size="h-11" />

      <ScientificButton onPress={() => onInputNumber('4')} title="4" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={() => onInputNumber('5')} title="5" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={() => onInputNumber('6')} title="6" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={() => onInputOperation('×')} title="×" backgroundColor="bg-blue-500" textColor="text-white" size="h-11" />

      <ScientificButton onPress={() => onInputNumber('1')} title="1" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={() => onInputNumber('2')} title="2" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={() => onInputNumber('3')} title="3" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={() => onInputOperation('−')} title="−" backgroundColor="bg-blue-500" textColor="text-white" size="h-11" />

      <ScientificButton onPress={() => onInputNumber('0')} title="0" backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={onInputDecimal} title="." backgroundColor="bg-white" textColor="text-gray-800" size="h-11" />
      <ScientificButton onPress={onPerformCalculation} title="=" backgroundColor="bg-orange-500" textColor="text-white" size="h-11" />
      <ScientificButton onPress={() => onInputOperation('+')} title="+" backgroundColor="bg-blue-500" textColor="text-white" size="h-11" />
    </div>
  );
};

export default NumberPad;
