import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Shield, ArrowLeft } from 'lucide-react';
import { apiService } from '../../services/api';
import { forgotPasswordSchema } from '../../utils/validation';
import { ROUTES } from '../../utils/constants';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

interface ForgotPasswordData {
  email: string;
}

export const ForgotPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await apiService.requestPasswordReset(data.email);
    } catch (error) {
      // Error handling is done in the API service
    }
  };

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
              className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
            <p className="text-slate-400">Enter your email to receive a reset link</p>
          </div>

          {/* Forgot Password Form */}
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

            <Button
              type="submit"
              loading={isSubmitting}
              fullWidth
              size="lg"
            >
              Send Reset Link
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};