import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Server, 
  Shield, 
  Mail, 
  Database,
  Save,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Switch } from '../../components/ui/Switch';

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('system');
  const [settings, setSettings] = useState({
    maxLoginAttempts: 5,
    sessionTimeout: 15,
    requireEmailVerification: true,
    enableTwoFactor: false,
    autoLockDuration: 30,
    passwordMinLength: 8,
    enableAuditLog: true,
    enableRateLimit: true,
    maintenanceMode: false,
  });

  const tabs = [
    { id: 'system', label: 'System', icon: Server },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'database', label: 'Database', icon: Database },
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would make an API call to save settings
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <Settings className="w-8 h-8 mr-3" />
          System Settings
        </h1>
        <p className="text-slate-400">
          Configure system-wide settings and preferences
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
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
          {/* System Settings */}
          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">System Configuration</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Maintenance Mode</p>
                      <p className="text-slate-400 text-sm">
                        Temporarily disable user access for maintenance
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <Input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                        fullWidth
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Auto-Lock Duration (minutes)
                      </label>
                      <Input
                        type="number"
                        value={settings.autoLockDuration}
                        onChange={(e) => handleSettingChange('autoLockDuration', parseInt(e.target.value))}
                        fullWidth
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Enable Audit Logging</p>
                      <p className="text-slate-400 text-sm">
                        Log all admin actions for security auditing
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableAuditLog}
                      onChange={(checked) => handleSettingChange('enableAuditLog', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Rate Limiting</p>
                      <p className="text-slate-400 text-sm">
                        Protect against API abuse with rate limiting
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableRateLimit}
                      onChange={(checked) => handleSettingChange('enableRateLimit', checked)}
                    />
                  </div>
                </div>
              </Card>

              {/* System Status */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">System Status</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-800 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-success-400 mx-auto mb-2" />
                    <p className="text-white font-medium">Database</p>
                    <p className="text-success-400 text-sm">Connected</p>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-800 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-success-400 mx-auto mb-2" />
                    <p className="text-white font-medium">Email Service</p>
                    <p className="text-success-400 text-sm">Active</p>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-800 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-warning-400 mx-auto mb-2" />
                    <p className="text-white font-medium">Backup</p>
                    <p className="text-warning-400 text-sm">Pending</p>
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
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Security Configuration</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Max Login Attempts
                      </label>
                      <Input
                        type="number"
                        value={settings.maxLoginAttempts}
                        onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                        fullWidth
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Minimum Password Length
                      </label>
                      <Input
                        type="number"
                        value={settings.passwordMinLength}
                        onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                        fullWidth
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Require Email Verification</p>
                      <p className="text-slate-400 text-sm">
                        Users must verify their email before accessing the system
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireEmailVerification}
                      onChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Enable Two-Factor Authentication</p>
                      <p className="text-slate-400 text-sm">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableTwoFactor}
                      onChange={(checked) => handleSettingChange('enableTwoFactor', checked)}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Email Configuration</h3>
                
                <div className="space-y-4">
                  <Input
                    label="SMTP Server"
                    placeholder="smtp.example.com"
                    fullWidth
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="SMTP Port"
                      type="number"
                      placeholder="587"
                      fullWidth
                    />
                    
                    <Input
                      label="From Email"
                      type="email"
                      placeholder="noreply@truegate.com"
                      fullWidth
                    />
                  </div>
                  
                  <Input
                    label="SMTP Username"
                    placeholder="username"
                    fullWidth
                  />
                  
                  <Input
                    label="SMTP Password"
                    type="password"
                    placeholder="password"
                    fullWidth
                  />
                  
                  <Button icon={<Mail className="w-4 h-4" />}>
                    Test Email Configuration
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Database Settings */}
          {activeTab === 'database' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Database Management</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      icon={<Download className="w-4 h-4" />}
                      variant="secondary"
                      fullWidth
                    >
                      Backup Database
                    </Button>
                    
                    <Button
                      icon={<Upload className="w-4 h-4" />}
                      variant="secondary"
                      fullWidth
                    >
                      Restore Database
                    </Button>
                    
                    <Button
                      icon={<RefreshCw className="w-4 h-4" />}
                      variant="secondary"
                      fullWidth
                    >
                      Optimize Database
                    </Button>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Database Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Total Users:</span>
                        <span className="text-white ml-2">1,247</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Database Size:</span>
                        <span className="text-white ml-2">234 MB</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Last Backup:</span>
                        <span className="text-white ml-2">2 hours ago</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Uptime:</span>
                        <span className="text-white ml-2">99.9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              icon={<Save className="w-4 h-4" />}
              size="lg"
            >
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};