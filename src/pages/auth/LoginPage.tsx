import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginData } from '../../types';
import { loginSchema } from '../../utils/validation';
import { ROUTES } from '../../utils/constants';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine redirect target based on user role
  const getRedirectTarget = () => {
    if (location.state?.from?.pathname) {
      return location.state.from.pathname;
    }
    
    if (user?.role === 'admin') {
      return ROUTES.ADMIN_DASHBOARD;
    }
    
    return ROUTES.USER_DASHBOARD;
  };

  const from = getRedirectTarget();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    console.log('Form submitted with data:', data); // Debug log
    try {
      await login(data);
      // After login, get the updated redirect target based on the user's role
      const redirectTarget = location.state?.from?.pathname || 
        (user?.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
      navigate(redirectTarget, { replace: true });
    } catch (error) {
      console.error('Login error:', error); // Debug log
      // Error handling is done in the auth context
    }
  };

  // Debug: Log when button is clicked
  const handleButtonClick = (e: React.MouseEvent) => {
    console.log('Button clicked', e);
  };

  // Don't render the login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8" glass>
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-accent-600 rounded-full mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to your TrueGate account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              {...register('email')}
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              error={errors.email?.message}
              icon={<Mail className="w-5 h-5" />}
              fullWidth
            />

            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter your password"
                error={errors.password?.message}
                icon={<Lock className="w-5 h-5" />}
                fullWidth
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-primary-600 text-accent-600 focus:ring-accent-500"
                />
                <span className="ml-2 text-sm text-slate-400">Remember me</span>
              </label>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-primary-400 hover:text-primary-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              fullWidth
              size="lg"
              onClick={handleButtonClick}
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <Link
                to={ROUTES.REGISTER}
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};