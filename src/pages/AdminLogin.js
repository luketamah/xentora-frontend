import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { authApi } from '@/utils/api';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login(credentials);
      localStorage.setItem('token', response.data.access_token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040A] flex items-center justify-center px-6">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-40"></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/20 via-transparent to-transparent blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">XENTORA</h1>
            <p className="text-slate-400">Admin Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6" data-testid="admin-login-form">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  required
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="admin@xentora.com"
                  className="pl-12 bg-black/20 border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 text-white placeholder:text-slate-600 h-12"
                  data-testid="admin-email-input"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  required
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter password"
                  className="pl-12 bg-black/20 border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 text-white placeholder:text-slate-600 h-12"
                  data-testid="admin-password-input"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] font-bold h-12"
              data-testid="admin-login-btn"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-xs text-slate-400 mb-2">Demo Credentials:</p>
            <p className="text-sm text-slate-300 font-mono">admin@xentora.com</p>
            <p className="text-sm text-slate-300 font-mono">admin123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
