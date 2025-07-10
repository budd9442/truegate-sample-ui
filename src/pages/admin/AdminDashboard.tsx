import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  Shield, 
  TrendingUp, 
  BarChart3, 
  UserCheck,
  UserX,
  AlertTriangle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { User } from '../../types';
import { mockApiStats } from '../../utils/mockData';
import { StatsCard } from '../../components/smart-home/StatsCard';
import { Card } from '../../components/ui/Card';
import { apiService } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats] = useState(mockApiStats);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await apiService.getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const verifiedUsers = users.filter(u => u.verified).length;
  const activeUsers = users.filter(u => !u.locked).length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  const COLORS = ['#14b8a6', '#0d9488', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">
          Monitor and manage your TrueGate system
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={Users}
          color="primary"
          trend={{ value: 12, direction: 'up' }}
        />
        <StatsCard
          title="Verified Users"
          value={verifiedUsers}
          icon={UserCheck}
          color="success"
          trend={{ value: 8, direction: 'up' }}
        />
        <StatsCard
          title="Active Users"
          value={activeUsers}
          icon={Activity}
          color="warning"
        />
        <StatsCard
          title="Admin Users"
          value={adminUsers}
          icon={Shield}
          color="error"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Trends */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Login Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.loginTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                dataKey="date" 
                stroke="#94a3b8"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#f8fafc' }}
              />
              <Area
                type="monotone"
                dataKey="logins"
                stroke="#14b8a6"
                fill="#14b8a6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* User Roles Distribution */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            User Roles Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.userRoles}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ role, count }) => `${role}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {stats.userRoles.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Recent Users
        </h3>
        
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="shimmer h-16 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-slate-300">User</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 10).map((user) => (
                  <tr key={user._id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
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
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        user.role === 'admin' 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'bg-accent-500/20 text-accent-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {user.verified ? (
                          <UserCheck className="w-4 h-4 text-success-400" />
                        ) : (
                          <UserX className="w-4 h-4 text-warning-400" />
                        )}
                        <span className={`text-sm ${
                          user.verified ? 'text-success-400' : 'text-warning-400'
                        }`}>
                          {user.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-400 text-sm">
                        {user.lastLogin 
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : 'Never'
                        }
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary-400 hover:text-primary-300 text-sm">
                          Edit
                        </button>
                        <button className="text-error-400 hover:text-error-300 text-sm">
                          Lock
                        </button>
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