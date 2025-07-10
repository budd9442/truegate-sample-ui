import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  type = 'button',
  ...rest
}) => {
  const { theme } = useTheme();

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-accent-600 hover:bg-accent-700 text-white focus:ring-accent-500 shadow-lg shadow-accent-500/25',
    secondary: 'bg-accent-700 hover:bg-accent-600 text-white focus:ring-accent-500 shadow-lg shadow-accent-500/25',
    outline: `border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white focus:ring-accent-500 ${theme === 'dark' ? 'focus:ring-offset-dark-bg' : 'focus:ring-offset-light-bg'}`,
    ghost: `${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-text hover:bg-accent-800' : 'text-light-text-muted hover:text-light-text hover:bg-accent-100'} focus:ring-accent-500`,
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  const finalClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${className}`;

  return (
    <motion.button
      type={type}
      className={finalClasses}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...rest}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
};