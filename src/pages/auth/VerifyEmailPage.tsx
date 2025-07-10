import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Shield, ArrowLeft } from 'lucide-react';
import { apiService } from '../../services/api';
import { ROUTES } from '../../utils/constants';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email) {
        setStatus('error');
        setMessage('Invalid verification link. Please check your email for the correct link.');
        return;
      }

      try {
        await apiService.verifyEmail(token, email);
        setStatus('success');
        setMessage('Email verified successfully! You can now log in to your account.');
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.error || 'Email verification failed. The link may be invalid or expired.');
      }
    };

    verifyEmail();
  }, [token, email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center" glass>
          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Email Verification</h1>
          </div>

          {/* Content based on status */}
          {status === 'loading' && (
            <div className="space-y-4">
              <LoadingSpinner size="lg" className="mx-auto" />
              <p className="text-slate-400">Verifying your email address...</p>
            </div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Verification Successful!</h2>
                <p className="text-slate-400">{message}</p>
              </div>
              <Link to={ROUTES.LOGIN}>
                <Button fullWidth size="lg">
                  Continue to Login
                </Button>
              </Link>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-error-500 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Verification Failed</h2>
                <p className="text-slate-400">{message}</p>
              </div>
              <div className="space-y-3">
                <Link to={ROUTES.LOGIN}>
                  <Button fullWidth size="lg">
                    Go to Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="ghost" fullWidth>
                    Create New Account
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};