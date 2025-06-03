
import React from 'react';

interface CalculatorDisplayProps {
  expression: string;
  display: string;
}

const CalculatorDisplay = ({ expression, display }: CalculatorDisplayProps) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 mb-4">
      {/* Expression display */}
      <div className="text-right text-xs text-gray-500 mb-2 min-h-[16px] break-all">
        {expression || '\u00A0'}
      </div>
      {/* Main display */}
      <div className="text-right text-2xl font-light text-gray-800 break-all">{display}</div>
    </div>
  );
};

export default CalculatorDisplay;
