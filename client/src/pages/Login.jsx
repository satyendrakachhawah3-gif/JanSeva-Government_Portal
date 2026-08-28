import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Shield, User, Key, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        const role = res.user.role;
        if (role === 'ADMIN') navigate('/admin-portal');
        else if (role === 'OFFICER') navigate('/officer-portal');
        else navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gov-navy text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl font-extrabold text-gov-navy tracking-tight">
          Sign In to JanSeva AI
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500 font-medium">
          Unified Digital Public Service Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-8 space-y-6">
          
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@janseva.ai"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-gov-navy focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gov-navy hover:bg-gov-deep text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* DEMO ACCOUNTS QUICK SIGN IN BUTTONS */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
              Quick One-Click Demo Sign In:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('citizen@janseva.ai', 'CITIZEN')}
                className="p-2 text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-200 transition text-center"
              >
                Citizen Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('officer@janseva.ai', 'OFFICER')}
                className="p-2 text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold rounded-lg border border-blue-200 transition text-center"
              >
                Officer Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@janseva.ai', 'ADMIN')}
                className="p-2 text-[10px] bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold rounded-lg border border-purple-200 transition text-center"
              >
                Admin Account
              </button>
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-slate-600">
            Don't have a citizen profile?{' '}
            <Link to="/register" className="font-bold text-orange-600 hover:underline">
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
