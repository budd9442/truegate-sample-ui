import { Device, Alert, ApiStats } from '../types';

export const mockDevices: Device[] = [
  {
    id: 'front-door-camera',
    name: 'Front Door Camera',
    type: 'camera',
    status: 'online',
    lastUpdate: new Date().toISOString(),
    room: 'Entrance',
    feedUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  },
  {
    id: 'back-yard-camera',
    name: 'Back Yard Camera',
    type: 'camera',
    status: 'online',
    lastUpdate: new Date().toISOString(),
    room: 'Backyard',
    feedUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
  },
  {
    id: 'living-room-light',
    name: 'Living Room Light',
    type: 'light',
    status: 'online',
    state: true,
    lastUpdate: new Date().toISOString(),
    room: 'Living Room'
  },
  {
    id: 'bedroom-light',
    name: 'Bedroom Light',
    type: 'light',
    status: 'online',
    state: false,
    lastUpdate: new Date().toISOString(),
    room: 'Bedroom'
  },
  {
    id: 'kitchen-light',
    name: 'Kitchen Light',
    type: 'light',
    status: 'online',
    state: true,
    lastUpdate: new Date().toISOString(),
    room: 'Kitchen'
  },
  {
    id: 'front-door-lock',
    name: 'Front Door Lock',
    type: 'lock',
    status: 'online',
    state: true,
    lastUpdate: new Date().toISOString(),
    room: 'Entrance'
  },
  {
    id: 'back-door-lock',
    name: 'Back Door Lock',
    type: 'lock',
    status: 'online',
    state: false,
    lastUpdate: new Date().toISOString(),
    room: 'Backyard'
  },
  {
    id: 'garage-door',
    name: 'Garage Door',
    type: 'lock',
    status: 'online',
    state: true,
    lastUpdate: new Date().toISOString(),
    room: 'Garage'
  },
  {
    id: 'living-room-temp',
    name: 'Living Room Temperature',
    type: 'sensor',
    status: 'online',
    value: 72,
    unit: '°F',
    lastUpdate: new Date().toISOString(),
    room: 'Living Room'
  },
  {
    id: 'bedroom-temp',
    name: 'Bedroom Temperature',
    type: 'sensor',
    status: 'online',
    value: 68,
    unit: '°F',
    lastUpdate: new Date().toISOString(),
    room: 'Bedroom'
  },
  {
    id: 'humidity-sensor',
    name: 'Humidity Sensor',
    type: 'sensor',
    status: 'online',
    value: 45,
    unit: '%',
    lastUpdate: new Date().toISOString(),
    room: 'Living Room'
  },
  {
    id: 'air-quality',
    name: 'Air Quality Monitor',
    type: 'sensor',
    status: 'warning',
    value: 85,
    unit: 'AQI',
    lastUpdate: new Date().toISOString(),
    room: 'Living Room'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'motion',
    message: 'Motion detected at front door',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    severity: 'medium',
    deviceId: 'front-door-camera',
    acknowledged: false
  },
  {
    id: '2',
    type: 'access',
    message: 'Front door unlocked',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    severity: 'low',
    deviceId: 'front-door-lock',
    acknowledged: true
  },
  {
    id: '3',
    type: 'system',
    message: 'Camera feed interrupted',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    severity: 'high',
    deviceId: 'back-yard-camera',
    acknowledged: false
  },
  {
    id: '4',
    type: 'security',
    message: 'Multiple failed access attempts',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    severity: 'high',
    acknowledged: false
  },
  {
    id: '5',
    type: 'motion',
    message: 'Motion detected in backyard',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    severity: 'medium',
    deviceId: 'back-yard-camera',
    acknowledged: true
  }
];

export const mockApiStats: ApiStats = {
  totalUsers: 150,
  activeUsers: 89,
  totalLogins: 1247,
  failedLogins: 23,
  passwordResets: 12,
  verificationsSent: 45,
  loginTrends: [
    { date: '2024-01-01', logins: 42 },
    { date: '2024-01-02', logins: 38 },
    { date: '2024-01-03', logins: 55 },
    { date: '2024-01-04', logins: 48 },
    { date: '2024-01-05', logins: 62 },
    { date: '2024-01-06', logins: 58 },
    { date: '2024-01-07', logins: 71 },
    { date: '2024-01-08', logins: 65 },
    { date: '2024-01-09', logins: 59 },
    { date: '2024-01-10', logins: 73 },
  ],
  userRoles: [
    { role: 'user', count: 135 },
    { role: 'admin', count: 15 }
  ]
};