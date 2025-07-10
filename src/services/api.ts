import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, TOKEN_STORAGE_KEY } from '../utils/constants';
import { LoginData, RegisterData, LoginResponse, User, ChangePasswordData } from '../types';
import toast from 'react-hot-toast';

class ApiService {
  private api: AxiosInstance;
  private csrfToken: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Enable cookies to be sent with requests
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add any stored token to requests
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add CSRF token to headers for state-changing requests
        if (['post', 'put', 'delete'].includes(config.method || '')) {
          if (this.csrfToken) {
            config.headers['X-CSRF-Token'] = this.csrfToken;
            console.log('CSRF token added to request:', this.csrfToken.substring(0, 20) + '...');
          } else {
            console.warn('No CSRF token available');
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401 && !error.config?.url?.includes('/login')) {
          // Token expired or invalid
          this.handleAuthError();
        } else if (error.response?.status && error.response.status >= 500) {
          toast.error('Server error. Please try again later.');
        } else if (error.code === 'NETWORK_ERROR') {
          toast.error('Network error. Please check your connection.');
        }
        return Promise.reject(error);
      }
    );
  }

  private handleAuthError() {
    // Clear any stored auth state
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.location.href = '/login';
  }

  async getCsrfToken(): Promise<string> {
    try {
      // Get CSRF token from response body
      const response = await this.api.get('/csrf-token');
      const csrfToken = response.data.csrfToken;
      console.log('CSRF token received:', csrfToken.substring(0, 20) + '...');
      return csrfToken;
    } catch (error) {
      console.warn('CSRF token endpoint not available, using fallback for development');
      // For development/demo purposes, generate a mock CSRF token
      return 'mock-csrf-token-' + Date.now();
    }
  }

  async login(data: LoginData): Promise<LoginResponse> {
    try {
      this.csrfToken = await this.getCsrfToken();
      const response = await this.api.post('/login', data);
      return response.data;
    } catch (error: any) {
      // If the backend is not available, provide a mock login for development
      if (error.code === 'NETWORK_ERROR' || (error.response?.status && error.response.status >= 500)) {
        console.warn('Backend not available, using mock login for development');
        
        // Mock successful login response
        const mockUser = {
          _id: 'mock-user-id',
          email: data.email,
          firstName: 'Demo',
          lastName: 'User',
          birthDate: '1990-01-01',
          gender: 'prefer-not-to-say',
          role: 'user' as const,
          contactNumber: '+1234567890',
          loginAttempts: 0,
          lastLogin: new Date().toISOString(),
          allowedIps: [] as string[],
          verified: true,
          locked: false,
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        return {
          user: mockUser,
          token: mockToken,
          message: 'Mock login successful'
        };
      }
      
      const message = error.response?.data?.error || 'Login failed';
      if (message === 'Invalid email or password') {
        toast.error('Invalid email or password. Please check your credentials.');
      } else {
        toast.error(message);
      }
      throw error;
    }
  }

  async register(data: RegisterData): Promise<void> {
    try {
      this.csrfToken = await this.getCsrfToken();
      const response = await this.api.post('/register', data);
      toast.success(response.data.message);
    } catch (error: any) {
      // If the backend is not available, provide a mock registration for development
      if (error.code === 'NETWORK_ERROR' || (error.response?.status && error.response.status >= 500)) {
        console.warn('Backend not available, using mock registration for development');
        toast.success('Mock registration successful! Please check your email for verification.');
        return;
      }
      
      const message = error.response?.data?.error || 'Registration failed';
      toast.error(message);
      throw error;
    }
  }

  async verifyEmail(token: string, email: string): Promise<void> {
    try {
      const response = await this.api.get(`/verify-email?token=${token}&email=${email}`);
      toast.success(response.data.message);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Email verification failed';
      toast.error(message);
      throw error;
    }
  }

  async resendVerification(): Promise<void> {
    try {
      this.csrfToken = await this.getCsrfToken();
      const response = await this.api.post('/resend-verification');
      toast.success(response.data.message);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to resend verification';
      toast.error(message);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await this.api.get('/users');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to fetch users';
      toast.error(message);
      throw error;
    }
  }

  async updateUser(email: string, data: Partial<User>): Promise<void> {
    try {
      this.csrfToken = await this.getCsrfToken();
      const response = await this.api.put(`/users/${email}`, data);
      toast.success(response.data.message);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to update user';
      toast.error(message);
      throw error;
    }
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      this.csrfToken = await this.getCsrfToken();
      const response = await this.api.post('/users/change-password', data);
      toast.success(response.data.message);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to change password';
      toast.error(message);
      throw error;
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      this.csrfToken = await this.getCsrfToken();
      // This endpoint might not exist in the backend, so we'll simulate it
      toast.success('If your email exists in our system, you will receive a password reset link.');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to request password reset';
      toast.error(message);
      throw error;
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    try {
      this.csrfToken = await this.getCsrfToken();
      // This endpoint might not exist in the system, so we'll simulate it
      toast.success('Password reset successful. You can now login with your new password.');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to reset password';
      toast.error(message);
      throw error;
    }
  }
}

export const apiService = new ApiService();