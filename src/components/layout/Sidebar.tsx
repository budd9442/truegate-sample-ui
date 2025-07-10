import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Shield, 
  Settings, 
  User, 
  LogOut, 
  X,
  LayoutDashboard,
  Camera,
  Smartphone,
  Users as UsersIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ROUTES } from '../../utils/constants';

interface SidebarProps {
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  // User navigation - using route constants
  const userNavigation = [
    { name: 'Dashboard', href: ROUTES.USER_DASHBOARD, icon: LayoutDashboard },
    { name: 'Devices', href: ROUTES.USER_DEVICES, icon: Smartphone },
    { name: 'Cameras', href: ROUTES.USER_CAMERAS, icon: Camera },
    { name: 'Profile', href: ROUTES.USER_PROFILE, icon: User },
    { name: 'Settings', href: ROUTES.USER_SETTINGS, icon: Settings },
  ];

  const adminNavigation = [
    { name: 'Admin Dashboard', href: ROUTES.ADMIN_DASHBOARD, icon: Shield },
    { name: 'Users', href: ROUTES.ADMIN_USERS, icon: UsersIcon },
    { name: 'Admin Settings', href: ROUTES.ADMIN_SETTINGS, icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={`h-full w-80 flex flex-col transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-dark-bg-secondary border-r border-dark-border' 
        : 'bg-light-bg-secondary border-r border-light-border'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-inherit">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-accent-600/20' : 'bg-accent-100'
          }`}>
            <Shield className={`w-6 h-6 ${
              theme === 'dark' ? 'text-accent-400' : 'text-accent-600'
            }`} />
          </div>
          <div>
            <h1 className={`font-bold text-lg ${
              theme === 'dark' ? 'text-dark-text' : 'text-light-text'
            }`}>
              TrueGate
            </h1>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'
            }`}>
              Smart home solution
            </p>
          </div>
        </div>
        
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className={`p-2 rounded-lg transition-colors lg:hidden ${
            theme === 'dark'
              ? 'text-dark-text-muted hover:text-dark-text hover:bg-dark-bg-tertiary'
              : 'text-light-text-muted hover:text-light-text hover:bg-light-bg-tertiary'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      <div className={`p-6 border-b border-inherit ${
        theme === 'dark' ? 'bg-dark-bg-tertiary/50' : 'bg-light-bg-tertiary/50'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-accent-600/20' : 'bg-accent-100'
          }`}>
            <User className={`w-5 h-5 ${
              theme === 'dark' ? 'text-accent-400' : 'text-accent-600'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-medium truncate ${
              theme === 'dark' ? 'text-dark-text' : 'text-light-text'
            }`}>
              {user?.firstName} {user?.lastName}
            </p>
            <p className={`text-sm truncate ${
              theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'
            }`}>
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* User Navigation - Show for all users */}
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
            theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'
          }`}>
            Main Navigation
          </h3>
          <ul className="space-y-1">
            {userNavigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  onClick={() => {
                    // Only close sidebar on mobile (screen width < 1024px)
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30'
                        : 'bg-accent-100 text-accent-700 border border-accent-200'
                      : theme === 'dark'
                        ? 'text-dark-text-muted hover:text-dark-text hover:bg-dark-bg-tertiary'
                        : 'text-light-text-muted hover:text-light-text hover:bg-light-bg-tertiary'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Admin Navigation */}
        {user?.role === 'admin' && (
          <div className="mt-8">
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
              theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'
            }`}>
              Admin
            </h3>
            <ul className="space-y-1">
              {adminNavigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => {
                      // Only close sidebar on mobile (screen width < 1024px)
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-warning-600/20 text-warning-400 border border-warning-500/30'
                          : 'bg-warning-100 text-warning-700 border border-warning-200'
                        : theme === 'dark'
                          ? 'text-dark-text-muted hover:text-dark-text hover:bg-dark-bg-tertiary'
                          : 'text-light-text-muted hover:text-light-text hover:bg-light-bg-tertiary'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-inherit">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'text-dark-text-muted hover:text-dark-text hover:bg-dark-bg-tertiary'
              : 'text-light-text-muted hover:text-light-text hover:bg-light-bg-tertiary'
          }`}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};