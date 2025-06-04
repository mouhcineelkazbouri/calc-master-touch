
import React, { useState } from 'react';
import { useScientificCalculator } from '../hooks/useScientificCalculator';
import EnhancedCalculatorDisplay from './EnhancedCalculatorDisplay';
import ScientificButtonGrid from './ScientificButtonGrid';
import NumberPad from './NumberPad';
import CalculatorHistory from './CalculatorHistory';
import { toast } from 'sonner';

const ScientificCalculator = () => {
  const [showHistory, setShowHistory] = useState(false);
  
  const {
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
    setHistory
  } = useScientificCalculator();

  const handleUseHistoryResult = (result: string) => {
    // This functionality would need to be moved to the hook if needed
    setShowHistory(false);
    toast.success('Result applied');
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success('History cleared');
  };

  return (
    <div className="p-4 h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex-shrink-0">
        <EnhancedCalculatorDisplay 
          expression={expression} 
          display={display} 
          preview={preview}
          onPaste={handlePaste}
          onShowHistory={() => setShowHistory(true)}
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-2">
        <ScientificButtonGrid
          onScientificOperation={scientificOperation}
          onInputParenthesis={inputParenthesis}
          onClear={clear}
          onToggleSign={toggleSign}
        />

        <NumberPad
          onInputNumber={inputNumber}
          onInputDecimal={inputDecimal}
          onInputOperation={inputOperation}
          onPerformCalculation={performCalculation}
        />
      </div>

      {showHistory && (
        <CalculatorHistory
          history={history}
          onUseResult={handleUseHistoryResult}
          onClearHistory={clearHistory}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
};

export default ScientificCalculator;
