import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { leadApi } from '@/utils/api';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredLeads(leads);
    } else {
      setFilteredLeads(leads.filter((lead) => lead.status === filter));
    }
  }, [filter, leads]);

  const fetchLeads = async () => {
    try {
      const response = await leadApi.getAll();
      setLeads(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      toast.error('Failed to fetch leads');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (leadId, newStatus) => {
    try {
      await leadApi.updateStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
      );
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Contacted':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'Closed':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

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
            <h1 className="text-4xl font-bold mb-2">Lead Management</h1>
            <p className="text-slate-400">Manage and track all your leads</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
              data-testid="stat-total-leads"
            >
              <div className="text-slate-400 text-sm mb-1">Total Leads</div>
              <div className="text-3xl font-bold text-cyan-400">{leads.length}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
              data-testid="stat-new-leads"
            >
              <div className="text-slate-400 text-sm mb-1">New Leads</div>
              <div className="text-3xl font-bold text-blue-400">
                {leads.filter((l) => l.status === 'New').length}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
              data-testid="stat-contacted-leads"
            >
              <div className="text-slate-400 text-sm mb-1">Contacted</div>
              <div className="text-3xl font-bold text-yellow-400">
                {leads.filter((l) => l.status === 'Contacted').length}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
              data-testid="stat-closed-leads"
            >
              <div className="text-slate-400 text-sm mb-1">Closed</div>
              <div className="text-3xl font-bold text-green-400">
                {leads.filter((l) => l.status === 'Closed').length}
              </div>
            </motion.div>
          </div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">All Leads</h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40 bg-black/20 border-white/10" data-testid="lead-filter-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B0F17] border-white/10">
                    <SelectItem value="all">All Leads</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="leads-table">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Phone</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Business</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Message</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-400">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-400">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead, index) => (
                      <tr
                        key={lead.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        data-testid={`lead-row-${index}`}
                      >
                        <td className="py-3 px-4 text-white">{lead.name}</td>
                        <td className="py-3 px-4 text-slate-300">{lead.email}</td>
                        <td className="py-3 px-4 text-slate-300">{lead.phone}</td>
                        <td className="py-3 px-4 text-slate-300">{lead.business_type}</td>
                        <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{lead.message}</td>
                        <td className="py-3 px-4 text-slate-300">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <Select
                            value={lead.status}
                            onValueChange={(value) => updateStatus(lead.id, value)}
                          >
                            <SelectTrigger
                              className={`w-32 border text-xs font-medium ${getStatusColor(
                                lead.status
                              )}`}
                              data-testid={`lead-status-select-${index}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0B0F17] border-white/10">
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="Contacted">Contacted</SelectItem>
                              <SelectItem value="Closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
