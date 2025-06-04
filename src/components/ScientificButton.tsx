
import React from 'react';

interface ScientificButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  size?: string;
}

const ScientificButton = ({ 
  onPress, 
  title, 
  backgroundColor = 'bg-white', 
  textColor = 'text-gray-800', 
  size = 'h-12' 
}: ScientificButtonProps) => (
  <button
    className={`${size} ${backgroundColor} ${textColor} rounded-xl font-medium text-sm shadow-sm hover:shadow-md active:scale-95 transition-all duration-150 hover:brightness-105 border border-gray-200`}
    onClick={onPress}
  >
    {title}
  </button>
);

export default ScientificButton;
