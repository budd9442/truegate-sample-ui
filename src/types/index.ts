export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  role: 'user' | 'admin';
  contactNumber: string;
  loginAttempts: number;
  lastLogin: string;
  allowedIps: string[];
  verified: boolean;
  locked: boolean;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  contactNumber: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'light' | 'lock' | 'camera' | 'sensor' | 'switch';
  status: 'online' | 'offline' | 'warning';
  state?: boolean;
  value?: number;
  unit?: string;
  lastUpdate: string;
  room?: string;
  feedUrl?: string;
}

export interface Alert {
  id: string;
  type: 'motion' | 'access' | 'system' | 'security';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  deviceId?: string;
  acknowledged: boolean;
}

export interface ApiStats {
  totalUsers: number;
  activeUsers: number;
  totalLogins: number;
  failedLogins: number;
  passwordResets: number;
  verificationsSent: number;
  loginTrends: { date: string; logins: number }[];
  userRoles: { role: string; count: number }[];
}