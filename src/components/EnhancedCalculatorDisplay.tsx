
import React, { useRef, useEffect } from 'react';
import { Copy, Clipboard, History } from 'lucide-react';
import { copyToClipboard, pasteFromClipboard, sanitizeNumberInput } from '../utils/clipboardUtils';
import { toast } from 'sonner';

interface EnhancedCalculatorDisplayProps {
  expression: string;
  display: string;
  preview?: string;
  onPaste?: (value: string) => void;
  onShowHistory?: () => void;
}

const EnhancedCalculatorDisplay = ({ 
  expression, 
  display, 
  preview,
  onPaste,
  onShowHistory
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
    console.log('Attempting to copy result:', display);
    
    if (!display || display === '0') {
      toast.error('No result to copy');
      return;
    }

    try {
      const success = await copyToClipboard(display);
      if (success) {
        toast.success(`Copied "${display}" to clipboard`);
        console.log('Copy operation completed successfully');
      } else {
        toast.error('Copy failed - please try manually selecting and copying');
        console.log('Copy operation failed');
      }
    } catch (error) {
      console.error('Copy error:', error);
      toast.error('Copy failed due to browser restrictions');
    }
  };

  const handlePaste = async () => {
    console.log('Attempting to paste...');
    try {
      const pastedText = await pasteFromClipboard();
      console.log('Pasted text:', pastedText);
      
      if (pastedText) {
        const sanitized = sanitizeNumberInput(pastedText);
        console.log('Sanitized text:', sanitized);
        
        if (sanitized && onPaste) {
          onPaste(sanitized);
          toast.success(`Pasted number: ${sanitized}`);
        } else if (!sanitized) {
          toast.error(`"${pastedText}" is not a valid number`);
        }
      } else {
        toast.error('Nothing to paste or clipboard access denied');
      }
    } catch (error) {
      console.error('Paste error:', error);
      toast.error('Paste failed - try copying a number first');
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-4 mb-4">
      {/* Copy, Paste, and History buttons positioned at top left in one line */}
      <div className="flex justify-start gap-2 mb-3">
        <button
          onClick={handleCopy}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1 text-xs"
          title={`Copy result: ${display}`}
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
        {onShowHistory && (
          <button
            onClick={onShowHistory}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1 text-xs"
            title="View history"
          >
            <History size={12} />
            History
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
