import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
}) => {
  const { theme } = useTheme();

  const sizes = {
    sm: { 
      switch: 'w-8 h-4', 
      thumb: 'w-3 h-3',
      translate: checked ? 'translate-x-4' : 'translate-x-0'
    },
    md: { 
      switch: 'w-11 h-6', 
      thumb: 'w-5 h-5',
      translate: checked ? 'translate-x-5' : 'translate-x-0'
    },
    lg: { 
      switch: 'w-14 h-7', 
      thumb: 'w-6 h-6',
      translate: checked ? 'translate-x-7' : 'translate-x-0'
    },
  };

  const currentSize = sizes[size];

  const switchBg = checked 
    ? 'bg-accent-600' 
    : (theme === 'dark' ? 'bg-dark-border-secondary' : 'bg-light-border-secondary');

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          ${currentSize.switch}
          relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500
          ${switchBg}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            ${currentSize.thumb}
            inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out
            ${currentSize.translate}
          `}
        />
      </button>
      {label && (
        <span className={`ml-3 text-sm font-medium ${
          theme === 'dark' ? 'text-dark-text' : 'text-light-text'
        } ${disabled ? 'opacity-50' : ''}`}>
          {label}
        </span>
      )}
    </div>
  );
};