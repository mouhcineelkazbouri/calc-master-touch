
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    // Try fallback method
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    } catch (fallbackErr) {
      console.error('Fallback copy also failed: ', fallbackErr);
      return false;
    }
  }
};

export const pasteFromClipboard = async (): Promise<string | null> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Request clipboard read permission
      const permission = await navigator.permissions.query({ name: 'clipboard-read' as PermissionName });
      if (permission.state === 'denied') {
        console.warn('Clipboard read permission denied');
        return null;
      }
      
      const text = await navigator.clipboard.readText();
      return text;
    }
    
    // For non-secure contexts, we can't read from clipboard
    console.warn('Clipboard API not available in non-secure context');
    return null;
  } catch (err) {
    console.error('Failed to paste text: ', err);
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
