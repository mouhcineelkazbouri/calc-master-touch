
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      
      // Verify the copy actually worked by reading it back
      try {
        const readBack = await navigator.clipboard.readText();
        if (readBack === text) {
          console.log('Copy verified successful');
          return true;
        } else {
          console.warn('Copy verification failed - content mismatch');
          throw new Error('Copy verification failed');
        }
      } catch (verifyErr) {
        console.warn('Could not verify copy, but writeText succeeded');
        return true; // Assume success if we can't verify
      }
    } else {
      console.log('Using fallback copy method');
      return await fallbackCopy(text);
    }
  } catch (err) {
    console.error('Primary copy method failed:', err);
    // Try fallback method
    return await fallbackCopy(text);
  }
};

const fallbackCopy = async (text: string): Promise<boolean> => {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make sure the textarea is visible and focusable
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    // Try to copy using execCommand
    const successful = document.execCommand('copy');
    textArea.remove();
    
    if (successful) {
      console.log('Fallback copy successful');
      return true;
    } else {
      console.error('Fallback copy failed');
      return false;
    }
  } catch (fallbackErr) {
    console.error('Fallback copy exception:', fallbackErr);
    return false;
  }
};

export const pasteFromClipboard = async (): Promise<string | null> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Check clipboard read permission
      try {
        const permission = await navigator.permissions.query({ name: 'clipboard-read' as PermissionName });
        if (permission.state === 'denied') {
          console.warn('Clipboard read permission denied');
          return null;
        }
      } catch (permErr) {
        console.warn('Could not check clipboard permissions:', permErr);
        // Continue anyway, some browsers don't support permission query
      }
      
      const text = await navigator.clipboard.readText();
      return text;
    } else {
      console.warn('Clipboard API not available - non-secure context or unsupported browser');
      return null;
    }
  } catch (err) {
    console.error('Failed to paste text:', err);
    return null;
  }
};

export const sanitizeNumberInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove any non-numeric characters except decimal points, minus signs, and scientific notation
  const cleaned = input.trim().replace(/[^\d\.\-e\+]/gi, '');
  
  // Validate the number format
  const parsed = parseFloat(cleaned);
  if (isNaN(parsed)) {
    return '';
  }
  
  return cleaned;
};
