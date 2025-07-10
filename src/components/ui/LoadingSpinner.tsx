import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const borderColor = theme === 'dark' 
    ? 'border-dark-border-secondary border-t-accent-500' 
    : 'border-light-border-secondary border-t-accent-500';

  return (
    <div
      className={`${sizeClasses[size]} border-2 ${borderColor} rounded-full animate-spin ${className}`}
    />
  );
};