import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginData, RegisterData } from '../types';
import { apiService } from '../services/api';
import { TOKEN_STORAGE_KEY } from '../utils/constants';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  resendVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (token) {
          // Decode JWT to get user info (basic implementation)
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp * 1000 > Date.now()) {
              // Token is still valid, create user object from payload
              const userData: User = {
                _id: payload.sub || '',
                email: payload.email || '',
                firstName: payload.firstName || payload.name?.split(' ')[0] || '',
                lastName: payload.lastName || payload.name?.split(' ')[1] || '',
                birthDate: payload.birthDate || '',
                gender: payload.gender || '',
                role: payload.role || 'user',
                contactNumber: payload.contactNumber || '',
                loginAttempts: 0,
                lastLogin: new Date().toISOString(),
                allowedIps: [],
                verified: payload.verified !== false,
                locked: false,
              };
              setUser(userData);
            } else {
              // Token expired
              localStorage.removeItem(TOKEN_STORAGE_KEY);
            }
          } catch (error) {
            // Invalid token
            localStorage.removeItem(TOKEN_STORAGE_KEY);
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await apiService.login(data);
      
      // Store token in localStorage for persistence
      if (response.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      }
      
      // Set user state
      setUser(response.user);
      
      toast.success('Login successful!');
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await apiService.register(data);
      // Registration successful, but user needs to verify email
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    // Clear stored token
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    toast.success('Logged out successfully');
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    try {
      await apiService.updateUser(user.email, data);
      setUser({ ...user, ...data });
    } catch (error) {
      throw error;
    }
  };

  const resendVerification = async () => {
    try {
      await apiService.resendVerification();
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    resendVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};