import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-dark-bg-secondary border-dark-border'
          : 'bg-light-bg-secondary border-light-border'
      } px-6 py-4`}
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className={`p-2 rounded-lg transition-colors lg:hidden ${
              theme === 'dark'
                ? 'text-dark-text-muted hover:text-dark-text hover:bg-dark-bg-tertiary'
                : 'text-light-text-muted hover:text-light-text hover:bg-light-bg-tertiary'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-dark-text' : 'text-light-text'
            }`}>
              Welcome back, {user?.firstName}! 👋
            </h2>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'
            }`}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Email verification banner */}
          {user && !user.verified && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-warning-500 text-warning-900 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Please verify your email address
            </motion.div>
          )}

          {/* Theme toggle */}
          <ThemeToggle size="md" />

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              theme === 'dark'
                ? 'text-dark-text-muted hover:text-dark-text hover:bg-dark-bg-tertiary'
                : 'text-light-text-muted hover:text-light-text hover:bg-light-bg-tertiary'
            }`}
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};