import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Building2,
  Users,
  FileCheck,
  Award,
  Plus,
  ShieldCheck,
  TrendingUp,
  BarChart2
} from 'lucide-react';

const COLORS = ['#0B2545', '#E65100', '#138808', '#0284C7', '#9333EA', '#D97706'];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get('/analytics/stats');
        if (res.data.success) {
          setStats(res.data.stats);
          setCharts(res.data.charts);
        }
      } catch (err) {
        console.error('[AdminDashboard] error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-gov-navy border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-gov-navy to-gov-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-purple-300">
              <Building2 className="w-3.5 h-3.5" /> Central System Administration
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              JanSeva Administrative Analytics Portal
            </h1>
            <p className="text-xs text-slate-300">
              System health monitoring, scheme governance, officer workload metrics, and public service reporting.
            </p>
          </div>

          <Link
            to="/admin/schemes"
            className="px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 transition text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Manage Scheme Catalog
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase">
              <span>Registered Citizens</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-extrabold text-gov-navy mt-2">{stats?.totalCitizens}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase">
              <span>Active Schemes</span>
              <Building2 className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-extrabold text-gov-navy mt-2">{stats?.totalSchemes}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase">
              <span>Total Applications</span>
              <FileCheck className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-extrabold text-gov-navy mt-2">{stats?.totalApplications}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase">
              <span>Approval Rate</span>
              <Award className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-600 mt-2">{stats?.approvalRate}%</p>
          </div>
        </div>

        {/* Recharts Graphical Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Monthly Application Trends (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider">
              Monthly Application & Approval Trends
            </h3>
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts?.monthlyTrends || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#0B2545" strokeWidth={3} name="Total Applications" />
                  <Line type="monotone" dataKey="approved" stroke="#16A34A" strokeWidth={3} name="Approved" />
                  <Line type="monotone" dataKey="rejected" stroke="#E11D48" strokeWidth={2} strokeDasharray="4 4" name="Rejected" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scheme Category Distribution (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gov-navy uppercase tracking-wider">
              Applications by Sector Category
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts?.categoryDistribution || []}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ category }) => category}
                  >
                    {(charts?.categoryDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
