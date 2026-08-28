import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import {
  Sparkles,
  FileCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Search,
  CheckSquare,
  MapPin,
  HelpCircle,
  ExternalLink,
  Bookmark
} from 'lucide-react';

const CitizenDashboard = () => {
  const { user, profile } = useAuth();
  const [applications, setApplications] = useState([]);
  const [recommendationsCount, setRecommendationsCount] = useState(0);
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appRes, recRes, savedRes] = await Promise.all([
          API.get('/applications/my-applications'),
          API.post('/schemes/recommend', {}),
          API.get('/schemes/saved')
        ]);

        if (appRes.data.success) setApplications(appRes.data.applications);
        if (recRes.data.success) setRecommendationsCount(recRes.data.count || 0);
        if (savedRes.data.success) setSavedSchemes(savedRes.data.schemes);
      } catch (err) {
        console.error('[CitizenDashboard] Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalApplied = applications.length;
  const pendingApps = applications.filter(a => ['SUBMITTED', 'UNDER_REVIEW', 'ACTION_REQUIRED'].includes(a.status)).length;
  const approvedApps = applications.filter(a => a.status === 'APPROVED').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-gov-navy to-gov-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" /> Citizen Portal Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user ? user.name : 'Citizen'}
            </h1>
            <p className="text-xs text-slate-300">
              {profile ? `${profile.district}, ${profile.state} • Income Ceiling: ₹${Number(profile.annualIncome).toLocaleString('en-IN')}` : 'State Resident'}
            </p>
          </div>

          <div className="relative z-10 flex gap-3">
            <Link
              to="/recommendations"
              className="px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-105 transition text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Find Schemes For Me
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov-card">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Matched Schemes</span>
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-extrabold text-gov-navy mt-2">{recommendationsCount}</p>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-block">High qualification rating</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov-card">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Applied Schemes</span>
              <FileCheck className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-extrabold text-gov-navy mt-2">{totalApplied}</p>
            <span className="text-[10px] text-slate-500 font-semibold mt-1 inline-block">Active applications</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov-card">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Pending Review</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-amber-600 mt-2">{pendingApps}</p>
            <span className="text-[10px] text-slate-500 font-semibold mt-1 inline-block">Officer verification queue</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov-card">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Approved Grants</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-600 mt-2">{approvedApps}</p>
            <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-block">DBT release authorized</span>
          </div>
        </div>

        {/* Quick Action Tiles */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/recommendations"
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-orange-500 hover:shadow-md transition group"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-800">AI Scheme Engine</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Scan eligible schemes</p>
            </Link>

            <Link
              to="/eligibility-checker"
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-800">Eligibility Wizard</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Step-by-step evaluator</p>
            </Link>

            <Link
              to="/service-locator"
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-800">Service Centers</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Locate nearest CSC</p>
            </Link>

            <Link
              to="/grievances"
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-md transition group"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-800">Submit Grievance</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Report delays or issues</p>
            </Link>
          </div>
        </div>

        {/* Recent Applications Table / List */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-gov-navy">Recent Submitted Applications</h3>
            <Link to="/schemes" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
              Apply New Scheme <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <FileCheck className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">No applications submitted yet.</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Explore recommended schemes and submit your first digital application.</p>
              <Link
                to="/recommendations"
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-gov-navy text-white text-xs font-bold rounded-xl shadow"
              >
                <Sparkles className="w-3.5 h-3.5" /> Find Eligible Schemes
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {applications.map((app) => (
                <div key={app._id} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 p-3 rounded-xl transition">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                        {app.applicationId}
                      </span>
                      <h4 className="font-bold text-xs text-slate-800">{app.scheme?.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Department: {app.scheme?.department} • Submitted: {new Date(app.submittedAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                      app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' :
                      app.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status}
                    </span>

                    <Link
                      to={`/applications/${app._id}`}
                      className="text-xs font-bold text-gov-navy hover:text-orange-600 flex items-center gap-1"
                    >
                      Track Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CitizenDashboard;
