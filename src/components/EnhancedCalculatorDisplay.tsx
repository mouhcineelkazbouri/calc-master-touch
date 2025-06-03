
import React, { useRef, useEffect } from 'react';
import { Copy, Clipboard } from 'lucide-react';
import { copyToClipboard, pasteFromClipboard, sanitizeNumberInput } from '../utils/clipboardUtils';
import { toast } from 'sonner';

interface EnhancedCalculatorDisplayProps {
  expression: string;
  display: string;
  preview?: string;
  onPaste?: (value: string) => void;
}

const EnhancedCalculatorDisplay = ({ 
  expression, 
  display, 
  preview,
  onPaste 
}: EnhancedCalculatorDisplayProps) => {
  const expressionRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the end of expression when it updates
  useEffect(() => {
    if (expressionRef.current) {
      expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
    }
  }, [expression]);

  const handleCopy = async () => {
    const success = await copyToClipboard(display);
    if (success) {
      toast.success('Copied to clipboard');
    } else {
      toast.error('Failed to copy');
    }
  };

  const handlePaste = async () => {
    const pastedText = await pasteFromClipboard();
    if (pastedText && onPaste) {
      const sanitized = sanitizeNumberInput(pastedText);
      if (sanitized) {
        onPaste(sanitized);
        toast.success('Number pasted');
      } else {
        toast.error('Invalid number format');
      }
    } else if (!pastedText) {
      toast.error('Failed to paste');
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-4 mb-4">
      {/* Copy and Paste buttons positioned at top left */}
      <div className="flex justify-start gap-2 mb-3">
        <button
          onClick={handleCopy}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1 text-xs"
          title="Copy result"
        >
          <Copy size={12} />
          Copy
        </button>
        {onPaste && (
          <button
            onClick={handlePaste}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1 text-xs"
            title="Paste number"
          >
            <Clipboard size={12} />
            Paste
          </button>
        )}
      </div>

      {/* Expression display with horizontal scrolling */}
      <div 
        ref={expressionRef}
        className="text-right text-xs text-gray-500 mb-2 min-h-[16px] overflow-x-auto scrollbar-hide whitespace-nowrap pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {expression || '\u00A0'}
      </div>

      {/* Real-time preview */}
      {preview && preview !== display && (
        <div className="text-right text-sm text-blue-600 mb-1 opacity-75">
          = {preview}
        </div>
      )}

      {/* Main display */}
      <div 
        ref={displayRef}
        className="text-right text-2xl font-light text-gray-800 overflow-x-auto scrollbar-hide whitespace-nowrap"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {display}
      </div>
    </div>
  );
};

export default EnhancedCalculatorDisplay;
