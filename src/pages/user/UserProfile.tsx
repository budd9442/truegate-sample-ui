import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User, Mail, Phone, Calendar, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { profileSchema } from '../../utils/validation';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

interface ProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  contactNumber: string;
}

export const UserProfile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      birthDate: user?.birthDate || '',
      gender: user?.gender || '',
      contactNumber: user?.contactNumber || '',
    },
  });

  const onSubmit = async (data: ProfileData) => {
    try {
      await updateUser(data);
    } catch (error) {
      // Error handling is done in the auth context
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-slate-400">Manage your account information</p>
      </motion.div>

      <Card className="p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-slate-700">
          <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-slate-400">{user?.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user?.verified 
                  ? 'bg-success-500/20 text-success-400' 
                  : 'bg-warning-500/20 text-warning-400'
              }`}>
                {user?.verified ? 'Verified' : 'Unverified'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-400 capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
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

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={isSubmitting}
              icon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};