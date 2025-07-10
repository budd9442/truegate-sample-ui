import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Shield, Info } from 'lucide-react';
import { Card } from '../ui/Card';
import { useTheme } from '../../contexts/ThemeContext';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  deviceId?: string;
}

interface AlertPanelProps {
  alerts: Alert[];
  maxAlerts?: number;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, maxAlerts = 5 }) => {
  const { theme } = useTheme();

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-error-500 bg-error-500/10';
      case 'warning':
        return 'border-warning-500 bg-warning-500/10';
      case 'success':
        return 'border-success-500 bg-success-500/10';
      case 'info':
        return 'border-accent-500 bg-accent-500/10';
      default:
        return theme === 'dark' 
          ? 'border-dark-border-secondary bg-dark-border-secondary/10' 
          : 'border-light-border-secondary bg-light-border-secondary/10';
    }
  };

  const getAlertIcon = (type: string) => {
    const iconClass = 'w-5 h-5';
    switch (type) {
      case 'error':
        return <AlertTriangle className={`${iconClass} text-error-400`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-warning-400`} />;
      case 'success':
        return <Shield className={`${iconClass} text-success-400`} />;
      case 'info':
        return <Info className={`${iconClass} text-accent-400`} />;
      default:
        return <AlertTriangle className={`${iconClass} ${theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'}`} />;
    }
  };

  const textStyles = theme === 'dark' ? 'text-dark-text' : 'text-light-text';
  const textMutedStyles = theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted';
  const textSecondaryStyles = theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary';

  const displayAlerts = alerts.slice(0, maxAlerts);

  return (
    <Card className={`p-6 relative overflow-hidden ${theme === 'dark' ? 'bg-dark-bg-secondary/50' : 'bg-light-bg-secondary/50'}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold ${textStyles} flex items-center`}>
          <Shield className="w-5 h-5 mr-2" />
          Security Alerts
        </h3>
        {alerts.length > 0 && (
          <span className={`text-sm ${textMutedStyles} px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'}`}>
            {alerts.length} active
          </span>
        )}
      </div>

      {displayAlerts.length === 0 ? (
        <div className="text-center py-8">
          <Shield className={`w-12 h-12 mx-auto mb-4 ${textMutedStyles}`} />
          <p className={textMutedStyles}>No recent alerts</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium ${textStyles}`}>{alert.title}</h4>
                  <p className={`text-sm mt-1 ${textSecondaryStyles}`}>{alert.message}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className={`w-4 h-4 ${textMutedStyles}`} />
                      <span className={`text-sm ${textMutedStyles}`}>
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    {alert.deviceId && (
                      <span className={`text-xs capitalize px-2 py-1 rounded ${theme === 'dark' ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} ${textMutedStyles}`}>
                        Device: {alert.deviceId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Background decoration */}
      <div className={`absolute -top-8 -right-8 w-32 h-32 ${theme === 'dark' ? 'bg-accent-500/5' : 'bg-accent-500/5'} rounded-full blur-3xl pointer-events-none`} />
    </Card>
  );
};