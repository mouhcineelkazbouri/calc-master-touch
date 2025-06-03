
import React, { useState } from 'react';
import { History, X, RotateCcw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

interface CalculatorHistoryProps {
  history: HistoryItem[];
  onUseResult: (result: string) => void;
  onClearHistory: () => void;
  onClose: () => void;
}

const CalculatorHistory = ({ 
  history, 
  onUseResult, 
  onClearHistory, 
  onClose 
}: CalculatorHistoryProps) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (startY === null || currentY === null) return;
    
    const deltaY = currentY - startY;
    
    // Swipe down to close (threshold: 50px)
    if (deltaY > 50) {
      onClose();
    }
    
    setStartY(null);
    setCurrentY(null);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-h-[70vh] rounded-t-2xl p-4 animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">History</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearHistory}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Clear history"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Swipe indicator */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

        {/* History items */}
        <ScrollArea className="max-h-[50vh]">
          {history.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No calculations yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.slice().reverse().map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onUseResult(item.result)}
                >
                  <div className="text-sm text-gray-600 mb-1">
                    {item.expression}
                  </div>
                  <div className="text-lg font-medium text-gray-800">
                    = {item.result}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {item.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default CalculatorHistory;
