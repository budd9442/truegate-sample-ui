import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Smartphone, 
  Thermometer, 
  Video, 
  Activity,
  Home,
  AlertTriangle,
  Clock,
  Users,
  Zap,
  Bell,
  CheckCircle,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Device, Alert } from '../../types';
import { mockDevices, mockAlerts } from '../../utils/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const UserDashboard: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => {
        if (device.type === 'sensor' && device.name.includes('Temperature')) {
          return {
            ...device,
            value: Math.floor(Math.random() * 10) + 68,
            lastUpdate: new Date().toISOString()
          };
        }
        return device;
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const activeDevices = devices.filter(d => d.state === true).length;
  const criticalAlerts = alerts.filter(a => a.severity === 'high' && !a.acknowledged).length;
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);

  // Get key metrics
  const keyMetrics = [
    {
      label: 'Devices Online',
      value: onlineDevices,
      total: devices.length,
      icon: Wifi,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Active Devices',
      value: activeDevices,
      total: onlineDevices,
      icon: Activity,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/10'
    },
    {
      label: 'Energy Usage',
      value: Math.floor(Math.random() * 20) + 80,
      unit: '%',
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Alerts',
      value: unacknowledgedAlerts.length,
      icon: Bell,
      color: criticalAlerts > 0 ? 'text-red-400' : 'text-green-400',
      bgColor: criticalAlerts > 0 ? 'bg-red-500/10' : 'bg-green-500/10'
    }
  ];

  // Get room overview
  const roomOverview = devices.reduce((acc, device) => {
    const room = device.room || 'Other';
    if (!acc[room]) acc[room] = { total: 0, online: 0 };
    acc[room].total++;
    if (device.status === 'online') acc[room].online++;
    return acc;
  }, {} as Record<string, { total: number; online: number }>);

  // Theme-aware styles
  const cardStyles = theme === 'dark' 
    ? 'bg-dark-bg-secondary border-dark-border' 
    : 'bg-light-bg-secondary border-light-border';
  
  const textStyles = theme === 'dark' 
    ? 'text-dark-text' 
    : 'text-light-text';
  
  const textMutedStyles = theme === 'dark' 
    ? 'text-dark-text-muted' 
    : 'text-light-text-muted';

  return (
    <div className="min-h-full space-y-8">
      {/* Top Section with Home Overview and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Home Overview - Top Left (More Space) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`lg:col-span-3 rounded-2xl p-8 border transition-colors duration-300 ${cardStyles}`}
        >
          <h2 className={`text-2xl font-bold mb-6 flex items-center ${textStyles}`}>
            <Home className="w-6 h-6 mr-3 text-primary-400" />
            Home Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(roomOverview).map(([room, stats]) => (
              <div key={room} className="text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  theme === 'dark' ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'
                }`}>
                  <Home className={`w-8 h-8 ${textMutedStyles}`} />
                </div>
                <h3 className={`font-semibold mb-2 ${textStyles}`}>{room}</h3>
                <div className={`text-2xl font-bold mb-1 ${textStyles}`}>
                  {stats.online}/{stats.total}
                </div>
                <div className={`text-sm ${textMutedStyles}`}>devices online</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alerts Panel - Top Right (Less Space) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`lg:col-span-1 rounded-2xl p-6 border transition-colors duration-300 ${cardStyles}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold flex items-center ${textStyles}`}>
              <Bell className="w-5 h-5 mr-2 text-primary-400" />
              Alerts
            </h3>
            {unacknowledgedAlerts.length > 0 && (
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>

          <div className="space-y-4">
            {unacknowledgedAlerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className={textMutedStyles}>All clear!</p>
              </div>
            ) : (
              unacknowledgedAlerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border-l-4 ${
                    alert.severity === 'high'
                      ? 'border-red-500 bg-red-500/10'
                      : alert.severity === 'medium'
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-green-500 bg-green-500/10'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                      alert.severity === 'high' ? 'text-red-400' : 
                      alert.severity === 'medium' ? 'text-yellow-400' : 'text-green-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${textStyles}`}>{alert.message}</p>
                      <p className={`text-xs mt-1 ${textMutedStyles}`}>
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {unacknowledgedAlerts.length > 3 && (
              <button className="w-full text-sm text-primary-400 hover:text-primary-300 text-center py-2">
                View all {unacknowledgedAlerts.length} alerts
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-2xl p-8 border transition-colors duration-300 ${cardStyles}`}
      >
        <h2 className={`text-2xl font-bold mb-6 flex items-center ${textStyles}`}>
          <Activity className="w-6 h-6 mr-3 text-primary-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {devices.slice(0, 8).map((device) => (
            <div
              key={device.id}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:scale-105 ${
                device.status === 'online'
                  ? 'border-green-500/30 bg-green-500/5 hover:border-green-500/50'
                  : 'border-red-500/30 bg-red-500/5 hover:border-red-500/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  device.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {device.status === 'online' ? (
                    <Wifi className="w-4 h-4 text-green-400" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium truncate ${textStyles}`}>{device.name}</div>
                  <div className={`text-xs capitalize ${textMutedStyles}`}>{device.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Energy Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-2xl p-8 border transition-colors duration-300 ${cardStyles}`}
      >
        <h2 className={`text-2xl font-bold mb-6 flex items-center ${textStyles}`}>
          <Zap className="w-6 h-6 mr-3 text-primary-400" />
          Energy Overview
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`rounded-2xl p-6 border transition-colors hover:border-slate-500/50 ${
                theme === 'dark' ? 'bg-dark-bg-tertiary border-dark-border-secondary' : 'bg-light-bg-tertiary border-light-border-secondary'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                {metric.total && (
                  <span className={`text-xs ${textMutedStyles}`}>
                    {metric.value}/{metric.total}
                  </span>
                )}
              </div>
              <div className={`text-3xl font-bold mb-1 ${textStyles}`}>
                {metric.value}{metric.unit || ''}
              </div>
              <div className={`text-sm ${textMutedStyles}`}>{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Status Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`rounded-2xl p-6 border transition-colors duration-300 ${cardStyles}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className={`w-4 h-4 ${textMutedStyles}`} />
              <span className={`text-sm ${textMutedStyles}`}>
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className={`w-4 h-4 ${textMutedStyles}`} />
              <span className={`text-sm ${textMutedStyles}`}>2 people at home</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-400">System Online</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};