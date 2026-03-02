import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CheckCircle, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { toast } from 'sonner';
import { analyticsApi } from '@/utils/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsApi.get();
      setAnalytics(response.data);
    } catch (error) {
      toast.error('Failed to fetch analytics');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040A] flex items-center justify-center">
        <Navbar isDashboard />
        <div className="text-white">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02040A]">
      <Navbar isDashboard />

      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-slate-400">Track your lead performance and conversion metrics</p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
              data-testid="analytics-total-leads"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Total Leads</div>
                  <div className="text-2xl font-bold text-white">{analytics?.total_leads || 0}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
              data-testid="analytics-new-leads"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">New Leads</div>
                  <div className="text-2xl font-bold text-white">{analytics?.new_leads || 0}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
              data-testid="analytics-closed-leads"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Closed Leads</div>
                  <div className="text-2xl font-bold text-white">{analytics?.closed_leads || 0}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
              data-testid="analytics-conversion-rate"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Conversion Rate</div>
                  <div className="text-2xl font-bold text-white">{analytics?.conversion_rate || 0}%</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Leads Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Weekly Lead Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.weekly_leads || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B0F17',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                    }}
                  />
                  <Bar dataKey="leads" fill="#00F0FF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Lead Status Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Lead Status Distribution</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">New</span>
                    <span className="text-blue-400 font-semibold">{analytics?.new_leads || 0}</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          analytics?.total_leads
                            ? (analytics.new_leads / analytics.total_leads) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">Contacted</span>
                    <span className="text-yellow-400 font-semibold">{analytics?.contacted_leads || 0}</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          analytics?.total_leads
                            ? (analytics.contacted_leads / analytics.total_leads) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">Closed</span>
                    <span className="text-green-400 font-semibold">{analytics?.closed_leads || 0}</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          analytics?.total_leads
                            ? (analytics.closed_leads / analytics.total_leads) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
