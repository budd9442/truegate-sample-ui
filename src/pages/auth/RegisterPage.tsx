import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Lock, Eye, EyeOff, Shield, User, Phone, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterData } from '../../types';
import { registerSchema } from '../../utils/validation';
import { ROUTES } from '../../utils/constants';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

interface RegisterFormData extends RegisterData {
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      navigate(ROUTES.LOGIN, { 
        state: { message: 'Registration successful! Please check your email to verify your account.' }
      });
    } catch (error) {
      // Error handling is done in the auth context
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
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
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Join TrueGate and secure your smart home</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                {...register('firstName')}
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                error={errors.firstName?.message}
                icon={<User className="w-5 h-5" />}
                fullWidth
              />

              <Input
                {...register('lastName')}
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                error={errors.lastName?.message}
                icon={<User className="w-5 h-5" />}
                fullWidth
              />
            </div>

            <Input
              {...register('email')}
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              error={errors.email?.message}
              icon={<Mail className="w-5 h-5" />}
              fullWidth
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                {...register('birthDate')}
                type="date"
                label="Birth Date"
                error={errors.birthDate?.message}
                icon={<Calendar className="w-5 h-5" />}
                fullWidth
              />

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Gender
                </label>
                <select
                  {...register('gender')}
                  className="block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-error-500">{errors.gender.message}</p>
                )}
              </div>
            </div>

            <Input
              {...register('contactNumber')}
              type="tel"
              label="Contact Number"
              placeholder="Enter your phone number"
              error={errors.contactNumber?.message}
              icon={<Phone className="w-5 h-5" />}
              fullWidth
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="relative">
                <Input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  error={errors.confirmPassword?.message}
                  icon={<Lock className="w-5 h-5" />}
                  fullWidth
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-slate-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="rounded border-primary-600 text-accent-600 focus:ring-accent-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-slate-400">
                I agree to the{' '}
                <Link to="#" className="text-primary-400 hover:text-primary-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-primary-400 hover:text-primary-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              fullWidth
              size="lg"
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};