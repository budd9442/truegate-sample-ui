export const API_BASE_URL = 'https://truegate.live/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  USER_DASHBOARD: '/user/home',
  USER_DEVICES: '/user/devices',
  USER_CAMERAS: '/user/cameras',
  USER_SETTINGS: '/user/settings',
  USER_PROFILE: '/user/profile',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

export const THEME_STORAGE_KEY = 'truegate-theme';
export const TOKEN_STORAGE_KEY = 'truegate-token';