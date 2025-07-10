import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = 'md',
}) => {
  const { theme } = useTheme();

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const baseClasses = 'rounded-xl transition-all duration-200';
  const paddingClass = paddingClasses[padding];
  
  const backgroundClasses = glass 
    ? (theme === 'dark' ? 'glass-dark' : 'glass')
    : (theme === 'dark' 
        ? 'bg-dark-bg-secondary border border-dark-border-secondary' 
        : 'bg-light-bg-secondary border border-light-border-secondary');

  const hoverClasses = hover 
    ? 'hover:shadow-lg cursor-pointer transform hover:scale-[1.02]' 
    : '';

  const finalClasses = `${baseClasses} ${backgroundClasses} ${paddingClass} ${hoverClasses} ${className}`;

  return hover ? (
    <motion.div
      className={finalClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  ) : (
    <div className={finalClasses}>
      {children}
    </div>
  );
};