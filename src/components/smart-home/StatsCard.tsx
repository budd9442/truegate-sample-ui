import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { useTheme } from '../../contexts/ThemeContext';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: 'primary' | 'success' | 'warning' | 'error';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'primary',
  trend,
  description,
}) => {
  const { theme } = useTheme();

  const getColorClasses = (colorType: string) => {
    switch (colorType) {
      case 'primary':
        return 'text-accent-400 bg-accent-500/10';
      case 'success':
        return 'text-success-400 bg-success-500/10';
      case 'warning':
        return 'text-warning-400 bg-warning-500/10';
      case 'error':
        return 'text-error-400 bg-error-500/10';
      default:
        return theme === 'dark' 
          ? 'text-dark-text-muted bg-dark-border-secondary/10' 
          : 'text-light-text-muted bg-light-border-secondary/10';
    }
  };

  const textStyles = theme === 'dark' ? 'text-dark-text' : 'text-light-text';
  const textMutedStyles = theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted';

  return (
    <Card className="relative overflow-hidden" hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${textMutedStyles}`}>{title}</p>
          <div className="flex items-baseline mt-2">
            <p className={`text-2xl font-bold ${textStyles}`}>{value}</p>
            {description && (
              <p className={`text-xs mt-1 ${textMutedStyles}`}>{description}</p>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${
            trend.direction === 'up' ? 'text-success-400' : 'text-error-400'
          }`}>
            {trend.direction === 'up' ? '+' : '-'}{trend.value}%
          </span>
          <span className={`text-xs ml-2 ${textMutedStyles}`}>vs last week</span>
        </div>
      )}
      
      {/* Background decoration */}
      <motion.div
        className={`absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-5 ${getColorClasses(color).split(' ')[1]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </Card>
  );
};