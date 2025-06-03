
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
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
    return false;
  }
};

export const pasteFromClipboard = async (): Promise<string | null> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      const text = await navigator.clipboard.readText();
      return text;
    }
    return null;
  } catch (err) {
    console.error('Failed to paste text: ', err);
    return null;
  }
};

export const sanitizeNumberInput = (input: string): string => {
  // Remove any non-numeric characters except decimal points, minus signs, and scientific notation
  const cleaned = input.replace(/[^\d\.\-e\+]/gi, '');
  
  // Validate the number format
  if (isNaN(Number(cleaned))) {
    return '';
  }
  
  return cleaned;
};
