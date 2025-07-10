import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';

// User Pages
import { UserDashboard } from './pages/user/UserDashboard';
import { UserDevices } from './pages/user/UserDevices';
import { UserCameras } from './pages/user/UserCameras';
import { UserSettings } from './pages/user/UserSettings';
import { UserProfile } from './pages/user/UserProfile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminSettings } from './pages/admin/AdminSettings';

// Landing Page
import { LandingPage } from './pages/LandingPage';

import { ROUTES } from './utils/constants';

// Catch-all route component that handles both authenticated and unauthenticated users
const CatchAllRoute = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user) {
    // Redirect based on user role
    if (user.role === 'admin') {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    } else {
      return <Navigate to={ROUTES.USER_DASHBOARD} replace />;
    }
  }
  
  return <Navigate to={ROUTES.HOME} replace />;
};

// Main app routes component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<LandingPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
      <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />

      {/* Protected User Routes */}
      <Route path="/user/*" element={
        <ProtectedRoute>
          <Layout>
            <Routes>
              <Route path="home" element={<UserDashboard />} />
              <Route path="devices" element={<UserDevices />} />
              <Route path="cameras" element={<UserCameras />} />
              <Route path="settings" element={<UserSettings />} />
              <Route path="profile" element={<UserProfile />} />
              <Route index element={<Navigate to="home" replace />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />

      {/* Protected Admin Routes */}
      <Route path="/admin/*" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />

      {/* Default redirects for specific roles */}
      <Route path="/dashboard" element={<CatchAllRoute />} />

      {/* Catch all route */}
      <Route path="*" element={<CatchAllRoute />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <AppRoutes />
            
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-text)',
                  border: '1px solid var(--toast-border)',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#f1f5f9',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#f1f5f9',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;