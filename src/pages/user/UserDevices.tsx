import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Smartphone,
  Grid3X3,
  List
} from 'lucide-react';
import { Device } from '../../types';
import { mockDevices } from '../../utils/mockData';
import { DeviceTile } from '../../components/smart-home/DeviceTile';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../contexts/ThemeContext';

export const UserDevices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(mockDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { theme } = useTheme();

  // Theme-aware styles
  const textStyles = theme === 'dark' ? 'text-dark-text' : 'text-light-text';
  const textMutedStyles = theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted';
  const selectStyles = theme === 'dark' 
    ? 'bg-dark-bg-tertiary border-dark-border-secondary text-dark-text focus:ring-accent-500' 
    : 'bg-light-bg-tertiary border-light-border-secondary text-light-text focus:ring-accent-500';
  const viewModeStyles = theme === 'dark' ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary';

  const rooms = Array.from(new Set(devices.map(d => d.room).filter(Boolean)));
  const deviceTypes = Array.from(new Set(devices.map(d => d.type)));

  useEffect(() => {
    let filtered = devices;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(device =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.room?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by room
    if (selectedRoom !== 'all') {
      filtered = filtered.filter(device => device.room === selectedRoom);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(device => device.type === selectedType);
    }

    setFilteredDevices(filtered);
  }, [devices, searchTerm, selectedRoom, selectedType]);

  const handleDeviceToggle = (deviceId: string, newState: boolean) => {
    setDevices(prev => prev.map(device =>
      device.id === deviceId ? { ...device, state: newState, lastUpdate: new Date().toISOString() } : device
    ));
  };

  const getDeviceIcon = (type: string) => {
    const icons = {
      light: '💡',
      lock: '🔒',
      camera: '📷',
      sensor: '🌡️',
      switch: '🔌',
    };
    return icons[type as keyof typeof icons] || '📱';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className={`text-3xl font-bold mb-2 flex items-center ${textStyles}`}>
            <Smartphone className="w-8 h-8 mr-3" />
            My Devices
          </h1>
          <p className={textMutedStyles}>
            Manage and control all your connected smart home devices
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button icon={<Plus className="w-4 h-4" />}>
            Add Device
          </Button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Search */}
          <div className="lg:col-span-4">
            <Input
              type="text"
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>

          {/* Room Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${selectStyles}`}
            >
              <option value="all">All Rooms</option>
              {rooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${selectStyles}`}
            >
              <option value="all">All Types</option>
              {deviceTypes.map(type => (
                <option key={type} value={type} className="capitalize">
                  {getDeviceIcon(type)} {type}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="lg:col-span-2 flex justify-end">
            <div className={`flex rounded-lg p-1 ${viewModeStyles}`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-accent-600 text-white' 
                    : `${textMutedStyles} hover:${textStyles}`
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-accent-600 text-white' 
                    : `${textMutedStyles} hover:${textStyles}`
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Device Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className={`text-2xl font-bold ${textStyles}`}>{devices.length}</div>
          <div className={`text-sm ${textMutedStyles}`}>Total Devices</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-success-400">
            {devices.filter(d => d.status === 'online').length}
          </div>
          <div className={`text-sm ${textMutedStyles}`}>Online</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-warning-400">
            {devices.filter(d => d.state === true).length}
          </div>
          <div className={`text-sm ${textMutedStyles}`}>Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-error-400">
            {devices.filter(d => d.status === 'offline').length}
          </div>
          <div className={`text-sm ${textMutedStyles}`}>Offline</div>
        </Card>
      </div>

      {/* Devices Grid/List */}
      {filteredDevices.length === 0 ? (
        <Card className="p-12 text-center">
          <Smartphone className={`w-16 h-16 mx-auto mb-4 ${textMutedStyles}`} />
          <h3 className={`text-xl font-semibold mb-2 ${textStyles}`}>No devices found</h3>
          <p className={`mb-6 ${textMutedStyles}`}>
            {searchTerm || selectedRoom !== 'all' || selectedType !== 'all'
              ? 'Try adjusting your filters to see more devices.'
              : 'Get started by adding your first smart device.'}
          </p>
          {(!searchTerm && selectedRoom === 'all' && selectedType === 'all') && (
            <Button icon={<Plus className="w-4 h-4" />}>
              Add Your First Device
            </Button>
          )}
        </Card>
      ) : (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }
        `}>
          {filteredDevices.map((device) => (
            viewMode === 'grid' ? (
              <DeviceTile
                key={device.id}
                device={device}
                onToggle={handleDeviceToggle}
              />
            ) : (
              <Card key={device.id} className="p-4" hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getDeviceIcon(device.type)}</div>
                    <div>
                      <h3 className={`font-semibold ${textStyles}`}>{device.name}</h3>
                      <p className={`text-sm ${textMutedStyles}`}>{device.room} • {device.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      device.status === 'online' ? 'bg-success-400' :
                      device.status === 'warning' ? 'bg-warning-400' :
                      'bg-error-400'
                    }`} />
                    <span className={`text-sm capitalize ${textMutedStyles}`}>{device.status}</span>
                  </div>
                </div>
              </Card>
            )
          ))}
        </div>
      )}
    </div>
  );
};