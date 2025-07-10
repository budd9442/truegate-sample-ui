import React, { forwardRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  label, 
  icon, 
  fullWidth = false, 
  className = '', 
  error,
  ...props 
}, ref) => {
  const { theme } = useTheme();

  const baseClasses = `block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
    error 
      ? 'border-error-500 focus:ring-error-500' 
      : 'focus:ring-accent-500 focus:border-transparent'
  } ${
    theme === 'dark' 
      ? `bg-dark-bg-tertiary border ${error ? 'border-error-500' : 'border-dark-border-secondary'} text-dark-text placeholder-dark-text-muted` 
      : `bg-light-bg-tertiary border ${error ? 'border-error-500' : 'border-light-border-secondary'} text-light-text placeholder-light-text-muted`
  }`;

  const containerClasses = fullWidth ? 'w-full' : '';

  return (
    <div className={containerClasses}>
      {label && (
        <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'}>{icon}</span>
          </div>
        )}
        <input
          ref={ref}
          className={`${baseClasses} ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error-500">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';