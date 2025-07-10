import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  Settings, 
  Shield, 
  Bell, 
  Moon, 
  Sun, 
  Smartphone,
  Save,
  Lock,
  Mail,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { apiService } from '../../services/api';
import { changePasswordSchema } from '../../utils/validation';
import { ChangePasswordData } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';

export const UserSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  
  const { user, resendVerification } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordData & { confirmPassword: string }>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onChangePassword = async (data: ChangePasswordData & { confirmPassword: string }) => {
    try {
      const { confirmPassword, ...passwordData } = data;
      await apiService.changePassword(passwordData);
      reset();
    } catch (error) {
      // Error handling is done in the API service
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'devices', label: 'Devices', icon: Smartphone },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <Settings className="w-8 h-8 mr-3" />
          Settings
        </h1>
        <p className={`${theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'}`}>
          Manage your account preferences and security settings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-accent-600 text-white'
                      : theme === 'dark'
                        ? 'text-dark-text-muted hover:text-dark-text hover:bg-dark-bg-tertiary'
                        : 'text-light-text-muted hover:text-light-text hover:bg-light-bg-tertiary'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">General Settings</h3>
                
                <div className="space-y-6">
                  {/* Theme */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {theme === 'dark' ? (
                        <Moon className="w-5 h-5 text-dark-text-muted" />
                      ) : (
                        <Sun className="w-5 h-5 text-light-text-muted" />
                      )}
                      <div>
                        <p className="text-white font-medium">Dark Mode</p>
                        <p className="text-slate-400 text-sm">
                          Use dark theme for better viewing in low light
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onChange={toggleTheme}
                    />
                  </div>

                  {/* Language */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>Language</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'}`}>
                        Choose your preferred language
                      </p>
                    </div>
                    <select className={`${theme === 'dark' ? 'bg-dark-bg-tertiary border-dark-border-secondary text-dark-text' : 'bg-light-bg-tertiary border-light-border-secondary text-light-text'} rounded-lg px-3 py-2`}>
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  {/* Timezone */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>Timezone</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'}`}>
                        Your local timezone for accurate timestamps
                      </p>
                    </div>
                    <select className={`${theme === 'dark' ? 'bg-dark-bg-tertiary border-dark-border-secondary text-dark-text' : 'bg-light-bg-tertiary border-light-border-secondary text-light-text'} rounded-lg px-3 py-2`}>
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Email Verification */}
              {!user?.verified && (
                <Card className="p-6 border-warning-500">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-warning-400 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">Email Verification Required</h4>
                      <p className="text-slate-400 mb-4">
                        Please verify your email address to secure your account and enable all features.
                      </p>
                      <Button
                        variant="secondary"
                        onClick={resendVerification}
                        icon={<Mail className="w-4 h-4" />}
                      >
                        Resend Verification Email
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Change Password */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Change Password
                </h3>
                
                <form onSubmit={handleSubmit(onChangePassword)} className="space-y-6">
                  <div className="relative">
                    <Input
                      {...register('oldPassword')}
                      type={showPasswords.oldPassword ? 'text' : 'password'}
                      label="Current Password"
                      placeholder="Enter your current password"
                      error={errors.oldPassword?.message}
                      icon={<Lock className="w-5 h-5" />}
                      fullWidth
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('oldPassword')}
                      className="absolute right-3 top-9 text-slate-400 hover:text-white"
                    >
                      {showPasswords.oldPassword ? 
                        <EyeOff className="w-5 h-5" /> : 
                        <Eye className="w-5 h-5" />
                      }
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      {...register('newPassword')}
                      type={showPasswords.newPassword ? 'text' : 'password'}
                      label="New Password"
                      placeholder="Enter your new password"
                      error={errors.newPassword?.message}
                      icon={<Lock className="w-5 h-5" />}
                      fullWidth
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('newPassword')}
                      className="absolute right-3 top-9 text-slate-400 hover:text-white"
                    >
                      {showPasswords.newPassword ? 
                        <EyeOff className="w-5 h-5" /> : 
                        <Eye className="w-5 h-5" />
                      }
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      {...register('confirmPassword')}
                      type={showPasswords.confirmPassword ? 'text' : 'password'}
                      label="Confirm New Password"
                      placeholder="Confirm your new password"
                      error={errors.confirmPassword?.message}
                      icon={<Lock className="w-5 h-5" />}
                      fullWidth
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-3 top-9 text-slate-400 hover:text-white"
                    >
                      {showPasswords.confirmPassword ? 
                        <EyeOff className="w-5 h-5" /> : 
                        <Eye className="w-5 h-5" />
                      }
                    </button>
                  </div>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    icon={<Save className="w-4 h-4" />}
                  >
                    Update Password
                  </Button>
                </form>
              </Card>

              {/* Two-Factor Authentication */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Two-Factor Authentication</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">SMS Authentication</p>
                      <p className="text-slate-400 text-sm">
                        Receive verification codes via SMS
                      </p>
                    </div>
                    <Switch checked={false} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Authenticator App</p>
                      <p className="text-slate-400 text-sm">
                        Use an authenticator app for enhanced security
                      </p>
                    </div>
                    <Switch checked={false} onChange={() => {}} />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Security Alerts</p>
                      <p className="text-slate-400 text-sm">
                        Get notified about security events and breaches
                      </p>
                    </div>
                    <Switch checked={true} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Motion Detection</p>
                      <p className="text-slate-400 text-sm">
                        Receive alerts when motion is detected
                      </p>
                    </div>
                    <Switch checked={true} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Device Status</p>
                      <p className="text-slate-400 text-sm">
                        Get notified when devices go offline
                      </p>
                    </div>
                    <Switch checked={false} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">System Updates</p>
                      <p className="text-slate-400 text-sm">
                        Receive notifications about system updates
                      </p>
                    </div>
                    <Switch checked={false} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-slate-400 text-sm">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch checked={true} onChange={() => {}} />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Device Settings */}
          {activeTab === 'devices' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Device Management</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Auto-Lock Doors</p>
                      <p className="text-slate-400 text-sm">
                        Automatically lock doors after 30 minutes
                      </p>
                    </div>
                    <Switch checked={true} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Motion Recording</p>
                      <p className="text-slate-400 text-sm">
                        Record video when motion is detected
                      </p>
                    </div>
                    <Switch checked={true} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Night Vision</p>
                      <p className="text-slate-400 text-sm">
                        Enable night vision on compatible cameras
                      </p>
                    </div>
                    <Switch checked={false} onChange={() => {}} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Smart Lighting</p>
                      <p className="text-slate-400 text-sm">
                        Automatically adjust lighting based on time
                      </p>
                    </div>
                    <Switch checked={true} onChange={() => {}} />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};