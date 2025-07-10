import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Lock,
  Unlock,
  Edit3,
  Trash2,
  Eye,
  Plus
} from 'lucide-react';
import { User } from '../../types';
import { apiService } from '../../services/api';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUserActions, setShowUserActions] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await apiService.getAllUsers();
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by role
    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'verified') {
        filtered = filtered.filter(user => user.verified);
      } else if (selectedStatus === 'unverified') {
        filtered = filtered.filter(user => !user.verified);
      } else if (selectedStatus === 'locked') {
        filtered = filtered.filter(user => user.locked);
      } else if (selectedStatus === 'active') {
        filtered = filtered.filter(user => !user.locked);
      }
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole, selectedStatus]);

  const handleUserAction = async (userId: string, action: string) => {
    // This would typically make API calls to update user status
    setShowUserActions(null);
    
    // Mock implementation - in a real app, you'd call the backend
    if (action === 'toggle-lock') {
      setUsers(prev => prev.map(user => 
        user._id === userId ? { ...user, locked: !user.locked } : user
      ));
    }
  };

  const getUserStatusBadge = (user: User) => {
    if (user.locked) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-error-500/20 text-error-400">
          Locked
        </span>
      );
    }
    if (!user.verified) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-warning-500/20 text-warning-400">
          Unverified
        </span>
      );
    }
    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-success-500/20 text-success-400">
        Active
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
        role === 'admin' 
          ? 'bg-purple-500/20 text-purple-400' 
          : 'bg-accent-500/20 text-accent-400'
      }`}>
        {role}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Users className="w-8 h-8 mr-3" />
            User Management
          </h1>
          <p className="text-slate-400">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button icon={<Plus className="w-4 h-4" />}>
            Add User
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-white">{users.length}</div>
          <div className="text-slate-400 text-sm">Total Users</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-success-400">
            {users.filter(u => u.verified).length}
          </div>
          <div className="text-slate-400 text-sm">Verified</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-warning-400">
            {users.filter(u => !u.verified).length}
          </div>
          <div className="text-slate-400 text-sm">Unverified</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-error-400">
            {users.filter(u => u.locked).length}
          </div>
          <div className="text-slate-400 text-sm">Locked</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Search */}
          <div className="lg:col-span-6">
            <Input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>

          {/* Role Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
              <option value="locked">Locked</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
            <p className="text-slate-400">
              {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters to see more users.'
                : 'No users have been created yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">User</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">Role</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">Last Login</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">Login Attempts</th>
                  <th className="text-right py-4 px-6 font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-slate-700 hover:bg-slate-800/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-slate-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="py-4 px-6">
                      {getUserStatusBadge(user)}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-400 text-sm">
                        {user.lastLogin 
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : 'Never'
                        }
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-sm ${
                        user.loginAttempts > 3 ? 'text-error-400' : 'text-slate-400'
                      }`}>
                        {user.loginAttempts}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Eye className="w-4 h-4" />}
                          onClick={() => {/* View user details */}}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit3 className="w-4 h-4" />}
                          onClick={() => {/* Edit user */}}
                        />
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<MoreVertical className="w-4 h-4" />}
                            onClick={() => setShowUserActions(
                              showUserActions === user._id ? null : user._id
                            )}
                          />
                          
                          {showUserActions === user._id && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                              <div className="py-2">
                                <button
                                  onClick={() => handleUserAction(user._id, 'toggle-lock')}
                                  className="w-full px-4 py-2 text-left text-white hover:bg-slate-700 flex items-center space-x-2"
                                >
                                  {user.locked ? (
                                    <>
                                      <Unlock className="w-4 h-4" />
                                      <span>Unlock User</span>
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="w-4 h-4" />
                                      <span>Lock User</span>
                                    </>
                                  )}
                                </button>
                                
                                <button
                                  onClick={() => handleUserAction(user._id, 'resend-verification')}
                                  className="w-full px-4 py-2 text-left text-white hover:bg-slate-700 flex items-center space-x-2"
                                >
                                  <Mail className="w-4 h-4" />
                                  <span>Resend Verification</span>
                                </button>
                                
                                <button
                                  onClick={() => handleUserAction(user._id, 'change-role')}
                                  className="w-full px-4 py-2 text-left text-white hover:bg-slate-700 flex items-center space-x-2"
                                >
                                  <Shield className="w-4 h-4" />
                                  <span>Change Role</span>
                                </button>
                                
                                <div className="border-t border-slate-700 my-1"></div>
                                
                                <button
                                  onClick={() => handleUserAction(user._id, 'delete')}
                                  className="w-full px-4 py-2 text-left text-error-400 hover:bg-slate-700 flex items-center space-x-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Delete User</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};