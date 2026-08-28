import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import {
  CheckSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  FileCheck,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const OfficerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (search) params.search = search;

      const res = await API.get('/applications', { params });
      if (res.data.success) {
        setApplications(res.data.applications);
      }
    } catch (err) {
      console.error('[OfficerDashboard] fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, [statusFilter]);

  const pendingCount = applications.filter(a => a.status === 'SUBMITTED').length;
  const underReviewCount = applications.filter(a => a.status === 'UNDER_REVIEW').length;
  const approvedCount = applications.filter(a => a.status === 'APPROVED').length;
  const rejectedCount = applications.filter(a => a.status === 'REJECTED').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Officer Header */}
        <div className="bg-gradient-to-r from-gov-navy to-gov-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-400/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Department Verification Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Officer Application Desk
            </h1>
            <p className="text-xs text-slate-300">
              Review applicant documentation, perform official verification, and authorize grant release.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pending Verification</span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">{pendingCount}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Under Committee Review</span>
            <p className="text-2xl font-extrabold text-blue-600 mt-1">{underReviewCount}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Approved & Disbursed</span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{approvedCount}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rejected Applications</span>
            <p className="text-2xl font-extrabold text-rose-600 mt-1">{rejectedCount}</p>
          </div>
        </div>

        {/* Applications Queue Table */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-bold text-base text-gov-navy">Verification Queue</h3>

            {/* Status Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {['All', 'SUBMITTED', 'UNDER_REVIEW', 'ACTION_REQUIRED', 'APPROVED', 'REJECTED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    statusFilter === st
                      ? 'bg-gov-navy text-white shadow'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-4 border-gov-navy border-t-orange-500 rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs font-semibold text-slate-600">Loading queue records...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No applications currently matching filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                  <tr>
                    <th className="p-3">Application ID</th>
                    <th className="p-3">Citizen Name</th>
                    <th className="p-3">Scheme Name</th>
                    <th className="p-3">Submission Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-orange-600">
                        {app.applicationId}
                      </td>
                      <td className="p-3 font-bold text-slate-800">
                        {app.citizen?.name}
                      </td>
                      <td className="p-3">{app.scheme?.name}</td>
                      <td className="p-3 text-slate-500">
                        {new Date(app.submittedAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                          app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' :
                          app.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          to={`/officer/verify/${app._id}`}
                          className="px-3 py-1.5 bg-gov-navy hover:bg-gov-deep text-white font-bold text-[11px] rounded-lg shadow transition inline-flex items-center gap-1"
                        >
                          Inspect & Verify <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OfficerDashboard;
