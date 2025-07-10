import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Lock, 
  Camera, 
  Thermometer, 
  Zap, 
  Wifi,
  Video
} from 'lucide-react';
import { Device } from '../../types';
import { Card } from '../ui/Card';
import { Switch } from '../ui/Switch';
import { useTheme } from '../../contexts/ThemeContext';

interface DeviceTileProps {
  device: Device;
  onToggle: (deviceId: string, newState: boolean) => void;
}

export const DeviceTile: React.FC<DeviceTileProps> = ({ device, onToggle }) => {
  const { theme } = useTheme();

  const getDeviceIcon = () => {
    const iconClasses = `w-6 h-6 ${device.state ? 'text-yellow-400' : (theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted')}`;
    
    switch (device.type) {
      case 'light':
        return <Lightbulb className={iconClasses} />;
      case 'lock':
        return <Lock className={`w-6 h-6 ${device.state ? 'text-success-400' : iconClasses}`} />;
      case 'camera':
        return <Camera className={`w-6 h-6 ${device.state ? 'text-accent-400' : iconClasses}`} />;
      case 'sensor':
        return <Thermometer className="w-6 h-6 text-accent-400" />;
      case 'switch':
        return <Zap className={iconClasses} />;
      default:
        return <Wifi className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'}`} />;
    }
  };

  const getStatusColor = () => {
    switch (device.status) {
      case 'online':
        return 'border-success-400';
      case 'warning':
        return 'border-warning-400';
      case 'offline':
        return 'border-error-400';
      default:
        return theme === 'dark' ? 'border-dark-border-secondary' : 'border-light-border-secondary';
    }
  };

  const getStatusIcon = () => {
    switch (device.status) {
      case 'online':
        return <div className="w-3 h-3 bg-success-400 rounded-full" />;
      case 'warning':
        return <div className="w-3 h-3 bg-warning-400 rounded-full" />;
      case 'offline':
        return <div className="w-3 h-3 bg-error-400 rounded-full" />;
      default:
        return <Wifi className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted'}`} />;
    }
  };

  const textStyles = theme === 'dark' ? 'text-dark-text' : 'text-light-text';
  const textMutedStyles = theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted';
  const bgStyles = theme === 'dark' ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary';
  const borderStyles = theme === 'dark' ? 'border-dark-border-secondary' : 'border-light-border-secondary';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`p-6 border-2 ${getStatusColor()} hover:shadow-xl transition-all duration-300 relative overflow-hidden`} hover>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getDeviceIcon()}
            <div>
              <h3 className={`font-semibold ${textStyles}`}>{device.name}</h3>
              <p className={`text-sm ${textMutedStyles}`}>{device.room}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className={`text-xs capitalize ${textMutedStyles}`}>{device.status}</span>
          </div>
        </div>

        {/* Device Content */}
        {device.type === 'camera' && (
          <div className="mb-4">
            <div className={`w-full h-32 ${bgStyles} rounded-lg flex items-center justify-center`}>
              <Video className={`w-8 h-8 ${textMutedStyles}`} />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className={`text-sm ${textMutedStyles}`}>Live Feed</span>
              <div className="w-2 h-2 bg-error-400 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {device.type === 'sensor' && device.value && (
          <div className="mb-4">
            <div className="text-center">
              <div className={`text-3xl font-bold ${textStyles}`}>
                {device.value}
                <span className="text-lg">°C</span>
              </div>
              <div className={`text-sm ${textMutedStyles}`}>Current Reading</div>
            </div>
          </div>
        )}

                 {/* Controls */}
         {device.type !== 'sensor' && (
           <div className="flex items-center justify-between">
             <Switch
               checked={device.state || false}
               onChange={(checked) => onToggle(device.id, checked)}
               size="md"
             />
             <span className={`text-sm ${textMutedStyles}`}>
               {device.state ? 'On' : 'Off'}
             </span>
           </div>
         )}

        {/* Footer */}
        <div className={`mt-4 pt-4 border-t ${borderStyles}`}>
          <p className={`text-xs ${textMutedStyles}`}>
            Last updated: {new Date(device.lastUpdate).toLocaleTimeString()}
          </p>
        </div>

        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-dark-bg-secondary/50 to-dark-bg-tertiary/50' : 'from-light-bg-secondary/50 to-light-bg-tertiary/50'} pointer-events-none`} />
      </Card>
    </motion.div>
  );
};