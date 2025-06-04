
import React from 'react';
import ScientificButton from './ScientificButton';

interface ScientificButtonGridProps {
  onScientificOperation: (op: string) => void;
  onInputParenthesis: (paren: string) => void;
  onClear: () => void;
  onToggleSign: () => void;
}

const ScientificButtonGrid = ({
  onScientificOperation,
  onInputParenthesis,
  onClear,
  onToggleSign
}: ScientificButtonGridProps) => {
  return (
    <>
      {/* Scientific Functions Row 1 - Trigonometric */}
      <div className="grid grid-cols-6 gap-2">
        <ScientificButton onPress={() => onScientificOperation('sin')} title="sin" backgroundColor="bg-orange-100" textColor="text-orange-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('cos')} title="cos" backgroundColor="bg-orange-100" textColor="text-orange-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('tan')} title="tan" backgroundColor="bg-orange-100" textColor="text-orange-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('asin')} title="sin⁻¹" backgroundColor="bg-orange-200" textColor="text-orange-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('acos')} title="cos⁻¹" backgroundColor="bg-orange-200" textColor="text-orange-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('atan')} title="tan⁻¹" backgroundColor="bg-orange-200" textColor="text-orange-800" size="h-9" />
      </div>

      {/* Scientific Functions Row 2 - Hyperbolic */}
      <div className="grid grid-cols-6 gap-2">
        <ScientificButton onPress={() => onScientificOperation('sinh')} title="sinh" backgroundColor="bg-purple-100" textColor="text-purple-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('cosh')} title="cosh" backgroundColor="bg-purple-100" textColor="text-purple-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('tanh')} title="tanh" backgroundColor="bg-purple-100" textColor="text-purple-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('asinh')} title="sinh⁻¹" backgroundColor="bg-purple-200" textColor="text-purple-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('acosh')} title="cosh⁻¹" backgroundColor="bg-purple-200" textColor="text-purple-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('atanh')} title="tanh⁻¹" backgroundColor="bg-purple-200" textColor="text-purple-800" size="h-9" />
      </div>

      {/* Scientific Functions Row 3 - Logarithmic & Exponential */}
      <div className="grid grid-cols-6 gap-2">
        <ScientificButton onPress={() => onScientificOperation('ln')} title="ln" backgroundColor="bg-green-100" textColor="text-green-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('log')} title="log" backgroundColor="bg-green-100" textColor="text-green-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('log2')} title="log₂" backgroundColor="bg-green-100" textColor="text-green-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('exp')} title="eˣ" backgroundColor="bg-green-200" textColor="text-green-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('10^x')} title="10ˣ" backgroundColor="bg-green-200" textColor="text-green-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('2^x')} title="2ˣ" backgroundColor="bg-green-200" textColor="text-green-800" size="h-9" />
      </div>

      {/* Scientific Functions Row 4 - Powers & Roots */}
      <div className="grid grid-cols-6 gap-2">
        <ScientificButton onPress={() => onScientificOperation('x²')} title="x²" backgroundColor="bg-blue-100" textColor="text-blue-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('x³')} title="x³" backgroundColor="bg-blue-100" textColor="text-blue-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('x^y')} title="xʸ" backgroundColor="bg-blue-100" textColor="text-blue-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('√')} title="√x" backgroundColor="bg-blue-200" textColor="text-blue-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('∛')} title="∛x" backgroundColor="bg-blue-200" textColor="text-blue-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('ⁿ√')} title="ⁿ√x" backgroundColor="bg-blue-200" textColor="text-blue-800" size="h-9" />
      </div>

      {/* Scientific Functions Row 5 - Constants & Others */}
      <div className="grid grid-cols-6 gap-2">
        <ScientificButton onPress={() => onScientificOperation('π')} title="π" backgroundColor="bg-yellow-100" textColor="text-yellow-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('e')} title="e" backgroundColor="bg-yellow-100" textColor="text-yellow-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('φ')} title="φ" backgroundColor="bg-yellow-100" textColor="text-yellow-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('1/x')} title="1/x" backgroundColor="bg-yellow-200" textColor="text-yellow-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('x!')} title="x!" backgroundColor="bg-yellow-200" textColor="text-yellow-800" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('|x|')} title="|x|" backgroundColor="bg-yellow-200" textColor="text-yellow-800" size="h-9" />
      </div>

      {/* Control Row */}
      <div className="grid grid-cols-6 gap-2">
        <ScientificButton onPress={() => onInputParenthesis('(')} title="(" backgroundColor="bg-gray-200" textColor="text-gray-700" size="h-9" />
        <ScientificButton onPress={() => onInputParenthesis(')')} title=")" backgroundColor="bg-gray-200" textColor="text-gray-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('mod')} title="mod" backgroundColor="bg-gray-200" textColor="text-gray-700" size="h-9" />
        <ScientificButton onPress={onClear} title="AC" backgroundColor="bg-red-100" textColor="text-red-700" size="h-9" />
        <ScientificButton onPress={onToggleSign} title="±" backgroundColor="bg-gray-200" textColor="text-gray-700" size="h-9" />
        <ScientificButton onPress={() => onScientificOperation('rand')} title="rand" backgroundColor="bg-gray-200" textColor="text-gray-700" size="h-9" />
      </div>
    </>
  );
};

export default ScientificButtonGrid;
